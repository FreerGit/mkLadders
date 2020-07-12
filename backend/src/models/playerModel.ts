import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const playerDetailSchema: Schema = new Schema({
	driver: Number,
	username: { type: String, unique: true },
	rating: Number,
});

const playerSchema: Schema = new Schema({
	user: playerDetailSchema,

});
export interface playerDetailInterface {
    driver: number,
    username: String,
    rating: number
}

export interface playerInterface extends mongoose.Document {
    // previousMatches: [matchInterface],
    user: playerDetailInterface,
}

export const Player = mongoose.model<playerInterface>('Player', playerSchema);
playerSchema.plugin(uniqueValidator, { message: 'ERROR, {PATH} is taken!' });
