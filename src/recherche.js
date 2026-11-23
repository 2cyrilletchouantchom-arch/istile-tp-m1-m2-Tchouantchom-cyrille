const formulaire = document.querySelector("#recherche form");
const champ = document.querySelector("#champ-recherche");
const grille = document.querySelector("#liste-etudiants");
const statut = document.querySelector("#resultat-recherche");

function normaliser(texte) {
  return texte
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");
}

function afficherEtudiants(etudiants) {
  grille.replaceChildren();

  for (const etudiant of etudiants) {
    const carte = document.createElement("article");
    const nom = document.createElement("h3");
    const filiere = document.createElement("p");
    const note = document.createElement("p");

    nom.textContent = `${etudiant.prenom} ${etudiant.nom}`;
    filiere.textContent = etudiant.filiere;
    note.textContent = `Note : ${etudiant.note}`;
    carte.append(nom, filiere, note);
    grille.append(carte);
  }

  statut.textContent = etudiants.length === 0
    ? "Aucun étudiant ne correspond à votre recherche."
    : `${etudiants.length} étudiant${etudiants.length > 1 ? "s" : ""} affiché${etudiants.length > 1 ? "s" : ""}.`;
}

try {
  const reponse = await fetch(new URL("../data/etudiants.json", import.meta.url));
  if (!reponse.ok) throw new Error(`Erreur HTTP : ${reponse.status}`);
  const etudiants = await reponse.json();

  afficherEtudiants(etudiants);

  formulaire.addEventListener("submit", (evenement) => {
    evenement.preventDefault();
    const terme = normaliser(champ.value.trim());
    const resultats = etudiants.filter((etudiant) => {
      const texte = normaliser(`${etudiant.nom} ${etudiant.prenom} ${etudiant.filiere}`);
      return texte.includes(terme);
    });
    afficherEtudiants(resultats);
  });
} catch (erreur) {
  statut.textContent = "Impossible de charger les étudiants. Lancez la page avec un serveur local.";
  console.error("Erreur de chargement des étudiants :", erreur);
}
