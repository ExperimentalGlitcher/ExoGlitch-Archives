// GUN DEFINITIONS
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        }
    });
    return {
        reload:     data[0],
        recoil:     data[1],
        shudder:    data[2], 
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here 
// Bases
    basic: [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 15, 1],
    drone: [50, 0.25, 0.1, 0.6, 1, 1, 1, 2, 1, 1, 1, 0.1, 1],
    trap: [36, 1, 0.25, 0.6, 1, 0.75, 1, 5, 1, 1, 1, 15, 3],
    swarm: [36, 0.25, 0.05, 0.4, 1, 0.45, 1, 4, 1, 1, 1, 5, 1],
    factory: [60, 1, 0.1, 0.7, 1, 0.75, 1, 3, 1, 1, 1, 0.1, 1],
    productionist: [75, 0.25, 0.05, 0.7, 1, 0.75, 1, 4, 1, 1.5, 1, 5, 1],

// Spammers
    desmos: [1, 1, 0, 0.8, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    single: [1.05, 1, 1, 1, 1, 1, 1, 1.05, 1, 1, 1, 1, 1],
    twin: [1, 0.5, 0.9, 1, 0.9, 0.7, 1, 1, 1, 1, 1, 1.2, 1],
    doubleTwin: [1, 1, 1, 1, 1, 0.9, 1, 1, 1, 1, 1, 1, 1],
    hewnDouble: [1.25, 1.5, 1, 1, 0.9, 0.85, 1, 1, 0.9, 1, 1, 1, 1],
    tripleShot: [1.1, 1, 0.8, 1, 0.9, 1, 0.8, 1, 1, 1, 0.8, 0.5, 1],
    spreadshotMain: [0.781, 0.25, 0.5, 1, 0.5, 1, 1, 1.923, 2.436, 1, 1, 1, 1],
    spreadshot: [1.5, 1, 0.25, 1, 1, 1, 1, 0.7, 0.7, 1, 1, 0.25, 1],
    triplet: [1.2, 0.667, 0.9, 1, 0.85, 0.85, 0.9, 1, 1, 1, 1.1, 0.9, 0.95],
    turret: [2, 1, 1, 1, 0.8, 0.6, 0.7, 1, 1, 1, 0.1, 1, 1],
    autoTurret: [0.9, 0.75, 0.5, 0.8, 0.9, 0.6, 1.2, 1.1, 1, 0.8, 1.3, 1, 1.25],

// Snipers
    sniper: [1.35, 1, 0.25, 1, 1, 0.8, 1.1, 1.5, 1.5, 1, 1.5, 0.2, 1.15],
    crossbow: [2, 1, 1, 1, 0.6, 0.6, 0.8, 1, 1, 1, 1, 1, 1],
    assassin: [1.65, 1, 0.25, 1, 1.15, 1, 1.1, 1.18, 1.18, 1, 3, 2, 1.3],
    hunter: [1.5, 0.7, 1, 0.95, 1, 0.9, 1, 1.1, 0.8, 1, 1.2, 1, 1.15],
    hunterSecondary: [1, 1, 1, 0.9, 2, 0.5, 1.5, 1, 1, 1, 1.2, 1, 1.1],
    predator: [1.4, 1, 1, 0.8, 1.5, 0.9, 1.2, 0.9, 0.9, 1, 1, 1, 1],
    dual: [2, 1, 0.8, 1, 1.5, 1, 1, 1.3, 1.1, 1, 1, 1, 1.25],
    rifle: [0.8, 0.8, 1.5, 1, 0.8, 0.8, 0.9, 1, 1, 1, 1, 2, 1],

// Machine guns
    machineGun: [0.5, 0.8, 1.7, 1, 0.7, 0.7, 1, 1, 0.8, 1, 1, 2.5, 1],
    minigun: [1.25, 0.6, 1, 0.8, 0.55, 0.45, 1.25, 1.33, 1, 1, 1.25, 0.5, 1.1],
    streamliner: [1.1, 0.6, 1, 1, 1, 0.65, 1, 1.24, 1, 1, 1, 1, 1],
    nailgun: [0.85, 2.5, 1, 0.8, 1, 0.7, 1, 1, 1, 1, 2, 1, 1],
    pelleter: [1.25, 0.25, 1.5, 1.1, 1, 0.35, 1.35, 0.9, 0.8, 1, 1.5, 1.5, 1.2],
    gunner: [1, 0.25, 1.5, 1.2, 1.35, 0.25, 1.25, 0.8, 0.65, 1, 1.5, 1.5, 1.2],
    machineGunner: [0.66, 0.8, 2, 1, 1, 0.75, 1, 1.2, 0.8, 1, 1, 2.5, 1],
    blaster: [1, 1.2, 1.25, 1.1, 1.5, 1, 0.6, 0.8, 0.33, 0.6, 0.5, 1.5, 0.8],
    focal: [1.25, 1.33, 0.8, 1, 0.8, 1, 1.1, 1.25, 1.25, 1.1, 1.25, 0.5, 1.1],
    atomizer: [0.3, 0.8, 1, 0.5, 1, 0.75, 1, 1.2, 0.8, 1, 1, 2.25, 1],
    spam: [1.1, 1, 1, 1.05, 1, 1.1, 1, 0.9, 0.7, 1, 1, 1, 1.05],
    gunnerDominator: [1.1, 0, 1.1, 0.5, 0.5, 0.5, 1, 1.1, 1, 1, 0.9, 1.2, 0.8],

// Flanks
    flankGuard: [1, 1.2, 1, 1, 1.02, 0.81, 0.9, 1, 0.85, 1, 1.2, 1, 1],
    cyclone: [1, 1, 1, 1, 1.3, 1.3, 1.1, 1.5, 1.15, 1, 1, 1, 1],
    triAngle: [1, 0.9, 1, 1, 0.9, 1, 1, 0.8, 0.8, 0.6, 1, 1, 1],
    triAngleFront: [1, 0.2, 1, 1, 1, 1, 1, 1.3, 1.1, 1.5, 1, 1, 1],
    thruster: [1, 1.5, 2, 1, 0.5, 0.5, 0.7, 1, 1, 1, 1, 0.5, 0.7],

// Drones
    overseer: [1.25, 1, 1, 0.85, 0.7, 0.8, 1, 1, 0.9, 1, 2, 1, 1],
    overdrive: [2.5, 1, 1, 1, 0.8, 0.8, 0.8, 0.9, 0.9, 0.9, 1, 1.2, 1],
    commander: [3, 1, 1, 0.7, 0.4, 0.7, 1, 1, 1, 0.1, 0.5, 1, 1],
    baseProtector: [5, 0.000001, 1, 1, 100, 1, 1, 1, 1, 0.5, 5, 1, 10],
    battleship: [1, 1, 1, 1, 1.25, 1.15, 1, 1, 0.85, 1, 1, 1, 1.1],
    carrier: [1.5, 1, 1, 1, 1, 0.8, 1, 1.3, 1.2, 1.2, 1, 1, 1],
    bee: [1.3, 1, 1, 1.4, 1, 1.5, 0.5, 3, 1.5, 1, 0.25, 1, 1],
    sunchip: [5, 1, 1, 1.4, 0.5, 0.4, 0.6, 1, 1, 1, 0.8, 1, 1],
    maleficitor: [0.5, 1, 1, 1.05, 1.15, 1.15, 1.15, 0.8, 0.8, 1, 1.15, 1, 1],
    summoner: [0.3, 1, 1, 1.125, 0.4, 0.345, 0.4, 1, 1, 1, 0.8, 1, 1],
    minionGun: [1, 1, 2, 1, 0.4, 0.4, 1.2, 1, 1, 0.75, 1, 2, 1],
    babyfactory: [1.5, 1, 1, 1, 1, 1, 1, 1, 1.35, 1, 1, 1, 1],
    bigCheese: [1.5, 1, 1, 1.8, 2.5, 1, 1, 1.25, 1, 1, 1, 1, 1],
    mothership: [1.25, 1, 1, 1, 1, 1, 1.1, 0.775, 0.8, 15, 1, 1, 1.15],
    satellite: [3, 1, 1, 0.8, 1, 1.875, 1, 1, 1, 1, 1, 1, 1],

// Heavy cannons
    pounder: [2, 1.6, 1, 1, 1, 2, 1, 0.85, 0.8, 1, 1.5, 1, 1.15],
    destroyer: [2.2, 1.8, 0.5, 1, 2, 2, 1.2, 0.65, 0.5, 1, 2, 2, 3],
    annihilator: [0.8, 1.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    hive: [1.5, 0.8, 1, 0.8, 0.7, 0.3, 1, 1, 0.6, 1, 1, 1, 1],
    artillery: [1.2, 0.7, 1, 0.9, 1, 1, 1, 1.15, 1.1, 1, 1.5, 1, 1],
    mortar: [1.2, 1, 1, 1, 1.1, 1, 1, 0.8, 0.8, 1, 1, 1, 1],
    shotgun: [8, 0.4, 1, 1.5, 1, 0.4, 0.8, 1.8, 0.6, 1, 1.2, 1.2, 1],
    destroyerDominator: [6.5, 0, 1, 0.975, 6, 6, 6, 0.575, 0.475, 1, 1, 0.5, 1],

// Missiles
    launcher: [1.5, 1.5, 0.1, 0.72, 1.05, 0.925, 1, 0.9, 1.2, 1.1, 1, 1, 1.5],
    skimmer: [1, 0.8, 0.8, 0.9, 1.35, 0.8, 2, 0.3, 0.3, 1, 1, 1, 1.1],
    snake: [0.4, 1, 4, 1, 1.5, 0.9, 1.2, 0.2, 0.35, 1, 3, 6, 0.5],
    snakeskin: [0.6, 1, 2, 1, 0.5, 0.5, 1, 1, 0.2, 0.4, 1, 5, 1],
    sidewinder: [1.5, 2, 1, 1, 1.5, 0.9, 1, 0.15, 0.5, 1, 1, 1, 1],
    rocketeer: [1.4, 1, 0.9, 1.2, 1.5, 1.4, 1.4, 0.3, 1, 1.2, 1, 1, 1.4],
    missileTrail: [0.6, 0.25, 2, 1, 1, 0.9, 0.7, 0.4, 1, 0.5, 1, 1, 1],
    rocketeerMissileTrail: [0.5, 7, 1.5, 0.8, 0.8, 0.7, 1, 0.9, 0.8, 1, 1, 5, 1],

// Traps and blocks
    setTrap: [1.1, 2, 0.1, 1.5, 2, 1, 1.25, 1.5, 2.5, 1.25, 1, 1, 1.25],
    construct: [1.3, 1, 1, 0.9, 1, 1, 1, 1, 1.1, 1, 1, 1, 1],
    boomerang: [0.8, 1, 1, 1, 0.5, 0.5, 1, 0.75, 0.75, 1.333, 1, 1, 1],
    nestKeeper: [3, 1, 1, 0.75, 1.05, 1.05, 1.1, 0.5, 0.5, 0.5, 1.1, 1, 1],
    hexaTrapper: [1.3, 1, 1.25, 1, 1, 1, 1, 0.8, 1, 0.5, 1, 1, 1],
    trapperDominator: [1.26, 0, 0.25, 1, 1.25, 1.45, 1.6, 0.5, 2, 0.7, 1, 0.5, 1],

// Misc
    blank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    weak: [2, 1, 1, 1, 0.6, 0.6, 0.8, 0.5, 0.7, 0.25, 0.3, 1, 1],
    power: [1, 1, 0.6, 1.2, 1, 1, 1.25, 2, 1.7, 1, 2, 0.5, 1.5],
    fake: [1, 0, 0, 0.00001, 0.0001, 1, 1, 0, 0, 0, 1, 0, 1],
    op: [0.5, 1.3, 1, 1, 4, 4, 4, 3, 2, 1, 5, 2, 1],
    arenaCloser: [1.25, 0.25, 1, 1, 1000, 1000, 1000, 2.5, 2.25, 1.4, 4, 0.25, 1],
    healer: [1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
    lowPower: [1, 1, 2, 1, 0.5, 0.5, 0.7, 1, 1, 1, 1, 0.5, 0.7],
    halfrange: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1],
    aura: [0.001, 0.001, 0.001, 6, 1, 3, 1, 0.001, 0.001, 1, 1, 0.001, 1],
    noSpread: [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
};

// NAMES
const basePolygonDamage = 1;
const basePolygonHealth = 2;
const dfltskl = 9;
const smshskl = 12;
const statnames = {
    generic: 0,
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    mixed: 6,
    desmos: 7,
    whirlwind: 8,
    heal: 9,
    flail: 10,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
};
const base = {
	ACCEL: 1.6,
	SPEED: 5.25,
	HEALTH: 20,
	DAMAGE: 3,
	RESIST: 1,
	PENETRATION: 1.05,
	SHIELD: 8,
	REGEN: 0.025,
	FOV: 1.03,
	DENSITY: 0.5,
};

// GENERICS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATIO_EFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,
        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2
    },    
    FOOD: {
        LEVEL: -1,
    }
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
exports.genericSmasher = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
    BODY: {
        FOV: 1.05 * base.FOV,
        DENSITY: 2 * base.DENSITY
    }
};
exports.genericBoss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5,
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'canRepel'],
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
    BODY: { PUSHABILITY: 0.05 }
};
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: false,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATIO_EFFECTS: false,
    HEALTH_WITH_LEVEL: false,
    GUNS: [],
    TURRETS: []
};
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.165,
        DAMAGE: 6,
        PUSHABILITY: 0.3
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true
};
exports.speedBullet = {
    PARENT: [exports.bullet],
    MOTION_TYPE: 'accel'
};
exports.growBullet = {
    PARENT: [exports.bullet],
    MOTION_TYPE: 'grow'
};
exports.flare = {
    PARENT: [exports.growBullet],
	LABEL: 'Flare',
    SHAPE: 4,
    MOTION_TYPE: 'flare'
};
exports.developerBullet = {
    PARENT: [exports.bullet],
    SHAPE: [[-1, -1], [1, -1], [2, 0], [1, 1], [-1, 1]]
};
exports.casing = {
    PARENT: [exports.bullet],
    LABEL: 'Shell',
    TYPE: 'swarm'
};
exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: {
        BLIND: true
    },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.3,
        DAMAGE: 3.375,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.5
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true
};
exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide',
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 0.5,
        DAMAGE: 3,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0
    }
};
exports.satellite = {
    LABEL: 'Satellite',
    TYPE: 'satellite',
    ACCEPTS_SCORE: false,
	DANGER: 2,
    SHAPE: 0,
	CONTROLLERS: ['orbit'],
	FACING_TYPE: 'autospin',
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.75,
        HEALTH: 0.3,
        DAMAGE: 3.375,
        SPEED: 10,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.5
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
    MOTION_TYPE: 'motor'
};
exports.mendersymbol = {
    PARENT: [exports.genericTank],
    COLOR: 16,
    LABEL: '',
    SHAPE: 3
};
exports.healerBullet = {
    PARENT: [exports.bullet],
    HEALER: true,
    HITS_OWN_TYPE: 'normal'
};
exports.healerSymbol = {
    PARENT: [exports.genericEntity],
    SHAPE: [[0.3, -0.3],[1,-0.3],[1,0.3],[0.3,0.3],[0.3,1],[-0.3,1],[-0.3,0.3],[-1,0.3],[-1,-0.3],[-0.3,-0.3],[-0.3,-1],[0.3,-1]],
    SIZE: 13,
    COLOR: 12
};
exports.auraBase = {
    TYPE: 'aura',
    ACCEPTS_SCORE: false,
    FACING_TYPE: 'smoothWithMotion',
    MOTION_TYPE: 'withMaster',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DAMAGE_EFFECTS: false,
    DIE_AT_RANGE: false,
    ALPHA: 0.3,
    CLEAR_ON_MASTER_UPGRADE: true,
    CAN_GO_OUTSIDE_ROOM: true,
    CONTROLLERS: ['disableOnOverride'],
    BODY: {
        SHIELD: 1e9,
        REGEN: 1e6,
        HEALTH: 1e9,
        DENSITY: 0,
        SPEED: 0,
        PUSHABILITY: 0
    }
};
exports.aura = {
    PARENT: [exports.auraBase],
    LABEL: 'Aura',
    COLOR: 0,
    BODY: {
        DAMAGE: 0.5
    }
};
exports.healAura = {
    PARENT: [exports.auraBase],
    LABEL: 'Heal Aura',
    HEALER: true,
    COLOR: 12,
    BODY: {
        DAMAGE: 0.1
    }
};
exports.auraSymbol = {
    PARENT: [exports.genericTank],
    CONTROLLERS: [['spin', {speed: -0.04}]],
    INDEPENDENT: true,
    COLOR: 0,
    SHAPE: [[-0.598,-0.7796],[-0.3817,-0.9053],[0.9688,-0.1275],[0.97,0.125],[-0.3732,0.9116],[-0.593,0.785]]
};

