document.addEventListener('DOMContentLoaded', () => fetchData())

function fetchData(){
    return fetch("http://localhost:3000/games")
    .then((resp) => resp.json())
    .then((json) => renderGames(json));
}

function renderGames(games){
    games.forEach((game) => {
        const container = document.querySelector(".game-container");
        const gameDiv = document.createElement("div");
        gameDiv.className = "game";
        gameDiv.id = game.id;
        gameDiv.innerHTML = `<h2>${game.name}</h2>
        <img src="${game.image}" alt="${game.name}">
        <p>Price: $${game.price}</p>
        <p>Release: ${game.release}</p>
        <p>Genre: ${game.genre}</p>
        <p>Mode: ${game.mode}</p>`
        container.append(gameDiv);
        const btn = document.createElement("button");
        btn.id = "btn";
        btn.textContent = "Add to Cart";
        btn.addEventListener("click", btn);
        gameDiv.append(btn);
    });
}

