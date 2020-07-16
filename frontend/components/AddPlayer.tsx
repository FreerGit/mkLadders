import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import gameIcons from '../src/gameIcons';
import { render } from 'react-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: 'red',
        maxWidth: '600px',
        width: '100%',
        margin: '20px auto',
        display: 'block',
        alignSelf: 'center',
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
    },
    alignItems: 'middle',
    alignSelf: 'middle',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '120',
      },
    iconContainer: {
        maxHeight: '250px',
        overflow: 'auto',
    },
  }),
);
const AddPlayers = () => {
    const classes = useStyles();
    const [name, setName] = React.useState('');
    const [icon, setIcon] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const handleNameChange = (event: React.ChangeEvent<{ value: String }>) => {
        setName(event.target.value as string);
    };

    const handleIconChange = (event: React.ChangeEvent<{ value: number }>) => {
        setIcon(event.target.value as number);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    const gameIconNames = gameIcons.map((name) => {
        const remove = name.replace("-", " ");
        const removePathChars = remove.replace(/\.[^\/.]+$/, "");
        const removeSlah = removePathChars.replace(/\//, "");
        const character = removeSlah.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
        return character;
    })

    const submitPlayer = async () => {
        const player = {
            driver: icon,
            name: name,
            rating: 500
        }
        const data = await JSON.stringify(player)
        console.log(data)
        const res = await fetch('http://localhost:8000/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data })
        if(res.status === 400){
            setOpen(true);   
        }
    }

    return (
        <div className={classes.container}>
            <Button variant="contained" href="/">
                Go Back
            </Button>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Name" 
                value={name}
                onChange={handleNameChange}
                />
            
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={icon}
                onChange={handleIconChange}

                >   
                  {gameIcons.map((icon, index) => {
                     // name.toLocaleUpperCase();
                      return (
    
                          <MenuItem value={index} key={index}>
                            <img src={icon} height="30px" alt="my image" />
                            {gameIconNames[index]}
                        </MenuItem>
                          )
                    })}
                </Select>
            </form>
            <Button onClick={submitPlayer}>Submit</Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Someone already has that name, be original!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AddPlayers;