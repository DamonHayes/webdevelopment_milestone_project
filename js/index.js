
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5

class Player {
	constructor() {
		this.position = {
			x: 100,
			y: 100
		}
		this.velocity = {
			x: 0,
			y: 0
		}
		this.width = 30
		this.height = 30
	}
	
	draw() {
		context.fillStyle = "red"
		context.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
	
	update() {
		this.draw()
		this.position.y += this.velocity.y
		this.position.x += this.velocity.x
		
		if (this.position.y + this.height + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity
		} else( this.velocity.y = 0 )
	}
}

const player = new Player()
const keys = {
	right: {
		pressed: false
	},
	left: {
		pressed: false
	},
	up: {
		pressed: false
	},
	down: {
		pressed: false
	}
}


function animate() {
	requestAnimationFrame(animate)
	context.clearRect(0, 0, canvas.width, canvas.height)
	player.update()
	
	if (keys.right.pressed) {
		player.velocity.x = 5
	} else if (keys.left.pressed) {
		player.velocity.x = -5
	} else player.velocity.x = 0
	
	
}



animate()

window.addEventListener('keydown', ({keyCode}) => {
	switch (keyCode) {
		case 65 || 37:
			keys.left.pressed = true;
		break
		case 83 || 40:
			keys.down.pressed = true;
		break
		case 68 || 39:
			keys.right.pressed = true;
		break
		case 87 || 38:
			keys.up.pressed = true;
			player.velocity.y -= 10
		break
	}
})
window.addEventListener('keyup', ({keyCode}) => {
	switch (keyCode) {
		case 65 || 37:
			keys.left.pressed = false;
		break
		case 83 || 40:
			keys.down.pressed = false;
		break
		case 68 || 39:
			keys.right.pressed = false;
		break
		case 87 || 38:
			keys.up.pressed = false;
			player.velocity.y = 0
		break
	}
})