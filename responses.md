# Réponses : Partie C

**1.** Requête vers /users/1 : méthode GET, code d'état 200 (OK),
Content-Type text/html; charset=utf-8. Deux champs du JSON : firstName et email.

**2.** /users/99999 renvoie 404 (Not Found) : l'utilisateur n'existe pas.
L'interface doit afficher un message clair (« Utilisateur introuvable »)
sans planter, et proposer de revenir à la liste.

**3.** (a) client ; (b) serveur ; (c) serveur ; (d) client ; (e) serveur.

**4.** 201 : création réussie, afficher un message de succès.
401 : non authentifié, rediriger vers la connexion.
404 : ressource introuvable, afficher « introuvable ».
500 : erreur du serveur, afficher une erreur générale et proposer de réessayer.
