window.defExports = {}

// Stats
convert = (stat) => [stat.reload, stat.recoil, stat.shudder, stat.size, stat.health, stat.damage, stat.pen, stat.speed, stat.maxSpeed, stat.range, stat.density, stat.spray, stat.resist];

const stats = {
    basic: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    },
    blank: {
        reload: 1,
        recoil: 1,
        shudder: 1,
        size: 1,
        health: 1,
        damage: 1,
        pen: 1,
        speed: 1,
        maxSpeed: 1,
        range: 1,
        density: 1,
        spray: 1,
        resist: 1
    }
}
global.utility.log("Started parsing stats...");

let g = {};
for (let stat in stats) g[stat] = convert(stats[stat]);

for (let key in g) {
    if (g[key].length !== 13) {
        throw new Error("Error with gun stat: " + key + "\nThis stat has the incorrect amount of values, please fix it.");
    };
    for (let i = 0; i < g[key].length; i++) {
        let value = g[key][i];
        if (isNaN(value)) {
            throw new Error("Error with gun stat: " + key + "\nThis stat has a non numerical value, please fix it.");
        }
    }
}

global.utility.log("Finished parsing stats!");

// Tank Definitions
const combineStats = array => {
    try {
        let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        for (let component of array)
            for (let i = 0; i < data.length; ++i) data[i] *= component[i];
        if (data.some(e => isNaN(e))) {
            throw new Error("Invalid combine")
        }
        return {
            reload: data[0],
            recoil: data[1],
            shudder: data[2],
            size: data[3],
            health: data[4],
            damage: data[5],
            pen: data[6],
            speed: data[7],
            maxSpeed: data[8],
            range: data[9],
            density: data[10],
            spray: data[11],
            resist: data[12]
        };
    } catch (e) {
        console.log(e);
        console.log(JSON.stringify(array));
    }
};

const { lerp } = require("./util.js");
global.utility.log("Started parsing definitions...");

const setSkill = (s1, s2, s3, s4, s5, s6, s7, s8, s9, s10) => [s7, s5, s4, s6, s3, s10, s1, s2, s9, s8];
const statNames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
    autoSmash: 7,
    minion: 8,
    jumpSmash: 9,
    block: 10,
    boomer: 11,
    lancer: 12,
    flail: 13,
    inject: 14,
    desmos: 15,
    whirl: 16,
    heal: 17
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
    trap: 8
};
const base = {
    ACCEL: 2,
    SPEED: 5.4,
    HEALTH: 20,
    DAMAGE: 3/*3*/,
    RESIST: 1,
    PENETRATION: 1.6/*1.05*/,
    SHIELD: 3,
    REGEN: .025,
    DENSITY: .35,
    FOV: 1.04,
    PUSHABILITY: 1
};
base.ACCELERATION = base.ACCEL;

// Prop functions
const makeAura = (color, size = 1, sizemult = 4) => {
    return {
        POSITION: [sizemult * size, 0, 0, 0, -2],
        SHAPE: 0,
        COLOR: color,
        IS_AURA: true
    };
};
const makeShell = (options = {}) => {
    options.size = options.size == null ? 1 : options.size;
    options.shape = options.shape == null ? 6 : options.shape;
    options.color = options.color == null ? 9 : options.color;
    options.rpm = options.rpm == null ? 4 : options.rpm == 0 ? undefined : options.rpm;
    options.angle = options.angle == null ? 0 : options.angle;
    options.dip = options.dip == null ? 1 : options.dip;
    return {
        POSITION: [1.17 * options.size, 0, 0, options.angle, -1],
        SHAPE: options.shape,
        COLOR: options.color,
        RPM: options.rpm,
        DIP: options.dip,
    }
};
const fixPoint = (x, y, n) => {
    return [
        x * Math.cos(n) - y * Math.sin(n),
        x * Math.sin(n) + y * Math.cos(n),
    ];
}

// Tools for abilities
const timer = (execute, duration) => {
    let timer = setInterval(() => execute(), 31.25);
    setTimeout(() => {
        clearInterval(timer);
    }, duration * 1000);
};

