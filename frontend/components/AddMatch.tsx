import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import { MenuItem, Button, Snackbar, Paper, Chip } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {PlayerInterface } from '../src/declarations'
import AutoComplete from 'react-autocomplete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { stringify } from 'querystring';

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
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        width: '100%'
      },
      draggableDiv: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        width: '100%',
        minHeight: '60px'
      },
      chip: {
        margin: theme.spacing(0.5),
    },
}),
);

interface PlayerContainerProps {
    AllPlayers: PlayerInterface[] | [],
}

interface Competitor {
    placement: number,
    competitor: string,

}

interface PlayersPlacingInMatch {
    users: [Competitor]
}


let makePlacing:[][] = [];

const AddPlayers = ({AllPlayers}: PlayerContainerProps) => {
    const [value, setValue] = React.useState();
    const [placing, setPlacing] = React.useState<[][]>([]);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleDelete = (data) => {
        
    }
    
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const submitMatch = async () => {
        let allPlayersInMatch: PlayersPlacingInMatch = {users: []};
        placing.forEach((place, index: number) => {
                place.forEach((element: string) => {
                        AllPlayers.forEach((player: PlayerInterface) => {
                            if (element === player.name){
                                allPlayersInMatch.users.push({ placement: index + 1 ,competitor: player._id})
                            }
                        })
                    })
            });
        const data = await JSON.stringify(allPlayersInMatch)
        const res = await fetch('http://localhost:8000/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data })
        if(res.status === 400){
            setOpen(true);   
        }
    
    }

    const handlePlayerAdded = (val: string) => {
        makePlacing.push([val]);
        const newPlacing = [...makePlacing]
        setPlacing(newPlacing)
    }

    const players = AllPlayers.map((player) => {
        return player.name;
    })

    const matching = (item: PlayerInterface, value: string) => {
        return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }
    const onDragStart = (event, taskName) => {
    	event.dataTransfer.setData("taskName", taskName);
	}
	const onDragOver = (event) => {
	    event.preventDefault();
	}

	const onDrop = (event, cat) => {
	    let taskName = event.dataTransfer.getData("taskName");
        let onDropIndex;
        makePlacing.forEach((place,index) => {
            if(place.indexOf(taskName) !== -1){
                onDropIndex = index; 
            }
        })
        if(onDropIndex !== undefined && onDropIndex >= 0 ) {
            const index = makePlacing[onDropIndex].indexOf(taskName);
            if (index > -1) {
                makePlacing[onDropIndex].splice(index, 1);
            } 

            makePlacing[cat].push(taskName);
            const newPlacings = [...makePlacing];
            setPlacing(newPlacings)
        }
	}

    return (
        <div className={classes.container}>
            <Button variant="contained" href="/">
                Go Back
            </Button>

            <AutoComplete
                getItemValue={(item: PlayerInterface) => item.name}
                items={AllPlayers}
                value={value}
                shouldItemRender={matching}

                renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.name}
                    </div>
                }
                
                onChange={(e) => setValue(e.target.value)}
                onSelect={(val) => handlePlayerAdded(val)}
            />
                   <div 
                    onDragOver={(event)=>onDragOver(event)}
                    onDrop={(event)=>{onDrop(event, 0)}}
                    key={0}
                    className={classes.draggableDiv}
                    >
            
                    { placing[0] && placing[0].map((data)=> {
                        let icon;
                        return (
                            //
                            <div
                            key={data}
                            draggable
                            onDragStart = {(event) => onDragStart(event, data)}
                            onDragOver={(event)=>onDragOver(event)}
                            onDrop={(event)=>{onDrop(event, 0)}}
                            //label={data}
                            //onDelete={handleDelete}
                            className={classes.chip}
                            >
                            {data}
                            </div>
                            );
                        })}

                    </div>
                    <div 
                    onDragOver={(event)=>onDragOver(event)}
                    onDrop={(event)=>{onDrop(event, 1)}}
                    key={1}
                    className={classes.draggableDiv}
                    >
                    { placing[1] && placing[1].map((data)=> {
                        let icon;
                        return (
                            //
                            <div
                            key={data}
                            draggable
                            onDragStart = {(event) => onDragStart(event, data)}
                            onDragOver={(event)=>onDragOver(event)}
                            onDrop={(event)=>{onDrop(event, 1)}}
                            //label={data}
                            //onDelete={handleDelete}
                            className={classes.chip}
                            >
                            {data}
                            </div>
                            );
                        })}
                    </div>
                    <div 
                    onDragOver={(event)=>onDragOver(event)}
                    onDrop={(event)=>{onDrop(event, 2)}}
                    key={2}
                    className={classes.draggableDiv}
                    >
                    { placing[2] && placing[2].map((data)=> {
                        let icon;
                        return (
                            //
                            <div
                            key={data}
                            draggable
                            onDragStart = {(event) => onDragStart(event, data)}
                            onDragOver={(event)=>onDragOver(event)}
                            onDrop={(event)=>{onDrop(event, 2)}}
                            //label={data}
                            //onDelete={handleDelete}
                            className={classes.chip}
                            >
                            {data}
                            </div>
                            );
                        })} 
                    </div>
                    <div 
                    onDragOver={(event)=>onDragOver(event)}
                    onDrop={(event)=>{onDrop(event, 3)}}
                    key={3}
                    className={classes.draggableDiv}
                    >
                    { placing[3] && placing[3].map((data)=> {
                        let icon;
                        return (
                            //
                            <div
                            key={data}
                            draggable
                            onDragStart = {(event) => onDragStart(event, data)}
                            onDragOver={(event)=>onDragOver(event)}
                            onDrop={(event)=>{onDrop(event, 3)}}
                            //label={data}
                            //onDelete={handleDelete}
                            className={classes.chip}
                            >
                            {data}
                            </div>
                            );
                        })} 
                    </div>
   
            
            <Button onClick={submitMatch}>Submit</Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Error creating match!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AddPlayers;