import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const playerDetailSchema: Schema = new Schema({
	id: String,
	driver: Number,
	name: { type: String, unique: true , maxlength: 30},
	rating: Number,
});

export interface playerDetailInterface extends mongoose.Document{
    _id: String,
    driver: number,
    name: String,
    rating: number
}

export const Player = mongoose.model<playerDetailInterface>('Player', playerDetailSchema);
playerDetailSchema.plugin(uniqueValidator, { message: 'ERROR, {PATH} is taken!' });
