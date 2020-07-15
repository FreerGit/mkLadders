import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '120',
      },
    },
  }),
);
const AddPlayers = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setAge(event.target.value as string);
      console.log(age)
    };


    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Name" />
            
                <InputLabel id="demo-simple-select-label">Characters</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </form>
            <img src="/mario.png"  alt="my image" />
        </div>
    )
}

export default AddPlayers;