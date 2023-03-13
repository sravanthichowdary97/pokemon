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
import { fetchPokemons, fetchPokemon, fetchPokemonDescription, fetchPokemonStrengths } from '../../api';
import ProgressBar from "@ramonak/react-progress-bar";
import TuneIcon from '@mui/icons-material/Tune';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const Home = () => {
    const [pokemons, setPokemons] = useState([])
    const [pokemon, setPokemon] = useState(null)
    const [open, setOpen] = useState(false);
    const [pokemonDescription, setPokemonDescription] = useState([])
    const [pokemonStrengths, setPokemonStrengths] = useState([])
    const [searchByname, setsearchByname] = useState("")
    const [type, setType] = useState([]);




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
            const pokemonDescription = await fetchPokemonDescription(pokemon)
            const pokemonStrengths = await fetchPokemonStrengths(pokemon)

            if (response.data && pokemonDescription.data && pokemonStrengths.data) {
                setPokemon(response.data)
                setOpen(true)
                setPokemonDescription(pokemonDescription.data)
                setPokemonStrengths(pokemonStrengths.data)

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
    let color = null;
    function getFruitColor(propName) {

        switch (propName.toLowerCase()) {
            case "normal": return "#DDCBD0";
            case "fighting": return "#FCC1B0";
            case "flying": return "#B2D2E8";
            case "poison": return "#CFB7ED";
            case "ground": return "#F4D1A6";
            case "rock": return "#C5AEA8";
            case "bug": return "#C1E0C8"
            case "ghost": return "#DC2D7";
            case "steel": return "#C2D4CE";
            case "fire": return "#EDC2C4";
            case "water": return "#CBD5ED";
            case "grass": return "#C0D4C8";
            case "electric": return "#E2E2A0";
            case "psychic": return "#DDC0CF";
            case "ice": return "#C7D7DF";
            case "dragon": return "#CADCDF";
            case "dark": return "#C6C5E3";
            case "fairy": return "#E4C0CF";
            case "unknown": return "#C0DFDD";
            case "shadow": return "#CACACA";

        }
    }
    function ColorfulSpan(props) {

        const { name } = props;
        color = getFruitColor(name)

        const divStyle = {
            backgroundColor: `${color}`,
            borderRadius: "5px",
            border: "1px solid black",
            marginLeft: "5px",
            padding: "1px 5px"
        }

        return (
            <span style={divStyle}>{name}</span>
        );
    }
    const Modal = ({ onClose, children }) => {
        return (
            <div className={styles.modal}>
                <div className={styles.modalcontent}>
                    <span className={styles.close} onClick={onClose}>&times;</span>
                    {children}
                </div>
            </div>
        );
    };
    const statsColor = {
        backgroundColor: "rgb(112, 136, 136)",
        width: "100%"
    }
    const [showModal, setShowModal] = useState(false);

    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor.`
    const truncatedText = text.length > 100 ? text.substring(0, 100) + '...' : text;

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const NextPokemon = (currentId) => {
        for (let i = 0; i < pokemons.length; i++) {
            let pokemonURLArray = pokemons[i].url.split("/");
            let nextPokemonId = Number(pokemonURLArray[pokemonURLArray.length - 2]);
            if (nextPokemonId == currentId && pokemons[i + 1]) {
                nextPokemonId = Number(pokemons[i + 1].url.split("/")[pokemons[i + 1].url.split("/").length - 2])
                getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${nextPokemonId}/`)
                break
            }
        }

    }
    const PrevPokemon = (currentId) => {
        for (let i = 0; i < pokemons.length; i++) {
            let pokemonURLArray = pokemons[i].url.split("/");
            let nextPokemonId = Number(pokemonURLArray[pokemonURLArray.length - 2]);
            if (nextPokemonId == currentId && pokemons[i - 1]) {
                nextPokemonId = Number(pokemons[i - 1].url.split("/")[pokemons[i - 1].url.split("/").length - 2])
                getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${nextPokemonId}/`)
                break
            }
        }

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Make API call to fetch new data
        try {
            const response = await fetchPokemons()
            if (response.data && response.data.results) {
             setPokemons(response.data.results.filter(e => {
                    let url = e.url.substring(0, e.url.lastIndexOf('/'))
                    let index = url.lastIndexOf('/') + 1
                    let id = url.substring(index)
                    if (e.name.toLowerCase().includes(searchByname.toLowerCase()) || id.includes(searchByname))
                        return e;
                }
                ))
            }
        } catch (error) {
            console.error(error)
        }

    }
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setType(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
      const names = [
        'Normal',
        'Fighting',
        'Flying',
        'Poison',
        'Ground',
        'Rock',
      ];

    const ITEM_HEIGHT = 10;
    const ITEM_PADDING_TOP = 0;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 35 + ITEM_PADDING_TOP,
        },
    },
    };
    function getStyles(name, personName, theme) {
        return {
          fontWeight:"100px",
          color:"red"
        };
      }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.appName}>Pokédex</div>
                <div className={styles.separator}></div>
                <div className={styles.caption}>Search for any Pokémon that exists on the planet</div>
            </div>
            <div className={styles.filters} >
                <div style={{ width: '40%' }} className={styles.filter}>
                    <div className={styles.label}>Search By</div>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="center" >
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            placeholder='Name or Number'
                            variant="filled"
                            value={searchByname}
                            onChange={(event) => setsearchByname(event.target.value)}
                        />
                    </form>
                </div>
                <div style={{ width: '15%' }} className={styles.filter}>
                    <div className={styles.label}>Type</div>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={type}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        className={styles.selectType}
                        >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}  >
                            <Checkbox checked={type.indexOf(name) > -1 } />
                            <ListItemText primary={name} style={getStyles()}  />
                            </MenuItem>
                        ))}
                         </Select>
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
            <div className={styles.mobilefilters}>
                <div style={{ width: '80%' }} className={styles.filter}>
                    <div className={styles.label}>Search By</div>
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="center" >
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        placeholder='Name or Number'
                        variant="filled" />
                </div>
                <div>
                    <div style={{ width: '15%' }} className={styles.filter}>
                        <div className={styles.hiddenlabel}> {" "}</div>

                        <TuneIcon className={styles.hiddenlabel}></TuneIcon>
                    </div>
                </div>
            </div>
            <Box sx={{ flexGrow: 1, marginTop: 5 }}>
                <Grid container spacing={8}>
                    {
                        pokemons.map(pokemon => (
                            <Grid item xs={6} sm={4} md={3} xl={2} >
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
                        <DialogContent style={{ backgroundColor: '#DEEDED', padding: 45 }}>
                            <Grid container  >
                                <Grid item md={12} xs={12} className={styles.mobilecontainer} >
                                    <Grid container spacing={4} className={styles.headercontainer}>
                                        <div>
                                            <Grid item><div className={styles.pokemonDetailsName}>{pokemon.name}</div>

                                            </Grid>
                                            <Grid item>  <div className={styles.pokemonDetailsId}>{getActualId(pokemon.id)}</div></Grid>
                                        </div>
                                        <div>
                                            <Grid item>
                                                <div className={styles.pokemonDetailsId}>
                                                    <IconButton >
                                                        <HighlightOffIcon onClick={handleClose} />
                                                    </IconButton>
                                                </div></Grid>
                                        </div>
                                    </Grid>


                                </Grid>

                                <Grid xs={6} item className={styles.mobilecontainer}>
                                    <div className={styles.detailCard}>
                                        <div className={styles.image} style={{ backgroundImage: `url(${getImageUrl(null, pokemon.id)})` }}></div>
                                    </div>
                                </Grid>
                                <Grid xs={6} item className={styles.mobilecontainer}>
                                    <div className={styles.detailDes}>


                                        <p className={styles.paragraph}>{truncatedText}</p>
                                        {text.length > 100 && (
                                            <button className={styles.readmorebutton} onClick={openModal}>{"Read More"}</button>
                                        )}

                                        {showModal && (
                                            <Modal onClose={closeModal}>
                                                <p style={{ padding: "10px", color: "white" }}> {text}</p>
                                            </Modal>
                                        )}

                                    </div>
                                </Grid>



                                <Grid item md={4} xs={8} className={styles.hidecontainer}>
                                    <div className={styles.detailCard}>
                                        <div className={styles.image} style={{ backgroundImage: `url(${getImageUrl(null, pokemon.id)})` }}></div>
                                    </div>
                                </Grid>
                                <Grid item md={8} xs={4} className={styles.hidecontainer} >
                                    <Grid container spacing={4}>
                                        <Grid item><div className={styles.pokemonDetailsName}>{pokemon.name}</div>

                                        </Grid>
                                        <Grid item> <div className={styles.separtor}></div></Grid>

                                        <Grid item>  <div className={styles.pokemonDetailsId}>{getActualId(pokemon.id)}</div></Grid>
                                        <Grid item> <div className={styles.separtor}></div></Grid>
                                        <Grid item>
                                            <div className={styles.pokemonDetailsIdButtons}>
                                                <IconButton >
                                                    <KeyboardBackspaceIcon onClick={() => PrevPokemon(pokemon.id)} />
                                                </IconButton>
                                                <IconButton >
                                                    <HighlightOffIcon onClick={handleClose} />
                                                </IconButton>
                                                <IconButton  >
                                                    <EastIcon onClick={() => NextPokemon(pokemon.id)} />
                                                </IconButton>
                                            </div></Grid>
                                    </Grid>

                                    <div className={styles.detailDes}>


                                        <p className={styles.paragraphDesktop}>{truncatedText}</p>
                                        {text.length > 500 && (
                                            <button className={styles.readmorebutton} onClick={openModal}>{"Read More"}</button>
                                        )}

                                        {showModal && (
                                            <Modal onClose={closeModal}>
                                                <p style={{ padding: "10px", color: "white" }}> {text}</p>
                                            </Modal>
                                        )}

                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: 60 }}>
                                <Grid sm={3} xs={6} item>
                                    <div className={styles.detLabel}>Height</div>
                                    <div className={styles.detVal}>{pokemon.height}"</div>
                                </Grid>
                                <Grid sm={3} xs={6} item>
                                    <div className={styles.detLabel}>Weight</div>
                                    <div className={styles.detVal}>{pokemon.weight}Kg</div>
                                </Grid>
                                <Grid sm={3} xs={6} item>
                                    <div className={styles.detLabel}>Gender(s)</div>
                                    <div className={styles.detVal}>-</div>
                                </Grid>
                                <Grid sm={3} xs={6} item>
                                    <div className={styles.detLabel}>Egg Groups</div>
                                    <div className={styles.detVal}>{pokemonDescription.egg_groups.map(e => e.name).toString()}</div>
                                </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: 40 }}>
                                <Grid sm={3} xs={6} item>
                                    <div className={styles.detLabel}>Abilities</div>
                                    <div className={styles.detVal}>{pokemon.abilities.map(e => e.ability.name).toString()}</div>
                                </Grid>
                                <Grid sm={3} xs={6} item>
                                    <div className={styles.detLabel}>Types</div>
                                    <div className={styles.detVal} >
                                        {pokemon.types.map(e => {
                                            return <ColorfulSpan name={e.type.name} />
                                        })}
                                    </div>
                                </Grid>
                                <Grid sm={4} xs={6} item>
                                    <div className={styles.detLabel}>Weak Against</div>
                                    <div className={styles.detVal} >
                                        {pokemonStrengths.damage_relations.double_damage_from.map(e => {
                                            return <ColorfulSpan name={e.name} />
                                        })}
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: 40 }}>
                                <Grid sm={12} style={statsColor} item>
                                    <div className={styles.stats}>Stats</div>

                                    <div className={styles.gridcontainer}>
                                        {pokemon.stats.map(e => {
                                            return (
                                                <div className={styles.box}>
                                                    <div className={styles.boxcontent}>{e.stat.name}</div>
                                                    <ProgressBar
                                                        completed={60}
                                                        maxCompleted={100}
                                                        bgColor={"#2E3156"}
                                                        baseBgColor={"#C0D4C8"}
                                                        labelColor={"white"}
                                                        borderRadius={0}
                                                        className={styles.boxcontent}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>


                                </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: 40, display: "grid", gridTemplateColumns: "50% 50%", justifyItems: "center" }} className={styles.footerGridContainer}>
                                <Grid sm={6} xs={6} item className={styles.footerGridContainer}>
                                    <IconButton  >
                                        <KeyboardBackspaceIcon onClick={() => PrevPokemon(pokemon.id)} />
                                    </IconButton>
                                </Grid>

                                <Grid sm={6} xs={6} item className={styles.footerGridContainer}>
                                    <IconButton  >
                                        <EastIcon onClick={() => NextPokemon(pokemon.id)} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog> : null
            }



        </div>

    )
}
export default Home