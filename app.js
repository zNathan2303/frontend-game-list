'use strict'

import jogos from './jogos.json' with {type: "json"}

const PLACEHOLDER_GAME_IMG = './img/placeholder_game_error_225x300.jpg'
const URL_API = 'http://localhost:8080'

function criarCards(jogo) {
    const container = document.getElementById('container')

    const card = document.createElement('div')
    const gameInfo = document.createElement('div')
    const title = document.createElement('p')
    const year = document.createElement('p')
    const description = document.createElement('p')
    const imagem = document.createElement('img')

    card.className = 'card'
    gameInfo.className = 'game-info'
    title.className = 'game-title'
    imagem.className = 'game-img'

    title.textContent = jogo.title || 'N/A'
    year.textContent = `Year: ${jogo.year || 'N/A'}`
    description.textContent = `Description: ${jogo.shortDescription || 'N/A'}`
    imagem.src = jogo.imgUrl || PLACEHOLDER_GAME_IMG

    gameInfo.append(title, year, description)

    card.append(gameInfo, imagem)

    card.dataset.gameId = jogo.id

    card.addEventListener('click', () => {
        const id = card.dataset.gameId
        axios.get(URL_API + '/games/' + id)
            .then((response) => {
                mostrarModal(response.data)
                console.log('ID PEGO COM SUCESSO')
            })
            .catch((error) => {
                console.log('ERRO AO PEGAR ID')
            })
        mostrarModal(jogo)
    })

    container.append(card)
}

function mostrarModal(jogo) {
    const modal = document.getElementById('modal-game')
    const title = document.getElementById('modal-game-title')
    const year = document.getElementById('modal-year')
    const genres = document.getElementById('modal-genres')
    const platforms = document.getElementById('modal-platforms')
    const score = document.getElementById('modal-score')
    const description = document.getElementById('modal-description')
    const imagem = document.getElementById('modal-game-img')

    modal.classList.add('modal-habilitado')
    modal.classList.remove('modal-desabilitado')

    title.textContent = jogo.title
    year.textContent = `Year: ${jogo.year || 'N/A'}`
    genres.textContent = `Genres: ${jogo.genre || 'N/A'}`
    platforms.textContent = `Platforms: ${jogo.platforms || 'N/A'}`
    score.textContent = `Platforms: ${jogo.score || 'N/A'}`
    description.textContent = `Description: ${jogo.longDescription || 'N/A'}`
    imagem.src = jogo.imgUrl || PLACEHOLDER_GAME_IMG

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.remove('modal-habilitado')
            modal.classList.add('modal-desabilitado')
        }
    }

}

function mostrarJogos(jogos) {
    jogos.forEach(criarCards)
}

axios.get(URL_API + '/games')
    .then((response) => {
        mostrarJogos(response.data)
        console.log('Os jogos exibidos são do banco de dados!')
    })
    .catch((error) => {
        console.log('Ocorreu um erro ao carregar os jogos: ' + error)
        mostrarJogos(jogos)
        console.log('Os jogos exibidos são do arquivo JSON!')
    })