// Abilities
const fireRandom = (gun, bulletArr, statArr, runThis) => {
    let rand = Math.floor(Math.random() * bulletArr.length);
    gun.bulletTypes = [bulletArr[rand]];
    gun.settings = statArr != undefined ? statArr[rand] : gun.settings;
    fireGun(gun);
};
const fireGun = (gun) => {
    gun.fire(
        gun.offset * Math.cos(gun.direction + gun.angle + gun.body.facing) + (1.35 * gun.length - gun.width * gun.settings.size / 2) * Math.cos(gun.angle + gun.body.facing),
        gun.offset * Math.sin(gun.direction + gun.angle + gun.body.facing) + (1.35 * gun.length - gun.width * gun.settings.size / 2) * Math.sin(gun.angle + gun.body.facing),
        gun.body.skill
    );
};
const animate = (me, tank, frames, duration, isFirstFrame, offset = 0, entities, resetToFirstFrame = false) => {
    let i = 1;
    if (entities) {
        entities.forEach(o => {
            if (o.settings.clearOnMasterUpgrade && o.master.id === me.id && o.id !== me.id && o !== me) o.kill();
        });
    }
    const animInterval = setInterval(() => {
        if (me.isAlive() && i <= frames) {
            me.upgrades = [];
            me.define(Class[`${tank}${(resetToFirstFrame && i == frames) ? 0 : isFirstFrame ? i + offset : frames - i}`]);
            i += 1;
        } else {
            if (me.isAlive && me.isShapeshifter) {
                me.onKill = defExports.shapeshifter.ON_KILL
                me.upgrades = [];
            }
            clearInterval(animInterval);
        }
    }, duration);
};
const necro = (source, them, necroThis, initThis, options = {}) => {
    if (!them || !initThis) return false
    let theirType = options.type || 'food';
    let shootPermission = initThis.countsOwnKids ? initThis.countsOwnKids > initThis.children.length * initThis.body.skill.rld : initThis.body.maxChildren ? initThis.body.maxChildren > initThis.body.children.length * initThis.body.skill.rld : true;
    if (them.type == theirType && necroThis.includes(them.label) && shootPermission) {
        const theirFacing = them.facing;
        const theirSize = them.size;
        them.define(Class.genericEntity);
        initThis.bulletInit(them);
        them.team = source.team;
        them.master = source;
        them.color = source.color;
        them.facing = theirFacing;
        them.SIZE = theirSize;
        them.health.amount = them.health.max;
        them.onDamageDealt = (me2, them2) => {
            necro(me2.source, them2, necroThis, initThis);
        }
    }
    return true
};
const necroDrone = (me, them, necroThis, options = {}) => {
    return necro(me.source, them, necroThis, me.source.guns[me.gunIndex], options);
};
const necroRam = (me, them, necroThis, gunIndex, options = {}) => {
    return necro(me, them, necroThis, me.guns[gunIndex], options);
};
defExports.genericEntity = {
        NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: default, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase, glide
    FACING_TYPE: 'toTarget',
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATIO_EFFECTS: false,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HAS_NO_SKILL_POINTS: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer, normal
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
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    UPGRADES_TIER_4: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    GUNS: [],
    TURRETS: [],
    LASERS: [],
    PROPS: [],
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
    DIES_TO_TEAM_BASE: true,
    GOD_MODE: false,
    GO_THRU_OBSTACLES: false,
    LAYER: -1,
    INVISIBLE: [0, 0, 1],
    SYNC_TURRET_SKILLS: false,
    SCOPED: false,
    SEE_INVISIBLE: false,
    BROADCAST_MESSAGE: null,
    ABILITY_IMMUNE: false,
    IS_ARENA_CLOSER: false,
    ALWAYS_ACTIVE: false,
    MISC_IDENTIFIER: "None",
    SWITCHEROO_ID: -1,
    DIES_BY_OBSTACLES: false,
    HAS_ANIMATION: false
};
defExports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    ALPHA: 1,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,
    DAMAGE_EFFECTS: false,
    BODY: {
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH,
        DAMAGE: base.DAMAGE,
        PENETRATION: base.PENETRATION,
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: 1,
        DENSITY: base.DENSITY * 2,
        PUSHABILITY: base.PUSHABILITY,
        HETERO: 3
    },
    GUNS: [],
    TURRETS: [],
    LASERS: [],
    PROPS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
    HAS_NO_SKILL_POINTS: false,
    GO_THRU_OBSTACLES: false,
    CAN_GO_OUTSIDE_ROOM: false,
    LAYER: -1,
    INVISIBLE: [0, 0, 1],
    HITS_OWN_TYPE: 'hardOnlyTanks',
    SYNC_TURRET_SKILLS: false,
    HAS_NO_RECOIL: false,
    SCOPED: false,
    SEE_INVISIBLE: false,
    BROADCAST_MESSAGE: null,
    ABILITY_IMMUNE: false,
    IS_ARENA_CLOSER: false,
    ALWAYS_ACTIVE: false,
    MISC_IDENTIFIER: "None",
    HAS_ANIMATION: false,
};
function shootSettingsToGStat(settings) {
    const {
        reload,
        recoil,
        shudder,
        size,
        health,
        damage,
        pen,
        speed,
        maxSpeed,
        range,
        density,
        spray,
        resist
    } = settings;
    return [reload, recoil, shudder, size, health, damage, pen, speed, maxSpeed, range, density, spray, resist];
}
defExports.turretParent = {
    PARENT: [defExports.genericTank],
    LABEL: "Turret",
    DANGER: 0,
    CONTROLLERS: ["canRepel", "mapAltToFire", "nearestDifferentMaster", "onlyAcceptInArc"]
};
// GENERIC FUNCTIONS
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
let customCounters = {};
const makeExportName = (type, append, stats = []) => {
    let out;

    for (let entity in defExports) {
        if (defExports[entity] == type) out = entity;
    }

    if (out == undefined) {
        if (customCounters[append] == undefined) customCounters[append] = 0;
        return `custom${append}${customCounters[append]++}`;
    }

    out += append;

    for (let starArr of stats) {
        for (let numb of starArr) {
            out += `${numb}`.replaceAll('.', 'o').replaceAll(',', 'l');
        }
    }

    return out;
};
const newExport = (name) => { // replace all instances with makeExportName
    name = name.replace(/[^a-z0-9]/gi, '');
    for (i = 0; defExports[name + (i || '')] != undefined; i++) { }
    if (i) name += i;
    return name;
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
const createTurret = (type, stats = [g.blank], syncTurretSkills = true) => {
    let output = deepCopy(type);
    output.LABEL = 'Turret';
    output.DANGER = 0;
    output.CONTROLLERS = ["canRepel", "mapAltToFire", "nearestDifferentMaster", "onlyAcceptInArc"];
    applyStats(output.GUNS, [g.turret, ...stats]);
    output.SYNC_SKILLS = output.SYNC_TURRET_SKILLS = output.SYNCS_SKILLS = syncTurretSkills;
    return output;
};
const createTurretBoss = (type, stats = [g.blank], syncTurretSkills = true) => {
    return createTurret(type, [[1, 0, 1, 1.176, 1.667, 1.667, 1.667, 1.111, 1.176, 1, 10, 1, 1], ...stats], syncTurretSkills);
};
// CANNON FUNCTIONS
const makeFlankTrap = (type, name, statSet = [g.blank]) => {
    let output = deepCopy(type);
    output.LABEL = name || output.LABEL + ' Guard';
    output.STAT_NAMES = statNames.generic;
    if (output.DANGER < 7) output.DANGER++;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [13, 8, 1, 0, 0, 180, 0]
    }, {
        POSITION: [17, 2, 1, 0, 2.5, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, ...statSet]),
            TYPE: defExports.trap,
            STAT_CALCULATOR: gunCalcNames.trap
        }
    });
    return output;
};
const makeConq = (type, name, statSet = [g.blank]) => {
    let output = deepCopy(type);
    output.LABEL = name || output.LABEL + ' Conqueror';
    output.STAT_NAMES = statNames.generic;
    if (output.DANGER < 7) output.DANGER++;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [18, 14, 1, 0, 0, 180, 0]
    }, {
        POSITION: [2, 14, 1.1, 18, 0, 180, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, ...statSet]),
            TYPE: defExports.block
        }
    });
    return output;
};
const makeSplit = (type, name, statSet = [g.blank]) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Split ' + output.LABEL;
    output.STAT_NAMES = statNames.generic;
    if (output.DANGER < 7) output.DANGER++;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [18, 8, 1, 0, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, ...statSet]),
            TYPE: defExports.bullet
        }
    }, {
        POSITION: [18, 8, 1, 0, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, ...statSet]),
            TYPE: defExports.bullet
        }
    });
    return output;
};
const makeGunnerFlank = (type, name, statSet = [g.blank]) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Gunner ' + output.LABEL;
    output.STAT_NAMES = statNames.generic;
    if (output.DANGER < 7) output.DANGER++;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [19, 2, 1, 0, -2.5, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, ...statSet]),
            TYPE: defExports.bullet
        }
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 180, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, ...statSet]),
            TYPE: defExports.bullet
        }
    }, {
        POSITION: [12, 11, 1, 0, 0, 180, 0]
    });
    return output;
};
const makeFlank = (type, sides = 3, name, options = {}) => {
    let output = deepCopy(type),
        reloadDelay = options.reload_delay || new Array(sides),
        stats = options.stats || [g.blank],
        angles = options.angles || new Array(sides);

    applyStats(output.GUNS, [g.flank, ...stats]);

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
    if (output.DANGER < 7) output.DANGER++;
    output.LABEL = name || `Flank ${output.LABEL}`;
    return output;
};
const makeBird = (type, name, statSet = [g.blank]) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Bird ' + output.LABEL;
    output.STAT_NAMES = statNames.generic;
    if (output.DANGER < 7) output.DANGER++;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [16, 8, 1, 0, 0, 150, .1],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, ...statSet]),
            TYPE: defExports.bullet
        }
    }, {
        POSITION: [16, 8, 1, 0, 0, 210, .1],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, ...statSet]),
            TYPE: defExports.bullet
        }
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, .6],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, ...statSet]),
            TYPE: defExports.bullet
        }
    });
    return output;
};
// SPAWNER FUNCTIONS
const makeHybrid = (type, name, options = {
    drone: 'drone'
}) => {
    let output = deepCopy(type);

    options.drone = options.drone ?? 'drone';

    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [7, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [defExports[options.drone], {
                INDEPENDENT: true
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
        }
    });

    output.LABEL = name ?? 'Hybrid ' + type.LABEL;
    if (output.DANGER < 7) output.DANGER++;
    output.STAT_NAMES = statNames.generic;

    return output;
};
const makeOver = (type, name, options = {
    drone: 'drone'
}) => {
    let output = deepCopy(type);

    options.drone = options.drone ?? 'drone';

    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [6, 12, 1.2, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: defExports[options.drone],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: defExports[options.drone],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
        }
    });

    output.LABEL = name ?? 'Over' + type.LABEL.toLowerCase();
    if (output.DANGER < 7) output.DANGER++;
    output.STAT_NAMES = statNames.generic;

    return output;
};
const makeOversplit = (type, name, options = {
    drone: 'drone'
}) => {
    let output = deepCopy(type);

    options.drone = options.drone ?? 'drone';

    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [6, 12, 1.2, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: defExports[options.drone],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: defExports[options.drone],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
        }
    });

    output.LABEL = name ?? 'Over' + type.LABEL.toLowerCase();
    if (output.DANGER < 7) output.DANGER++;
    output.STAT_NAMES = statNames.generic;

    return output;
};
const makeBattle = (type, name, options = {
    drone: 'swarm'
}) => {
    let output = deepCopy(type);

    options.drone = options.drone ?? 'swarm';

    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [7, 7.5, 0.6, 7, 4, 125, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: defExports[options.drone],
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, 0.6, 7, -4, 125, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: defExports[options.drone],
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, 0.6, 7, 4, 235, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: defExports[options.drone],
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, 0.6, 7, -4, 235, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: defExports[options.drone],
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    });

    output.LABEL = name ?? 'Battle' + type.LABEL.toLowerCase();
    if (output.DANGER < 7) output.DANGER++;
    output.STAT_NAMES = statNames.generic;

    return output;
};
const makeCap = (type, name, options = {
    drone: 'minion'
}) => {
    let output = deepCopy(type);

    options.drone = options.drone ?? 'minion';

    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [4.5, 10, 1, 10.5, 0, 125, 0]
    }, {
        POSITION: [1, 12, 1.01, 15, 0, 125, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory, g.baby_factory]),
            TYPE: defExports[options.drone],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            MAX_CHILDREN: 4
        }
    }, {
        POSITION: [11.5, 12, 1, 0, 0, 125, 0]
    }, {
        POSITION: [4.5, 10, 1, 10.5, 0, 235, 0]
    }, {
        POSITION: [1, 12, 1.01, 15, 0, 235, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory, g.baby_factory]),
            TYPE: defExports[options.drone],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            MAX_CHILDREN: 4
        }
    }, {
        POSITION: [11.5, 12, 1, 0, 0, 235, 0]
    });

    output.LABEL = name ?? 'Cap' + type.LABEL.toLowerCase();
    if (output.DANGER < 7) output.DANGER++;
    output.STAT_NAMES = statNames.generic;

    return output;
};
const makeCross = (type, name, options = {
    drone: 'drone'
}) => {
    let output = deepCopy(type);

    options.drone = options.drone ?? 'drone';

    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [6, 12, 1.2, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: defExports[options.drone],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: defExports[options.drone],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: defExports[options.drone],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2
        }
    });

    output.LABEL = name ?? 'Cross-' + type.LABEL;
    if (output.DANGER < 7) output.DANGER++;
    output.STAT_NAMES = statNames.generic;

    return output;
};
const makeSwarming = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Swarming ' + type.LABEL;
    if (output.DANGER < 7) output.DANGER++;
    output.STAT_NAMES = statNames.generic;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [7, 7.5, .6, 7, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: defExports.autoSwarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    });
    return output;
};
const makeBiSwarming = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Bi-Swarming ' + type.LABEL;
    if (output.DANGER < 7) output.DANGER++;
    output.STAT_NAMES = statNames.generic;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [7, 7.5, .6, 7, 0, 25, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: defExports.autoSwarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, .6, 7, 0, -25, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: defExports.autoSwarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    });
    return output;
};
const makeTriSwarming = (type, name) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Tri-Swarming ' + type.LABEL;
    if (output.DANGER < 7) output.DANGER++;
    output.STAT_NAMES = statNames.generic;
    output.GUNS = output.GUNS || [];
    output.GUNS.push({
        POSITION: [7, 7.5, .6, 7, 0, 45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: defExports.autoSwarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, .6, 7, 0, -45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: defExports.autoSwarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [7, 7.5, .6, 7, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: defExports.autoSwarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    });
    return output;
};
// AUTO FUNCTIONS
const makeAuto = (type, name, options = {}) => {
    let output = deepCopy(type);
    output.LABEL = name || 'Auto-' + type.LABEL;
    output.EVOLUTIONS = options.evolutions
    if (output.DANGER < 7) output.DANGER++;
    output.TURRETS = output.TURRETS || [];
    options = {
        size: options.size == undefined ? 10 : options.size,
        x: options.x == undefined ? 0 : options.x,
        angle: options.angle == undefined ? 180 : options.angle,
        rot: options.rot == undefined ? 360 : options.rot,
        layer: options.layer == undefined ? 1 : options.layer,
        type: options.type == undefined ? defExports.autoTurret : options.type,
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
const makeCeption = (type, name, options = {}) => {
    let output = deepCopy(type),
        statSet = options.stats || [g.blank],
        exportName = makeExportName(type, 'CeptionTurret', [statSet]);

    if (!defExports[exportName]) {
        defExports[exportName] = deepCopy(output);
        defExports[exportName].DANGER = 'ception turret';
        applyStats(defExports[exportName].GUNS, [g.auto_turret, g.less_damage, g.less_power, ...statSet]);
    }

    output.DANGER = output.DANGER < 6 ? output.DANGER + 2 : 7;
    output.TURRETS = output.TURRETS || [];
    output.TURRETS.push({
        POSITION: [10, 0, 0, 180, 361, 1],
        TYPE: [defExports[exportName], {
            CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
            LABEL: 'Auto Turret',
            INDEPENDENT: true,
            COLOR: 16,
            BODY: {
                FOV: .85
            }
        }]
    });
    output.LABEL = name || `${output.LABEL}ception`;
    return output;
};
// END FUNCTIONS
