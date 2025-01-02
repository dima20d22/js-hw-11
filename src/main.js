import { startSearch } from "./js/pixabay-api";
import cards from "https://pixabay.com/api/";

const form = document.querySelector("form");
const ul = document.querySelector("ul");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  startSearch();
});

const URL = `https://pixabay.com/api/?key=${APIKey}&q=${encodeURIComponent(
  q
)}&image_type=photo&orientation=horizontal&safesearch=true`;

fetch(URL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // const ...........................................
  })
  .catch((error) => {
    console.log(error);
  });
input.value = "";

let newString = "";

newString += `
    <li class="gallery-item">
      <a class="gallery-link" href="${webformatURL}">
        <img
          class="gallery-img"
          src="${largeImageURL}"
          alt="${tags}"
          p="likes${likes}"
          p="views${views}"
          p="comments${comments}"
        p="downloads${downloads}"
          />
      </a>
    </li>
  `;

ul.innerHTML = newString;
