// player.js
/* global Vector */
/* exported Player */

class Player {

	// ----------------------------------------------
	constructor(context, key, color, scale, x, y) {
		this.context = context;
		this.key = key;
		this.color = color;
		this.scale = scale;
		this.position = new Vector(x, y);
		this.rotation = 0;
		this.speedForward = 2.0;
		this.speedRotation = Math.PI / 80.0;
		this.isAlive = true;
	}

	// ----------------------------------------------
	update() {
		let velocity = new Vector(
			Math.cos(this.rotation) * this.speedForward,
			Math.sin(this.rotation) * this.speedForward
		);
		this.position.add(velocity);
	}

	// ----------------------------------------------
	render() {

		let ctx = this.context;

		ctx.fillStyle = this.isAlive ? this.color : 'black';
		ctx.strokeStyle = this.isAlive ? 'white' : this.color;
		ctx.lineWidth = 1;

		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.scale, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(this.position.x, this.position.y);
		ctx.lineTo(
			this.position.x + Math.cos(this.rotation) * this.scale * 2,
			this.position.y + Math.sin(this.rotation) * this.scale * 2);
		ctx.stroke();

	}

	// ----------------------------------------------
	turn() {
		this.rotation -= this.speedRotation;
	}

	// ----------------------------------------------
	collideWithOther(other) {
		let distance = Math.sqrt(
			((this.position.x - other.position.x) * (this.position.x - other.position.x)) +
			((this.position.y - other.position.y) * (this.position.y - other.position.y)));
		return (distance < this.scale + other.scale);
	}

	// ----------------------------------------------
	collideWithPoint(x, y) {
		let dx = this.position.x - x;
		let dy = this.position.y - y;
		return (dx * dx + dy * dy <= this.scale * this.scale);
	}

	// ----------------------------------------------
	collideWithLine(x1, y1, x2, y2) {

		if (this.collideWithPoint(x1, y1) || this.collideWithPoint(x2, y2)) {
			return true;
		}

		let dx = x2 - x1;
		let dy = y2 - y1;

		let lcx = this.position.x - x1;
		let lcy = this.position.y - y1;

		let dlen = dx * dx + dy * dy;
		let px = dx;
		let py = dy;

		if (dlen > 0) {
			let dp = (lcx * dx + lcy * dy) / dlen;
			px *= dp;
			py *= dp;
		}

		let plen = px * px + py * py;

		return (this.collideWithPoint(x1 + px, y1 + py) &&
			plen <= dlen &&
			(px * dx + py * dy) >= 0);
	}

	// ----------------------------------------------
	collideWithArc(x, y, radius, start, end) {

		let dx = this.position.x - x;
		let dy = this.position.y - y;
		let angle = Math.atan2(dy, dx);

		if (start < end) {
			if (angle < start || angle > end) {
				return false;
			}
		} else {
			if (angle < start && angle > end) {
				return false;
			}
		}

		return this.collideWithPoint(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
	}

	// ----------------------------------------------
	kickTheCalendar() {
		this.isAlive = false;
	}

}
