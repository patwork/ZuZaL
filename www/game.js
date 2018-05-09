// game.js
/* global Key, Map, Player, KEY_LEFT, KEY_RIGHT */
/* exported Game */

class Game {

	// ----------------------------------------------
	constructor(context, width, height) {
		this.context = context;
		this.width = width;
		this.height = height;
		this.key = new Key();
		this.map = new Map(context, width, height);
		this.players = [];
	}

	// ----------------------------------------------
	setup() {

		let scale = this.height / 60.0;
		let x = this.width / 2;

		this.players.push(
			new Player(this.context, KEY_LEFT, 'blue', scale, x, this.map.getStartingPosition(2, 0))
		);
		this.players.push(
			new Player(this.context, KEY_RIGHT, 'red', scale, x, this.map.getStartingPosition(2, 1))
		);

	}

	// ----------------------------------------------
	update() {

		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].isAlive && this.key.isPressed(this.players[i].key)) {
				this.players[i].turn();
			}
		}

		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].isAlive && this.map.getCollisions(this.players[i])) {
				this.players[i].kickTheCalendar();
			}
		}

		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].isAlive) {
				for (let j = 0; j < this.players.length; j++) {
					if (i != j && this.players[i].collideWithOther(this.players[j])) {
						this.players[i].kickTheCalendar();
						this.players[j].kickTheCalendar();
					}
				}
			}
		}

		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].isAlive) {
				this.players[i].update();
			}
		}

	}

	// ----------------------------------------------
	render() {

		this.map.render();

		for (let i = 0; i < this.players.length; i++) {
			this.players[i].render();
		}

	}

}
