import iziToast from "izitoast";
import simpleLightbox from "simplelightbox";

const box = document.querySelector(".box");
const errrorMessage = document.querySelector("p");

export default function renderCards(data) {
  box.innerHTML = "";

  if (data.total === 0) {
    iziToast.show({
      message:
        "Sorry, there are no images matching your search query. Please try again!",
      color: "red",
    });
    errrorMessage.classList.remove("is-hidden");
    return;
  }

  data.hits.forEach((hit) => {
    box.innerHTML += `
        <li class='li'>
          <a href="${hit.largeImageURL}" class="img">
            <img class = "img" src="${hit.webformatURL}" alt="${hit.tags}" />
          </a>
          <div class = "div">
            <p  class="p"><span class="p__span">Likes </span> ${hit.likes}</p>
            <p  class="p"><span class="p__span">Views </span> ${hit.views}</p>
            <p  class="p"><span class="p__span">Comments </span> ${hit.comments}</p>
            <p  class="p"><span class="p__span">Downloads </span> ${hit.downloads}</p>
          </div>
        </li>
      `;
  });

  new simpleLightbox(".box a", {
    captionsData: "alt",
    captionDelay: 100,
    captionPosition: "bottom",
  });
}
