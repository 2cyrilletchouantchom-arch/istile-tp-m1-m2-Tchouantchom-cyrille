export async function chargerUtilisateurs(
    limite =5,
    base = "https://dummyjson.com"
) {
    try {
        const response = await fetch(
            `${base}/users?limit=${limite}`
        );

        if (!response.ok) {
            throw new Error(
                `Erreur HTTP : ${response.status}`
            );
        }   
        const data = await response.json();

        return data.users.map(
            ({ id, firstName, lastName, 
email }) => ({
                id,
                firstName,
                lastName,
                email
            })
        );
    } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error.message);
        return [];
    }
}



export async function chargerUtilisateur( 
    id,
    base = "https://dummyjson.com"      
) {
    try {
        const response = await fetch(
`${base}/users/${id}`);

        if (response.status === 404) {
            console.error(`Utilisateur ${id}
introuvable (404)`);
            return null;
        }   
        
        if (!response.ok) {
            throw new Error(
                `Erreur HTTP : ${response.status}`
            );
        }

        const utilisateur = await response.json();

        console.log("Utilisateur :", utilisateur);

        return utilisateur;

    } catch (error) {
        console.error("Erreur reseau ou serveur :", error.message);
        return null;
    }
}