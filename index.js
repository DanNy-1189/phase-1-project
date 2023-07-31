document.addEventListener('DOMContentLoaded', () => fetchGames())

function fetchGames(){
    return fetch("http://localhost:3000/games")
    .then((resp) => resp.json())
    .then((games) => renderGames(games));
}

function renderGames(games){
    games.forEach((game) => {
        const container = document.querySelector("#game-container");
        const gameDiv = document.createElement("div");
        container.append(gameDiv);
        gameDiv.className = "game";
        gameDiv.id = game.id;

        const gameName = document.createElement("h2");
        gameName.textContent = game.name;

        const img = document.createElement("img");
        img.src = game.image;
        img.alt = game.name;
       
        const price = document.createElement("p");
        price.textContent = `Price: $${game.price}`;

        const release = document.createElement("p");
        release.textContent = `Release: ${game.release}`;

        const genre = document.createElement("p");
        genre.textContent = `Genre: ${game.genre}`;

        const mode = document.createElement("p");
        mode.textContent = `Mode: ${game.mode}`

        const btn = document.createElement("button");
        btn.id = "buybtn";
        btn.textContent = "Add to Cart";
        btn.addEventListener("click", addToCart(game.id));
        
        gameDiv.append(gameName, img, price, release, genre, mode, btn);
    });
}

