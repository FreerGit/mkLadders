import { Request, Response } from 'express';
import { json } from 'body-parser';
import Match from '../models/matchModel';
import { Player, playerDetailInterface } from '../models/playerModel';
import RatingCalculator from './RatingCalculator';
import { AddPlayer } from './playerController';

interface player {
    placement: number,
    competitor: String
}

interface playerList {
    users: [player]
}

const calculateRating = (players: playerDetailInterface[]) => {
	const match = new RatingCalculator();

	players.map((player, index) => {
		match.addPlayer(player._id, player.driver, player.name, index + 1, player.rating);
	});
	match.calculateELOs();
	return match;
};

const findUsersInMatch = async (requestedPlayerList: playerList) => {
	async function test() {
		const sortedPlayers = requestedPlayerList.users.map((player: player) => Player.findById(player.competitor).exec());
		return sortedPlayers;
	}
	const placements = await Promise.all(await test()).then((values) => values);

	// console.log(placements);
	// console.log(omega);

	// const foundPlayers = await Player.find().where('_id').in(competitorInfo).exec();

	return placements;
};

const createMatch = async (players: playerDetailInterface[], playerList: playerList) => {
	const matchParticipants: playerDetailInterface[] = players.map(
		(playerSchema: playerDetailInterface) => playerSchema,
	);
	const updatedRatings = calculateRating(matchParticipants);
	const newMatch = new Match(updatedRatings);
	newMatch.save();
};

export const AddMatch = async (req: Request, res: Response) => {
	const requestedPlayerList: playerList = req.body;
	const numOfParticipants = requestedPlayerList.users.length;
	if (numOfParticipants < 2 || numOfParticipants > 4) {
		res.status(400);
		res.send('A match must have more than 2 players and 4 or less!');
		return;
	}
	const users: playerDetailInterface[] = await findUsersInMatch(requestedPlayerList);

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
