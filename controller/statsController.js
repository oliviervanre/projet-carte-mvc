import { departmentsData, loadDepartmentsData } from '../model/data.js';

// Fonction pour calculer les statistiques
function calculateStats() {
    loadDepartmentsData();

    const totalDepartments = departmentsData.length;
    const totalDeployment = departmentsData.reduce((sum, dep) => sum + dep.deploiement, 0);
    const averageDeployment = (totalDeployment / totalDepartments).toFixed(2);

    const departmentsAbove50 = departmentsData.filter(dep => dep.deploiement > 50).length;
    const maxDeployment = Math.max(...departmentsData.map(dep => dep.deploiement));
    const minDeployment = Math.min(...departmentsData.map(dep => dep.deploiement));

    const bestDepartment = departmentsData.find(dep => dep.deploiement === maxDeployment);
    const worstDepartment = departmentsData.find(dep => dep.deploiement === minDeployment);

    return {
        averageDeployment,
        departmentsAbove50,
        bestDepartment,
        worstDepartment,
    };
}

// Fonction pour afficher les statistiques
function displayStats() {
    const statsContainer = document.getElementById('stats-container');
    const stats = calculateStats();

    statsContainer.innerHTML = `
        <ul class="list-group">
            <li class="list-group-item">Pourcentage moyen de déploiement : <strong>${stats.averageDeployment}%</strong></li>
            <li class="list-group-item">Nombre de départements avec un déploiement > 50% : <strong>${stats.departmentsAbove50}</strong></li>
            <li class="list-group-item">Département avec le plus haut déploiement : <strong>${stats.bestDepartment.nom} (${stats.bestDepartment.deploiement}%)</strong></li>
            <li class="list-group-item">Département avec le plus bas déploiement : <strong>${stats.worstDepartment.nom} (${stats.worstDepartment.deploiement}%)</strong></li>
        </ul>
    `;
}

document.addEventListener('DOMContentLoaded', displayStats);
