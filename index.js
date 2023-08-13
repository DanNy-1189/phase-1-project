document.addEventListener('DOMContentLoaded', () => fetchGames())


function fetchGames(){
    fetch("http://localhost:3000/games")
    .then((resp) => resp.json())
    .then((games) => {
        renderGames(games);
        Storage.saveGames(games);
    });
}
