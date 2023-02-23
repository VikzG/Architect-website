
async function importImages() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json(); /*Récupération des données*/

  const gallery = document.querySelector(".gallery"); /*Selection du parent*/

  for (const image of data) {
    /*Déclaration de ma boucle*/
    const div = document.createElement ("div");
    const img = document.createElement("img"); /*Création d'une image*/
    const title = document.createElement("p");
    title.textContent = image.title;
    img.src = image.imageUrl; /*la source de l'image est imageUrl*/
    img.alt = image.title; /*On récupère le titre des images*/
    img.crossOrigin = "anonymous"; /*Fix du bug d'affichage*/
    div.appendChild(img); /*importation des images au parent*/
    div.appendChild(title);
    gallery.appendChild(div);
  }
}

importImages(); /* On déclare la fonction */


 const boutonFilterTous = document.querySelector("#tous"); /*Selection du bouton tous*/
 const boutonFilterObjet = document.querySelector("#objets");/*Selection du bouton objets*/
 const boutonFilterAppartements = document.querySelector("#appartements");/*Selection du bouton appartements*/
 const boutonFilterHotels = document.querySelector("#hotels");/*Selection du bouton hotels et restaurants*/
 

    boutonFilterTous.addEventListener("click",async function () { /* Ajout de l'évenement click*/
      const gallery = document.querySelector(".gallery"); /* Selection de la galerie*/
      gallery.innerHTML=""; /* Suppression du contenu de la galerie */
      importImages(); /* Renvoi de ma fonction qui importe les travaux */
    })
  
    boutonFilterObjet.addEventListener("click",async function () { /* Ajout de l'évenement click*/
      const gallery = document.querySelector(".gallery");  /* Selection de la galerie*/
      gallery.innerHTML=""; /* Suppression du contenu de la galerie */
      const response = await fetch("http://localhost:5678/api/works"); /* Récupération des données */
      const data = await response.json(); 
      let result = data.filter(item => item.category.name === "Objets"); /* Filtrage  des données sur le nom de la catégorie des travaux */

      for (const image of result) {
        /*Déclaration de ma boucle*/
        const div = document.createElement ("div");
        const img = document.createElement("img"); /*Création d'une image*/
        const title = document.createElement("p");
        title.textContent = image.title;
        img.src = image.imageUrl; /*la source de l'image est imageUrl*/
        img.alt = image.title; /*On récupère le titre des images*/
        img.crossOrigin = "anonymous"; /*Fix du bug d'affichage*/
        div.appendChild(img); /*importation des images au parent*/
        div.appendChild(title);
        gallery.appendChild(div);
      }
    })

    boutonFilterAppartements.addEventListener("click",async function () {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML="";
      const response = await fetch("http://localhost:5678/api/works");
      const data = await response.json();
      let result = data.filter(item => item.category.name === "Appartements");

      for (const image of result) {
        /*Déclaration de ma boucle*/
        const div = document.createElement ("div");
        const img = document.createElement("img"); /*Création d'une image*/
        const title = document.createElement("p");
        title.textContent = image.title;
        img.src = image.imageUrl; /*la source de l'image est imageUrl*/
        img.alt = image.title; /*On récupère le titre des images*/
        img.crossOrigin = "anonymous"; /*Fix du bug d'affichage*/
        div.appendChild(img); /*importation des images au parent*/
        div.appendChild(title);
        gallery.appendChild(div);
      }
    })

    boutonFilterHotels.addEventListener("click",async function () {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML="";
      const response = await fetch("http://localhost:5678/api/works");
      const data = await response.json();
      let result = data.filter(item => item.category.name === "Hotels & restaurants");

      for (const image of result) {
        /*Déclaration de ma boucle*/
        const div = document.createElement ("div");
        const img = document.createElement("img"); /*Création d'une image*/
        const title = document.createElement("p");
        title.textContent = image.title;
        img.src = image.imageUrl; /*la source de l'image est imageUrl*/
        img.alt = image.title; /*On récupère le titre des images*/
        img.crossOrigin = "anonymous"; /*Fix du bug d'affichage*/
        div.appendChild(img); /*importation des images au parent*/
        div.appendChild(title);
        gallery.appendChild(div);
      }
    })



