let api = 'https://api.themoviedb.org/3/movie/'
let data = [];


async function loadFilmes(){
    try{
        const apiKey = '1728816a402a07893f04b1af16b895cd';
        const language = 'pt-BR';
        const page = 1;

        const response = await fetch(`${api}/now_playing?api_key=${apiKey}&language=${language}&page=${page}`);
            if(response.status === 200){
                data = (await response.json()).results;
                    console.log(data)
                    filmes(data)
            }else if(response.status === 404){
                alert('erro')
            }
    }
    catch{
        console.log('error')
    }
}

loadFilmes()

let filmeInput = document.querySelector('#pesquisaFilme')
filmeInput.addEventListener('input', (e)=>{
    let container = document.querySelector('.container')
    let filmeInputValue = e.target.value.toLowerCase();
    console.log(filmeInputValue)

    if(data){
       let filmeFiltrado = data.filter((filme)=> filme.title.toLowerCase().includes(filmeInputValue))
       console.log(filmeFiltrado)
        
        // Limpa o conteúdo anterior do container
    container.innerHTML = '';

    // Renderiza os filmes filtrados
    filmes(filmeFiltrado);
    }

    
  
})
 
async function filmes(data){
    let container = document.querySelector('.container')
        container.innerHTML = '';
  

        data.map((filme) => {
            let filmediv = document.createElement('div');
        filmediv.classList.add('filme'); // Define a classe diretamente aqui
        let titulodiv = document.createElement('div');
        titulodiv.classList.add('titulo'); // Define a classe diretamente aqui
        let imagediv = document.createElement('img');
        imagediv.classList.add('image'); // Define a classe diretamente aqui
        let vote = document.createElement('div');
        vote.classList.add('vote'); // Def
        let estrela = document.createElement('img')
        estrela.classList.add('estrela')    
        estrela.src = './img/estrela.png'    
        // Cria um elemento <a> para o link do trailer
    let trailerLink = document.createElement('a');
    trailerLink.href = `https://www.youtube.com/results?search_query=${filme.title} Trailer`;
    trailerLink.target = '_blank'; // Abre o link em uma nova aba

    // Cria o botão dentro do elemento <a>
    let btn = document.createElement('button');
    btn.innerText = 'Trailer';
    btn.classList.add('btn');

    // Adiciona o botão dentro do elemento <a>
    vote.appendChild(estrela)
    trailerLink.appendChild(btn);       
    titulodiv.innerText = filme.title;
    imagediv.src = `https://image.tmdb.org/t/p/original/${filme.poster_path}`;
    vote.innerText = `${filme.vote_average}/10`;

    // Adiciona os elementos ao div "filme"
    filmediv.append(titulodiv, imagediv, vote, trailerLink);

    container.append(filmediv);
        })
}