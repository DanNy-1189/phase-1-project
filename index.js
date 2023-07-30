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
        btn.id = "buybtn";
        btn.textContent = "Add to Cart";
        btn.addEventListener("click", (btn) => alert('Added to cart!'));
        gameDiv.append(btn);
    });
}

function searchGames() {
    const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let input = document.getElementById("input").value;
        if (input.trim() > 0){
            input = input.trim();
            renderList(games.filter(game => { 
            return game.name.includes(input)
            }));  
        }
    })
}


                

