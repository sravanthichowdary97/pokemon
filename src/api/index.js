import axios from "axios"
const BASE_URL ='https://pokeapi.co/api/v2/'

export const fetchPokemons=()=>{
  return  axios.get(BASE_URL+'pokemon')
}
export const fetchPokemon=(index)=>{
  return  axios.get(BASE_URL+`pokemon/${index}`)
}
export const fetchPokemonDescription = (index) =>{
  return  axios.get(BASE_URL+`pokemon-species/${index}`)
}
export const fetchPokemonStrengths = (index) =>{
  return  axios.get(BASE_URL+`type/${index}`)
}