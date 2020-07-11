import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const playerDetailSchema: Schema = new Schema({
	driver: Number,
	username: { type: String, unique: true },
	rating: Number,
});

const playerInMatchSchema: Schema = new Schema({
	drvier: Number,
	xd: String,
	rating: Number,
});

const matchSchema: Schema = new Schema({
	players: {
		type: [playerInMatchSchema],
		max: 4,
	},
});

const playerSchema: Schema = new Schema({
	previousMatches: [matchSchema],
	user: playerDetailSchema,

});

const Player = mongoose.model('Player', playerSchema);
playerSchema.plugin(uniqueValidator, { message: 'ERROR, {PATH} is taken!' });

export default Player;
