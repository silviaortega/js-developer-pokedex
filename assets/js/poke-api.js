const pokeApi = {};

const typeColors = {
    normal: '#aeb40b',
    grass: '#3c9f0e',
    fire: '#f69b5b',
    water: '#0f48ce',
    electric: '#f3e6b1',
    ice: '#169a9e',
    ground: '#97730e',
    flying: '#6237d7',
    poison: '#610c61',
    fighting: '#750903',
    psychic: '#e10e4d',
    dark: '#291a10',
    rock: '#e6dcb1',
    bug: '#6c7801',
    ghost: '#4a19a5',
    steel: '#665dcd',
    dragon: '#350d99',
    fairy: '#e81c60',
};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
    pokemon.typeColor = typeColors[type]; 
    
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails);
};
