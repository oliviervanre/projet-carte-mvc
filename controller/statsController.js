import { departmentsData, loadDepartmentsData } from '../model/data.js';

document.addEventListener('DOMContentLoaded', () => {
    loadDepartmentsData();

    const avgDeployment = document.getElementById('avgDeployment');
    const maxDeployment = document.getElementById('maxDeployment');
    const minDeployment = document.getElementById('minDeployment');
    const statsTable = document.getElementById('statsTable');

    // Calculer les statistiques globales
    const totalDeployment = departmentsData.reduce((sum, dep) => sum + dep.deploiement, 0);
    const avg = (totalDeployment / departmentsData.length).toFixed(2);
    const maxDep = departmentsData.reduce((a, b) => (a.deploiement > b.deploiement ? a : b));
    const minDep = departmentsData.reduce((a, b) => (a.deploiement < b.deploiement ? a : b));

    // Mettre à jour les éléments de la page
    avgDeployment.textContent = `${avg}%`;
    maxDeployment.textContent = `${maxDep.nom} (${maxDep.numero}) - ${maxDep.deploiement}%`;
    minDeployment.textContent = `${minDep.nom} (${minDep.numero}) - ${minDep.deploiement}%`;

    // Charger les données depuis le localStorage
    const savedData = JSON.parse(localStorage.getItem('departmentsData')) || [];

    const tableBody = document.querySelector('#statsTable tbody');
    tableBody.innerHTML = ''; // Vider le tableau avant de le remplir

    // Remplir les lignes du tableau dynamiquement
    savedData.forEach(department => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${department.numero}</td>
            <td>${department.nom}</td>
            <td>${department.region}</td>
            <td>${department.deploiement}%</td>
        `;
        tableBody.appendChild(row);
    });

    // Initialiser DataTable
    if ($.fn.DataTable.isDataTable('#statsTable')) {
        $('#statsTable').DataTable().clear().destroy();
    }

    $('#statsTable').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        scrollX: true,
        autoWidth: true,
    });

    document.querySelector('.dataTables_wrapper').className = '';

    // Regrouper les départements par région et calculer la moyenne de déploiement
    const regions = {};
    departmentsData.forEach(dep => {
        if (!regions[dep.region]) {
            regions[dep.region] = { total: 0, count: 0 };
        }
        regions[dep.region].total += dep.deploiement;
        regions[dep.region].count += 1;
    });

    const regionLabels = Object.keys(regions);
    const regionData = regionLabels.map(region => (regions[region].total / regions[region].count).toFixed(2));

    // Initialiser le graphique pour les régions
    const ctx = document.getElementById('deploymentChart').getContext('2d');
    const deploymentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: regionLabels,
            datasets: [{
                label: 'Pourcentage de Déploiement Moyen par Région',
                data: regionData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Inverser les axes pour barres horizontales
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
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Pourcentage (%)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Régions'
                    }
                }
            }
        }
    });
});
