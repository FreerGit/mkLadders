interface player {
    _id: String,
    driver: number,
    name: String,
    placement: number,
	ratingBefore: number,
	ratingChange: number,
	ratingAfter: number,
}

export default class RatingCalculator {
	race: player[]

	constructor() {
		this.race = [];
	}

	addPlayer(id:String, driverIcon: number, name: String, placement: number, rating: number) {
		const player = {
			_id: id,
			driver: driverIcon,
			name,
			placement,
			ratingBefore: rating,
			ratingChange: 0,
			ratingAfter: 0,
		};
		this.race.push(player);
	}

	calculateELOs() {
		const n = this.race.length; // N of players in race
		// Calculate the constant depending on N players (See the official elo formula)
		const k = 145 / (n - 1);

		// Calculate permutation of games. First player wins "1v1" againts all players
		// placing below first place. Second place loses "1v1" to above player and subsequently
		// winning to below players and so on....
		for (let player = 0; player < n; player++) {
			const curPlace = this.race[player].placement; // Take players placing
			const curRating = this.race[player].ratingBefore; // Take players elo before the match

			for (let foe = 0; foe < n; foe++) {
				if (player !== foe) {
					const oppPlace = this.race[foe].placement;
					const oppRating = this.race[foe].ratingBefore;
					let s;

					// How did player place relative to foe?
					if (curPlace < oppPlace) {
						// console.log(`Won: ${this.race[player].name} Lost: ${this.race[foe].name}`);
						s = 1;
					} else if (curPlace === oppPlace) {
						// console.log(`tie: ${this.race[player].name} tie: ${this.race[foe].name}`);
						s = 0.5;
					} else {
						// console.log(`Lost: ${this.race[player].name} Won: ${this.race[foe].name}`);
						s = 0;
					}
					// Again, see official elo formula
					// https://www.geeksforgeeks.org/elo-rating-algorithm/
					const ea = 1 / (1 + (10 ** ((oppRating - curRating) / 400)));
					this.race[player].ratingChange += Math.round(k * (s - ea));
				}
			}
			// Obviously save the change in elo from the race
			this.race[player].ratingAfter = this.race[player].ratingBefore
                                            + this.race[player].ratingChange;
		}
	}
}
