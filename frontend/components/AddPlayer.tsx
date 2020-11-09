import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import { Select, MenuItem, Button } from '@material-ui/core';

import gameIcons from '../src/gameIcons';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: '#2E2E2E',
        maxWidth: '600px',
        width: '100%',
        margin: '20px auto',
        display: 'block',
        alignSelf: 'middle',
        color: '#E8E8E8',
        minHeight: '200px',
    },
    root: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: '5%',
        color: '#E8E8E8',
        flexDirection: 'column',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '120',
      },
    iconContainer: {
        maxHeight: '250px',
        overflow: 'auto',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: 'auto',
    },
    submit: {
        backgroundColor: '#424242',
        color: '#E8E8E8',
    },
    goBack: {
        backgroundColor: '#424242',
        color: '#E8E8E8',
    },
    input: {
        color: '#E8E8E8',
    }
  }),
);
const AddPlayers = () => {
    const classes = useStyles();
    const [name, setName] = React.useState('');
    const [icon, setIcon] = React.useState<number>(0);
    const [open, setOpen] = React.useState(false);

    const handleNameChange = (event: React.ChangeEvent<{ value: String }>) => {
        setName(event.target.value as string);
    };

    const handleIconChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        setIcon(event.target.value as number);
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
        const res = await fetch('http://localhost:8000/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data })
        if(res.status === 400){
            setOpen(true);   
        }
        else{
            window.location.replace('/');
        }
    }

    const handleClose = (event: any, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={classes.container}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Name" 
                value={name}
                onChange={handleNameChange}
                InputLabelProps={{className: classes.input}}
                inputProps={{className: classes.input}}
                />
            
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={icon}
                onChange={handleIconChange}
                style={{color: '#E8E8E8'}}
                >   
                  {gameIcons.map((icon, index) => {
                      return (
    
                          <MenuItem style={{backgroundColor: 
                          '#424242', color: '#E8E8E8'}}value={index} key={index}>
                            <img src={icon} height="30px" alt="my image" />
                            {gameIconNames[index]}
                        </MenuItem>
                          )
                    })}
                </Select>
            </form>
            <div className={classes.buttons}>
            <Button className={classes.submit} onClick={submitPlayer}>Submit</Button>
            <Button className={classes.goBack} href="/">Go Back</Button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="error">
                    Your name is either too long or it's taken!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AddPlayers;