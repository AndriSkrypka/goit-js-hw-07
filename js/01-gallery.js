import { galleryItems } from "./gallery-items.js";
// Change code below this line
// console.log(galleryItems);
const gal = document.querySelector(".gallery");

const newGalery = createGallery(galleryItems);
let modalImg;

gal.insertAdjacentHTML("beforeend", newGalery);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

gal.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  modalImg = basicLightbox.create(
    `
    <img src=${event.target.dataset.source} width="500" height="500">`,
    {
      onShow: () => {
        window.addEventListener("keydown", closeEsc);
      },

      onClose: () => {
        window.removeEventListener("keydown", closeEsc);
      },
    }
  );
  modalImg.show();
});

function closeEsc(event) {
  if (event.code !== "Escape") {
    return;
  }
  modalImg.close();
}
