import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Navbar from './Navbar';

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'black',
        overflow: 'auto',
	},

}));

const Layout = () => {
	const classes = useStyles();
	return (
        <div className={classes.root}>
            <Head >
                <title>Mario Kart Ladder</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head >
            <header color='primary'>
                <Navbar />
			</header>

		</div>
	);
};

export default Layout;
