import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const TTL = 60 * 60 * 24 * 40; // on garde 40 jours de classements
const SCORE_MAX = 1000;
const TOP = 10;

/** Journée de jeu, toujours calée sur Paris (voir Patch 1 côté client). */
function dateDuJour() {
  return new Intl.DateTimeFormat('fr-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date());
}

function nettoyerPseudo(valeur) {
  const p = String(valeur ?? '')
    .replace(/[^\p{L}\p{N} _.'-]/gu, '')
    .trim()
    .slice(0, 20);
  return p || 'Anonyme';
}

function estIdValide(id) {
  return typeof id === 'string' && /^[a-zA-Z0-9-]{8,64}$/.test(id);
}

/**
 * Garde-fous minimaux en attendant la validation complète côté serveur
 * (cf. SETUP.md §4). On rejette ce qui est structurellement impossible.
 */
function scoreCoherent({ score, trouvees, erreurs }) {
  if (!Number.isInteger(score) || score < 0 || score > SCORE_MAX) return false;
  if (!Number.isInteger(trouvees) || trouvees < 0 || trouvees > 9) return false;
  if (!Number.isInteger(erreurs) || erreurs < 0 || erreurs > 5) return false;
  // 100 points maximum par case, plus 100 points de bonus si la grille est complète.
  const plafond = trouvees * 100 + (trouvees === 9 ? Math.max(0, 100 - erreurs * 20) : 0);
  return score <= plafond;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const jour = dateDuJour();
  const cleScores = `lb:${jour}`;
  const clePseudos = `noms:${jour}`;

  try {
    if (req.method === 'POST') {
      const { joueurId, pseudo, score, trouvees, erreurs } = req.body ?? {};

      if (!estIdValide(joueurId)) {
        return res.status(400).json({ erreur: 'Identifiant de joueur invalide.' });
      }
      if (!scoreCoherent({ score, trouvees, erreurs })) {
        return res.status(400).json({ erreur: 'Score incohérent avec la partie déclarée.' });
      }

      const nom = nettoyerPseudo(pseudo);

      // gt: true → on n'écrase jamais un meilleur score déjà enregistré.
      await redis.zadd(cleScores, { gt: true }, { score, member: joueurId });
      await redis.hset(clePseudos, { [joueurId]: nom });
      await redis.expire(cleScores, TTL);
      await redis.expire(clePseudos, TTL);
    } else if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET, POST');
      return res.status(405).json({ erreur: 'Méthode non autorisée.' });
    }

    // GET comme POST renvoient l'état du classement : une seule requête suffit
    // pour envoyer son score et afficher le tableau mis à jour.
    const joueurId = req.method === 'POST' ? req.body?.joueurId : req.query?.joueurId;

    const plat = await redis.zrange(cleScores, 0, TOP - 1, { rev: true, withScores: true });
    const ids = [];
    const scores = [];
    for (let i = 0; i < plat.length; i += 2) {
      ids.push(String(plat[i]));
      scores.push(Number(plat[i + 1]));
    }

    const pseudos = ids.length ? await redis.hmget(clePseudos, ...ids) : {};
    const top = ids.map((id, i) => ({
      rang: i + 1,
      pseudo: pseudos?.[id] ?? 'Anonyme',
      score: scores[i],
      moi: id === joueurId
    }));

    const joueurs = await redis.zcard(cleScores);

    let moi = null;
    if (estIdValide(joueurId)) {
      const monScore = await redis.zscore(cleScores, joueurId);
      if (monScore !== null && monScore !== undefined) {
        // zcount plutôt que zrevrank : même résultat, API stable sur toutes
        // les versions du client, et les ex æquo partagent le même rang.
        const meilleurs = await redis.zcount(cleScores, `(${monScore}`, '+inf');
        moi = { rang: meilleurs + 1, score: Number(monScore) };
      }
    }

    return res.status(200).json({ jour, joueurs, top, moi });
  } catch (e) {
    console.error('[leaderboard]', e);
    return res.status(500).json({ erreur: 'Le classement est momentanément indisponible.' });
  }
}
