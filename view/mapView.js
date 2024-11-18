import { departmentsData } from '../model/data.js';

export function initializeMap() {
    const mapContainer = document.getElementById('map-container');

    // Créer la popup personnalisée
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.display = 'none';
    document.body.appendChild(popup);

    // Fonction pour obtenir la couleur en fonction du pourcentage de déploiement (de rouge à vert)
    function getDeploymentColor(deploiement) {
        // Dégradé de rouge (#FF0000) à vert (#00FF00)
        const r = Math.floor((1 - deploiement / 100) * 255 + (deploiement / 100) * 0);
        const g = Math.floor((1 - deploiement / 100) * 0 + (deploiement / 100) * 255);
        const b = 0; // Le bleu reste constant pour ce dégradé
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Charger le fichier SVG dynamiquement
    fetch('assets/carte-france-metropolitaine.svg')
        .then(response => response.text())
        .then(svgContent => {
            mapContainer.innerHTML = svgContent;
            const svgElement = mapContainer.querySelector('svg');

            // Supprimer tous les éléments <title> dans le SVG
            svgElement.querySelectorAll('title').forEach(title => title.remove());

            svgElement.querySelectorAll('.departement').forEach(departement => {
                const numero = departement.getAttribute('data-numerodepartement');
                const data = departmentsData.find(dep => dep.numero === numero);

                if (data) {
                    const { nom, region, deploiement } = data;
                    const color = getDeploymentColor(deploiement);

                    // Appliquer la couleur de fond en fonction du pourcentage de déploiement
                    departement.style.fill = color;

                    departement.addEventListener('mouseover', (event) => {
                        popup.innerHTML = `
                            <strong>${nom} (${numero})</strong><br>
                            Région : ${region}<br>
                            Déploiement : ${deploiement}%
                        `;
                        popup.style.display = 'block';
                    });

                    departement.addEventListener('mousemove', (event) => {
                        popup.style.left = event.pageX + 15 + 'px';
                        popup.style.top = event.pageY + 15 + 'px';
                    });

                    departement.addEventListener('mouseout', () => {
                        popup.style.display = 'none';
                    });
                }
            });
        })
        .catch(error => console.error('Erreur lors du chargement du SVG :', error));
}
