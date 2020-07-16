import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import helmet from 'helmet';
import * as playerController from './controllers/playerController';
import * as matchController from './controllers/matchController';

export default class WebServer {
	app: express.Application;

	server: http.Server | undefined;

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(bodyParser.json());
		this.app.use(helmet());
		this.SetupEndpoints();
	}

	SetupEndpoints() {
		this.app.get('/players', playerController.AllPlayers);
		this.app.post('/players', playerController.AddPlayer);
		this.app.get('/dropplayers', playerController.RemoveAllPlayers);

		this.app.get('/matches', matchController.AllMatches);
		this.app.post('/matches', matchController.AddMatch);
		this.app.get('/dropmatches', matchController.RemoveAllMatches);
	}

	listen() {
		this.server = this.app.listen(8000, () => {
			console.log('listening to port 8000 backend');
		});
	}
}

export function RetryConnection(url: string) {
	console.log('starting conneciton....');
	try {
		mongoose.connect(url, {
			useNewUrlParser: true,
			useCreateIndex: true,
			autoIndex: true,
			reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
			reconnectInterval: 500, // Reconnect every 500ms
			bufferMaxEntries: 0,
			connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
			socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
		}).then(() => {
			console.log(`connected to ${url}`);
		});
	} catch (error) {
		console.log(error);
	}
}
