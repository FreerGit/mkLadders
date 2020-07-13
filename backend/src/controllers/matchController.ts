import { Request, Response } from 'express';
import { json } from 'body-parser';
import { Match, matchInterface } from '../models/matchModel';
import { Player, playerInterface, playerDetailInterface } from '../models/playerModel';
import RatingCalculator from './RatingCalculator';
import { AddPlayer } from './playerController';

interface playerList {
    users: [String]
}

const calculateRating = (players: playerDetailInterface[]) => {
	const match = new RatingCalculator();
	// console.log(players);

	players.map((player, index) => {
		match.addPlayer(player._id, player.username, index + 1, player.rating);
	});
	match.calculateELOs();
    const calculatedRace = match.race;
    const 
	// console.log(calculatedRace);
	calculatedRace.map((player) => {
		 console.log(player);
	});

	// console.log(match.getELO('test1'));
	// console.log(match.getELO('test2'));
	// console.log(match.getELO('test3'));
	// console.log(match.getELO('test4'));
};

const findUsersInMatch = async (requestedPlayerList: playerList) => {
	const foundPlayers = await Player.find().where('_id').in(requestedPlayerList.users).exec();
	return foundPlayers;
};

const createMatch = async (players: playerInterface[], playerList: playerList) => {
	const matchParticipants: playerDetailInterface[] = players.map(
		(playerSchema: playerInterface) => playerSchema.user,
	);
	const match = { players: matchParticipants };

	const officialMatch = new Match(match);
	await officialMatch.save(() => {
		calculateRating(matchParticipants);
	});
};

export const AddMatch = async (req: Request, res: Response) => {
	const requestedPlayerList: playerList = req.body;
	if (requestedPlayerList.users.length < 2 || requestedPlayerList.users.length > 4) {
		res.status(400);
		res.send('A match must have more than 2 players and 4 or less!');
		return;
	}
	const users: playerInterface[] = await findUsersInMatch(requestedPlayerList);
	await createMatch(users, requestedPlayerList);
	res.status(200);
	res.send('OK');
};

export const AllMatches = async (req: Request, res: Response) => {
	await Match.find({}).exec((err: any, matches: any) => {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(matches);
		}
	});
};

export const RemoveAllMatches = async (req: Request, res: Response) => {
	await Match.deleteMany({}).exec((err: any, dropped: any) => {
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
