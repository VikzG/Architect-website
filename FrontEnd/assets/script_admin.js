async function importImages() {
  const data = await importWorks();

  const gallery = document.querySelector(".gallery"); /*Selection du parent*/

  for (const image of data) {
    /*Déclaration de ma boucle*/
    const div = document.createElement("div");
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

importImages(); /* On utilise la fonction */

const boutonFilterTous =
  document.querySelector("#tous"); /*Selection du bouton tous*/
const boutonFilterObjet =
  document.querySelector("#objets"); /*Selection du bouton objets*/
const boutonFilterAppartements =
  document.querySelector("#appartements"); /*Selection du bouton appartements*/
const boutonFilterHotels =
  document.querySelector(
    "#hotels"
  ); /*Selection du bouton hotels et restaurants*/

boutonFilterTous.addEventListener("click", async function () {
  /* Ajout de l'évenement click*/ const gallery =
    document.querySelector(".gallery"); /* Selection de la galerie*/
  gallery.innerHTML = ""; /* Suppression du contenu de la galerie */
  importImages(); /* Renvoi de ma fonction qui importe les travaux */
});

boutonFilterObjet.addEventListener("click", async function () {
  getFilterCategory("Objets");
});

boutonFilterAppartements.addEventListener("click", async function () {
  getFilterCategory("Appartements");
});

boutonFilterHotels.addEventListener("click", async function () {
  getFilterCategory("Hotels & restaurants");
});

/* script pour la modale */

let modal = null;

/* Ouverture de la boite modale */
const openModal = function (e) {
  e.preventDefault();
  e.stopPropagation();
  const previousModal = document.querySelector(".modal-previous");
  previousModal.style.display = "none"; /* je masque ma fleche */
  const target = document.querySelector(e.currentTarget.getAttribute("href"));
  target.style.display = "flex"; /* on retire le display none */
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
  modalLoad();
};

/* Fermeture de la boite modale */
const closeModal = function (e) {
  if (modal === null) return; /* si la modale est non existante*/
  e.preventDefault();
  const targetWrapper = document.querySelector(".img-load-container");
  targetWrapper.innerHTML = "";
  modal.style.display = "none";
  const loadContainer = document.querySelector(".img-load-container");
  const deleteGallery = document.querySelector(".delete-gallery");
  const previousModal = document.querySelector(".modal-previous");
  const workForm = document.querySelector("#my-form");
  const titleModal = document.querySelector("#titlemodal");
  const contentBottom = document.querySelector(".bottom-content");
  contentBottom.style.display = "flex";
  previousModal.style.display = "none";
  loadContainer.style.display = "flex";
  titleModal.innerHTML = "Galerie photo";
  deleteGallery.style.display = "block";
  workForm.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeAttribute("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", closeModal);
  modal = null;
};

const stopPropagation = function (e) {
  /* constante pour eviter fermeture modale*/
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  /* on peux fermer la modale avec echap*/ if (
    e.key === "Escape" ||
    e.key === "Esc"
  ) {
    closeModal(e);
  }
});

/* chargement des travaux dans la modale */
async function modalLoad() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();

  const targetWrapper = document.querySelector(".img-load-container");

  for (const image of data) {
    /*Déclaration de ma boucle*/

    const div = document.createElement("div");
    const img = document.createElement("img"); /*Création d'une image*/
    const title = document.createElement("p");
    const trashButton = document.createElement("button");
    trashButton.classList.add("deleted-work");
    trashButton.dataset.id =
      image.id; /* j'ajoute le dataset data-id avec la valeur de l'id correspondant à l'image */
    title.textContent = "éditer";
    img.src = image.imageUrl; /*la source de l'image est imageUrl*/
    img.crossOrigin = "anonymous"; /*Fix du bug d'affichage*/
    trashButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
    div.appendChild(img); /*importation des images au parent*/
    div.appendChild(title);
    div.appendChild(trashButton);
    targetWrapper.appendChild(div);
  } /* Suppression de travaux */
  const deleteButtons =
    document.querySelectorAll(
      ".deleted-work"
    ); /* je selectionne touts mes boutons */
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async function (e) {
      /* pour chaque bouton je créer un évenement click */
      e.preventDefault();
      let workId =
        button.dataset
          .id; /* je créer ma variable qui récupère l'ID de chaque image qui est stockée dans le dataset du bouton */
      const token = localStorage.getItem("jwtToken");
      await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
    });
  }); 
}

async function importWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json(); /*Récupération des données*/
  return data;
}

