document.addEventListener('DOMContentLoaded', () => fetchData())

function fetchData(){
    return fetch("http://localhost:3000/games")
    .then((resp) => resp.json())
    .then((json) => renderGames(json));
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
        gameDiv.append(gameName);

        const img = document.createElement("img");
        img.src = game.image;
        img.alt = game.name;
        gameDiv.append(img);
       
        const price = document.createElement("p");
        price.textContent = `Price: $${game.price}`;
        gameDiv.append(price);

        const release = document.createElement("p");
        release.textContent = `Release: ${game.release}`;
        gameDiv.append(release);

        const genre = document.createElement("p");
        genre.textContent = `Genre: ${game.genre}`;
        gameDiv.append(genre);

        const mode = document.createElement("p");
        mode.textContent = `Mode: ${game.mode}`;
        gameDiv.append(mode);

        const btn = document.createElement("button");
        btn.id = "buybtn";
        btn.textContent = "Add to Cart";
        btn.addEventListener("click", btn);
        gameDiv.append(btn);
    });
}







