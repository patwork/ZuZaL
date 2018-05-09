// map.js
/* exported Map */

class Map {

	// ----------------------------------------------
	constructor(context, width, height) {
		this.context = context;
		this.width = width;
		this.height = height;

		this.centerX = width / 2;
		this.centerY = height / 2;

		this.bigRecW = (width / 2.0) * 0.95;
		this.bigRecH = (height / 2.0) * 0.9;
		this.bigArcX = this.bigRecW - this.bigRecH;

		this.trackW = this.bigRecH * 0.5;
		this.smallRecW = this.bigRecW - this.trackW;
		this.smallRecH = this.bigRecH - this.trackW;
		this.smallArcX = this.smallRecW - this.smallRecH;
	}

	// ----------------------------------------------
	render() {

		let ctx = this.context;

		ctx.fillStyle = 'brown';
		ctx.fillRect(0, 0, this.width, this.height);

		ctx.fillStyle = 'lightgray';
		ctx.strokeStyle = 'yellow';
		ctx.lineWidth = 3;

		ctx.beginPath();
		ctx.moveTo(this.centerX - this.bigArcX, this.centerY - this.bigRecH);
		ctx.lineTo(this.centerX + this.bigArcX, this.centerY - this.bigRecH);
		ctx.arc(this.centerX + this.bigArcX, this.centerY, this.bigRecH, -Math.PI / 2.0, Math.PI / 2.0, false);
		ctx.lineTo(this.centerX - this.bigArcX, this.centerY + this.bigRecH);
		ctx.arc(this.centerX - this.bigArcX, this.centerY, this.bigRecH, Math.PI / 2.0, -Math.PI / 2.0, false);
		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = 'green';
		ctx.strokeStyle = 'yellow';
		ctx.lineWidth = 3;

		ctx.beginPath();
		ctx.moveTo(this.centerX - this.smallArcX, this.centerY - this.smallRecH);
		ctx.lineTo(this.centerX + this.smallArcX, this.centerY - this.smallRecH);
		ctx.arc(this.centerX + this.smallArcX, this.centerY, this.smallRecH, -Math.PI / 2.0, Math.PI / 2.0, false);
		ctx.lineTo(this.centerX - this.smallArcX, this.centerY + this.smallRecH);
		ctx.arc(this.centerX - this.smallArcX, this.centerY, this.smallRecH, Math.PI / 2.0, -Math.PI / 2.0, false);
		ctx.fill();
		ctx.stroke();

	}

	// ----------------------------------------------
	getStartingPosition(howmany, nr) {
		return (this.trackW / (howmany + 1)) * (nr + 1) + (this.centerY + this.smallRecH);
	}

	// ----------------------------------------------
	getCollisions(player) {
		return (
			player.collideWithLine(
				this.centerX - this.bigArcX, this.centerY - this.bigRecH,
				this.centerX + this.bigArcX, this.centerY - this.bigRecH) ||
			player.collideWithLine(
				this.centerX - this.bigArcX, this.centerY + this.bigRecH,
				this.centerX + this.bigArcX, this.centerY + this.bigRecH) ||
			player.collideWithLine(
				this.centerX - this.smallArcX, this.centerY - this.smallRecH,
				this.centerX + this.smallArcX, this.centerY - this.smallRecH) ||
			player.collideWithLine(
				this.centerX - this.smallArcX, this.centerY + this.smallRecH,
				this.centerX + this.smallArcX, this.centerY + this.smallRecH) ||
			player.collideWithArc(
				this.centerX + this.bigArcX, this.centerY, this.bigRecH, -Math.PI / 2.0, Math.PI / 2.0) ||
			player.collideWithArc(
				this.centerX - this.bigArcX, this.centerY, this.bigRecH,
				Math.PI / 2.0, -Math.PI / 2.0) ||
			player.collideWithArc(
				this.centerX + this.smallArcX, this.centerY, this.smallRecH, -Math.PI / 2.0, Math.PI / 2.0) ||
			player.collideWithArc(
				this.centerX - this.smallArcX, this.centerY, this.smallRecH,
				Math.PI / 2.0, -Math.PI / 2.0)
		);
	}

}
