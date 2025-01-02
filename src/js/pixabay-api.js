import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("input[type=text]");
const APIKey = "47994824-0d51099febe4e8602bb4fd3aa";
const box = document.querySelector(".box");

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
  const URL = `https://pixabay.com/api/?key=${APIKey}&q=${encodeURIComponent(
    q
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  fetch(URL)
    .then((response) => {
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
        return;
      }
      console.log(data);

      box.innerHTML = "";

      data.hits.forEach((hit) => {
        const li = document.createElement("li");
        li.classList.add("li");
        li.innerHTML = `
          <img class="img" src="${hit.webformatURL}" alt="${hit.tags}" />
          <div class = "div">
          <p  class="p"><span class="p__span">Likes: </span> ${hit.likes}</p>
          <p  class="p"><span class="p__span">Views: </span> ${hit.views}</p>
          <p  class="p"><span class="p__span">Comments: </span> ${hit.comments}</p>
          <p  class="p"><span class="p__span">Downloads: </span> ${hit.downloads}</p>
        </div>
        `;
        box.appendChild(li);
        console.log(box);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  input.value = "";
}
