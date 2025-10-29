import React, { useState, useEffect } from "react";
import "../assets/content.css";
import axios from "axios";
import { CgPokemon } from "react-icons/cg";

const Content = ({ filters }) => {
  const [pokemonList, setPokemonList] = useState([]);
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
        <div key={pokemon.id} className="pokemon-card">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="pokemon-image"
          />
          <h3 className="pokemon-name">{pokemon.name}</h3>
          <h3>HP: {pokemon.hp}</h3>
          <h3>Attack: {pokemon.attack}</h3>
          <h3>Defense: {pokemon.defense}</h3>
        </div>
      ))
    )}
  </div>
</main>
  );
};

export default Content;