// FUNCTIONS
const deepCopy = (type) => {
    const pushArray = (input, key) => {
        let arrOut = [];
        for (let i = 0; i < input.length; i++) {
            switch (typeof input[i]) {
                case 'object':
                    if (Array.isArray(input[i])) arrOut.push(pushArray(input[i]));
                    else {
                        if (key == "TYPE") arrOut.push(input[i]);
                        else arrOut.push(deepCopy(input[i]));
                    }
                    break;
                default:
                    arrOut.push(input[i]);
                    break;
            }
        }
        return arrOut;
    };
    let output = JSON.parse(JSON.stringify(type));
    if (Array.isArray(type)) output = pushArray(type);
    else {
        for (let key in type) {
            switch (typeof type[key]) {
                case 'object':
                    if (Array.isArray(type[key])) output[key] = pushArray(type[key], key);
                    else {
                        if (key == "TYPE") output[key] = type[key];
                        else output[key] = deepCopy(type[key]);
                    }
                    break;
                default:
                    output[key] = type[key];
                    break;
            }
        }
    }
    return output;
};
const applyStats = (guns, stats, options = {}) => {
    if (guns) {
        for (let gun of guns) {
            if (gun.PROPERTIES) {
                if (options.propertyEdit) options.propertyEdit(gun.PROPERTIES);
                if (gun.PROPERTIES.SHOOT_SETTINGS) {
                    if (options.shootEdit) options.shootEdit(gun.PROPERTIES);
                    gun.PROPERTIES.SHOOT_SETTINGS = combineStats([Object.values(gun.PROPERTIES.SHOOT_SETTINGS), ...stats]);
                }
            }
        }
    }
};
const makeGuard = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || output.LABEL + ' Guard';
    output.STAT_NAMES = statNames.mixed;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [13, 8, 1, 0, 0, 180, 0],
    }, {
        POSITION: [4, 8, 1.7, 13, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
        }
    });
    return output;
};
const makeConq = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || output.LABEL + ' Conqueror';
    output.STAT_NAMES = statNames.mixed;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [18, 14, 1, 0, 0, 180, 0],
    }, {
        POSITION: [2, 14, 1.1, 18, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
            TYPE: exports.setTrap
        }
    });
    return output;
};
const makeSplit = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Split ' + output.LABEL;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [18, 8, 1, 0, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
            TYPE: exports.bullet
        }
    });
    return output;
};
const addBackGunner = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || output.LABEL;
    output.STAT_NAMES = statNames.mixed;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [19, 2, 1, 0, -2.5, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, [1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 180, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, [1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [12, 11, 1, 0, 0, 180, 0]
    });
    return output;
};
const makeMulti = (type, sides = 3, name, options = {}) => {
    let output = deepCopy(type),
        reloadDelay = options.reload_delay || new Array(sides),
        stats = options.stats || [g.blank],
        angles = options.angles || new Array(sides);

    applyStats(output.GUNS, [g.flankGuard, ...stats]);

    let baseGuns = deepCopy(output.GUNS);
    output.GUNS = [];
    for (let i = 0; i < sides; i++) {
        for (let j = 0; j < baseGuns.length; j++) {
            let outputGun = deepCopy(baseGuns[j]);
            outputGun.POSITION[5] += angles[i] == undefined ? 360 / sides * i : angles[i];
            if (reloadDelay[i] != undefined) outputGun.POSITION[6] += reloadDelay[i];
            output.GUNS.push(outputGun);
        }
    }
    output.LABEL = name || `Flank ${output.LABEL}`;
    return output;
};
const makeBird = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Bird ' + output.LABEL;
	for (let i in output.GUNS) if (output.GUNS[i].PROPERTIES) output.GUNS[i].PROPERTIES.ALT_FIRE = true;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [16, 8, 1, 0, 0, 150, 0.1],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, [1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
            TYPE: exports.bullet,
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [16, 8, 1, 0, 0, 210, 0.1],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, [1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
            TYPE: exports.bullet,
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0.6],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, [1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
            TYPE: exports.bullet,
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    });
    return output;
};
const makeBirdBot = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Bird ' + output.LABEL;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [16, 8, 1, 0, 0, 150, 0.1],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, [1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
            TYPE: exports.bullet,
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [16, 8, 1, 0, 0, 210, 0.1],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, [1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
            TYPE: exports.bullet,
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0.6],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster, [1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
            TYPE: exports.bullet,
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    });
    return output;
};
const makeHybrid = (type, name, options = {
    isYoukron: false,
    drone: 'drone',
    isDrive: false
}) => {
    let output = deepCopy(type);

    options.isYoukron = options.isYoukron || false;
    options.drone = options.drone || 'drone';
    options.isDrive = options.isDrive || false;

    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [6, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports[options.drone], {
                INDEPENDENT: true
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: options.isYoukron ? 5 : 3
        }
    });

    output.LABEL = name || (options.isYoukron ? 'Youkron ' : 'Hybrid ') + type.LABEL;
    output.STAT_NAMES = statnames.mixed;

    if (options.isYoukron) output.SHAPE = 9;

    if (options.isDrive) {
        output.TURRETS = output.TURRETS || [];
        output.TURRETS.push({
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: exports.overdriveDeco
        });
    }

    return output;
};
const makeOver = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Over' + output.LABEL.toLowerCase();
    output.STAT_NAMES = statNames.mixed;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [6, 12, 1.2, 8, 0, 125, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
            TYPE: exports.drone,
			AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 235, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
            TYPE: exports.drone,
			AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
        }
    });
    return output;
};
const makeOversplit = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Over' + output.LABEL.toLowerCase();
    output.STAT_NAMES = statNames.mixed;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [6, 12, 1.2, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
            TYPE: exports.drone,
			AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
            TYPE: exports.drone,
			AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
        }
    });
    return output;
};
const makeBattle = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Battle' + output.LABEL.toLowerCase();
    output.STAT_NAMES = statNames.mixed;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [7, 7.5, 0.6, 7, 4, 125, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, 0.6, 7, -4, 125, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, 0.6, 7, 4, 235, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, 0.6, 7, -4, 235, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    });
    return output;
};
const makeCap = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Cap' + output.LABEL.toLowerCase();
    output.STAT_NAMES = statNames.mixed;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [4.5, 10, 1, 10.5, 0, 125, 0]
    }, {
        POSITION: [1, 12, 1, 15, 0, 125, 0],
        PROPERTIES: {
            MAX_CHILDREN: 4,
            SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true
        }
    }, {
        POSITION: [11.5, 12, 1, 0, 0, 125, 0]
    }, {
        POSITION: [4.5, 10, 1, 10.5, 0, 235, 0]
    }, {
        POSITION: [1, 12, 1, 15, 0, 235, 0],
        PROPERTIES: {
            MAX_CHILDREN: 4,
            SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true
        }
    }, {
        POSITION: [11.5, 12, 1, 0, 0, 235, 0]
    });
    return output;
};
const makeCross = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Cross-' + output.LABEL;
    output.STAT_NAMES = statNames.mixed;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [6, 12, 1.2, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
            TYPE: exports.drone,
			AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
            TYPE: exports.drone,
			AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
            TYPE: exports.drone,
			AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2
        }
    });
    return output;
};
const makeSwarming = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Swarming ' + output.LABEL;
    output.STAT_NAMES = statNames.mixed;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    });
    return output;
};
const makeBiSwarming = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Bi-Swarming ' + output.LABEL;
    output.STAT_NAMES = statNames.mixed;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [7, 7.5, 0.6, 7, 0, 25, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, 0.6, 7, 0, -25, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    });
    return output;
};
const makeTriSwarming = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Bi-Swarming ' + output.LABEL;
    output.STAT_NAMES = statNames.mixed;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [7, 7.5, 0.6, 7, 0, 45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, 0.6, 7, 0, -45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    });
    return output;
};
const makeAuto = (type, name, options = {}) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Auto-' + type.LABEL;
    if (output.DANGER < 7) output.DANGER++;
    output.TURRETS = output.TURRETS || [];
    options = {
        size: options.size == undefined ? 10 : options.size,
        x: options.x == undefined ? 0 : options.x,
        angle: options.angle == undefined ? 180 : options.angle,
        rot: options.rot == undefined ? 360 : options.rot,
        layer: options.layer == undefined ? 1 : options.layer,
        type: options.type == undefined ? exports.autoTurret : options.type,
        independent: options.independent == undefined ? true : options.independent,
        color: options.color == undefined ? 16 : options.color
    };
    output.TURRETS.push({
        POSITION: [options.size, options.x, 0, options.angle, options.rot, options.layer],
        TYPE: [options.type, {
            CONTROLLERS: ['nearestDifferentMaster'],
            INDEPENDENT: options.independent,
            COLOR: options.color,
            AI: {
                SKYNET: true
            }
        }]
    });
    return output;
};
const makeDeco = (shape = 0, color = 16) => {
    return {
        PARENT: [exports.genericTank],
        SHAPE: shape,
        COLOR: color,
    };
};
const addAura = (damageFactor = 1, sizeFactor = 1, opacity = 0.3, auraColor) => {
    let isHeal = damageFactor < 0;
    let auraType = isHeal ? "healAura" : "aura";
    let symbolType = isHeal ? "healerSymbol" : "auraSymbol";
    auraColor = auraColor || (isHeal ? 12 : 0);
    return {
        PARENT: [exports.genericTank],
        INDEPENDENT: true,
        LABEL: '',
        COLOR: 17,
        GUNS: [{
            POSITION: [0, 20, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.aura, [1, 1, 1, sizeFactor, 1, damageFactor, 1, 1, 1, 1, 1, 1, 1]]),
                TYPE: [exports[auraType], {COLOR: auraColor, ALPHA: opacity}],
                MAX_CHILDREN: 1,
                AUTOFIRE: true,
                SYNCS_SKILLS: true
            }
        }],
        TURRETS: [{
            POSITION: [20 - 7.5 * isHeal, 0, 0, 0, 360, 1],
            TYPE: [exports[symbolType], {COLOR: auraColor, INDEPENDENT: true}]
        }]
    };
};

