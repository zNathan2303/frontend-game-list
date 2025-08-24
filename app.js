'use strict'

import jogos from './jogos.json' with {type: "json"}

function criarCard(jogo) {
    const container = document.getElementById('container')

    const card = document.createElement('div')
    const gameInfo = document.createElement('div')
    const title = document.createElement('p')
    const year = document.createElement('p')
    const genre = document.createElement('p')
    const platforms = document.createElement('p')
    const score = document.createElement('p')
    const description = document.createElement('p')
    const img = document.createElement('img')

    card.className = 'card'
    gameInfo.className = 'game-info'
    title.className = 'game-title'
    img.className = 'game-img'

    title.textContent = jogo.title
    year.textContent = 'Year: ' + jogo.year
    genre.textContent = 'Genres: ' + jogo.genre
    platforms.textContent = 'Platforms: ' + jogo.platforms
    score.textContent = 'Score: ' + jogo.score
    description.textContent = 'Description: ' + jogo.shortDescription
    img.src = jogo.imgUrl

    gameInfo.append(title, year, genre, platforms, score, description)

    card.append(gameInfo, img)

    container.append(card)
}

jogos.forEach(criarCard)