// Function to fetch Pokemon data
function retrievePokemonData() {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const pokemonList = document.getElementById('pokemon-list');

      data.results.forEach(pokemon => {
        const pokemonUrl = pokemon.url;
        fetchPokemonDetails(pokemonUrl, pokemonList);
      });
    })
    .catch(error => console.error('Error:', error));
}

// Function to fetch Pokemon details
function fetchPokemonDetails(url, listElement) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemonName = data.name;
      const pokemonImage = data.sprites.front_default;
      const pokemonElement = document.createElement('div');
      pokemonElement.innerHTML = `
        <h2>${pokemonName}</h2>
        <img src="${pokemonImage}" alt="${pokemonName}">
      `;
      listElement.appendChild(pokemonElement);
    })
    .catch(error => console.error('Error:', error));
}

// Call the function to retrieve Pokemon data
retrievePokemonData();
