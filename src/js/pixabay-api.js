const APIKey = "47994824-0d51099febe4e8602bb4fd3aa";

export default function searchApi(input) {
  return fetch(
    `https://pixabay.com/api/?key=${APIKey}&q=${encodeURIComponent(
      input
    )}&image_type=photo&orientation=horizontal&safesearch=true&`
  );
}
