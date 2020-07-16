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



let makePlacing:[][] = [];

const AddPlayers = ({AllPlayers}: PlayerContainerProps) => {
    const [value, setValue] = React.useState();
    const [placing, setPlacing] = React.useState<[][]>([]);
    const [prevAdded, setPrevAdded] = React.useState(0)
    const classes = useStyles();
    console.log(makePlacing)
    console.log(makePlacing)
    console.log(makePlacing)
    console.log(makePlacing)
    console.log(makePlacing)

    const handleDelete = (data) => {
        
    }
    const handlePlayerAdded = (val: string) => {
        makePlacing.push([val]);
        setPrevAdded(prevAdded+1)
        setPlacing(makePlacing)
        console.log(placing)
    }

    const players = AllPlayers.map((player) => {
        return player.name;
    })

    const matching = (item: PlayerInterface, value: string) => {
        return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }
    const onDragStart = (event, taskName) => {
    	console.log('dragstart on div: ', taskName);
    	event.dataTransfer.setData("taskName", taskName);
	}
	const onDragOver = (event) => {
	    event.preventDefault();
	}

	const onDrop = (event, cat) => {
	    let taskName = event.dataTransfer.getData("taskName");
        console.log(taskName + 'on drop')

        let onDropIndex;
        makePlacing.forEach((place,index) => {
            if(place.indexOf(taskName) !== -1){
                onDropIndex = index; 
                console.log(index)
            }
        })
        console.log(onDropIndex)
        if(onDropIndex) {
            const index = makePlacing[onDropIndex].indexOf(taskName);
            if (index > -1) {
                makePlacing[onDropIndex].splice(index, 1);
            }

            makePlacing[cat].push(taskName);
            console.log(makePlacing)
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
   
            {/*<Button onClick={submitPlayer}>Submit</Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Someone already has that name, be original!
                </Alert>
            </Snackbar>*/}
        </div>
    )
}

export default AddPlayers;