const poke_container = document.getElementById("poke-container");
const pokemon_count = 150;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

async function createPokemonCard(pokemonName) {
  const pokemons = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const pokemonData = await pokemons.json();

  const pokemonId = pokemonData.id;
  const pokemonType = pokemonData.types[0].type.name;
  const backgroundColor = colors[pokemonType];

  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon");
  pokemonCard.style.backgroundColor = backgroundColor;

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  const pokemonImage = document.createElement("img");
  pokemonImage.src = pokemonData.sprites.front_default;
  pokemonImage.alt = pokemonName;

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info");

  const pokemonNumber = document.createElement("span");
  pokemonNumber.classList.add("number");
  pokemonNumber.textContent = String(pokemonId).padStart(3, "0");

  const pokemonNameElement = document.createElement("h3");
  pokemonNameElement.classList.add("name");
  pokemonNameElement.textContent = pokemonName;

  const pokemonTypeElement = document.createElement("small");
  pokemonTypeElement.classList.add("type");
  pokemonTypeElement.textContent = "Type: ";

  const pokemonTypeSpan = document.createElement("span");
  pokemonTypeSpan.textContent = pokemonType;

  pokemonTypeElement.appendChild(pokemonTypeSpan);
  infoContainer.appendChild(pokemonNumber);
  infoContainer.appendChild(pokemonNameElement);
  infoContainer.appendChild(pokemonTypeElement);
  imgContainer.appendChild(pokemonImage);
  pokemonCard.appendChild(imgContainer);
  pokemonCard.appendChild(infoContainer);
  poke_container.appendChild(pokemonCard);
}

(async () => {
  const pokemons = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${pokemon_count}`
  );
  const data = await pokemons.json();
  const pokemonNames = data.results.map((pokemon) => pokemon.name);

  for (let i = 0; i < pokemon_count; i++) {
    const randomIndex = Math.floor(Math.random() * pokemonNames.length);
    const randomPokemonName = pokemonNames[randomIndex];
    createPokemonCard(randomPokemonName);
  }
})();
