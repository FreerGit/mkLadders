import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    begin: {
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'middle',
        maxWidth: '600px',
        width: '100%',
    },
    addm: {
        display: 'flex',
        margin: '0 auto',
        color: 'main'
    },
    img: {
        height: '40px',
    },
  }),
);

const ButtonAppBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.begin} color="primary">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button variant="contained" color="secondary" 
            className={classes.addm} href="/addmatch">
                Add Match!
            </Button>

          <img src="/marioIcon.png" className={classes.img} alt="my image" />

          <Button variant="contained" color="secondary" 
            className={classes.addm} href="/addplayer" >
                Add Player!
            </Button>
        </Toolbar>
      </AppBar>
      </div>
    )
}

export default ButtonAppBar;