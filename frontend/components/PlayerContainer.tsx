import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {PlayerInterface} from '../src/declarations'
import gameIcons from '../src/gameIcons';
import theme from '../src/theme';


interface PlayerContainerProps {
    AllPlayers: PlayerInterface[] | [],
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
        paddingLeft: '5%',
        paddingRight: '5%',
        // backgroundColor: '#2c3e50',
        maxWidth: '600px',
        width: '100%',
        margin: '20px auto',
        display: 'block',
        alignSelf: 'center',
      },
    card: {
        margin: '0 auto',
        display: 'flex',
        // color: '#E8E8E8',
        //justifyContent: 'space-between',
        alignItems: 'middle',
        "&:last-child": {
            paddingBottom: 0
          }
    },
    icon: {
        paddingLeft: '0%',
    },
    place: { 
        paddingLeft: '10%',
    },
    name: {
        flex: 'auto',
        textAlign: 'end',
    },
    rating: {
        flex: 'auto',
        textAlign: 'right',
        paddingRight: '5%',
    },
    first: {
        backgroundColor: '#FFD700',
    }
  }),
);

const medalsForPlacing = (placing: number): any => {
  if(placing == 0){
    return '#FFD700';
  }
  else{
    return '#2E2E2E'
  }
}

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
            {/* @ts-ignore */}
          {Players.map((player: PlayerInterface, index: number) => (
            <Card key={player._id} style={{backgroundColor: medalsForPlacing(index),
                                           color: index > 0 ? '#E8E8E8' : 'black'}}>
              <CardContent className={classes.card} >
                <Typography className={classes.icon} variant="body2" component="p">
                {<img src={gameIcons[player.driver]} alt="s" height="30px"/>}
                </Typography>
                <Typography className={classes.place} variant="body2" component="p">
                {index + 1}
                </Typography>
                <Typography  className={classes.name} variant="body2" component="p">
                  {player.name }
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