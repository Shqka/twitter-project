let menuContainer;

/* eventListener pour pouvoir supprimer le HTML contenu dans le container 
de la liste des résultats lorsque nous cliquons n'importe où. */
window.addEventListener('click', () => {
    menuContainer.innerHTML = '';
});


window.addEventListener('DOMContentLoaded', () => {
    menuContainer = document.querySelector('#search-menu-container');

    /* Pour ne pas faire disparaître la liste des résultats lors d'un clic sur celle-ci, 
    j'empêche la propagation de l'événement du clic. */
    menuContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });


    let searchInput = document.querySelector('#search-input');
    let ref;

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if (ref) {
            clearTimeout(ref);
        }

        ref = setTimeout(() => {
            axios.get('/users?search=' + value)
                 .then( response => {
                     menuContainer.innerHTML = response.data;
                 })
                 .catch(err => {
                     console.log(err);
                 })
        }, 1000);
    })

})