var minoData = [
	{
		// z-mino
		color: 1, //red
		spawnpos: [-1,4],
		rotation0: [[-1,-1],[0,0],[0,-1],[1,0]],
		rotation1: [[0,1],[0,0],[1,0],[1,-1]],
		rotation2: [[1,1],[0,0],[0,1],[-1,0]],
		rotation3: [[0,-1],[0,0],[-1,0],[-1,1]],
	},
	{
		// s-mino
		color: 2, //green
		spawnpos: [-1,4],
		rotation0: [[1,-1],[0,0],[0,-1],[-1,0]],
		rotation1: [[0,-1],[0,0],[1,0],[1,1]],
		rotation2: [[-1,1],[0,0],[0,1],[1,0]],
		rotation3: [[0,1],[0,0],[-1,0],[-1,-1]],
	},
	{
		// o-mino
		color: 3, //yellow
		spawnpos: [-1,5],
		rotation0: [[-1,-1],[0,-1],[-1,0],[0,0]],
		rotation1: [[-1,-1],[0,-1],[-1,0],[0,0]],
		rotation2: [[-1,-1],[0,-1],[-1,0],[0,0]],
		rotation3: [[-1,-1],[0,-1],[-1,0],[0,0]],
	},
	{
		// j-mino
		color: 4, //blue
		spawnpos: [-1,4],
		rotation0: [[-1,-1],[-1,0],[0,0],[1,0]],
		rotation1: [[0,1],[0,0],[0,-1],[1,-1]],
		rotation2: [[1,1],[1,0],[0,0],[-1,0]],
		rotation3: [[0,-1],[0,0],[0,1],[-1,1]],
	},
	{
		// l-mino
		color: 5, //orange
		spawnpos: [-1,4],
		rotation0: [[-1,0],[0,0],[1,0],[1,-1]],
		rotation1: [[0,1],[0,0],[0,-1],[1,1]],
		rotation2: [[1,0],[0,0],[-1,0],[-1,1]],
		rotation3: [[0,1],[0,0],[0,-1],[-1,-1]],
	},
	{
		// i-mino
		color: 6, //cyan
		spawnpos: [-1,5],
		rotation0: [[-2,0],[-1,0],[0,0],[1,0]],
		rotation1: [[0,-2],[0,-1],[0,0],[0,1]],
		rotation2: [[-2,0],[-1,0],[0,0],[1,0]],
		rotation3: [[-1,-2],[-1,-1],[-1,0],[-1,1]],
		//this is the reason why I didn't use mathematical rotation
	},
	{
		// t-mino
		color: 7, //purple
		spawnpos: [-1,4],
		rotation0: [[0,0],[-1,0],[1,0],[0,-1]],
		rotation1: [[0,0],[0,1],[1,0],[0,-1]],
		rotation2: [[0,0],[-1,0],[1,0],[0,1]],
		rotation3: [[0,0],[-1,0],[0,1],[0,-1]],
	},

];
