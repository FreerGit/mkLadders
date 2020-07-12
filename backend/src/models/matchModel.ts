import mongoose, { Schema } from 'mongoose';
import { playerDetailSchema } from './playerModel';

const playerInMatchSchema: Schema = new Schema({
	drvier: Number,
	username: String,
	rating: Number,
});
const matchSchema: Schema = new Schema({
	players: {
		type: [playerInMatchSchema],
		validate: {
			validator: (arr: Array<playerDetailSchema>) => arr.length < 5 && arr.length > 1,
		},
		message: 'Match has to few or too many players!',
	},
});
export interface matchInterface extends mongoose.Document{
	players: [playerDetailSchema],
}
export const Match = mongoose.model<matchInterface>('Match', matchSchema);
