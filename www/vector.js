// vector.js
/* exported Vector */

class Vector {

	// ----------------------------------------------
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	// ----------------------------------------------
	add(v) {
		this.x += v.x;
		this.y += v.y;
	}

	// ----------------------------------------------
	sub(v) {
		this.x -= v.x;
		this.y -= v.y;
	}

}
