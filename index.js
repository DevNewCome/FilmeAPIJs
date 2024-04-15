const api = 'https://api.themoviedb.org/3/movie/';
const apiKey = '1728816a402a07893f04b1af16b895cd';
const language = 'pt-BR';
const page = 1;
const container = document.querySelector('.container');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const filmeInput = document.querySelector('#pesquisaFilme');

let movies = [];




async function fetchData(endpoint) {
    try {
        const response = await fetch(`${api}${endpoint}?api_key=${apiKey}&language=${language}&page=${page}`);
        if (response.ok) {
            const data = await response.json();
            movies = data.results;
            return data;
        } else {
            throw new Error('Erro na solicitação');
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadFilmes() {
    try {
        const data = await fetchData('now_playing');
        filmes(data.results);
    } catch (error) {
        console.error(error);
    }
}

async function loadPopularFilmes() {
    try {
        const data = await fetchData('popular');
        filmesPopulares(data.results);
    } catch (error) {
        console.error(error);
    }
}

function filmesPopulares(data) {
    swiperWrapper.innerHTML = '';
    data.forEach((filme) => {
        let slider = document.createElement('div')
        slider.classList.add('swiper-slide')
        slider.style.width = '300px'; // Defina uma largura fixa para os slides
        const filmediv = createFilmDiv(filme);
        swiperWrapper.appendChild(slider);
        slider.appendChild(filmediv)
    });
    swiper.update(); // Atualize o Swiper após adicionar os slides
}


function filmes(data) {
    container.innerHTML = '';
    data.forEach((filme) => {
        const filmediv = createFilmDiv(filme);
        container.appendChild(filmediv);
    });
}

function createFilmDiv(filme) {
    const filmediv = document.createElement('div');
    filmediv.classList.add('filme');

    const titulodiv = document.createElement('div');
    titulodiv.classList.add('titulo');
    titulodiv.innerText = filme.title;

    const imagediv = document.createElement('img');
    imagediv.classList.add('image');
    imagediv.src = `https://image.tmdb.org/t/p/original/${filme.poster_path}`;

    const vote = document.createElement('div');
    vote.classList.add('vote');
    vote.innerHTML = `Score: ${filme.vote_average.toFixed(1)}/10 `;

    const trailerLink = document.createElement('a');
    trailerLink.href = `https://www.youtube.com/results?search_query=${filme.title} Trailer`;
    trailerLink.target = '_blank';

    const btn = document.createElement('button');
    btn.innerText = 'Trailer';
    btn.classList.add('btn');

    trailerLink.appendChild(btn);
    vote.appendChild(trailerLink);

    filmediv.append(titulodiv, imagediv, vote);

    return filmediv;
}

loadFilmes();
loadPopularFilmes();

filmeInput.addEventListener('input', (e) => {
    const filmeInputValue = e.target.value.toLowerCase();
    if (movies) {
        const filmeFiltrado = movies.filter((filme) => filme.title.toLowerCase().includes(filmeInputValue));
        filmes(filmeFiltrado);
    }
});
