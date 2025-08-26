'use strict'

const PLACEHOLDER_GAME_IMG = './img/placeholder_game_error_225x300.jpg'

function criarCard(jogo) {
    const container = document.getElementById('container')

    const card = document.createElement('div')
    const gameInfo = document.createElement('div')
    const title = document.createElement('p')
    const year = document.createElement('p')
    const description = document.createElement('p')
    const img = document.createElement('img')

    card.className = 'card'
    gameInfo.className = 'game-info'
    title.className = 'game-title'
    img.className = 'game-img'

    title.textContent = jogo.title || 'N/A'
    year.textContent = `Year: ${jogo.year || 'N/A'}`
    description.textContent = `Description: ${jogo.shortDescription || 'N/A'}`
    img.src = jogo.imgUrl || PLACEHOLDER_GAME_IMG

    gameInfo.append(title, year, description)

    card.append(gameInfo, img)

    container.append(card)
}

function mostrarJogos(jogos) {
    jogos.forEach(criarCard)
}

axios.get('http://localhost:8080/games')
    .then((response) => {
        mostrarJogos(response.data)
    })
    .catch((error) => {
        console.log('Ocorreu um erro ao carregar os jogos: ' + error)
    })