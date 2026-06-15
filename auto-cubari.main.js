// ==UserScript==
// @name         MangaSee and Imgur to Cubari Converter
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Adds a button to convert MangaSee and Imgur links to Cubari in the same tab
// @match        https://mangasee123.com/manga/*
// @match        https://imgur.com/a/*
// @match        https://weebcentral.com/series/*
// @match        https://imgchest.com/p/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Créer le bouton
    const button = document.createElement('button');
    button.innerHTML = '<img src="https://cubari.moe/static/cubari_logo.png" width="30" height="30">';
    button.style.cssText = `
        position: fixed;
        left: 20px;
        bottom: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        padding: 5px;
        z-index: 9999;
    `;

    // Ajouter le bouton à la page
    document.body.appendChild(button);

    // Fonction pour obtenir le lien Cubari
    function getCubariLink() {
        const currentUrl = window.location.href;
        if (currentUrl.includes('mangasee123.com')) {
            const mangaName = currentUrl.split('/manga/')[1];
            return `https://cubari.moe/read/mangasee/${mangaName}/`;
        } else if (currentUrl.includes('imgur.com')) {
            const albumId = currentUrl.split('/a/')[1];
            return `https://cubari.moe/read/imgur/${albumId}/1/1/`;
        } else if (currentUrl.includes('weebcentral.com')) {
            const mangaId = currentUrl.split('/series/')[1];
            return `https://cubari.moe/read/weebcentral/${mangaId}/`;
        } else if (currentUrl.includes('imgchest.com')) {
            const mangaId = currentUrl.split('/p/')[1];
            return `https://cubari.moe/read/imgchest/${mangaId}/1`;
        }
        return null;
    }

    // Ajouter l'événement de clic au bouton
    button.addEventListener('click', function() {
        const cubariLink = getCubariLink();
        if (cubariLink) {
            window.location.href = cubariLink;
        }
    });
})();
