import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {PlayerInterface} from '../src/declarations'
import gameIcons from '../src/gameIcons';

interface PlayerContainerProps {
    AllPlayers: PlayerInterface[] | [],
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: 'red',
        maxWidth: '600px',
        width: '100%',
        margin: '20px auto',
        display: 'block',
        alignSelf: 'center',
        
      },
    card: {
        margin: '0 auto',
        display: 'flex',
        //justifyContent: 'space-between',
        alignItems: 'middle',
        "&:last-child": {
            paddingBottom: 0
          }
        //color: 'black',
    },
    icon: {
        paddingLeft: '0%',
    },
    place: { 
        paddingLeft: '10%',
    },
    name: {
        paddingLeft: '10%',
    },
    rating: {
        paddingLeft: '40%',
    },

  }),
);


const PlayerContainer = (props:any, {AllPlayers}: PlayerContainerProps) => {
    const classes = useStyles();
    let Players: PlayerInterface[];
    if(props.AllPlayers){
        Players = props.AllPlayers;
    }else{
        Players = AllPlayers;
    }

  return (
        <div className={classes.root}>
            {/* 
// @ts-ignore */}
            {Players.map((player: PlayerInterface, index: number) => (
                    <Card key={player._id}>
                    <CardContent className={classes.card} >
                      <Typography className={classes.icon} variant="body2" component="p">
                      {<img src={gameIcons[player.driver]} alt="s" height="30px"/>}
                      </Typography>
                      <Typography className={classes.place} variant="body2" component="p">
                      {index + 1}
                      </Typography>
                      <Typography  className={classes.name} variant="body2" component="p">
                        {player.name}
                      </Typography>
                      <Typography className={classes.rating} variant="body2" component="p">
                      {player.rating}
                      </Typography>
                    </CardContent>
                  </Card>  
            ))}
        </div>
    )
}



export default PlayerContainer;