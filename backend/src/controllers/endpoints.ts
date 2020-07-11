// import { Request, Response } from 'express';
import { Request, Response } from 'express';
import { json } from 'body-parser';
import Player from '../playerModel';

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

interface playerList {
    users: [String]
}

export const AddMatch = async (req: Request, res: Response) => {
	const requestedPlayerList: playerList = req.body;
	const allPlayersInMatch = (playerUsernames: Array<String>) => {
		playerUsernames.map((name: String) => console.log(name));
	};
	await allPlayersInMatch(requestedPlayerList.users);
	// console.log(test);
};
// Player.find({ username: name })
