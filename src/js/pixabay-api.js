import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("input[type=text]");
const APIKey = "47994824-0d51099febe4e8602bb4fd3aa";

export function startSearch() {
  let q = input.value.trim();
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
    })
    .catch((error) => {
      console.log(error);
    });
  input.value = "";
}
