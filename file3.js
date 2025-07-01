document.addEventListener("DOMContentLoaded", function () {
  const movieData = localStorage.getItem("selectedMovie");

  if (movieData) {
    const movie = JSON.parse(movieData);
    movieDetails(movie);
  } else {
    document.getElementById("movieDetails").innerHTML = `
        <p>No movie data found. Please go back and select a movie.</p>
        `;
  }
});

async function movieDetails(movie) {
  const detailsCont = document.getElementById("movieDetails");

  detailsCont.innerHTML = `
    <div class="movie-main">
    <div class="movie-poster">
        <img src="${movie.poster_path}" alt=${movie.original_title}/>
    </div>

    <div class="movie-info">
        <h1>${movie.original_title}</h1>
        <div class="movie-stats">
            <span>Release Date : ${movie.release_date}</span>
            <span>Popularity: ${movie.popularity}</span>
            <span>Vote average: ${movie.vote_average}</span>
            <span>Vote count: ${movie.vote_count}</span>
        </div>

        <div class="movie-overview">
            <p>${movie.overview}</p>
        </div>
    </div>

    <div class="cast-section">
        <h3>Cast of ${movie.original_title}</h3>
    </div>
    </div>
    `;

  displayCast(movie);

document.body.style.setProperty('--bg-image', `url(${movie.backdrop_path})`);
}

function displayCast(movie) {
  const castsData = movie.casts;

  const castSection = document.querySelector(".cast-section");

  if (!castsData) {
    castSection.innerHTML = `<h3>Cast</h3><p>Cast information not available.</p>`;
    return;
  }

  const castHTML = castsData
    .map(
      (actor) => `
    <div class="cast-member">
        <div class="cast-image">
            <img src="${actor.profile_path}" alt=${actor.name}>
        </div>

        <div class="cast-info">
            <h2>${actor.name}</h2>
            <h3>${actor.character}</h3>
        </div>
    </div>
    `
    )
    .join("");

  castSection.innerHTML = `
    <h3>Cast of ${movie.original_title}</h3>
    <div class="cast-grid">${castHTML}</div>
    `;
}