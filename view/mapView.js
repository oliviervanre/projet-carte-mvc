import { departmentsData, loadDepartmentsData } from '../model/data.js';

export function initializeMap() {
    // Charger les données mises à jour depuis le localStorage
    loadDepartmentsData();

    const mapContainer = document.getElementById('map-container');

    // Créer la popup personnalisée
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.display = 'none';
    document.body.appendChild(popup);

    // Fonction pour obtenir la couleur en fonction du pourcentage de déploiement (par seuils)
    function getDeploymentColor(deploiement) {
        if (deploiement >= 90) return 'rgb(0, 128, 0)'; // Vert foncé (100-90%)
        if (deploiement >= 80) return 'rgb(51, 153, 51)'; // Vert moyen (89-80%)
        if (deploiement >= 70) return 'rgb(102, 204, 102)'; // Vert clair (79-70%)
        if (deploiement >= 60) return 'rgb(153, 204, 51)'; // Jaune-vert (69-60%)
        if (deploiement >= 50) return 'rgb(204, 204, 0)'; // Jaune (59-50%)
        if (deploiement >= 40) return 'rgb(255, 204, 0)'; // Jaune-orangé (49-40%)
        if (deploiement >= 30) return 'rgb(255, 153, 51)'; // Orange (39-30%)
        if (deploiement >= 20) return 'rgb(255, 102, 51)'; // Rouge-orangé (29-20%)
        if (deploiement >= 10) return 'rgb(255, 51, 51)'; // Rouge clair (19-10%)
        return 'rgb(255, 0, 0)'; // Rouge vif (9-0%)
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

                    // Gestion de la popup
                    departement.addEventListener('mouseover', () => {
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
