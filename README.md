# Game List Frontend
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
![](./img/preview.png)
Captura de tela dos jogos de plataforma

## Navegação
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Ferramentas de Desenvolvimento](#ferramentas-de-desenvolvimento)
- [Executando o Projeto](#executando-o-projeto)
- [Autor](#autor)
- [Licença](#licença)

## Sobre o Projeto
Aplicação que mostra uma lista de jogos, com visualização individual em modal, botão de filtro por gênero e reordenação dos jogos com drag and drop, desenvolvido usando HTML, CSS, JavaScript e a biblioteca Axios. Projetada para consumir a API construída durante o **Intensivão de Java com Spring Boot** da **DevSuperior**.

## Tecnologias Utilizadas
- **JavaScript:** Lógica e interatividade.
- **Axios:** Biblioteca JS para requisições HTTP à API.
- **HTML:** Estrutura da página.
- **CSS:** Estilização e layout.
- **JSON:** Arquivo local com dados de jogos para a versão simplificada offline.

## Ferramentas de Desenvolvimento
- **VS Code**: Editor de código.
- **Extensão Live Server**: Servidor local para desenvolvimento.

## Executando o Projeto
O projeto na versão simplificada está [aqui](https://znathan2303.github.io/frontend-game-list/) (Versão estática usando dados locais em JSON, sem integração com a API.).

Para visualizar o projeto completo, siga essas etapas:
### Pré-requisitos
- **VS Code** com a extensão **Live Server**.
- Acesso à [API Game List Backend](https://github.com/zNathan2303/dslist) em execução (requer Java 21 e uma IDE compatível, como Spring Tool Suite ou IntelliJ IDEA).
1. Clone o repositório:
```bash
git clone https://github.com/zNathan2303/frontend-game-list
```
2. Clone o repositório em que está a API:
```bash
git clone https://github.com/zNathan2303/dslist
```
3. Inicie a API executando a classe DslistApplication na IDE.
4. Abra o projeto frontend no VS Code e inicie o Live Server.
5. Teste as funcionalidades:
   - Clique nos cards para visualizar detalhes em modal.
   - Use os botões de listagem por gênero.
   - Reordene os jogos com drag-and-drop.

## Autor
[Nathan da Silva Costa](<https://www.linkedin.com/in/nathandasilvacosta/>)

## Licença
Este projeto está licenciado sob a [MIT License](https://opensource.org/license/MIT).