// FOOD
exports.egg = {
    PARENT: [exports.food],
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: false
};
exports.eggFoodProp = {
    SHAPE: 0,
    COLOR: 6
};
exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2e3,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true
};
exports.jewel = {
    PARENT: [exports.food],
    LABEL: 'Jewel',
    VALUE: 1e5,
    SHAPE: 6,
    SIZE: 12,
    COLOR: 3,
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 50,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true
};
exports.shinyEgg = {
    PARENT: [exports.food],
    LABEL: 'Shiny Egg',
    VALUE: 1000,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 1,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.011,
        PUSHABILITY: 0,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: false,
    GIVE_KILL_MESSAGE: true
};
exports.legendaryEgg = {
    PARENT: [exports.food],
    LABEL: 'Legendary Egg',
    VALUE: 5000,
    SHAPE: 0,
    SIZE: 6,
    COLOR: 0,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 1,
        DENSITY: 3,
        HEALTH: 0.022,
        PUSHABILITY: 0,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: false,
    GIVE_KILL_MESSAGE: true
};
exports.shadowEgg = {
    PARENT: [exports.food],
    LABEL: 'Shadow Egg',
    VALUE: 20000,
    SHAPE: 0,
    SIZE: 7,
    COLOR: 19,
    ALPHA: 0.25,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 2,
        DENSITY: 4,
        HEALTH: 0.044,
        PUSHABILITY: 0,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: false,
    GIVE_KILL_MESSAGE: true
};
exports.square = {
    PARENT: [exports.food],
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
        ACCELERATION: 0.0075
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false
};
exports.squareFoodProp = {
    SHAPE: 4,
    COLOR: 13
};
exports.shinySquare = {
    PARENT: [exports.food],
    LABEL: 'Shiny Square',
    VALUE: 3000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: 10 * basePolygonHealth,
        PENETRATION: 2,
        ACCELERATION: 0.0075
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true
};
exports.legendarySquare = {
    PARENT: [exports.food],
    LABEL: 'Legendary Square',
    VALUE: 15000,
    SHAPE: 4,
    SIZE: 11,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage + 1,
        DENSITY: 5,
        HEALTH: 20 * basePolygonHealth,
        PENETRATION: 3,
        ACCELERATION: 0.0075
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true
};
exports.shadowSquare = {
    PARENT: [exports.food],
    LABEL: 'Shadow Square',
    VALUE: 60000,
    SHAPE: 4,
    SIZE: 12,
    COLOR: 19,
    ALPHA: 0.25,
    BODY: {
        DAMAGE: basePolygonDamage + 2,
        DENSITY: 6,
        HEALTH: 40 * basePolygonHealth,
        PENETRATION: 4,
        ACCELERATION: 0.0075
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true
};
exports.triangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
        ACCELERATION: 0.005
    },
    DRAW_HEALTH: true
};
exports.triangleFoodProp = {
    SHAPE: 3,
    COLOR: 2
};
exports.shinyTriangle = {
    PARENT: [exports.food],
    LABEL: 'Shiny Triangle',
    VALUE: 12000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 30 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
        ACCELERATION: 0.005
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.legendaryTriangle = {
    PARENT: [exports.food],
    LABEL: 'Legendary Triangle',
    VALUE: 60000,
    SHAPE: 3,
    SIZE: 10,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage + 1,
        DENSITY: 7,
        HEALTH: 60 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 2.5,
        ACCELERATION: 0.005
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.shadowTriangle = {
    PARENT: [exports.food],
    LABEL: 'Shadow Triangle',
    VALUE: 240000,
    SHAPE: 3,
    SIZE: 11,
    COLOR: 19,
    ALPHA: 0.25,
    BODY: {
        DAMAGE: basePolygonDamage + 2,
        DENSITY: 8,
        HEALTH: 120 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 3.5,
        ACCELERATION: 0.005
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.pentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 20,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true
};
exports.pentagonFoodProp = {
    SHAPE: 5,
    COLOR: 14
};
exports.shinyPentagon = {
    PARENT: [exports.food],
    LABEL: 'Shiny Pentagon',
    VALUE: 40000,
    SHAPE: 5,
    SIZE: 20,
    COLOR: 1,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 100 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.legendaryPentagon = {
    PARENT: [exports.food],
    LABEL: 'Legendary Pentagon',
    VALUE: 200000,
    SHAPE: 5,
    SIZE: 21,
    COLOR: 0,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage + 1,
        DENSITY: 9,
        HEALTH: 200 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 2.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.shadowPentagon = {
    PARENT: [exports.food],
    LABEL: 'Shadow Pentagon',
    VALUE: 800000,
    SHAPE: 5,
    SIZE: 22,
    COLOR: 19,
    ALPHA: 0.25,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage + 2,
        DENSITY: 10,
        HEALTH: 400 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 3.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.betaPentagon = {
    PARENT: [exports.food],
    LABEL: 'Beta Pentagon',
    VALUE: 2000,
    SHAPE: 5,
    SIZE: 24.721359549995793,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        PENETRATION: 1.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
	TURRETS: [{
        POSITION: [16.18033988749895, 0, 0, 180, 0, 1],
        TYPE: exports.pentagonFoodProp
    }]
};
exports.shinyBetaPentagon = {
    PARENT: [exports.food],
    LABEL: 'Shiny Beta Pentagon',
    VALUE: 200000,
    SHAPE: 5,
    SIZE: 24.721359549995793,
    COLOR: 1,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 500 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        PENETRATION: 1.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
	TURRETS: [{
        POSITION: [16.18033988749895, 0, 0, 180, 0, 1],
        TYPE: [exports.pentagonFoodProp, { COLOR: 1 }]
    }]
};
exports.legendaryBetaPentagon = {
    PARENT: [exports.food],
    LABEL: 'Legendary Beta Pentagon',
    VALUE: 1000000,
    SHAPE: 5,
    SIZE: 25.721359549995793,
    COLOR: 0,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage + 1,
        DENSITY: 9,
        HEALTH: 1000 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        PENETRATION: 2.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
	TURRETS: [{
        POSITION: [16.18033988749895, 0, 0, 180, 0, 1],
        TYPE: [exports.pentagonFoodProp, { COLOR: 0 }]
    }]
};
exports.shadowBetaPentagon = {
    PARENT: [exports.food],
    LABEL: 'Shadow Beta Pentagon',
    VALUE: 4000000,
    SHAPE: 5,
    SIZE: 26.721359549995793,
    COLOR: 19,
    ALPHA: 0.25,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage + 2,
        DENSITY: 10,
        HEALTH: 2000 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        PENETRATION: 3.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
	TURRETS: [{
        POSITION: [16.18033988749895, 0, 0, 180, 0, 1],
        TYPE: [exports.pentagonFoodProp, { COLOR: 19 }]
    }]
};
exports.alphaPentagon = {
    PARENT: [exports.food],
    LABEL: 'Alpha Pentagon',
    VALUE: 1e4,
    SHAPE: 5,
    SIZE: 30.55728090000841,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 250 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        PENETRATION: 1.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
	TURRETS: [{
        POSITION: [16.18033988749895, 0, 0, 180, 0, 1],
        TYPE: exports.pentagonFoodProp
    }, {
        POSITION: [13.090169943749475, 0, 0, 0, 0, 1],
        TYPE: exports.pentagonFoodProp
    }]
};
exports.shinyAlphaPentagon = {
    PARENT: [exports.food],
    LABEL: 'Shiny Alpha Pentagon',
    VALUE: 1000000,
    SHAPE: 5,
    SIZE: 30.55728090000841,
    COLOR: 1,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 2500 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        PENETRATION: 1.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
	TURRETS: [{
        POSITION: [16.18033988749895, 0, 0, 180, 0, 1],
        TYPE: [exports.pentagonFoodProp, { COLOR: 1 }]
    }, {
        POSITION: [13.090169943749475, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagonFoodProp, { COLOR: 1 }]
    }]
};
exports.legendaryAlphaPentagon = {
    PARENT: [exports.food],
    LABEL: 'Legendary Alpha Pentagon',
    VALUE: 5000000,
    SHAPE: 5,
    SIZE: 31.55728090000841,
    COLOR: 0,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage + 1,
        DENSITY: 9,
        HEALTH: 5000 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        PENETRATION: 2.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
	TURRETS: [{
        POSITION: [16.18033988749895, 0, 0, 180, 0, 1],
        TYPE: [exports.pentagonFoodProp, { COLOR: 0 }]
    }, {
        POSITION: [13.090169943749475, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagonFoodProp, { COLOR: 0 }]
    }]
};
exports.shadowAlphaPentagon = {
    PARENT: [exports.food],
    LABEL: 'Shadow Alpha Pentagon',
    VALUE: 20000000,
    SHAPE: 5,
    SIZE: 32.55728090000841,
    COLOR: 19,
    ALPHA: 0.25,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage + 2,
        DENSITY: 10,
        HEALTH: 10000 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        PENETRATION: 3.1,
        ACCELERATION: 0.0035
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
	TURRETS: [{
        POSITION: [16.18033988749895, 0, 0, 180, 0, 1],
        TYPE: [exports.pentagonFoodProp, { COLOR: 19 }]
    }, {
        POSITION: [13.090169943749475, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagonFoodProp, { COLOR: 19 }]
    }]
};
exports.hexagon = {
    PARENT: [exports.food],
    LABEL: 'Hexagon',
    VALUE: 500,
    SHAPE: 6,
    SIZE: 22,
    COLOR: 0,
    BODY: {
		DAMAGE: 3 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 30 * basePolygonHealth,
        RESIST: 1.3,
        PENETRATION: 1.1,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true
};
exports.shinyHexagon = {
    PARENT: [exports.food],
    LABEL: 'Shiny Hexagon',
    VALUE: 50000,
    SHAPE: 6,
    SIZE: 22,
    COLOR: 1,
    BODY: {
		DAMAGE: 3 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 300 * basePolygonHealth,
        RESIST: 1.3,
        PENETRATION: 1.1,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.legendaryHexagon = {
    PARENT: [exports.food],
    LABEL: 'Legendary Hexagon',
    VALUE: 250000,
    SHAPE: 6,
    SIZE: 23,
    COLOR: 0,
    BODY: {
		DAMAGE: 3 * basePolygonDamage + 1,
        DENSITY: 9,
        HEALTH: 600 * basePolygonHealth,
        RESIST: 1.3,
        PENETRATION: 2.1,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.shadowHexagon = {
    PARENT: [exports.food],
    LABEL: 'Shadow Hexagon',
    VALUE: 1000000,
    SHAPE: 6,
    SIZE: 24,
    COLOR: 19,
    ALPHA: 0.25,
    BODY: {
		DAMAGE: 3 * basePolygonDamage + 2,
        DENSITY: 10,
        HEALTH: 1200 * basePolygonHealth,
        RESIST: 1.3,
        PENETRATION: 3.1,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.sphere = {
    PARENT: [exports.food],
    LABEL: 'Sphere',
    VALUE: 1e7,
    SHAPE: 0,
    SIZE: 9,
    COLOR: 18,
    BODY: {
        DAMAGE: 10,
        DENSITY: 16,
        HEALTH: 300,
        RESIST: 2.5,
        PENETRATION: 15,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true,
    TURRETS: [{
        POSITION: [17, 0, 0, 0, 0, 1],
        TYPE: [exports.eggFoodProp, { COLOR: 18 }]
    }, {
        POSITION: [15, 1, -1, 0, 0, 1],
        TYPE: [exports.eggFoodProp, { COLOR: 18 }]
    }, {
        POSITION: [13, 2, -2, 0, 0, 1],
        TYPE: [exports.eggFoodProp, { COLOR: 18 }]
    }, {
        POSITION: [11, 3, -3, 0, 0, 1],
        TYPE: [exports.eggFoodProp, { COLOR: 18 }]
    }, {
        POSITION: [8, 3.25, -3.25, 0, 0, 1],
        TYPE: [exports.eggFoodProp, { COLOR: 18 }]
    }, {
        POSITION: [6, 3, -3, 0, 0, 1],
        TYPE: [exports.eggFoodProp, { COLOR: 18 }]
    }]
};
exports.cube = {
    PARENT: [exports.food],
    LABEL: 'Cube',
    VALUE: 2e7,
    SIZE: 10,
    COLOR: 18,
	SHAPE: 'M 0.0575 0.0437 V 0.9921 L 0.8869 0.5167 V -0.4306 L 0.0575 0.0437 Z M -0.0583 0.0437 V 0.9921 L -0.8869 0.5159 V -0.4306 L -0.0583 0.0437 Z M 0 -0.0556 L 0.829 -0.5266 L 0 -1 L -0.8254 -0.527 L 0 -0.0556',
    BODY: {
        DAMAGE: 12,
        DENSITY: 20,
        HEALTH: 400,
        RESIST: 3,
        PENETRATION: 17.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true
};
exports.tetrahedron = {
    PARENT: [exports.food],
    LABEL: 'Tetrahedron',
    VALUE: 3e7,
    SIZE: 12,
    COLOR: 18,
	SHAPE: 'M 0.058 0.044 V 1 L 0.894 -0.434 L 0.058 0.044 Z M -0.0588 0.044 V 1 L -0.894 -0.434 L -0.0588 0.044 Z M 0 -0.056 L 0.8356 -0.5308 L -0.832 -0.5312 L 0 -0.056',
    BODY: {
        DAMAGE: 15,
        DENSITY: 23,
        HEALTH: 500,
        RESIST: 3.5,
        PENETRATION: 22.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.octahedron = {
    PARENT: [exports.food],
    LABEL: 'Octahedron',
    VALUE: 4e7,
    SIZE: 13,
    COLOR: 18,
	SHAPE: 'M 0.06 -0.06 L 0.95 -0.06 L 0.06 -0.95 L 0.06 -0.06 M -0.06 0.06 L -0.06 0.95 L -0.95 0.06 L -0.06 0.06 M -0.06 -0.06 L -0.95 -0.06 L -0.06 -0.95 L -0.06 -0.06 M 0.06 0.06 L 0.06 0.95 L 0.95 0.06 L 0.06 0.06',
    BODY: {
        DAMAGE: 18,
        DENSITY: 26,
        HEALTH: 600,
        RESIST: 4,
        PENETRATION: 30,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.dodecahedron = {
    PARENT: [exports.food],
    LABEL: 'Dodecahedron',
    VALUE: 5e7,
    SIZE: 18,
    COLOR: 18,
	SHAPE: 'M -0.3273 -0.4318 H 0.3045 L 0.5068 0.1727 L -0.0091 0.5455 L -0.5227 0.1727 L -0.3273 -0.4318 Z M -0.6068 0.2682 L -0.0773 0.6545 V 0.9591 L -0.5955 0.7977 L -0.9136 0.3545 L -0.6068 0.2682 Z M 0.5909 0.2682 L 0.0523 0.6591 V 0.9636 L 0.5773 0.7955 L 0.8955 0.3545 L 0.5909 0.2682 Z M -0.65 0.1455 L -0.4477 -0.4818 L -0.6318 -0.7505 L -0.9545 -0.3182 V 0.2318 L -0.65 0.1455 Z M 0.4273 -0.4841 L 0.6318 0.1455 L 0.9341 0.2341 V -0.3136 L 0.6145 -0.7591 L 0.4273 -0.4841 Z M -0.0091 -1 L -0.5318 -0.8341 L -0.3455 -0.5609 H 0.3227 L 0.5159 -0.8314 L -0.0091 -1',
    BODY: {
        DAMAGE: 17.5,
        DENSITY: 28,
        HEALTH: 700,
        RESIST: 4.5,
        PENETRATION: 32.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.icosahedron = {
    PARENT: [exports.food],
    LABEL: 'Icosahedron',
    VALUE: 1e8,
    SIZE: 20,
    COLOR: 18,
	SHAPE: 'M 0 0.65 L -0.563 -0.325 L 0.563 -0.325 Z M -0.866 0.5 L -0.108 0.653 L -0.619 -0.233 Z M 0.679 -0.332 L 0.906 0.331 L 0.892 -0.455 Z M 0.627 -0.422 L 0.166 -0.95 L 0.84 -0.545 Z M 0.866 0.5 L 0.619 -0.233 L 0.108 0.653 Z M -0.627 -0.422 L -0.166 -0.95 L -0.84 -0.545 Z M -0.679 -0.332 L -0.906 0.331 L -0.892 -0.455 Z M 0 -1 L -0.511 -0.42 L 0.511 -0.42 Z M -0.052 0.754 L -0.74 0.619 L -0.052 1 Z M 0.052 0.754 L 0.74 0.619 L 0.052 1 Z',
    BODY: {
        DAMAGE: 22.5,
        DENSITY: 30,
        HEALTH: 800,
        RESIST: 5,
        PENETRATION: 35,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.tesseract = {
    PARENT: [exports.food],
    LABEL: 'Tesseract',
    VALUE: 42e7,
    SIZE: 25,
    COLOR: 18,
	SHAPE: 'M -0.43 0.35 L -0.71 0.63 L -0.71 -0.63 L -0.43 -0.35 L -0.43 0.35 M -0.35 0.43 L -0.63 0.71 L 0.63 0.71 L 0.35 0.43 L -0.35 0.43 M 0.35 -0.43 L 0.63 -0.71 L -0.63 -0.71 L -0.35 -0.43 L 0.35 -0.43 M 0.43 -0.35 L 0.71 -0.63 L 0.71 0.63 L 0.43 0.35 L 0.43 -0.35 M 0.32 0.32 L 0.32 -0.32 L -0.32 -0.32 L -0.32 0.32 L 0.32 0.32',
    BODY: {
        DAMAGE: 25,
        DENSITY: 40,
        HEALTH: 2000,
        PENETRATION: 50,
        ACCELERATION: 0.003
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};

// TANK PROJECTILES & TURRETS
exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120
    },
    GUNS: [{
        POSITION: [14, 6, 1, 0, -2, 130, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.35 }, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [14, 6, 1, 0, 2, 230, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.35 }, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
};
exports.hypermissile = {
    PARENT: [exports.missile],
    GUNS: [{
        POSITION: [14, 6, 1, 0, -2, 150, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, { reload: 3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [14, 6, 1, 0, 2, 210, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, { reload: 3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [14, 6, 1, 0, -2, 90, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, { reload: 3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }]
        }
    }, {
        POSITION: [14, 6, 1, 0, 2, 270, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, { reload: 3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }]
        }
    }]
};
exports.minimissile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120
    },
    GUNS: [{
        POSITION: [14, 6, 1, 0, 0, 180, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.35 }, { speed: 1.3, maxSpeed: 1.3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
};
exports.spinmissile = {
    PARENT: [exports.missile],
    FACING_TYPE: 'autospin',
    GUNS: [{
        POSITION: [14, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { reload: 0.75 }, { speed: 1.3, maxSpeed: 1.3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [14, 8, 1, 0, 0, 180, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { reload: 0.75 }, { speed: 1.3, maxSpeed: 1.3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
};
exports.hyperspinmissile = {
    PARENT: [exports.spinmissile],
    GUNS: [{
        POSITION: [14, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { reload: 0.75 }, { speed: 1.3, maxSpeed: 1.3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [14, 8, 1, 0, 0, 180, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { reload: 0.75 }, { speed: 1.3, maxSpeed: 1.3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [14, 8, 1, 0, 0, 90, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { reload: 0.75 }, { speed: 1.3, maxSpeed: 1.3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }, {
        POSITION: [14, 8, 1, 0, 0, 270, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { reload: 0.75 }, { speed: 1.3, maxSpeed: 1.3 }]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
};
exports.snake = {
    PARENT: [exports.missile],
    LABEL: 'Snake',
    GUNS: [{
        POSITION: [6, 12, 1.4, 8, 0, 180, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            STAT_CALCULATOR: gunCalcNames.thruster,
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.snake, g.snakeskin]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }]
        }
    }, {
        POSITION: [10, 12, 0.8, 8, 0, 180, 0.5],
        PROPERTIES: {
            AUTOFIRE: true,
            NEGATIVE_RECOIL: true,
            STAT_CALCULATOR: gunCalcNames.thruster,
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.snake]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }]
        }
    }]
};
exports.rocketeerMissile = {
    PARENT: [exports.missile],
    GUNS: [{
        POSITION: [16.5, 10, 1.5, 0, 0, 180, 3],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.missileTrail, g.rocketeerMissileTrail]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
};
exports.sunchip = {
    PARENT: [exports.drone],
    SHAPE: 4,
    NECRO: true,
    HITS_OWN_TYPE: 'hard',
    BODY: {
        FOV: 0.5,
    },
    AI: {
        BLIND: true,
        FARMER: true
    },
    DRAW_HEALTH: false
};
exports.eggchip = {
    PARENT: [exports.sunchip],
    SHAPE: 0
};
exports.autosunchip = {
    PARENT: [exports.sunchip],
    AI: {
        BLIND: true,
        FARMER: true
    },
    INDEPENDENT: true
};
exports.autoeggchip = {
    PARENT: [exports.autosunchip],
    SHAPE: 0
};
exports.pentachip = {
    PARENT: [exports.sunchip],
    SHAPE: 5
};
exports.summonerDrone = {
    PARENT: [exports.sunchip],
    NECRO: false
};
exports.gunchip = {
    PARENT: [exports.sunchip],
    SHAPE: -2
};
exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4
    },
    AI: {
        BLIND: true
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    GUNS: [{
        POSITION: [17, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minionGun]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet
        }
    }]
};
exports.setTrap = {
    PARENT: [exports.trap],
    LABEL: 'Set Trap',
    SHAPE: -4,
    MOTION_TYPE: 'motor',
    CONTROLLERS: ['goToMasterTarget'],
    BODY: {
        SPEED: 1,
        DENSITY: 5
    }
};
exports.unsetTrap = {
    PARENT: [exports.trap],
    LABEL: 'Set Trap',
    SHAPE: -4,
    MOTION_TYPE: 'motor',
    BODY: {
        SPEED: 1,
        DENSITY: 5
    }
};
exports.boomerang = {
    PARENT: [exports.trap],
    LABEL: 'Boomerang',
    CONTROLLERS: ['boomerang'],
    MOTION_TYPE: 'motor',  
    HITS_OWN_TYPE: 'never',
    SHAPE: -5,
    BODY: {
        SPEED: 1.25,
        RANGE: 120
    }
};
exports.autoTankGun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{
        POSITION: [22, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret]),
            TYPE: exports.bullet,
        }
    }]
};
exports.bansheegun = {
    PARENT: [exports.autoTankGun],
    BODY: {
        FOV: 2
    },
    INDEPENDENT: true,
    GUNS: [{
        POSITION: [26, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret, { reload: 1.5 }]),
            TYPE: exports.bullet
        }
    }]
};
exports.auto4gun = {
    PARENT: [exports.autoTankGun],
    BODY: {
        FOV: 2
    },
    GUNS: [{
        POSITION: [16, 4, 1, 0, -3.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
            TYPE: exports.bullet,
        }
    }]
};
exports.bigauto4gun = {
    PARENT: [exports.auto4gun],
    GUNS: [{
        POSITION: [14, 5, 1, 0, -4.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.twin, g.power, { reload: 2 }]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [14, 5, 1, 0, 4.5, 0, 0.33],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.twin, g.power, { reload: 2 }]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [16, 5, 1, 0, 0, 0, 0.67],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.twin, g.power, { reload: 2 }]),
            TYPE: exports.bullet,
        }
    }]
};
exports.megaAutoTankgun = {
    PARENT: [exports.autoTankGun],
    BODY: {
        FOV: 2
    },
    GUNS: [{
        POSITION: [22, 14, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.autoTurret]),
            TYPE: exports.bullet
        }
    }]
};
exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    COLOR: 16,
    BODY: {
        FOV: 0.8
    },
    GUNS: [{
        POSITION: [22, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret]),
            TYPE: exports.bullet
        }
    }]
};
exports.droneAutoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    COLOR: 16,
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'],
    BODY: {
        FOV: 0.8
    },
    GUNS: [{
        POSITION: [22, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, g.overdrive]),
            TYPE: exports.bullet
        }
    }]
};
exports.turretedDrone = makeAuto(exports.drone, 'Auto-Drone', {
    type: exports.droneAutoTurret
});
exports.autoSmasherTurret = {
    PARENT: [exports.autoTurret],
    GUNS: [{
        POSITION: [20, 6, 1, 0, 5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, { speed: 1.2 }, g.machineGun, g.pounder, { reload: 0.75 }, { reload: 0.75 }]),
            TYPE: exports.bullet,
            STAT_CALCULATOR: gunCalcNames.fixedReload
        }
    }, {
        POSITION: [20, 6, 1, 0, -5, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, { speed: 1.2 }, g.machineGun, g.pounder, { reload: 0.75 }, { reload: 0.75 }]),
            TYPE: exports.bullet,
            STAT_CALCULATOR: gunCalcNames.fixedReload
        }
    }]
};
exports.architectGun = {
    PARENT: [exports.autoTurret],
    LABEL: '',
    GUNS: [{
        POSITION: [20, 16, 1, 0, 0, 0, 0] 
    }, {
        POSITION: [2, 16, 1.1, 20, 0, 0, 0], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.autoTurret]),
                TYPE: exports.setTrap
            }, },
    ],
};
exports.pillboxTurret = {
    PARENT: [exports.autoTurret],
    LABEL: '',
    BODY: {
        FOV: 2
    },
    HAS_NO_RECOIL: true,
    GUNS: [{
        POSITION: [22, 11, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.turret, g.power, g.autoTurret, { density: 0.1 }]),
            TYPE: exports.bullet
        }
    }]
};
exports.pillbox = {
    PARENT: [exports.setTrap],
    LABEL: 'Pillbox',
    CONTROLLERS: ['nearestDifferentMaster'],
    INDEPENDENT: true,
    DIE_AT_RANGE: true, 
    TURRETS: [{
        POSITION: [11, 0, 0, 0, 360, 1],
        TYPE: exports.pillboxTurret,
    }]
};
exports.unsetPillbox = {
    PARENT: [exports.unsetTrap],
    LABEL: 'Pillbox',
    CONTROLLERS: ['nearestDifferentMaster'],
    INDEPENDENT: true,
    DIE_AT_RANGE: true, 
    TURRETS: [{
        POSITION: [11, 0, 0, 0, 360, 1],
        TYPE: exports.pillboxTurret,
    }]
};
exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.175,
        DAMAGE: 2.25,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.6,
        FOV: 1.5
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true
};
exports.autoswarm = {
    PARENT: [exports.swarm],
    AI: {
        FARMER: true
    },
    INDEPENDENT: true
};
exports.bee = {
    PARENT: [exports.swarm],
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 4, 
    LABEL: 'Drone',
    HITS_OWN_TYPE: 'hardWithBuffer'
};
exports.hive = {
    PARENT: [exports.bullet],
    LABEL: 'Hive',
    BODY: {
        RANGE: 90,
        FOV: 0.5
    },  
    FACING_TYPE: 'turnWithSpeed',
    INDEPENDENT: true,
    CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf'],
    AI: {
        NO_LEAD: true
    },
    GUNS: [{
        POSITION: [7, 9.5, 0.6, 7, 0, 108, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
            TYPE: [exports.bee, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 9.5, 0.6, 7, 0, 180, 0.2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
            TYPE: [exports.bee, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 9.5, 0.6, 7, 0, 252, 0.4],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
            TYPE: [exports.bee, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 9.5, 0.6, 7, 0, 324, 0.6],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
            TYPE: [exports.bee, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 9.5, 0.6, 7, 0, 36, 0.8],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
            TYPE: [exports.bee, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }],
};
exports.overdriveDeco = makeDeco(4)
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true
};
exports.spikeBody = {
    PARENT: [exports.smasherBody],
    SHAPE: 3
};

// TANKS
exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    DANGER: 4,
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet
        }
    }]
};

// DEVELOPER-ONLY STUFF
exports.testbed = {
    PARENT: [exports.genericTank],
    LABEL: 'TESTBED',
    RESET_UPGRADES: true,
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    LEVEL: -1,
    BODY: {
        SHIELD: 1000,
        REGEN: 10,
        HEALTH: 100,
        DAMAGE: 10,
        DENSITY: 20,
        FOV: 2
    },
    SHAPE: [
        [-1, -0.8],
        [-0.8, -1],
        [0.8, -1],
        [1, -0.8],
        [0.2, 0],
        [1, 0.8],
        [0.8, 1],
        [-0.8, 1],
        [-1, 0.8]
    ],
    GUNS: [{
        POSITION: [18, 10, -1.4, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.op]),
            TYPE: exports.developerBullet
        }
    }]
};
exports.auraBasicGen = addAura();
exports.auraBasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Aura Basic',
    DANGER: 4,
	TURRETS: [{
        POSITION: [14, 0, 0, 0, 0, 1],
        TYPE: exports.auraBasicGen
    }],
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet
        }
    }]
};
exports.whirlwindDeco = makeDeco(6);
exports.whirlwindDeco.CONTROLLERS = [['spin', { independent: true, speed: 0.128 }]];
exports.whirlwind = {
    PARENT: [exports.genericTank],
    LABEL: 'Whirlwind',
    ANGLE: 60,
    CONTROLLERS: ['whirlwind'],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    TURRETS: [{
        POSITION: [8, 0, 0, 0, 360, 1],
        TYPE: exports.whirlwindDeco
    }],
    AI: {
        SPEED: 2,
    },
    GUNS: [{
        POSITION: [1, 8, 0, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.satellite]), 
            TYPE: [exports.satellite, { ANGLE: 0 }],
            MAX_CHILDREN: 1,   
            AUTOFIRE: true,  
            SYNCS_SKILLS: false,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [1, 8, 0, 0, 0, 0, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.satellite]), 
            TYPE: [exports.satellite, { ANGLE: 60 }],
            MAX_CHILDREN: 1,   
            AUTOFIRE: true,  
            SYNCS_SKILLS: false,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [1, 8, 0, 0, 0, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.satellite]), 
            TYPE: [exports.satellite, { ANGLE: 120 }],
            MAX_CHILDREN: 1,   
            AUTOFIRE: true,  
            SYNCS_SKILLS: false,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [1, 8, 0, 0, 0, 0, 0.75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.satellite]), 
            TYPE: [exports.satellite, { ANGLE: 180 }],
            MAX_CHILDREN: 1,   
            AUTOFIRE: true,  
            SYNCS_SKILLS: false,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [1, 8, 0, 0, 0, 0, 1],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.satellite]), 
            TYPE: [exports.satellite, { ANGLE: 240 }],
            MAX_CHILDREN: 1,   
            AUTOFIRE: true,  
            SYNCS_SKILLS: false,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [1, 8, 0, 0, 0, 0, 1.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.satellite]), 
            TYPE: [exports.satellite, { ANGLE: 300 }],
            MAX_CHILDREN: 1,   
            AUTOFIRE: true,  
            SYNCS_SKILLS: false,
            WAIT_TO_CYCLE: true
        }
    }]
};

