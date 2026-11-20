import {readFile} from "node:fs/promises";

import {
    moyenneGenerale,
    admis,
    nomsFormates,
    effectifParFiliere,
    moyenneParFiliere,
    classementParNote,
    majNote 
} from "./etudiants.js";

const etudiants = JSON.parse(await readFile(new URL("../data/etudiants.json", import.meta.url), "utf-8"));

console.log("====Partie D : RESULTATS====");
console.log("Moyenne générale :", moyenneGenerale(etudiants));
console.log("Etudiants admis :", admis(etudiants));
console.log("Noms formatés :", nomsFormates(etudiants));
console.log("Effectif par filière :", effectifParFiliere(etudiants));
console.log("Moyenne par filière :", moyenneParFiliere(etudiants));
console.log("Classement par note :", classementParNote(etudiants));

// PREUVE 1 : classement sans modification de l'origine

const premierAvant = JSON.stringify(etudiants[0]);

const classement = classementParNote(etudiants);

const premierApres = JSON.stringify(etudiants[0]);

console.log(
    "Preuve classement :",
    premierAvant === premierApres
);


// PREUVE 2 : modification immuable d'une note

const idTest = etudiants[0].id;

const ancienEtudiant = etudiants.find(
    etudiant => etudiant.id === idTest
);

const ancienneNote = ancienEtudiant.note;

const nouvelleListe = majNote(
    etudiants,
    idTest,
    18
);

const nouvelEtudiant = nouvelleListe.find(
    etudiant => etudiant.id === idTest
);

console.log(
    "Ancien et nouvel objet différents :",
    ancienEtudiant !== nouvelEtudiant
);

console.log(
    "Ancienne note inchangée :",
    ancienEtudiant.note === ancienneNote
);

console.log(
    "Nouvelle note :",
    nouvelEtudiant.note
);