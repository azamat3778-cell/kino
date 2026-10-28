
// let movies = [];

// let container = document.querySelector(".container");





// fetch("https://api.tvmaze.com/show")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     movies = data;
//     showMovies(movies);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// function showMovies(list) {
//   container.innerHTML = "Loading...";

//   setTimeout(() => {
//     container.innerHTML = "";
//     list.slice(55, 75).forEach((movie) => {
//       container.innerHTML += `
//         <div class="card">
//             <img class="movie-img" src="${movie.image.medium}" alt="" />
//             <h2 class="movie-name">${movie.name}</h2>
//             <p class="movie-summary">${movie.summary.slice(0, 150)}</p>
//             <p class="movie-lang">${movie.language}</p>
//             <p class="movie-genres">${movie.genres}</p>
//             <p class="movie-time">${movie.premiered.slice(0, 4)}</p>
//             <p class="movie-country">${movie.network.country.name}</p>
//             <a href="${movie.url}" target="_blank">watch</a>
//         </div>
//       `;
//     });
//   }, 3000);
// }

const container = document.querySelector(".container");

fetch("https://api.tvmaze.com/shows")
    .then((response) => response.json())
    .then((data) => {
        showMovies(data);
    })
    .catch((error) => {
        console.log(error);
        container.innerHTML = "<p>Kinolarni yuklashda xatolik!</p>";
    });

function showMovies(list) {
    container.innerHTML = `
        <div class="loading-box">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;

    setTimeout(() => {
        container.innerHTML = "";

        list.slice(55, 75).forEach((movie) => {
            const image = movie.image?.medium ||
                "https://placehold.co/210x295";

            const summary = movie.summary
                ? movie.summary.replace(/<[^>]*>/g, "").slice(0, 150)
                : "Tavsif mavjud emas";

            container.innerHTML += `
                <div class="card">
                    <img class="movie-img"
                         src="${image}"
                         alt="${movie.name}">

                    <h2 class="movie-name">${movie.name}</h2>

                    <p class="movie-summary">${summary}</p>

                    <p class="movie-lang">
                        Til: ${movie.language || "Noma'lum"}
                    </p>

                    <p class="movie-genres">
                        Janr: ${movie.genres?.join(", ") || "Noma'lum"}
                    </p>

                    <p class="movie-time">
                        Yil: ${movie.premiered?.slice(0, 4) || "Noma'lum"}
                    </p>

                    <p class="movie-country">
                        Davlat: ${movie.network?.country?.name || "Noma'lum"}
                    </p>

                    <a href="${movie.url}" target="_blank"
                       rel="noopener noreferrer">Watch ▶</a>
                </div>
            `;
        });

        if (container.innerHTML === "") {
            container.innerHTML = "<p>Kinolar topilmadi!</p>";
        }
    }, 3000);
}