// Obstacles
exports.rock = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    CAN_GO_OUTSIDE_ROOM: true,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    ACCEPTS_SCORE: false
};
exports.stone = {
    PARENT: [exports.rock],
    LABEL: 'Stone',
    SIZE: 32,
    SHAPE: -7
};
exports.moon = {
    PARENT: [exports.rock],
    LABEL: 'Moon',
    SIZE: 60,
    SHAPE: 0
};
exports.gravel = {
    PARENT: [exports.rock],
    LABEL: 'Gravel',
    SIZE: 16,
    SHAPE: -7
};
exports.wall = {
    PARENT: [exports.rock],
    LABEL: 'Wall',
    SIZE: 25,
    SHAPE: 'M 1 1 L -1 1 L -1 -1 L 1 -1 Z',
    VARIES_IN_SIZE: false
};

// DOMINATORS
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true
};

// ENEMY UNITS
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: {
        NO_LEAD: true
    },
    BODY: {
        SPEED: 5,
        ACCELERATION: 1.4,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true
};
exports.crasherSpawner = {
    PARENT: [exports.genericTank],
    LABEL: 'Spawned',
    STAT_NAMES: statnames.drone,
    CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 5,
    INDEPENDENT: true,
    AI: {
        chase: true
    },
    MAX_CHILDREN: 4,
    GUNS: [{
        POSITION: [6, 12, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
            TYPE: [exports.drone, {
                LABEL: 'Crasher',
                VARIES_IN_SIZE: true,
                DRAW_HEALTH: true
            }]
        }
    }]
};
exports.sentry = {
    PARENT: [exports.genericTank],
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    BODY: {
        FOV: 0.5,
        ACCEL: 0.75,
        DAMAGE: base.DAMAGE,
        SPEED: base.SPEED * 0.5,
        HEALTH: base.HEALTH * 0.3
    }
};
exports.sentryAI = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8,
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: {
        NO_LEAD: true
    },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.75,
        DAMAGE: base.DAMAGE,
        SPEED: base.SPEED * 0.5,
        HEALTH: base.HEALTH * 0.3
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true
    },
    GUNS: [{
        POSITION: [16, 14, 1, 0, 0, 0, 0]
    }, {
        POSITION: [4, 14, 1.8, 16, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.lowPower, { speed: 1.2 }, { reload: 2 }]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }]
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    GUNS: [{
        POSITION: [7, 14, 0.6, 7, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, { recoil: 1.15 }]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        }
    }]
};
exports.sentrySwarmAI = {
    PARENT: [exports.sentryAI],
    GUNS: [{
        POSITION: [7, 14, 0.6, 7, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, { recoil: 1.15 }]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        }
    }]
};
exports.megaAutoTurret = {
    PARENT: [exports.autoTurret],
    BODY: {
        FOV: 2,
	SPEED: 0.9
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    GUNS: [{
        POSITION: [22, 14, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.autoTurret]),
            TYPE: exports.bullet
        }
    }]
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.megaAutoTurret, size: 12, });
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.trapTurret, size: 12, });
exports.sentryGunAI = makeAuto(exports.sentryAI, 'Sentry', { type: exports.megaAutoTurret, size: 12, });
exports.sentryTrapAI = makeAuto(exports.sentryAI, 'Sentry', { type: exports.trapTurret, size: 12, });

