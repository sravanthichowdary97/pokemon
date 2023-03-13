import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import styles from './style.module.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useEffect, useState } from 'react';
import { fetchPokemons, fetchPokemon } from '../../api';


const Home = () => {
    const [pokemons, setPokemons] = useState([])
    const [pokemon, setPokemon] = useState(null)
    const [open, setOpen] = useState(false);



    const handleClose = () => {
        setOpen(false);
    };

    const getPokemonDetails = async (pokemonUrl) => {
        try {
            let url = pokemonUrl.substring(0, pokemonUrl.lastIndexOf('/'))
            let index = url.lastIndexOf('/') + 1
            let pokemon = pokemonUrl.substring(index)
            pokemon = pokemon.substring(0, pokemon.length - 1)
            const response = await fetchPokemon(pokemon)
            console.log(response, "rers")
            if (response.data) {
                setPokemon(response.data)
                setOpen(true)
            }
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getPokemons()
    }, [])

    const getPokemons = async () => {
        try {
            const response = await fetchPokemons()
            if (response.data && response.data.results) {
                setPokemons(response.data.results)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getImageUrl = (pokemonUrl = null, index = null) => {

        if (!index) {
            let url = pokemonUrl.substring(0, pokemonUrl.lastIndexOf('/'))
            let index = url.lastIndexOf('/') + 1
            let image = pokemonUrl.substring(index)
            image = image.substring(0, image.length - 1)
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${image}.png`
        } else {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`
        }


    }

    const getId = (pokemonUrl) => {
        let url = pokemonUrl.substring(0, pokemonUrl.lastIndexOf('/'))
        let index = url.lastIndexOf('/') + 1
        let id = url.substring(index)
        if (id.length === 1) {
            return `00${id}`
        } else if (id.length === 2) {
            return `0${id}`
        } else {
            return id
        }

    }

    const getActualId = (id) => {
        id = id.toString()
        if (id.length === 1) {
            return `00${id}`
        } else if (id.length === 2) {
            return `0${id}`
        } else {
            return id
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.appName}>Pokédex</div>
                <div className={styles.separator}></div>
                <div className={styles.caption}>Search for any Pokémon that exists on the planet</div>
            </div>
            <div className={styles.filters}>
                <div style={{ width: '40%' }} className={styles.filter}>
                    <div className={styles.label}>Search By</div>
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="center">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        placeholder='Name or Number'
                        variant="filled" />
                </div>
                <div style={{ width: '15%' }} className={styles.filter}>
                    <div className={styles.label}>Type</div>
                    <TextField
                        placeholder='Type'
                        variant="filled" />
                </div>
                <div style={{ width: '15%' }} className={styles.filter}>
                    <div className={styles.label}>Gender</div>
                    <TextField
                        placeholder='Gender'
                        variant="filled" />
                </div>
                <div style={{ width: '15%' }} className={styles.filter}>
                    <div className={styles.label}>Stats</div>
                    <TextField
                        placeholder='Stats'
                        variant="filled" />
                </div>
            </div>
            <Box sx={{ flexGrow: 1, marginTop: 5 }}>
                <Grid container spacing={8}>
                    {
                        pokemons.map(pokemon => (
                            <Grid item xs={12} sm={4} md={3} xl={2}>
                                <div onClick={() => getPokemonDetails(pokemon.url)} className={styles.card}>
                                    <div className={styles.pokemonImage} style={{ backgroundImage: `url(${getImageUrl(pokemon.url)})` }}></div>
                                    <div className={styles.pokemonName}>{pokemon.name}</div>
                                    <div className={styles.pokemonId}>{getId(pokemon.url)}</div>
                                </div>
                            </Grid>
                        ))
                    }

                </Grid>
            </Box>
            {
                pokemon ?
                    <Dialog
                        open={open && pokemon}
                        onClose={handleClose}
                        scroll='body'
                        fullWidth='true'
                        maxWidth='md'
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"

                    >
                        <DialogContent style={{ backgroundColor: '#DEEDED',padding:45 }}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <div className={styles.detailCard}>
                                        <div className={styles.image} style={{ backgroundImage: `url(${getImageUrl(null, pokemon.id)})` }}></div>
                                    </div>
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid container spacing={4}>
                                        <Grid item><div className={styles.pokemonDetailsName}>{pokemon.name}</div>

                                        </Grid>
                                        <Grid item> <div className={styles.separtor}></div></Grid>

                                        <Grid item>  <div className={styles.pokemonDetailsId}>{getActualId(pokemon.id)}</div></Grid>
                                        <Grid item> <div className={styles.separtor}></div></Grid>
                                        <Grid item>
                                            <div className={styles.pokemonDetailsId}>
                                                <IconButton >
                                                    <KeyboardBackspaceIcon />
                                                </IconButton>
                                                <IconButton >
                                                    <HighlightOffIcon />
                                                </IconButton>
                                                <IconButton >
                                                    <EastIcon />
                                                </IconButton>
                                            </div></Grid>
                                    </Grid>

                                    <div className={styles.detailDes}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor.
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container style={{marginTop:60}}>
                                <Grid sm={3} item>
                                    <div className={styles.detLabel}>Height</div>
                                    <div className={styles.detVal}>{pokemon.height}"</div>
                                </Grid>
                                <Grid sm={3} item>
                                    <div className={styles.detLabel}>Weight</div>
                                    <div className={styles.detVal}>{pokemon.weight}Kg</div>
                                </Grid>
                                <Grid sm={3}  item>
                                    <div className={styles.detLabel}>Gender(s)</div>
                                    <div className={styles.detVal}>Male, Female</div>
                                </Grid>
                                <Grid sm={3}  item>
                                    <div className={styles.detLabel}>Egg Groups</div>
                                    <div className={styles.detVal}>Monster, Dragon</div>
                                </Grid>
                            </Grid>
                            <Grid container style={{marginTop:40}}>
                                <Grid sm={3} item>
                                    <div className={styles.detLabel}>Abilities</div>
                                    <div className={styles.detVal}>{pokemon.abilities.map(e=>e.ability.name).toString()}</div>
                                </Grid>
                                <Grid sm={3} item>
                                    <div className={styles.detLabel}>Types</div>
                                    <div className={styles.detVal}>{pokemon.types.map(e=>e.type.name).toString()}</div>
                                </Grid>
                                <Grid sm={4}  item>
                                    <div className={styles.detLabel}>Weak Against</div>
                                    <div className={styles.detVal}>Fighting, Ground, Steel</div>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog> : null
            }



        </div>

    )
}
export default Home