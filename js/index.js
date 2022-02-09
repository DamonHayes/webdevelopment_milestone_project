// consts for the canvas and what is inside the canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//drawling the height and width for canvas
canvas.width = window.innerWidth
canvas.height = window.innerHeight

//gravity for the player and objects
const gravity = 0.5

//this is the player class creates and draws the player
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
	
	// this is the drawling of the player
	draw() {
		context.fillStyle = "red"
		context.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
	
	// this is called every frame it updates the players position and velocity
	update() {
		this.draw()
		this.position.y += this.velocity.y
		this.position.x += this.velocity.x
		
		if (this.position.y + this.height + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity
		} else( this.velocity.y = 0 )
	}
}

class Platform {
	constructor () {
		this.position = {
			x: 200,
			y: 100
		}
		this.width = 200,
		this.height = 20
	}
	
	draw() {
		context.fillStyle = 'blue'
		context.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
}

const player = new Player()
const platform = new Platform()

const keys = {
	right: {
		pressed: false
	},
	left: {
		pressed: false
	}
}


function animate() {
	requestAnimationFrame(animate)
	context.clearRect(0, 0, canvas.width, canvas.height)
	player.update()
	platform.draw()
	
	if (keys.right.pressed && player.position.x < 401) {
		player.velocity.x = 5
	} else if (keys.left.pressed && player.position.x > 100) {
		player.velocity.x = -5
	} else {
		player.velocity.x = 0
		
		if (keys.right.pressed) {
			platform.position.x -= 5
		} else if (keys.left.pressed) {
			platform.position.x += 5
		}
	}
	
	if (player.position.y  + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
		player.velocity.y = 0
	}
}



animate()

window.addEventListener('keydown', ({keyCode}) => {
	switch (keyCode) {
		case 65 || 37:
			keys.left.pressed = true;
		break
		case 83 || 40:
			console.log('down')
		break
		case 68 || 39:
			keys.right.pressed = true;
		break
		case 87 || 38:
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
			console.log('down')
		break
		case 68 || 39:
			keys.right.pressed = false;
		break
		case 87 || 38:
			player.velocity.y = 0
		break
	}
})