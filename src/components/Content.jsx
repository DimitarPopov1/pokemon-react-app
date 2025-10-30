import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgPokemon } from "react-icons/cg";

const Content = ({ filters }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // track which card is expanded
  const [nextUrl, setNextUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=2000"
  );
  const [loading, setLoading] = useState(true);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await axios.get(nextUrl);
      setNextUrl(null); // no more pages

      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: res.data.sprites.other["official-artwork"].front_default,
            id: res.data.id,
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
               species: res.data.species.name,               // new
      types: res.data.types.map((t) => t.type.name) // new
          };
        })
      );

      setPokemonList(pokemonData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filteredPokemon = pokemonList.filter(
    (p) =>
      p.hp >= filters.hp.min &&
      p.hp <= filters.hp.max &&
      p.attack >= filters.attack.min &&
      p.attack <= filters.attack.max &&
      p.defense >= filters.defense.min &&
      p.defense <= filters.defense.max
  );

  return (
   <main>
  <div className="card-container">
    {loading ? (
      <div className="loader">
        <CgPokemon className="spinner-icon" size={200} />
        <p>Loading Pokémon...</p>
      </div>
    ) : (
      filteredPokemon.map((pokemon) => (
        <div
    key={pokemon.id}
    className={`pokemon-card ${expandedId === pokemon.id ? "expanded" : ""}`}
    onClick={() => setExpandedId(expandedId === pokemon.id ? null : pokemon.id)}
  >
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="pokemon-image"
          />
          <h3 className="pokemon-name">{pokemon.name}</h3>
          <h3>HP: {pokemon.hp}</h3>
          <h3>Attack: {pokemon.attack}</h3>
          <h3>Defense: {pokemon.defense}</h3>
           {expandedId === pokemon.id && (
      <div className="pokemon-details">
        <h4>Species: {pokemon.species}</h4>
        <h4>Types: {pokemon.types.join(", ")}</h4>
      </div>
    )}
        </div>
      ))
    )}
  </div>
</main>
  );
};

export default Content;
