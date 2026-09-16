import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// Liste blanche stricte : cette route est publique en écriture, elle ne doit
// donner accès qu'aux clés dont le jeu a réellement besoin.
const CLES_AUTORISEES = new Set([
  'deptdoku_category_history_v2'
]);

const TAILLE_MAX = 32 * 1024; // 32 Ko, très au-dessus des 10 jours d'historique

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const cle = req.method === 'POST' ? req.body?.key : req.query?.key;

  if (!CLES_AUTORISEES.has(cle)) {
    return res.status(400).json({ erreur: 'Clé inconnue.' });
  }

  try {
    if (req.method === 'GET') {
      const value = await redis.get(`kv:${cle}`);
      return res.status(200).json({ key: cle, value: value ?? null });
    }

    if (req.method === 'POST') {
      const { value } = req.body ?? {};
      if (typeof value !== 'string' || value.length > TAILLE_MAX) {
        return res.status(400).json({ erreur: 'Valeur invalide.' });
      }
      await redis.set(`kv:${cle}`, value);
      return res.status(200).json({ key: cle, value });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ erreur: 'Méthode non autorisée.' });
  } catch (e) {
    console.error('[kv]', e);
    return res.status(500).json({ erreur: 'Stockage indisponible.' });
  }
}
