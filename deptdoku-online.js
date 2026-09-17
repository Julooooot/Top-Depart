/* ─────────────────────────────────────────────────────────────
   Départementdoku — couche en ligne
   À charger AVANT le fichier du jeu.

   1. Réimplémente window.storage : shared=false → localStorage,
      shared=true → /api/kv. Ton code de jeu n'a rien à changer.
   2. Expose envoyerScore() et afficherClassement().
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  const API_KV = '/api/kv';
  const API_LB = '/api/leaderboard';

  // ── 1. Identité du joueur ────────────────────────────────────

  function joueurId() {
    let id = localStorage.getItem('deptdoku_joueur_id');
    if (!id) {
      id = (crypto.randomUUID?.() ?? String(Date.now()) + Math.random().toString(36).slice(2));
      localStorage.setItem('deptdoku_joueur_id', id);
    }
    return id;
  }

  function pseudo() {
    return localStorage.getItem('deptdoku_pseudo') || '';
  }

  function definirPseudo(nom) {
    const propre = String(nom || '').trim().slice(0, 20);
    if (propre) localStorage.setItem('deptdoku_pseudo', propre);
    return propre;
  }

  // ── 2. window.storage ────────────────────────────────────────

  window.storage = {
    async get(key, shared = false) {
      if (!shared) {
        const value = localStorage.getItem(key);
        if (value === null) throw new Error(`Clé absente : ${key}`);
        return { key, value, shared };
      }
      const r = await fetch(`${API_KV}?key=${encodeURIComponent(key)}`);
      if (!r.ok) throw new Error(`Lecture impossible : ${key}`);
      const data = await r.json();
      if (data.value === null) throw new Error(`Clé absente : ${key}`);
      return { key, value: data.value, shared };
    },

    async set(key, value, shared = false) {
      if (!shared) {
        localStorage.setItem(key, value);
        return { key, value, shared };
      }
      const r = await fetch(API_KV, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      });
      if (!r.ok) throw new Error(`Écriture impossible : ${key}`);
      return { key, value, shared };
    },

    async delete(key, shared = false) {
      if (!shared) localStorage.removeItem(key);
      return { key, deleted: true, shared };
    },

    async list(prefix = '', shared = false) {
      if (shared) return { keys: [], prefix, shared };
      const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix));
      return { keys, prefix, shared };
    }
  };

  // ── 3. Envoi du score ────────────────────────────────────────

  let pseudoEnCoursDeDemande = false;
  let refusePourCetteSession = false;

  function demanderPseudo() {
    return new Promise(resolve => {
      const modal = document.getElementById('pseudoModal');
      const input = document.getElementById('pseudoInput');
      const btnValider = document.getElementById('btnConfirmPseudo');
      const btnSkip = document.getElementById('btnSkipPseudo');

      if (!modal || !input || !btnValider || !btnSkip) {
        // Filet de sécurité si le HTML de la popup n'a pas été ajouté.
        resolve(definirPseudo(window.prompt('Ton pseudo pour le classement ?') || ''));
        return;
      }

      input.value = '';
      modal.classList.add('open');
      input.focus();

      function conclure(valeur) {
        modal.classList.remove('open');
        btnValider.removeEventListener('click', onValider);
        btnSkip.removeEventListener('click', onSkip);
        input.removeEventListener('keydown', onKeydown);
        resolve(valeur);
      }
      function onValider() { conclure(definirPseudo(input.value)); }
      function onSkip() { refusePourCetteSession = true; conclure(''); }
      function onKeydown(e) { if (e.key === 'Enter') onValider(); }

      btnValider.addEventListener('click', onValider);
      btnSkip.addEventListener('click', onSkip);
      input.addEventListener('keydown', onKeydown);
    });
  }

  /**
   * Envoie le score courant. Appelable plusieurs fois dans une même partie
   * (fin de partie automatique, ou clic manuel avant la fin) : le serveur ne
   * garde de toute façon que le meilleur score du joueur (voir api/leaderboard.js).
   *
   * @param {boolean} manuel - true si déclenché par le bouton, pour afficher
   *   un message si le joueur n'a encore rien trouvé.
   */
  async function envoyerScore(manuel = false) {
    if (refusePourCetteSession) return;
    if (typeof isFreePlay !== 'undefined' && isFreePlay) return;
    if (typeof gridState === 'undefined') return;

    const trouvees = gridState.flat().filter(Boolean).length;
    if (trouvees === 0) {
      if (manuel) {
        const hint = document.getElementById('hint');
        if (hint) hint.textContent = 'Trouve au moins un département avant d\'enregistrer ton score.';
      }
      return;
    }

    let nom = pseudo();
    if (!nom) {
      if (pseudoEnCoursDeDemande) return; // popup déjà ouverte, on n'en relance pas une deuxième
      pseudoEnCoursDeDemande = true;
      nom = await demanderPseudo();
      pseudoEnCoursDeDemande = false;
      if (!nom) return;
    }

    try {
      const r = await fetch(API_LB, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          joueurId: joueurId(),
          pseudo: nom,
          score: calculerScoreTotal(),
          trouvees,
          erreurs: mistakes
        })
      });
      if (!r.ok) throw new Error(await r.text());
      rendreClassement(await r.json());
    } catch (e) {
      console.warn('Score non enregistré', e);
      rendreErreur();
    }
  }

  // ── 4. Affichage ─────────────────────────────────────────────

  function conteneur() {
    return document.getElementById('leaderboard');
  }

  async function afficherClassement() {
    const el = conteneur();
    if (!el) return;
    try {
      const r = await fetch(`${API_LB}?joueurId=${encodeURIComponent(joueurId())}`);
      if (!r.ok) throw new Error('indisponible');
      rendreClassement(await r.json());
    } catch (e) {
      rendreErreur();
    }
  }

  function rendreClassement(data) {
    const el = conteneur();
    if (!el) return;
    el.hidden = false;

    if (!data.top?.length) {
      el.innerHTML = `
        <h3 class="lb-titre">Classement du jour</h3>
        <p class="lb-vide">Personne n'a encore terminé la grille. À toi de lancer le classement.</p>`;
      return;
    }

    const lignes = data.top.map(j => `
      <li class="lb-ligne${j.moi ? ' lb-moi' : ''}">
        <span class="lb-rang">${j.rang}</span>
        <span class="lb-pseudo">${echapper(j.pseudo)}</span>
        <span class="lb-score">${j.score}</span>
      </li>`).join('');

    const horsTop = data.moi && !data.top.some(j => j.moi)
      ? `<p class="lb-perso">Ton rang : ${data.moi.rang}<sup>e</sup> sur ${data.joueurs} avec ${data.moi.score} points.</p>`
      : '';

    el.innerHTML = `
      <h3 class="lb-titre">Classement du jour</h3>
      <ol class="lb-liste">${lignes}</ol>
      ${horsTop}
      <p class="lb-total">${data.joueurs} joueur${data.joueurs > 1 ? 's' : ''} aujourd'hui</p>`;
  }

  function rendreErreur() {
    const el = conteneur();
    if (!el) return;
    el.hidden = false;
    el.innerHTML = `
      <h3 class="lb-titre">Classement du jour</h3>
      <p class="lb-vide">Le classement ne répond pas. Ton score local est conservé, recharge la page pour réessayer.</p>`;
  }

  function echapper(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ── 5. Styles ────────────────────────────────────────────────
  // Volontairement sobres : le classement accompagne la carte, il ne lui vole
  // pas la vedette. Adapte les couleurs à ta feuille de style existante.

  const style = document.createElement('style');
  style.textContent = `
    .leaderboard { margin-top: 18px; font-size: 14px; }
    .lb-titre { margin: 0 0 8px; font-size: 15px; font-weight: 600; }
    .lb-liste { list-style: none; margin: 0; padding: 0; }
    .lb-ligne { display: grid; grid-template-columns: 1.6em 1fr auto;
                gap: 8px; align-items: baseline; padding: 4px 6px; border-radius: 4px; }
    .lb-ligne + .lb-ligne { border-top: 1px solid rgba(0,0,0,.07); }
    .lb-rang { color: rgba(0,0,0,.45); font-variant-numeric: tabular-nums; }
    .lb-pseudo { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .lb-score { font-variant-numeric: tabular-nums; font-weight: 600; }
    .lb-moi { background: rgba(0,0,0,.05); }
    .lb-perso, .lb-total, .lb-vide { margin: 8px 0 0; color: rgba(0,0,0,.55); }
    .lb-total { font-size: 12px; }

    #pseudoInput {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 14px;
      margin: 14px 0;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      font-size: 15px;
      font-family: inherit;
    }
    #pseudoInput:focus { outline: none; border-color: #94a3b8; }
    #pseudoModal .modal-btns { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
  `;
  document.head.appendChild(style);

  // ── 6. Exposition ────────────────────────────────────────────

  window.envoyerScore = envoyerScore;
  window.afficherClassement = afficherClassement;
  window.definirPseudo = definirPseudo;

  document.addEventListener('DOMContentLoaded', () => {
    afficherClassement();
    const btn = document.getElementById('btnEnregistrerScore');
    if (btn) btn.addEventListener('click', () => envoyerScore(true));
  });
})();
