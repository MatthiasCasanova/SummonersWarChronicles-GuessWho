(function() {
  'use strict';

  // Liste des images
  const images = [
    'Icon/icon_mon_archangel00_dark.png',
    'Icon/icon_mon_archangel00_light.png',
    'Icon/icon_mon_artmaster00_dark.png',
    'Icon/icon_mon_artmaster00_dark.png',
    'Icon/icon_mon_beastrider00_dark.png',
    'Icon/icon_mon_beastrider00_light.png',
    'Icon/icon_mon_beetleknights00_dark.png',
    'Icon/icon_mon_beetleknights00_light.png',
    'Icon/icon_mon_bomber00_dark.png',
    'Icon/icon_mon_bomber00_light.png',
    'Icon/icon_mon_boomerangwarrior00_dark.png',
    'Icon/icon_mon_boomerangwarrior00_light.png',
    'Icon/icon_mon_buddhistmonk00_dark.png',
    'Icon/icon_mon_buddhistmonk00_light.png',
    'Icon/icon_mon_captain00_dark.png',
    'Icon/icon_mon_captain00_light.png',
    'Icon/icon_mon_chakramdancer00_dark.png',
    'Icon/icon_mon_chakramdancer00_light.png',
    'Icon/icon_mon_chimera00_dark.png',
    'Icon/icon_mon_chimera00_light.png',
    'Icon/icon_mon_cloudgod00_dark.png',
    'Icon/icon_mon_cloudgod00_light.png',
    'Icon/icon_mon_desertq00_dark.png',
    'Icon/icon_mon_desertq00_light.png',
    'Icon/icon_mon_dragon00_dark.png',
    'Icon/icon_mon_dragon00_light.png',
    'Icon/icon_mon_dragonknight00_dark.png',
    'Icon/icon_mon_dragonknight00_light.png',
    'Icon/icon_mon_fairyking00_dark.png',
    'Icon/icon_mon_fairyking00_light.png',
    'Icon/icon_mon_fairyqueen00_dark.png',
    'Icon/icon_mon_fairyqueen00_light.png',
    'Icon/icon_mon_harp00_dark.png',
    'Icon/icon_mon_harp00_light.png',
    'Icon/icon_mon_icediva00_dark.png',
    'Icon/icon_mon_icediva00_light.png',
    'Icon/icon_mon_ifrit00_dark.png',
    'Icon/icon_mon_ifrit00_light.png',
    'Icon/icon_mon_jackolantern00_dark.png',
    'Icon/icon_mon_jackolantern00_light.png',
    'Icon/icon_mon_joker00_dark.png',
    'Icon/icon_mon_joker00_light.png',
    'Icon/icon_mon_kiddevil00_dark.png',
    'Icon/icon_mon_kiddevil00_light.png',
    'Icon/icon_mon_lightningemperor00_dark.png',
    'Icon/icon_mon_lightningemperor00_light.png',
    'Icon/icon_mon_magicalarcher00_dark.png',
    'Icon/icon_mon_magicalarcher00_light.png',
    'Icon/icon_mon_magumsa00_dark.png',
    'Icon/icon_mon_magumsa00_light.png',
    'Icon/icon_mon_martialrabbit00_dark.png',
    'Icon/icon_mon_martialrabbit00_light.png',
    'Icon/icon_mon_mermaid00_dark.png',
    'Icon/icon_mon_mermaid00_light.png',
    'Icon/icon_mon_metaclone00_dark.png',
    'Icon/icon_mon_metaclone00_light.png',
    'Icon/icon_mon_ninetailes00_dark.png',
    'Icon/icon_mon_ninetailes00_light.png',
    'Icon/icon_mon_occultgirl00_dark.png',
    'Icon/icon_mon_occultgirl00_light.png',
    'Icon/icon_mon_onimusha00_dark.png',
    'Icon/icon_mon_onimusha00_light.png',
    'Icon/icon_mon_onmyouji00_dark.png',
    'Icon/icon_mon_onmyouji00_light.png',
    'Icon/icon_mon_oracle00_dark.png',
    'Icon/icon_mon_oracle00_light.png',
    'Icon/icon_mon_paladin00_dark.png',
    'Icon/icon_mon_paladin00_light.png',
    'Icon/icon_mon_panda00_dark.png',
    'Icon/icon_mon_panda00_light.png',
    'Icon/icon_mon_phoenix00_dark.png',
    'Icon/icon_mon_phoenix00_light.png',
    'Icon/icon_mon_raven00_dark.png',
    'Icon/icon_mon_raven00_light.png',
    'Icon/icon_mon_rockstar00_dark.png',
    'Icon/icon_mon_rockstar00_light.png',
    'Icon/icon_mon_sickle00_dark.png',
    'Icon/icon_mon_sickle00_light.png',
    'Icon/icon_mon_skydancer00_dark.png',
    'Icon/icon_mon_skydancer00_light.png',
    'Icon/icon_mon_soulsword00_dark.png',
    'Icon/icon_mon_soulsword00_light.png',
    'Icon/icon_mon_sylph00_dark.png',
    'Icon/icon_mon_sylph00_light.png',
    'Icon/icon_mon_undine00_dark.png',
    'Icon/icon_mon_undine00_light.png',
    'Icon/icon_mon_unicorn00_dark.png',
    'Icon/icon_mon_unicorn00_light.png',
    'Icon/icon_mon_valkyrja00_dark.png',
    'Icon/icon_mon_valkyrja00_light.png',
    'Icon/icon_mon_vampire00_dark.png',
    'Icon/icon_mon_vampire00_light.png',
    'Icon/icon_mon_vampirehunter00_dark.png',
    'Icon/icon_mon_vampirehunter00_light.png',
    'Icon/icon_mon_wukong00_dark.png',
    'Icon/icon_mon_wukong00_light.png'
  ];

  // Copie de l'ordre initial (pour le reset)
  const originalOrder = images.slice();

  // Met à jour la face avant et arrière de la carte
  function updateCardVisual(card) {
    const src = card.dataset.src;
    const front = card.querySelector('.front');
    const back = card.querySelector('.back');
    front.style.backgroundImage = `url('${src}')`;
    back.style.backgroundImage = `url('${src}')`;
  }

  // Insère une carte non retournée en respectant l'ordre initial d'origine
  function insertCardInOrder(board, card) {
    const idx = parseInt(card.dataset.originalIndex, 10);
    const children = Array.from(board.children);
    const target = children.find(c => parseInt(c.dataset.originalIndex, 10) > idx);
    if (target) {
      board.insertBefore(card, target);
    } else {
      board.appendChild(card);
    }
  }

  // Répartit cartes retournées et non retournées entre les deux plateaux
  function separateFlipped(board, flippedBoard) {
    // ramener les cartes décochées du bas vers le haut en respectant leur ordre
    Array.from(flippedBoard.children).forEach(card => {
      if (!card.classList.contains('flipped')) {
        insertCardInOrder(board, card);
      }
    });
    // envoyer les cartes cochées du haut vers le bas
    Array.from(board.children).forEach(card => {
      if (card.classList.contains('flipped')) {
        flippedBoard.appendChild(card);
      }
    });
    updateFlippedFlex(board, flippedBoard);
  }

  // Ajuste la largeur des cartes retournées
  function updateFlippedFlex(board, flippedBoard) {
    const cards = flippedBoard.querySelectorAll('.card');
    if (cards.length === 0) {
      return;
    }
    const style = getComputedStyle(board);
    const gap = parseFloat(style.gap) || 0;
    const sample = board.querySelector('.card') || flippedBoard.querySelector('.card');
    if (!sample) return;
    const cardWidth = sample.offsetWidth;
    const boardWidth = board.clientWidth;
    const cols = Math.max(1, Math.floor((boardWidth + gap) / (cardWidth + gap)));
    const basis = `calc((100% - ${(cols - 1) * gap}px) / ${cols})`;
    cards.forEach(card => {
      card.style.flex = `0 0 ${basis}`;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const flippedBoard = document.getElementById('flipped-board');
    const fragment = document.createDocumentFragment();

    // Création des cartes
    images.forEach((src, idx) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.src = src;
      card.dataset.originalIndex = idx;
      card.draggable = true;

      const inner = document.createElement('div');
      inner.className = 'inner';
      const front = document.createElement('div');
      front.className = 'front';
      const back = document.createElement('div');
      back.className = 'back';
      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);

      updateCardVisual(card);

      // Clic : flip avec animation seulement quand on coche, pas quand on décoche
      card.addEventListener('click', function() {
        const cardEl = this;
        const innerEl = cardEl.querySelector('.inner');
        const willBeFlipped = !cardEl.classList.contains('flipped');
        if (!willBeFlipped) {
          // Suppression de la transition pour l'animation d'unflip
          innerEl.style.transition = 'none';
        }

        // Bascule de l'état retourné
        cardEl.classList.toggle('flipped');

        if (willBeFlipped) {
          // Si on coche, on attend la fin de l'animation avant de repositionner
          const onEnd = e => {
            if (e.propertyName === 'transform') {
              separateFlipped(board, flippedBoard);
              innerEl.removeEventListener('transitionend', onEnd);
            }
          };
          innerEl.addEventListener('transitionend', onEnd);
        } else {
          // Si on décoche, on repositionne immédiatement et on réactive la transition
          separateFlipped(board, flippedBoard);
          setTimeout(() => {
            innerEl.style.transition = '';
          }, 0);
        }
      });

      // Gestion du drag & drop
      card.addEventListener('dragstart', function() {
        draggedItem = this;
        this.style.opacity = '0.6';
      });

      card.addEventListener('dragend', function() {
        this.style.opacity = '1';
        draggedItem = null;
      });

      card.addEventListener('dragover', function(e) {
        e.preventDefault();
      });

      card.addEventListener('drop', function() {
        if (draggedItem && draggedItem !== this) {
          this.classList.add('no-transition');
          draggedItem.classList.add('no-transition');

          // Échange les images
          const tmpSrc = this.dataset.src;
          this.dataset.src = draggedItem.dataset.src;
          draggedItem.dataset.src = tmpSrc;

          // Échange les indices initiaux
          const tmpIndex = this.dataset.originalIndex;
          this.dataset.originalIndex = draggedItem.dataset.originalIndex;
          draggedItem.dataset.originalIndex = tmpIndex;

          // Échange l'état retourné
          const thisFlip = this.classList.contains('flipped');
          const otherFlip = draggedItem.classList.contains('flipped');
          if (thisFlip) {
            draggedItem.classList.add('flipped');
          } else {
            draggedItem.classList.remove('flipped');
          }
          if (otherFlip) {
            this.classList.add('flipped');
          } else {
            this.classList.remove('flipped');
          }

          // Met à jour l'apparence
          updateCardVisual(this);
          updateCardVisual(draggedItem);

          // Répartit immédiatement après un drop
          separateFlipped(board, flippedBoard);

          const c = this;
          const o = draggedItem;
          setTimeout(() => {
            c.classList.remove('no-transition');
            o.classList.remove('no-transition');
          }, 0);
        }
      });

      fragment.appendChild(card);
    });

    // Ajoute toutes les cartes au plateau principal
    board.appendChild(fragment);

    // Bouton reset pour revenir à l'état initial
    document.getElementById('reset').addEventListener('click', () => {
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        card.dataset.src = originalOrder[index];
        card.dataset.originalIndex = index;
        card.classList.remove('flipped');
        updateCardVisual(card);
        board.appendChild(card);
      });
      updateFlippedFlex(board, flippedBoard);
    });

    // Ajuste les cartes retournées au redimensionnement
    window.addEventListener('resize', () => {
      updateFlippedFlex(board, flippedBoard);
    });
  });

  // Élément actuellement en cours de drag
  let draggedItem = null;
})();
