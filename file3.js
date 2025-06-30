document.addEventListener("DOMContentLoaded", () => {
  const movieData = localStorage.getItem("selectedMovie");

  if (movieData) {
    const movie = JSON.parse(movieData);
    renderMovieDetails(movie);
  } else {
    document.getElementById("movieDetails").innerHTML = `
      <p>No movie data found. Please go back and select a movie.</p>
    `;
  }
});

function renderMovieDetails(movie) {
  const container = document.getElementById("movieDetails");

  container.innerHTML = `
    <div class="movie-main">
      <div class="movie-poster">
        <img src="${movie.poster_path || 'fallback.jpg'}" alt="${movie.original_title}" />
      </div>

      <div class="movie-info">
        <h1>${movie.original_title}</h1>
        <div class="movie-stats">
          <span><strong>Release Date:</strong> ${movie.release_date}</span>
          <span><strong>Popularity:</strong> ${movie.popularity}</span>
          <span><strong>Average Rating:</strong> ${movie.vote_average}</span>
          <span><strong>Vote Count:</strong> ${movie.vote_count}</span>
        </div>
        <div class="movie-overview">
          <h2>Overview</h2>
          <p>${movie.overview}</p>
        </div>
      </div>
    </div>

    <section class="cast-section">
      <h2>Cast of ${movie.original_title}</h2>
      <div class="cast-grid" id="castGrid"></div>
    </section>
  `;

  renderCast(movie.casts);
  document.body.style.setProperty('--bg-image', `url(${movie.backdrop_path})`);
}

function renderCast(casts = []) {
  const castGrid = document.getElementById("castGrid");

  if (!casts || casts.length === 0) {
    castGrid.innerHTML = `<p>Cast information not available.</p>`;
    return;
  }

  const castHTML = casts.map((actor) => `
    <div class="cast-member">
      <div class="cast-image">
        <img src="${actor.profile_path || 'fallback-avatar.jpg'}" alt="${actor.name}" />
      </div>
      <div class="cast-info">
        <h3>${actor.name}</h3>
        <p>as ${actor.character}</p>
      </div>
    </div>
  `).join("");

  castGrid.innerHTML = castHTML;
}
