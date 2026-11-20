// PARTIE D : Traitement des données JSON

// 1. Moyenne générale
export function moyenneGenerale(liste) {
    if (liste.length === 0) return 0;

    const somme = liste.reduce(
        (acc, etudiant) => acc + etudiant.note,
        0
    );

    return Math.round((somme / liste.length) * 100) / 100;
}

// 2. Liste des admis
export function admis(liste) {
    return liste.filter(
        ({ note }) => note >= 10
    );
}

// 3. Noms formatés
export function nomsFormates(liste) {
    return liste.map(
        ({ nom, prenom }) =>
            `${nom.toUpperCase()} ${prenom}`
    );
}

// 4. Effectif par filière
export function effectifParFiliere(liste) {
    return liste.reduce((acc, { filiere }) => {
        acc[filiere] = (acc[filiere] || 0) + 1;
        return acc;
    }, {});
}

// 5. Moyenne par filière
export function moyenneParFiliere(liste) {
    const totaux = liste.reduce(
        (acc, { filiere, note }) => {
            if (!acc[filiere]) {
                acc[filiere] = {
                    somme: 0,
                    effectif: 0
                };
            }

            acc[filiere].somme += note;
            acc[filiere].effectif += 1;

            return acc;
        },
        {}
    );

    return Object.fromEntries(
        Object.entries(totaux).map(
            ([filiere, { somme, effectif }]) => [
                filiere,
                Math.round((somme / effectif) * 100) / 100
            ]
        )
    );
}

// 6. Classement par note décroissante
export function classementParNote(liste) {
    return [...liste].sort(
        (a, b) => b.note - a.note
    );
}

// 7. Modification immuable d'une note
export function majNote(liste, id, note) {
    return liste.map(etudiant =>
        etudiant.id === id
            ? { ...etudiant, note }
            : etudiant
    );
}