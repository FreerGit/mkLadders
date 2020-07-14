// import { Request, Response } from 'express';
import { Request, Response } from 'express';
import { Player } from '../models/playerModel';

export const AllPlayers = async (req: Request, res: Response) => {
	await Player.find({}).exec((err: any, players: any) => {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(players);
		}
	});
};

export const AddPlayer = async (req: Request, res: Response) => {
	const player = new Player(req.body);
	await player.save((err: any) => {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			console.log('Adding player...');
			res.send('OK');
		}
	});
};

export const RemoveAllPlayers = async (req: Request, res: Response) => {
	await Player.deleteMany({}).exec((err: any, dropped: any) => {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			console.log('Dropping database...');
			Player.collection.dropIndexes();
			res.send(dropped);
		}
	});
};
