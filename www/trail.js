// trail.js
/* exported Trail */

class Trail {

	// ----------------------------------------------
	constructor(context, color) {
		this.context = context;
		this.color = color;

		this.ttl = 240;
		this.step = 4;
		this.countdown = 0;

		this.x = [];
		this.y = [];
		this.time = [];
	}

	// ----------------------------------------------
	update(x, y) {

		if (x && y) {
			this.countdown--;
			if (this.countdown < 0) {
				this.countdown = this.step;
				this.x.push(x);
				this.y.push(y);
				this.time.push(this.ttl);
			}
		}

		for (let i = this.time.length - 1; i >= 0; i--) {
			this.time[i]--;
			if (this.time[i] < 0) {
				this.time.splice(i, 1);
				this.x.splice(i, 1);
				this.y.splice(i, 1);
			}
		}

	}

	// ----------------------------------------------
	render() {

		let len = this.time.length;

		if (len < 2) {
			return;
		}

		let ctx = this.context;

		ctx.strokeStyle = this.color;
		ctx.lineWidth = 2;

		for (let i = 1; i < len; i++) {
			ctx.globalAlpha = this.time[i] / this.ttl;
			ctx.beginPath();
			ctx.moveTo(this.x[i - 1], this.y[i - 1]);
			ctx.lineTo(this.x[i], this.y[i]);
			ctx.stroke();
		}

		ctx.globalAlpha = 1.0;

	}

}
