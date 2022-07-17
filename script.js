const BASE_URL = "https://api.themoviedb.org/3/discover/movie?with_genres=53&api_key=7a90f646e8bc9debee71e38dca588197";

const filmWrapper = document.querySelector('.film-wrapper');
const cardEl = document.querySelector('.card');
const descriptionWrapper = document.querySelector('.film-description');
const infoEl = document.querySelector('.modal');
const favFilm  = document.querySelector('.favorite-film');
const loginBtn = document.querySelector('.login-btn');
const userSection = document.querySelector('.user-profile');
const favTxtEl = document.querySelector('.fav-txt');

let film = [];

loginBtn.addEventListener('click', function() {
    const user = prompt('Username');
    userSection.innerHTML = `<span class="username">${user}</span>`
    favTxtEl.innerHTML = `<h1 class="film-text">Film Preferiti</h1>`
})

fetch(BASE_URL)
.then(res => res.json())
.then(data => {
    film = data.results
    // console.log(film);
    
    film.forEach((el) => {
        const card = document.createElement('div');
        card.classList.add('film-card');
        filmWrapper.appendChild(card);
        card.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${el.poster_path}">`
        
        card.addEventListener('click', function() {
            infoEl.classList.add('active');
            infoEl.innerHTML =
            `<div class="info-section">
            <div class="info">
            <img src="https://image.tmdb.org/t/p/w500/${el.poster_path}">
            <h1>${el.title}</h1>
            <h2>Rating: ${el.vote_average} ⭐</h2>
            </div>
            <div class="overview">
            <iframe width="800" height="500" src="https://www.youtube.com/embed/a8Gx8wiNbs8" title="Avatar: The Way of Water | Official Teaser Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>${el.overview}</p>
            <div class="info-btn">
            <button class="add-fav">Add to favourites</button>
            <button class="close-btn">X</button>
            </div>
            </div>`;

            const btnEl = document.querySelector('.close-btn');
            const addBtnEl = document.querySelector('.add-fav');

            btnEl.addEventListener('click',function(){
                infoEl.classList.remove('active');
            });

            addBtnEl.addEventListener('click', function(){
                favFilm.append(card);
            });

        });

    });
    
}).catch(err => console.error(err));