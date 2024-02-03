const maps = [{
    "mapName": "Standard",
    "WIDTH": 5750,
    "HEIGHT": 5750,
    "MODE": "tdm",
    "serverName": "Domination",
    "TEAM_AMOUNT": 2,
    "SPAWN_DOMINATORS": true,
    "ROOM_SETUP": [
        ["bas1", "n_b1", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "rock"],
        ["n_b1", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm"],
        ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "domi", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "domi", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "roid", "rock", "nest", "norm", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "norm", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
        ["roid", "norm", "roid", "norm", "roid", "nest", "norm", "domi", "norm", "nest", "roid", "norm", "roid", "norm", "roid"],
        ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "norm", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "rock", "nest", "rock", "roid", "rock", "nest", "rock", "norm", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "domi", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "domi", "norm", "norm", "norm"],
        ["norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm"],
        ["norm", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "n_b2"],
        ["rock", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "norm", "norm", "norm", "norm", "norm", "n_b2", "bas2"]
    ],
    "X_GRID": 15,
    "Y_GRID": 15,
    "BOTS": 8
}];
maps[Math.random() * maps.length | 0];
