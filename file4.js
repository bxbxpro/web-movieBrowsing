const votedCont = document.getElementById("voted");
const popularCont = document.getElementById("popular");

async function fetchMovies() {
  let movies = [];

  for (let page = 1; page <= 3; page++) {
    const res = await fetch(
      `https://jsonfakery.com/movies/paginated?page=${page}`
    );
    const data = await res.json();
    movies = [...movies, ...data.data];
  }
  return movies;
}

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie";

  card.innerHTML = `<img src=${movie.poster_path} alt=${movie.original_title}/>
    <div class="movie-title">${movie.original_title}</div>`;

  card.addEventListener("click", () => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    window.location.href = "movie-details.html";
  });
  return card;
}

const loader = document.getElementById("loader");

function showLoader() {
  loader.style.display = "flex";
}

function hideLoader() {
  loader.style.display = "none";
}

async function displayMovie() {
  showLoader();
  const movies = await fetchMovies();
  let popularElements = [];
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].popularity > 20) {
      popularElements.push(movies[i]);
    }
    if (popularElements.length == 8) {
      break;
    }
  }

  let votedElements = [];
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].vote_average > 7) {
      votedElements.push(movies[i]);
    }
    if (votedElements.length == 8) {
      break;
    }
  }

  popularElements.forEach((movie) => {
    const card = createMovieCard(movie);
    popularCont.appendChild(card);
  });

  votedElements.forEach((movie) => {
    const card = createMovieCard(movie);
    votedCont.appendChild(card);
  });

  hideLoader();
}

displayMovie();