// BASE PROTECTOR
exports.baseProtectBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true
};
exports.baseSwarmTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Protector',
    COLOR: 16,
    BODY: {
        FOV: 2
    },
    CONTROLLERS: ['nearestDifferentMaster'],
    AI: {
        NO_LEAD: true,
        LIKES_SHAPES: true
    },
    INDEPENDENT: true,
    GUNS: [{
        POSITION: [5, 4.5, 0.6, 7, 2, 0, 0.15],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.baseProtector]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,          
        }
    }, {
        POSITION: [5, 4.5, 0.6, 7, -2, 0, 0.15],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.baseProtector]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [5, 4.5, 0.6, 7.5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.baseProtector]),
            TYPE: [exports.swarm, {
                INDEPENDENT: true,
                AI: {
                    LIKES_SHAPES: true
                }
            }],
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }]
};
exports.baseProtector = {
    PARENT: [exports.genericTank],
    LABEL: 'Base',
    SIZE: 64,
    DAMAGE_CLASS: 0,
    ACCEPTS_SCORE: false,
    SKILL: skillSet({ 
        rld: 1,
        dam: 1,
        pen: 1,
        spd: 1,
        str: 1,
    }),
    BODY: {
        SPEED: 0,
        HEALTH: 1e4,
        DAMAGE: 10,
        PENETRATION: 0.25,
        SHIELD: 1e3,
        REGEN: 100,
        FOV: 1,
        PUSHABILITY: 0,
        RESIST: 10000,
        HETERO: 0
    },
    FACING_TYPE: 'autospin',
    TURRETS: [{
        POSITION: [25, 0, 0, 0, 360, 0],
        TYPE: exports.baseProtectBody
    }, {
        POSITION: [12, 7, 0, 45, 100, 0],
        TYPE: exports.baseSwarmTurret
    }, {
        POSITION: [12, 7, 0, 135, 100, 0],
        TYPE: exports.baseSwarmTurret
    }, {
        POSITION: [12, 7, 0, 225, 100, 0],
        TYPE: exports.baseSwarmTurret
    }, {
        POSITION: [12, 7, 0, 315, 100, 0],
        TYPE: exports.baseSwarmTurret
    }],
    GUNS: [{
        POSITION: [4.5, 11.5, -1.3, 6, 0, 45, 0]
    }, {
        POSITION: [4.5, 11.5, -1.3, 6, 0, 135, 0]
    }, {
        POSITION: [4.5, 11.5, -1.3, 6, 0, 225, 0]
    }, {
        POSITION: [4.5, 11.5, -1.3, 6, 0, 315, 0]
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, 45, 0]
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, 135, 0]
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, 225, 0]
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, 315, 0]
    }],
};

