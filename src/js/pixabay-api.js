import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const input = document.querySelector("input[type=text]");
const APIKey = "47994824-0d51099febe4e8602bb4fd3aa";

const box = document.querySelector(".box");
const loader = document.querySelector(".loader");

const errrorMessage = document.querySelector("p");

export function startSearch() {
  let q = input.value.trim();
  console.log(q);
  if (q === "") {
    iziToast.show({
      message:
        "Sorry, there are no images matching your search query. Please try again!",
      color: "red",
    });
    return;
  }

  loader.classList.remove("is-hidden");
  errrorMessage.classList.add("error");

  const URL = `https://pixabay.com/api/?key=${APIKey}&q=${encodeURIComponent(
    q
  )}&image_type=photo&orientation=horizontal&safesearch=true&`;

  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.hits);
      const total = data.total;
      if (total === 0) {
        iziToast.show({
          message:
            "Sorry, there are no images matching your search query. Please try again!",
          color: "red",
        });
        errrorMessage.classList.remove("error");
        box.innerHTML = "";
      }
      console.log(data);

      data.hits.forEach((hit) => {
        const li = document.createElement("li");
        li.classList.add("li");
        li.innerHTML = `
          <a href="${hit.largeImageURL}" class="img"
      ><img class = "img" src="${hit.webformatURL}" alt="${hit.tags}" />
    </a>
          <div class = "div">
          <p  class="p"><span class="p__span">Likes </span> ${hit.likes}</p>
          <p  class="p"><span class="p__span">Views </span> ${hit.views}</p>
          <p  class="p"><span class="p__span">Comments </span> ${hit.comments}</p>
          <p  class="p"><span class="p__span">Downloads </span> ${hit.downloads}</p>
        </div>
        `;
        box.appendChild(li);
        console.log(box);
      });

      new SimpleLightbox(".box a", {
        captionsData: "alt",
        captionDelay: 100,
        captionPosition: "bottom",
      });
    })
    .catch((error) => {
      iziToast.show({
        message: "An error occurred while fetching the data.",
        color: "red",
      });
      console.log(error);
    })
    .finally(() => {
      loader.classList.add("is-hidden");
    });
  input.value = "";
}
