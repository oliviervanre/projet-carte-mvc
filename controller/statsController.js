import { departmentsData, loadDepartmentsData } from '../model/data.js';

document.addEventListener('DOMContentLoaded', () => {
    loadDepartmentsData();

    const avgDeployment = document.getElementById('avgDeployment');
    const maxDeployment = document.getElementById('maxDeployment');
    const minDeployment = document.getElementById('minDeployment');
    const statsTable = document.getElementById('statsTable');

    // Calculer les statistiques
    const totalDeployment = departmentsData.reduce((sum, dep) => sum + dep.deploiement, 0);
    const avg = (totalDeployment / departmentsData.length).toFixed(2);
    const maxDep = departmentsData.reduce((a, b) => (a.deploiement > b.deploiement ? a : b));
    const minDep = departmentsData.reduce((a, b) => (a.deploiement < b.deploiement ? a : b));

    // Mettre à jour les éléments de la page
    avgDeployment.textContent = `${avg}%`;
    maxDeployment.textContent = `${maxDep.nom} (${maxDep.numero}) - ${maxDep.deploiement}%`;
    minDeployment.textContent = `${minDep.nom} (${minDep.numero}) - ${minDep.deploiement}%`;

    // Remplir le tableau des statistiques
    statsTable.innerHTML = departmentsData
        .map(dep => `
            <tr>
                <td>${dep.numero}</td>
                <td>${dep.nom}</td>
                <td>${dep.region}</td>
                <td>${dep.deploiement}%</td>
            </tr>
        `)
        .join('');

    // Initialiser le graphique
    const ctx = document.getElementById('deploymentChart').getContext('2d');

    // Préparer les données pour le graphique
    const labels = departmentsData.map(dep => `${dep.nom} (${dep.numero})`);
    const data = departmentsData.map(dep => dep.deploiement);

    // Créer le graphique
    const deploymentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pourcentage de Déploiement',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.raw}%`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Pourcentage (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Départements'
                    }
                }
            }
        }
    });
});
