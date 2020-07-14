import mongoose, { Schema } from 'mongoose';

const playerInMatchSchema: Schema = new Schema({
	id: String,
	driver: Number,
	name: String,
	placement: Number,
	ratingBefore: Number,
	ratingAfter: Number,
	ratingChange: Number,
});
const matchSchema: Schema = new Schema({
	race: {
		type: [playerInMatchSchema],
		validate: {
			validator: (arr: Array<playerInMatchInterface>) => arr.length < 5 && arr.length > 1,
		},
		message: 'Match has to few or too many players!',
	},
});

export interface matchInterface {
    race: [playerInMatchInterface]
}
export interface playerInMatchInterface extends mongoose.Document{
	id: String,
	driver: number,
	name: String,
	placement: number,
	ratingBefore: number,
	ratingAfter: number,
	ratingChange: number,
}

const Match = mongoose.model<playerInMatchInterface>('Match', matchSchema);
export default Match;
