import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import * as playerController from './controllers/endpoints';

export default class WebServer {
	app: express.Application;

	server: http.Server | undefined;

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(bodyParser.json());
		this.SetupEndpoints();
	}

	SetupEndpoints() {
		this.app.get('/players', playerController.AllPlayers);
		this.app.post('/players', playerController.AddPlayer);
		this.app.get('/drop', playerController.RemoveAllPlayers);
		this.app.post('/addmatch', playerController.AddMatch);
	}

	listen() {
		this.server = this.app.listen(8000, () => {
			console.log('listening to port 8000 backend');
		});
	}
}

export function RetryConnection(url: string) {
	console.log('starting conneciton....');
	mongoose.connect(url, {
		reconnectInterval: 2000, // wait for 2 seconds before retry
		reconnectTries: Number.MAX_VALUE, // retry forever
		useNewUrlParser: true,
	}).then(() => {
		console.log(`connected to ${url}`);
	});
}
