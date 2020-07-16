import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {PlayerInterface} from '../src/declarations'
import gameIcons from '../src/gameIcons';

interface PlayerContainerProps {
    AllPlayers: PlayerInterface[] | [],
}

const useStyles = makeStyles((theme: Theme) =>
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


const PlayerContainer = ({AllPlayers}: PlayerContainerProps) => {
  const classes = useStyles();
  //const [players, setPlayers] = React.useState<Array<PlayerInterface>>(AllPlayers || []);
  //console.log(players)
  console.log(AllPlayers + 'in compo')

  const sortedOnRating = AllPlayers.sort((a,b) => {
      return b.rating - a.rating;
  })
  console.log(sortedOnRating)
 
  return (
        <div className={classes.root}>
            {AllPlayers.map((player: PlayerInterface, index: number) => (
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