/* Fonction pour les catégories de travaux */
async function getFilterCategory(category) {
  /* Fonction pour les catégories de filtres */
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  const data = await importWorks();
  let result = data.filter((item) => item.category.name === category);

  for (const image of result) {
    /*Déclaration de ma boucle*/

    const div = document.createElement("div");
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
/* Modale Creation de travaux */
async function creatingWork() {
  const loadContainer = document.querySelector(".img-load-container");
  const deleteGallery = document.querySelector(".delete-gallery");
  const previousModal = document.querySelector(".modal-previous");
  const workForm = document.querySelector("#my-form");
  const titleModal = document.querySelector("#titlemodal");
  const contentBottom = document.querySelector(".bottom-content");
  contentBottom.style.display = "none";
  previousModal.style.display = "block";
  loadContainer.style.display = "none";
  titleModal.innerHTML = "Ajout photo";
  deleteGallery.style.display = "none";
  workForm.style.display = "flex";
}
  const targetAddWork = document.querySelector(".add-photo");
  targetAddWork.addEventListener("click", creatingWork);

/* fleche precedent */
async function modalPrevious() {
  const loadContainer = document.querySelector(".img-load-container");
  const deleteGallery = document.querySelector(".delete-gallery");
  const previousModal = document.querySelector(".modal-previous");
  const workForm = document.querySelector("#my-form");
  const titleModal = document.querySelector("#titlemodal");
  const contentBottom = document.querySelector(".bottom-content");
  
  contentBottom.style.display = "flex";
  previousModal.style.display = "none";
  loadContainer.style.display = "flex";
  titleModal.innerHTML = "Galerie photo";
  deleteGallery.style.display = "block";
  workForm.style.display = "none";
}
const targetPrevious = document.querySelector(".modal-previous");
targetPrevious.addEventListener("click", modalPrevious);

/* Fonction pour envoyer un travail */
async function createWork() {
  const token = localStorage.getItem("jwtToken");
  const formData = new FormData();
  const imageForm = document.getElementById("image").files[0];
  const titleForm = document.getElementById("title").value;
  const categoryForm = document.getElementById("category").value;
  formData.append("image", imageForm);
  formData.append("title", titleForm);
  formData.append("category", categoryForm);
  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("problem with the fetch operation:", error);
    });
}

document.getElementById("my-form").addEventListener("submit", function (event) {
  event.preventDefault();
  createWork();
});

/* afficher l'image sélectionnée */
const uploadedImageDiv = document.querySelector("#uploadedimage");
const fileUpload = document.querySelector("#image");
const sendWork = document.querySelector("#valid-photo");
const hiddenContent = document.querySelector(".hide-content");
const hiddenTxt = document.querySelector(".image-text");
const hiddenFormat = document.querySelector(".image-format");

fileUpload.addEventListener("change", getImage);

function getImage(e) {
  hiddenContent.style.display = "none";
  hiddenTxt.style.display = "none";
  hiddenFormat.style.display = "none";
  sendWork.style.backgroundColor = "#1D6154";
  console.log(e.target.files[0]);
  console.log("images", e.target.files[0]);
  const imageToProcess = e.target.files[0];

  let newImg = new Image(imageToProcess.width, imageToProcess.height);
  newImg.src = URL.createObjectURL(imageToProcess);
  uploadedImageDiv.style.width = "130px";
  uploadedImageDiv.style.height = "169px";
  uploadedImageDiv.appendChild(newImg);
}

function logout() {
  localStorage.removeItem("jwtToken");
}
targetLogout = document.querySelector("#btn-link-logout");
targetLogout.addEventListener("click", logout);

/* Erreur formulaire boite modale */
const form = document.getElementById('my-form');
const imageField = form.elements['image'];
const titleField = form.elements['title'];
const submitButton = document.getElementById('valid-photo');

submitButton.addEventListener('click', function(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire si la vérification échoue
  if (imageField.value === '' || titleField.value === '') {
    alert('Veuillez compléter le formulaire');
  } else {
    form.submit(); // Soumet le formulaire si tout est ok
  }
});

/* Vérifie si l'utilisateur a un token dans le local storage*/
function checkAccess() {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    // Si le token n'est pas présent, redirige l'utilisateur vers une page d'erreur ou de connexion
    window.location.href = 'index.html';
    alert("Vous n'avez pas accès à la page d'administration");
  }
}

// Vérifie l'accès à l'index_admin lors du chargement de la page
if (window.location.href.endsWith('index_admin.html')) {
  checkAccess();
}