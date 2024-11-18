export let departmentsData = [
    { numero: "75", nom: "Paris", region: "Île-de-France", legende: "Capitale de la France", deploiement: 0 },
    { numero: "13", nom: "Bouches-du-Rhône", region: "Provence-Alpes-Côte d'Azur", legende: "Département de Marseille", deploiement: 0 },
    { numero: "69", nom: "Rhône", region: "Auvergne-Rhône-Alpes", legende: "Département de Lyon", deploiement: 0 },
    { numero: "33", nom: "Gironde", region: "Nouvelle-Aquitaine", legende: "Département de Bordeaux", deploiement: 0 },
    { numero: "59", nom: "Nord", region: "Hauts-de-France", legende: "Département de Lille", deploiement: 0 },
    { numero: "01", nom: "Ain", region: "Auvergne-Rhône-Alpes", legende: "Préfecture : Bourg-en-Bresse", deploiement: 0 },
    { numero: "02", nom: "Aisne", region: "Hauts-de-France", legende: "Préfecture : Laon", deploiement: 0 },
    { numero: "03", nom: "Allier", region: "Auvergne-Rhône-Alpes", legende: "Préfecture : Moulins", deploiement: 0 },
    { numero: "04", nom: "Alpes-de-Haute-Provence", region: "Provence-Alpes-Côte d'Azur", legende: "Préfecture : Digne-les-Bains", deploiement: 0 },
    { numero: "05", nom: "Hautes-Alpes", region: "Provence-Alpes-Côte d'Azur", legende: "Préfecture : Gap", deploiement: 0 },
    { numero: "06", nom: "Alpes-Maritimes", region: "Provence-Alpes-Côte d'Azur", legende: "Département de Nice", deploiement: 0 },
    { numero: "07", nom: "Ardèche", region: "Auvergne-Rhône-Alpes", legende: "Préfecture : Privas", deploiement: 0 },
    { numero: "08", nom: "Ardennes", region: "Grand Est", legende: "Préfecture : Charleville-Mézières", deploiement: 0 },
    { numero: "09", nom: "Ariège", region: "Occitanie", legende: "Préfecture : Foix", deploiement: 0 },
    { numero: "10", nom: "Aube", region: "Grand Est", legende: "Préfecture : Troyes", deploiement: 0 },
    { numero: "11", nom: "Aude", region: "Occitanie", legende: "Préfecture : Carcassonne", deploiement: 0 },
    { numero: "12", nom: "Aveyron", region: "Occitanie", legende: "Préfecture : Rodez", deploiement: 0 },
    { numero: "14", nom: "Calvados", region: "Normandie", legende: "Préfecture : Caen", deploiement: 0 },
    { numero: "15", nom: "Cantal", region: "Auvergne-Rhône-Alpes", legende: "Préfecture : Aurillac", deploiement: 0 },
    { numero: "16", nom: "Charente", region: "Nouvelle-Aquitaine", legende: "Préfecture : Angoulême", deploiement: 0 },
    { numero: "17", nom: "Charente-Maritime", region: "Nouvelle-Aquitaine", legende: "Préfecture : La Rochelle", deploiement: 0 },
    { numero: "18", nom: "Cher", region: "Centre-Val de Loire", legende: "Préfecture : Bourges", deploiement: 0 },
    { numero: "19", nom: "Corrèze", region: "Nouvelle-Aquitaine", legende: "Préfecture : Tulle", deploiement: 0 },
    { numero: "21", nom: "Côte-d'Or", region: "Bourgogne-Franche-Comté", legende: "Préfecture : Dijon", deploiement: 0 },
    { numero: "22", nom: "Côtes-d'Armor", region: "Bretagne", legende: "Préfecture : Saint-Brieuc", deploiement: 0 },
    { numero: "23", nom: "Creuse", region: "Nouvelle-Aquitaine", legende: "Préfecture : Guéret", deploiement: 0 },
    { numero: "24", nom: "Dordogne", region: "Nouvelle-Aquitaine", legende: "Préfecture : Périgueux", deploiement: 0 },
    { numero: "25", nom: "Doubs", region: "Bourgogne-Franche-Comté", legende: "Préfecture : Besançon", deploiement: 0 },
    { numero: "26", nom: "Drôme", region: "Auvergne-Rhône-Alpes", legende: "Préfecture : Valence", deploiement: 0 },
    { numero: "27", nom: "Eure", region: "Normandie", legende: "Préfecture : Évreux", deploiement: 0 },
    { numero: "28", nom: "Eure-et-Loir", region: "Centre-Val de Loire", legende: "Préfecture : Chartres", deploiement: 0 },
    { numero: "29", nom: "Finistère", region: "Bretagne", legende: "Préfecture : Quimper", deploiement: 0 },
    { numero: "2A", nom: "Corse-du-Sud", region: "Corse", legende: "Préfecture : Ajaccio", deploiement: 0 },
    { numero: "2B", nom: "Haute-Corse", region: "Corse", legende: "Préfecture : Bastia", deploiement: 0 }
];

// Charger les données depuis le localStorage
export function loadDepartmentsData() {
    const savedData = JSON.parse(localStorage.getItem('departmentsData'));
    if (savedData) {
        departmentsData = savedData;
    }
}

// data.js
export function saveDepartmentsData() {
    localStorage.setItem('departmentsData', JSON.stringify(departmentsData));
}