// BOTS
exports.bot = {
    ACCEPTS_SCORE: true,
    FACING_TYPE: 'smoothToTarget',
    SIZE: 12,
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'],
    AI: {
		STRAFE: true
	}
};
exports.bot2 = {
    ACCEPTS_SCORE: true,
    FACING_TYPE: 'smoothToTarget',
    SIZE: 12,
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal', 'fleeAtLowHealth'],
    AI: {
		STRAFE: true
	}
};

// BOSSES
exports.miniboss = {
    PARENT: [exports.genericBoss],
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: {
	    NO_LEAD: true
    }
};
exports.ramMiniboss = {
    PARENT: [exports.genericBoss],
    CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'mapTargetToGoal']
};
exports.elite = {
    PARENT: [exports.miniboss],
    LABEL: 'Elite Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 27,
    VARIES_IN_SIZE: true,
    VALUE: 15e4,
    BODY: {
        FOV: 1.25,
        SPEED: base.SPEED * 0.1,
        HEALTH: base.HEALTH * 7,
        DAMAGE: base.DAMAGE * 2.5
    }
};

// UPGRADE PATHS
exports.testbed.UPGRADES_TIER_3 = [exports.basic];
exports.basic.UPGRADES_TIER_1 = [];

// EVOLUTIONS
exports.egg.EVOLUTIONS = [
    ['square', 99.95-1/50-1/1000-1/3000-1/57000], ['gem', 0.05], ['shinyEgg', 1/50], ['legendaryEgg', 1/1000], ['shadowEgg', 1/3000], ['sphere', 1/57000]
];
exports.gem.EVOLUTIONS = [
    ['jewel', 100]
];
exports.jewel.EVOLUTIONS = [];
exports.square.EVOLUTIONS = [
    ['triangle', 100-1/50-1/1000-1/3000-1/57000], ['shinySquare', 1/50], ['legendarySquare', 1/1000], ['shadowSquare', 1/3000], ['cube', 1/57000]
];
exports.triangle.EVOLUTIONS = [
    ['pentagon', 100-1/50-1/1000-1/3000-1/57000], ['shinyTriangle', 1/50], ['legendaryTriangle', 1/1000], ['shadowTriangle', 1/3000], ['tetrahedron', 1/57000]
];
exports.pentagon.EVOLUTIONS = [
    ['hexagon', 100-1/50-1/1000-1/3000-1/57000], ['shinyPentagon', 1/50], ['legendaryPentagon', 1/1000], ['shadowPentagon', 1/3000], ['dodecahedron', 1/57000]
];
exports.betaPentagon.EVOLUTIONS = [
    ['alphaPentagon', 100-1/50-1/1000-1/3000], ['shinyBetaPentagon', 1/50], ['legendaryBetaPentagon', 1/1000], ['shadowBetaPentagon', 1/3000]
];
exports.alphaPentagon.EVOLUTIONS = [
    ['alphaPentagon', 100-1/50-1/1000-1/3000], ['shinyAlphaPentagon', 1/50], ['legendaryAlphaPentagon', 1/1000], ['shadowAlphaPentagon', 1/3000]
];
exports.hexagon.EVOLUTIONS = [
    ['hexagon', 100-1/50-1/1000-1/3000-1/57000], ['shinyHexagon', 1/50], ['legendaryHexagon', 1/1000], ['shadowHexagon', 1/3000], ['icosahedron', 1/57000]
];
