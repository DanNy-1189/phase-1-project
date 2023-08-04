document.addEventListener('DOMContentLoaded', () => fetchGames())

function fetchGames(){
    return fetch("http://localhost:3000/games")
    .then((resp) => resp.json())
    .then((data) => renderGames(data));
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

        searchGame(game.id);
        
        gameDiv.append(gameName, img, price, release, genre, mode, btn);
    });
}

let cart = [];
function addToCart(gameId){
    const cartTotal = document.querySelector(".cartTotal");
    return () => { 
        cart.push({id: gameId, amount: 1});
        cartTotal.textContent = cart.length;
        console.log(cart);
    }
}

function searchGame(gameName) {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = document.querySelector("input").value.toLowerCase();
        const games = document.querySelectorAll(".game");
        games.forEach((game) => {
            const gameName = game.querySelector("h2").textContent.toLowerCase();
            if (gameName.includes(input)) {
                game.style.display = "";
            } else {
                game.style.display = "none";
            }
        })
    });
};

