'use strict'

import jogos from './jogos.json' with {type: "json"}

const URL_API = 'http://localhost:8080'

const container = document.getElementById('container')

function criarCards(jogo) {
    const PLACEHOLDER_GAME_IMG = './img/placeholder_game_error_225x300.jpg'

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
    card.setAttribute('draggable', 'true')

    card.addEventListener('click', () => {
        const id = card.dataset.gameId
        axios.get(URL_API + '/games/' + id)
            .then((response) => {
                mostrarModal(response.data)
                console.log('Dados do jogo pegos com sucesso!')
            })
            .catch((error) => {
                console.log('ERROR: Erro ao pegar dados do jogo com o ID: ' + error)
            })
        mostrarModal(jogo)
    })

    container.append(card)
}

function mostrarModal(jogo) {
    document.documentElement.style.setProperty('--modal-scroll-state', 'hidden')

    const modal = document.getElementById('modal-game')
    const title = document.getElementById('modal-game-title')
    const year = document.getElementById('modal-year')
    const genres = document.getElementById('modal-genres')
    const platforms = document.getElementById('modal-platforms')
    const score = document.getElementById('modal-score')
    const description = document.getElementById('modal-description')
    const imagem = document.getElementById('modal-game-img')

    // Ativa o modal na tela
    document.documentElement.style.setProperty('--modal-visible', 'grid')

    title.textContent = jogo.title
    year.textContent = `Year: ${jogo.year || 'N/A'}`
    genres.textContent = `Genres: ${jogo.genre || 'N/A'}`
    platforms.textContent = `Platforms: ${jogo.platforms || 'N/A'}`
    score.textContent = `Score: ${jogo.score || 'N/A'}`
    description.textContent = `Description: ${jogo.longDescription || 'N/A'}`
    imagem.src = jogo.imgUrl || PLACEHOLDER_GAME_IMG

    window.onclick = function (event) {
        if (event.target == modal) {
            document.documentElement.style.setProperty('--modal-scroll-state', 'visible')
            document.documentElement.style.setProperty('--modal-visible', 'none')
        }
    }
}

function mostrarJogos(jogos) {
    jogos.forEach(criarCards)
}

function criarBotoes(lista) {
    const buttons = document.getElementById('list-buttons')
    const button = document.createElement('div')

    button.className = 'btn'
    button.textContent = lista.name
    button.dataset.listId = lista.id

    button.addEventListener('click', () => {
        axios.get(`${URL_API}/lists/${button.dataset.listId}/games`)
            .then((response) => {
                if (button.classList.contains('btn-ativo')) {
                    document.querySelectorAll('.card').forEach(card => card.remove())
                    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('btn-ativo'))
                    axios.get(URL_API + '/games')
                        .then((response) => {
                            mostrarJogos(response.data)
                            mudarTitulo('lightgreen', 'banco de dados')
                        })
                        .catch((error) => {
                            console.log('Ocorreu um erro ao carregar os jogos: ' + error)
                            mostrarJogos(jogos)
                            mudarTitulo('lightblue', 'arquivo JSON')
                        })
                } else {
                    document.querySelectorAll('.card').forEach(card => card.remove())
                    mostrarJogos(response.data)
                    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('btn-ativo'))
                    button.classList.add('btn-ativo')
                }
            })
            .catch((error) => {
                console.log('ERROR: Ocorreu um erro ao carregar a lista de jogos da categoria específica: ' + error)
            })
    })

    buttons.append(button)
}

function mostrarBotoes() {
    axios.get(URL_API + '/lists')
        .then((response) => {
            response.data.forEach(criarBotoes)
        })
        .catch((error) => {
            console.log('ERROR: Não foi possível obter as categorias dos jogos: ' + error)
        })
}

function mudarTitulo(cor, fonte) {
    const title = document.getElementById('title')
    title.textContent = `Os jogos exibidos são do ${fonte}!`
    document.documentElement.style.setProperty('--title-color', cor)
}

axios.get(URL_API + '/games')
    .then((response) => {
        mostrarJogos(response.data)
        mudarTitulo('lightgreen', 'banco de dados')
        mostrarBotoes()
    })
    .catch((error) => {
        console.log('Ocorreu um erro ao carregar os jogos: ' + error)
        mostrarJogos(jogos)
        mudarTitulo('lightblue', 'arquivo JSON')
    })

monitorPageDragAndDrop()

function monitorPageDragAndDrop() {
    let sourceIndex
    let destinationIndex

    document.addEventListener('dragstart', element => {
        element.target.classList.add('dragging')
        sourceIndex = getElementIndex(document.querySelector('.dragging'))
    })
    document.addEventListener('dragend', element => {
        destinationIndex = getElementIndex(document.querySelector('.dragging'))
        element.target.classList.remove('dragging')
        if (document.querySelector('.btn-ativo')) {
            alterarOrdemDosJogos(document.querySelector('.btn-ativo').dataset.listId, sourceIndex, destinationIndex)
        }
    })
}

container.addEventListener('dragover', element => {
    const dragging = document.querySelector('.dragging')
    const applyAfter = getNewPosition(element.clientY)

    if (applyAfter) {
        applyAfter.insertAdjacentElement('afterend', dragging)
    } else {
        container.prepend(dragging)
    }
})

function getNewPosition(posY) {
    const cards = container.querySelectorAll('.card:not(.dragging)')
    let result

    for (let card of cards) {
        const box = card.getBoundingClientRect()
        const boxCenterY = box.y + box.height / 2

        if (posY >= boxCenterY) result = card
    }

    return result
}

function alterarOrdemDosJogos(listId, sourceIndex, destinationIndex) {
    const data = {
        sourceIndex: sourceIndex,
        destinationIndex: destinationIndex
    }
    axios.put(`${URL_API}/lists/${listId}/replacement`, data)
        .then((response) => {
            console.log('A ordem dos jogos foi alterada com sucesso!')
        })
        .catch((error) => {
            console.log('ERROR: Ocorreu um erro ao alterar a ordem dos jogos: ' + error)
        })
}

function getElementIndex(elemento) {
    const pai = elemento.parentNode;
    const filhos = Array.from(pai.children);
    return filhos.indexOf(elemento);
}