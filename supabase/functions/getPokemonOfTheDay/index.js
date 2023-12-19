module.exports = async (event, context) => {
    try {
        const { data } = event;

        // Votre logique de fonction ici
        console.log('Nouvelle ligne insérée :', data);

        // Vous pouvez effectuer d'autres opérations, par exemple, envoyer une notification, etc.

        return {
            statusCode: 200,
            body: 'Fonction exécutée avec succès.',
        };
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la fonction :', error);
        return {
            statusCode: 500,
            body: 'Erreur lors de l\'exécution de la fonction.',
        };
    }
};