import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {PlayerInterface } from '../src/declarations'
import AutoComplete from 'react-autocomplete';
import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert/Alert';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon/Icon';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            maxWidth: '600px',
            width: '100%',
            margin: '20px auto',
            display: 'block',
            alignSelf: 'center',
            backgroundColor: '#2E2E2E',
            minHeight: '400px',
            position: 'relative',
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
        chip: {
            margin: theme.spacing(0.5),
        },
        button: {
            backgroundColor: '#424242',
            color: '#E8E8E8',
        },
        playerContainer: {
            display: 'flex',
            marginTop: 'auto',
            alignItems: 'center',
            flexDirection: 'column',
            maxWidth: '400px',
            margin: '0 auto',
        },
        player: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 'auto',
            width: '100%',
        },
        buttons: {
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: 'auto',
            position: 'absolute',
            minWidth: '100%',
            bottom: '50px',

        },
        autocomplete: {
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: 'auto',
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

interface PlayersPlacements { 
    users: Competitor[]
}

const AddPlayers = ({AllPlayers}: PlayerContainerProps) => {
    const [value, setValue] = useState<string>();
    const [placing, setPlacing] = useState<Array<PlayerInterface>>([]);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const submitMatch = async () => {
        let allPlayersInMatch: PlayersPlacements = {users: []};
        placing.forEach((player, index: number) => {
            allPlayersInMatch.users.push({ placement: index + 1 ,competitor: player._id.toString()})
        })        
        const data = await JSON.stringify(allPlayersInMatch)
        const res = await fetch('http://localhost:8000/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data })
        if(res.status === 400){
            setOpen(true);   
        }
        if(res.status === 200){
            window.location.replace('/');
        }
    
    }

    const handlePlayerAdded = (player: PlayerInterface) => {
        const newPlacing = [...placing];
        newPlacing.push(player);
        setPlacing(newPlacing);
    }

    const matching = (item: PlayerInterface, value: string) => {
        const matches = item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        const notChosen = !placing.find((element) => element === item)
        return matches && notChosen
    }

    const updatePlacement = (player: PlayerInterface, up: boolean) => {
        const newPlacing = [...placing];
        const currPlacement = newPlacing.findIndex((element) => element == player);
        if(up && currPlacement != 0){
            newPlacing.splice(currPlacement - 1, 0, newPlacing.splice(currPlacement, 1)[0]);
        }
        else if(!up && newPlacing[-1] != player){
            newPlacing.splice(currPlacement + 1, 0, newPlacing.splice(currPlacement, 1)[0]);
        }
        setPlacing(newPlacing)
    }

    const removeFromPlacement = (player: PlayerInterface) => {
        const newPlacing = [...placing];
        setPlacing(newPlacing.filter((element) => element !== player));
    }

    return (
        <div className={classes.container}>
            <div className={classes.autocomplete}>
                <AutoComplete
                    menuStyle={{ maxHeight: 250, overflow: 'hidden scroll', position: 'fixed'}}
                    getItemValue={(item: any) => item.name}
                    items={AllPlayers}
                    value={value}
                    shouldItemRender={matching}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? '#E8E8E8' : '#424242' }}>
                            {item.name}
                        </ div>
                    }
                    onChange={(e) => setValue(e.target.value)}
                    onSelect={(_, item) => handlePlayerAdded(item)}
                />
            </div>

            <div className={classes.playerContainer}>
            {placing.map(player => {
                return (
                    <div className={classes.player}>
                        <div >
                            {player.name}
                        </div>
                        <div>
                            <Icon onClick={() => updatePlacement(player, true)} component={ExpandLessIcon}></Icon>
                            <Icon onClick={() => updatePlacement(player, false)} component={ExpandMoreIcon}></Icon>
                            <Icon onClick={() => removeFromPlacement(player)} component={DeleteIcon}></Icon>
                        </div>
                    </div>
                )
            })}
            </div>
            <div className={classes.buttons}>
                <Button className={classes.button} href="/">Go Back</Button>
                <Button className={classes.button} onClick={submitMatch}>Submit</Button>
            </div>

            <Snackbar open={open} autoHideDuration={6000}>
                <Alert severity="error">
                    Error creating match!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AddPlayers;