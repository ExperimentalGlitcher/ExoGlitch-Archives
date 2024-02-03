"use strict";

// Ad stuff
let adStatus = true;
const _displayAds = function (toggle) {
    try {
        if(adStatus === toggle){
            return
        }
        adStatus = toggle

        let wrapperWrapper = document.getElementById("wrapperWrapper")
        wrapperWrapper.style.justifyContent = "flex-start"
        let bottomPageAd = document.getElementById("bottomPageAd")

        if (toggle === true) {
            wrapperWrapper.style.zIndex = 100
            bottomPageAd.style.display = "inline-block"
            return
        }

        wrapperWrapper.style.zIndex = -100
        bottomPageAd.style.display = "none"
    } catch (e) {
        console.error(e)
    }
}

// App.js
function RememberScriptingIsBannable() {
    window.didMainLoad = true
    const _logger = {
        _norm: function (text) {
            console.log(text);
        },
        _info: function (text) {
            console.log("[INFO] " + text);
        },
        _warn: function (text) {
            console.log("[WARN] " + text);
        },
        _error: function (text) {
            console.log("[ERROR] " + text);
        }
    };

    "use strict";
    function _loadImage(image, cache) {
        const img = new Image();
        img.src = image[0];
        img.ready = false;
        img.onload = function () {
            img.ready = true;
            //console.log(`Image "${image[1]} loaded."`);
            cache[image[1]] = img;
        };
    }
    const _imageCache = (function loadImages() {
        const cache = {};
        let i = 0;
        for (let image of [
            ["./resources/exoglitch-io-logo.png", "placeholder"]
        ]) {
            setTimeout(() => {
                if (image[2]) {
                    let file = image[0].split(".png")[0]
                    for (let i = 0; i < image[2]; i++) {
                        _loadImage([`${file}-${i}.png`, `${image[1]}-${i}`], cache)
                    }
                } else {
                    _loadImage(image, cache)
                }
            }, 5 * i++);
        };
        return (cache);
    })();
    let _getSearchFromUrl = (thing) => {
        const url = new URL(window.location)
        return url.searchParams.get(thing)
    }
    let _decodeHash = () => {
        let json;
        try {
            json = JSON.parse(atob(window.location.hash.substring(1)))
        } catch (err) {
            json = {}
        }
        return json
    }
    let _encodeHash = () => {
        return window.location.hash = btoa(JSON.stringify({
            server: _global._windowSearch.server,
            lobby: _global._windowSearch.lobby,
            party: _global._windowSearch.party
        }))
    }
    const _global = {
        _selectedServer: 0,
        _windowSearch: {
            _server: _decodeHash().server,
            _lobby: _decodeHash().lobby,
            _party: _decodeHash().party,
            set server(v) {
                this._server = v
                _encodeHash()
            },
            get server() {
                return this._server
            },
            set lobby(v) {
                this._lobby = v
                _encodeHash()
            },
            get lobby() {
                return this._lobby
            },
            set party(v) {
                this._party = v
                _encodeHash()
            },
            get party() {
                return this._party
            }
        },
        mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|android|mobi/i.test(navigator.userAgent),
        guiMouse: {
            x: 0,
            y: 0
        },
        _localmotion: {
            x: 0,
            y: 0,
            rx: 0,
            ry: 0,
        },
        _sendMessageToClient: (text) => { },
        _mapType: 0,
        _killTracker: 0,
        _forceTwiggle: false,
        KEY_ESC: 27,
        KEY_ENTER: 13,
        _canvas: null,
        KEY_CHAT: 13,
        KEY_FIREFOOD: 119,
        KEY_SPLIT: 32,
        KEY_LEFT: 65,
        KEY_UP: 87,
        KEY_RIGHT: 68,
        KEY_DOWN: 83,
        KEY_LEFT_ARROW: 37,
        KEY_UP_ARROW: 38,
        KEY_RIGHT_ARROW: 39,
        KEY_DOWN_ARROW: 40,
        KEY_AUTO_SPIN: 67,
        KEY_AUTO_FIRE: 69,
        KEY_OVER_RIDE: 82,
        KEY_UPGRADE_ATK: 49,
        KEY_UPGRADE_HTL: 50,
        KEY_UPGRADE_SPD: 51,
        KEY_UPGRADE_STR: 52,
        KEY_UPGRADE_PEN: 53,
        _diedAt: 0,
        KEY_UPGRADE_DAM: 54,
        KEY_UPGRADE_RLD: 55,
        KEY_UPGRADE_MOB: 56,
        KEY_UPGRADE_RGN: 57,
        KEY_UPGRADE_SHI: 48,
        KEY_MOUSE_0: 32,
        //KEY_MOUSE_1: 86,
        KEY_MOUSE_2: 16,
        KEY_LEVEL_UP: 78,
        KEY_TESTBED: 191,
        KEY_TESTBED_FIREFOX: 111,
        KEY_TESTBED_ALT: 192,
        KEY_RESET_BASIC_TANK: 80,
        KEY_SUICIDE: 75,
        KEY_MAX_STATS: 77,
        KEY_GODMODE: 186,
        KEY_GODMODE_2: 59,
        KEY_COLOR_CHANGE: 66,
        KEY_SPAWN_SHAPES: 70,
        KEY_TELEPORT: 84,
        KEY_PASSIVE_MODE: 88,
        KEY_RAINBOW: 187,
        KEY_RAINBOW_2: 61,
        KEY_DEBUG: 76,
        KEY_CLASS_TREE: -69, //85, Disabled for now due to new mockup system
        KEY_TIER_SWITCH: 79,
        KEY_TIER_SWITCH_2: 81,
        KEY_OVERRIDE_ENTITY: 86,
        KEY_INFECT_MINION: 73,
        KEY_RESET_COLOR: 89,
        KEY_CONTROL_DOM: 72,
        KEY_TANK_JOURNEY: 220,
        KEY_KILL_WITH_MOUSE: 71,
        KEY_STEALTH: 74,
        KEY_DRAG: 90,
        DEV_KEY_1: 35,
        DEV_KEY_2: 40,
        DEV_KEY_3: 34,
        DEV_KEY_4: 37,
        DEV_KEY_5: 12,
        DEV_KEY_6: 49,
        DEV_KEY_7: 36,
        DEV_KEY_8: 38,
        DEV_KEY_9: 33,
        _screenWidth: 0,
        _screenHeight: 0,
        _gameWidth: 0,
        _gameHeight: 0,
        _gameStart: false,
        _disconnected: false,
        _died: false,
        _deathScreenState: 1, // 0 = on | 1 = off
        _loadingMockups: true,
        _debug: 1,
        _showTree: false,
        _scrollX: 0,
        _realScrollX: 0,
        _disconnectReason: "The connection was lost for an unknown reason.\nPlease press F12 or ctrl+shift+i then click on the console tab and take a screenshot, then send it in the discord.",
        _disableEnter: false,
        _seeInvisible: false,
        _tipSplash: [
            "Uhhhhhhhhhhhhhhhh",
        ],
        _deathSplash: [
            "You are dead."
        ],
        _deathSplashOverride: 0,
        _deathSplashChoice: 0,
        _tankMenuColor: 0,
        _tankMenuColorReal: 100 + Math.round(Math.random() * 70),
        searchName: "Basic",
        _arenaClosed: false,
        _ratio: window.devicePixelRatio,
        _fps: 60,
        _fpsc: 0,
        _fpscap: 1000 / 60,
        _oldFpsCap: 1000 / 60,
        _bandwidth: {
            _outbound: 0,
            _inbound: 0,
            _out: 0,
            _in: 0
        },
        _sentPackets: 80085,
        _receivedPackets: 80085,
        displayTextUI: {
            enabled: false,
            text: "",
            color: "#FFFFFF"
        },
        _waterAnimation: .5,
        _waterDirection: 1,
        _target: {
            _x: 0,
            _y: 0
        },
        _screenSize: Math.min(1920, Math.max(window.innerWidth, 1280)),
        _mobileOptions: false,
        _mobileFiring: [4, false],
        _mobileChatText: "Chat",
        _standalone: window.navigator.standalone || (window.matchMedia && window.matchMedia("(display-mode: fullscreen), (display-mode: standalone), (display-mode: minimal-ui)").matches),
        _nameGradient: (function getGradient() {
            const gradients = [
                ["#FF0000", "#FFBE00", "#FFFF00", "#BEFF00", "#00FF00", "#00FFBE", "#00FFFF", "#00BEFF", "#0000FF", "#BE00FF", "#FF00FF", "#FF00BE"], // 0 - Rainbow
            ];
            const index = Math.random() * (gradients.length + 1) | 0;
            if (index === gradients.length) {
                let index = 0;
                setInterval(function updateRainbowGradient() {
                    index++;
                    index %= 85;
                    _global._nameGradient = [getColor(100 + index), getColor(100 + ((index + 10) % 85))];
                }, 50);
            }
            return gradients[index];
        })(),
    };
    _global.doParseTree = function parseTree(mockups) {
        let tiles = [],
            branches = [],
            measureSize = (x, y, colorIndex, {
                index,
                tier = 0
            }, lTier = 0) => {
                tier < 0 && (tier = 0);
                lTier > tier && (tier = lTier + 1);
                tiles.push({
                    x,
                    y,
                    colorIndex,
                    index
                });
                let upgrades = mockups[index].upgrades || [];
                switch (tier) {
                    case 5:
                        return {
                            width: 1,
                            height: 1
                        };
                    case 4:
                        upgrades.forEach((u, i) => measureSize(x, y + 2 + i, i, u, tier));
                        if (upgrades.length) branches.push([{
                            x,
                            y
                        }, {
                            x,
                            y: y + 1 + upgrades.length
                        }]);
                        return {
                            width: 1,
                            height: 2 + (upgrades.length || 0)
                        };
                    case 3:
                    case 2:
                    case 1:
                    case 0: {
                        let xStart = x,
                            us = upgrades.map((u, i) => {
                                let uTier = u.tier <= tier ? tier + 1 : u.tier,
                                    spacing = 2 * (uTier - tier),
                                    measure = measureSize(x, y + spacing, i, u, tier);
                                if (upgrades.length) branches.push([{
                                    x,
                                    y: y + (i === 0 ? 0 : 1)
                                }, {
                                    x,
                                    y: y + spacing
                                }]);
                                if (i + 1 === upgrades.length) branches.push([{
                                    x: xStart,
                                    y: y + 1
                                }, {
                                    x,
                                    y: y + 1
                                }]);
                                x += measure.width
                                return measure
                            });
                        return {
                            width: us.map(r => r.width).reduce((a, b) => a + b, 0) || 1,
                            height: 2 + Math.max(0, ...us.map(r => r.height || 1)),
                        }
                    }
                }
            },
            full = measureSize(0, 0, 0, {
                index: _mockups.find(r => r.name === _global.searchName).index
            });
        _global.parsedTreeData = [tiles, branches, full];
        console.log("Upgrade tree has been parsed and is ready to be rendered.");
    };
    _global.parsedTreeData = null;
    var _socket = null;
    _global.mobileClickables = [function () { // Toggle menu
        let clickdata = _global.clickables.mobileClicks.get()
        if(!_global._mobileOptions){
            for (let i = 1; i < clickdata.length; i++) {
                clickdata[i].setActive(i<=6?1:0)
            }
            _global._mobileOptions = true;
        }else{
            for (let i = 1; i < clickdata.length; i++) {
                clickdata[i].setActive(i>=7?1:0)
            }
            _global._mobileOptions = false;
        }
    }, function () { // Level Up
        for (let i = 0; i < 75; i++) {
            setTimeout(() => _socket.talk('L'), i * 25);
        }
    }, function () { // Testbed
        _socket.talk("T", 0);
    }, function () { // Override
        _socket.talk("t", 2);
    }, function () { // Reset Tank
        _socket.talk("T", 2);
    }, function () { // Fullscreen
        _tryFullScreen()
    }, function () { // Chat
        let chatbox = document.getElementById("chatBox")
        if(!chatbox){
            _global._mobileChatText = "Chat"
            _global._canvas._cv.dispatchEvent(new KeyboardEvent('keydown', {
                'keyCode': _global.KEY_CHAT
            }));
        }else{
            _global._mobileChatText = "Chat"
            chatbox.dispatchEvent(new KeyboardEvent('keydown', {
                'keyCode': 13
            }));
        }

    }, function(){ // Firing modes
        _socket.cmd.set(_global._mobileFiring[0], false);
        if(_global._mobileFiring[0] === 4){
            _global._mobileFiring[0] = 6
            if(_global._mobileFiring[1])_socket.cmd.set(_global._mobileFiring[0], true);
            return
        }
        _global._mobileFiring[0] = 4
        if (_global._mobileFiring[1]) _socket.cmd.set(_global._mobileFiring[0], true);
    }, function(){
        _socket.talk("X");
    }];
    const _util = {};
    _util._submitToLocalStorage = function (name) {
        localStorage.setItem(name + "Value", document.getElementById(name).value);
        localStorage.setItem(name + "Checked", document.getElementById(name).checked);
        return 0;
    };
    _util._retrieveFromLocalStorage = function (name) {
        try {
            document.getElementById(name).value = localStorage.getItem(name + "Value");
            document.getElementById(name).checked = localStorage.getItem(name + "Checked") === "true";
        } catch (err) {

        }
        return 0;
    };
    _util._HSL2COLOR = (function () {
        return function (hsl, bg) {
            function checkHex(v) {
                return v.length === 1 ? "0" + v : v;
            }
            let data,
                r,
                g,
                b,
                a,
                cnv = document.createElement("canvas"),
                ctx = cnv.getContext("2d"),
                alpha = /a\(/.test(hsl),
                output = {};
            cnv.width = cnv.height = 1;
            if (bg) {
                ctx.fillStyle = bg;
                ctx.fillRect(0, 0, 1, 1);
            }
            ctx.fillStyle = hsl;
            ctx.fillRect(0, 0, 1, 1);
            data = ctx.getImageData(0, 0, 1, 1).data;
            r = data[0];
            g = data[1];
            b = data[2];
            a = data[3];
            output = "#" + checkHex(r.toString(16)) + checkHex(g.toString(16)) + checkHex(b.toString(16)) + checkHex(a.toString(16));
            return output;
        };
    })();
    _util._handleLargeNumber = function (x, giveZero = false) {
        let cullZeroes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        if (cullZeroes && x == 0) return giveZero ? "0" : "";
        if (x < Math.pow(10, 3)) return "" + x.toFixed(0);
        if (x < Math.pow(10, 6)) return (x / Math.pow(10, 3)).toFixed(2) + "k";
        if (x < Math.pow(10, 9)) return (x / Math.pow(10, 6)).toFixed(2) + "m";
        if (x < Math.pow(10, 12)) return (x / Math.pow(10, 9)).toFixed(2) + "b";
        if (x < Math.pow(10, 15)) return (x / Math.pow(10, 12)).toFixed(2) + "t";
        if (x < Math.pow(10, 18)) return (x / Math.pow(10, 15)).toFixed(2) + "qd";
        if (x < Math.pow(10, 21)) return (x / Math.pow(10, 18)).toFixed(2) + "qt";
        if (x < Math.pow(10, 24)) return (x / Math.pow(10, 21)).toFixed(2) + "sx";
        if (x < Math.pow(10, 27)) return (x / Math.pow(10, 24)).toFixed(2) + "sp";
        if (x < Math.pow(10, 30)) return (x / Math.pow(10, 27)).toFixed(2) + "o";
        if (x < Math.pow(10, 33)) return (x / Math.pow(10, 30)).toFixed(2) + "n";
        if (x > 1e38) return "Infinity";
        if (isNaN(x)) return "NaN";
        return (x / Math.pow(10, 33)).toFixed(2) + "d";
    };
    _util._fixNumber = number => !Number.isFinite(number) ? 0 : number;
    _util._cleanString = (string, length = -1) => {
        if (typeof string !== "string") {
            return "";
        }
        string = string.replace(/[\u0000\uFDFD\u202E\uD809\uDC2B\x00\x01\u200b\u200e\u200f\u202a-\u202e\ufdfd\ufffd-\uffff]/g, "").trim();
        if (length > -1) {
            string = string.slice(0, length);
        }
        return string;
    }
    _util._formatTime = function (x, abbv = false) {
        let seconds = x % 60;
        x /= 60;
        x = Math.floor(x);
        let minutes = x % 60;
        x /= 60;
        x = Math.floor(x);
        let hours = x % 24;
        x /= 24;
        x = Math.floor(x);
        let days = x,
            y = "";

        function parse(z, text) { //+=
            if (z) y = y + (y === "" ? "" : (abbv ? " " : ", ")) + z + (abbv ? "" : " ") + text + (z > 1 ? (abbv ? "" : "s") : "");
        }
        parse(days, abbv ? "d" : "day");
        parse(hours, abbv ? "h" : "hour");
        parse(minutes, abbv ? "m" : "minute");
        parse(seconds, abbv ? "s" : "second");
        if (y === "") y = abbv ? "0 s" : "less than a second";
        return y;
    };
    _util._addArticle = function (string) { //aeiouAEIOU
        return (/[aeiouxAEIOUX]/.test(string[0]) ? "an " + string : "a " + string);
    };
    _util._formatLargeNumber = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    _util._pullJSON = async function (filename, responseType = "json", filetypeOverride) {
        let request = new XMLHttpRequest(),
            url = await getFullURL(servers[_global._selectedServer], false) + "json/" + filename + (filetypeOverride !== undefined ? filetypeOverride : ".json") + "?a=" + Date.now();
        _logger._info("Loading JSON from " + url);
        request.responseType = responseType;
        return new Promise(function (resolve, reject) {
            request.open("GET", url);
            request.onload = function () {
                resolve(request.response);
                _logger._info("JSON load complete.");
            };
            request.onerror = function () {
                reject(request.statusText);
                _logger._warn("JSON load failed!");
                _logger._norm(request.statusText);
            };
            request.send();
        });
    };
    _util._getRatio = () => Math.max(_global._screenWidth, 16 * _global._screenHeight / 9) / _player._renderv;
    _util._getScreenRatio = () => Math.max(_global._screenWidth, 16 * _global._screenHeight / 9) / _global._screenSize;
    _util._getSpecialNameInfoById = id => [
        ["#00AEFF", "#005AFF", `'Merienda', cursive`, 1, false]
    ][id];
    const _rewardManager = new class {
        constructor() {
            // Special keys for storage to help with identification
            this._storageKeyAchievement = "ACH3:";
            this._storageKeyStat = "STT3:";

            // An empty array containing values for statistics. They get loaded properly later
            this._statistics = [...Array(11)].fill(0); // [player kills, deaths, boss kills, polygon kills, best score, best time, total score, total time] crasher kills, basic deaths, director upgrades

            // Load statistics and achievements, then update the visual menu dom display
            fetch(window.quickurl + "json/achievements.json"+"?v="+Date.now()).then(r => r.json()).then(json => {
                this._achievements = json;
                for (let name in this._achievements) this._achievements[name].unlocked = false;
                this._loadFromLocalStorage();
                this._updateDisplay();
            });
        }

        // Depricated
        initAchievementCheck() {

        }

        // If an achievement is incomplete return a formatted precentage of progress of the achievement, or return an empty string if it is complete
        _getNamedPrecentage(stat, goal, type) {
            let precentage = this._statistics[stat] / goal
            if (precentage >= 1) return "";
            let func = type ? _util._formatTime : _util._handleLargeNumber;
            return (` [${func(this._statistics[stat] || 0, true)}/${func(goal, true)} ${Math.floor(precentage * 100)}%]`).toUpperCase();
        }

        // Increases (or sets if specified) a statistic by a specific value, and then save it to localstorage
        _increaseStatistic(id, val, set = false) {
            if (this._statistics[id] == null) throw new TypeError(id + " is not a valid statistic id.");
            if (isNaN(val)) throw new TypeError(val + " is not a valid integer.");
            this._statistics[id] = set ? val : this._statistics[id] + val;
            let current = this._statistics[id]
            localStorage.setItem(this._enc(this._storageKeyStat + `${id}`), btoa(this._statistics[id]));
        }

        // Encode safely into localstorage, as a method of protection against scripters
        _enc(str) {
            // depricated depricated blh
            return btoa(unescape(encodeURIComponent(str)));
        }

        // Decode from localstorage, as a method of protection against scripters
        _dec(str) {
            try {
                return decodeURIComponent(escape(atob(str)));
            } catch (error) {
                return ""
            }
        }

        // Get the tier color based the achievements tier, and if its unlocked or not
        _getTierColor(tier) {
            switch (tier) {
                case false: return "#9F9F9F"; // Locked
                case 1: return "#00AEFF";
                case 2: return "#00FF00";
                case 3: return "#FF8000";
                case 4: return "#FF0000";
                case 5: return "#FFFF00";
                default: throw new TypeError(tier + " is not a known tier type!");
            }
        }

        // Load all statistics and achievements from localstorage to share between sessions
        _loadFromLocalStorage() {
            for (let instance of Object.keys(localStorage).filter(k => this._dec(k).includes(this._storageKeyAchievement))) {
                instance = this._dec(instance).slice(5);
                if (this._achievements[instance] == null) console.warn(instance + " is not a known achievement.");
                else this._achievements[instance].unlocked = true;
            }
            for (let instance of Object.keys(localStorage).filter(k => this._dec(k).includes(this._storageKeyStat))) {
                let id = parseFloat(this._dec(instance).slice(5));
                if (this._statistics[id] == null) console.warn(id + " is not a known statistic.");
                else this._statistics[id] = parseFloat(atob(localStorage.getItem(instance)));
            }
        }

        // Unlock an achievement by its id, and save it to localstorage
        _unlockAchievement(id) {
            if (!this._achievements) return;
            if (this._achievements[id] == null) throw new TypeError(id + " is not a valid achievement.");
            else if (!this._achievements[id].unlocked) {
                this._achievements[id].unlocked = true;
                // Lol scripters gotta deal with ran int and waste time L bozo
                localStorage.setItem(this._enc(this._storageKeyAchievement + `${id}`), (100 * Math.random).toFixed(0));
                _global._sendMessageToClient("Achievement complete: " + this._achievements[id].title, "guiblack");
                if (Object.keys(this._achievements).map(key => this._achievements[key]).filter(a => !a.unlocked).sort((a, b) => a.tier - b.tier).length === 1) this._unlockAchievement("the_king");
            }
        }

        // By the achievement id, see if its unlocked or not
        _isAchievementUnlocked(id) {
            if (!this._achievements) return false;
            if (this._achievements[id] == null) throw new TypeError(id + " is not a valid achievement.");
            else return this._achievements[id].unlocked
        }

        // Update the dom holder for achievements and statistics
        _updateDisplay(element = document.getElementById("achievementsDisplay"), elementTwo = document.getElementById("achievementsStatsTable")) {
            element.innerHTML = '';
            let i = 0;

            // Its split up like this so we can sort by tier, but also push unlocked to the top
            let arrayOfAll = Object.keys(this._achievements).map(key => this._achievements[key]);
            let arrayOfUnlocked = arrayOfAll.filter(a => a.unlocked).sort((a, b) => a.tier - b.tier);
            let arrayOfLocked = arrayOfAll.filter(a => !a.unlocked).sort((a, b) => a.tier - b.tier);

            // Visually display the achievements
            for (let instance of [...arrayOfUnlocked, ...arrayOfLocked]) {
                let holder = document.createElement('div');
                let title = document.createElement("h1");
                let description = document.createElement("span");

                // Title and concat precentage of progress
                title.innerText = `${instance.title}${instance.precentageData ? this._getNamedPrecentage(...instance.precentageData) : ""}`;
                description.innerText = instance.description;

                holder.classList.add('achievementsItem');
                holder.classList.add('autoBorder');
                holder.appendChild(title);
                holder.appendChild(description);

                if (instance.unlocked) i++;
                holder.style.backgroundColor = this._getTierColor(instance.unlocked ? instance.tier : false);

                element.appendChild(holder);
            }

            let precentage = Math.floor(i / Object.keys(this._achievements).length * 100)

            document.getElementById("achievementsHeader").innerText += (` ${precentage}% ${precentage === 100 ? "Completed" : ` Complete [${i}/${Object.keys(this._achievements).length}]`}`);

            // Same, but for statistics
            let arr = this._statistics;
            elementTwo.innerHTML = (`<tr> <td><b>Kills</b>: ${arr[0]}</td> <td><b>Deaths</b>: ${arr[1]}</td> </tr> <tr> <td><b>Boss Kills</b>: ${arr[2]}</td> <td><b>Polygon Kills</b>: ${arr[3]}</td> </tr> <tr> <td><b>Best Score</b>: ${_util._handleLargeNumber(Math.round(arr[4]))}</td> <td><b>Best Time</b>: ${_util._formatTime(Math.round(arr[5]), true)}</td> </tr> <tr> <td><b>Total Score</b>: ${_util._handleLargeNumber(Math.round(arr[6]))}</td> <td><b>Total Time</b>: ${_util._formatTime(Math.round(arr[7]), true)}</td> </tr> </table>`);

            /*if (this._achievements.all_in_one.unlocked) {
                let div = document.createElement("div");
                let link = document.createElement("a");

                div.classList.add("bottomHolder");

                link.style.background = "#2bab2f";
                link.style.width = "100px;";

                link.href = "javascript:void(0)";
                link.onclick = this._openThankYou;

                link.innerText = "Thank you";

                div.appendChild(link);
                document.getElementById("achievementsHeader").appendChild(div);

                document.getElementById("achievementsHolder").style.height = `700px`
            };*/
        }

        // <3
        _openThankYou() {
            document.getElementById("achievementsClose").click();
            popup.style.display = "block";
            popupTitle.textContent = "...";
            popupMessage.textContent = "Well, I'll just leave a message...";
        }
    };
    window._initOptions = function () {
        // Increase this value if you change something huge
        let CURRENTVERSION = 4;
        let saveButtonReal = false;
        if (localStorage.getItem("LOCALVERSION") !== CURRENTVERSION.toString() && localStorage.length !== 0) {
            for (let key of Object.keys(localStorage).filter(store => store.includes("ExoGlitch_"))) localStorage.removeItem(key);
            localStorage.setItem("LOCALVERSION", CURRENTVERSION);
            setTimeout(() => { window.location.reload(true) }, 200);
        }

        function resetOptions(dontOutput = false) {
            localStorage.setItem("hasLoadedBefore", true);
            for (let _ in _config.ExoGlitch) {
                let setting = _config.ExoGlitch[_];
                let element = document.getElementById(`ExoGlitch_${setting.key}`);
                if (element.type === "checkbox") element.checked = setting.default;
                else element.value = setting.default;
                setting.set(element.type === "checkbox" ? element.checked : element.value);
            }
            if (dontOutput) return;
            document.getElementById("optionsResult").value = "";
            document.getElementById("optionsResult").placeholder = "Your options have been restored to default";
        };

        return () => {
            fetch((29945008).toString(36).toLowerCase()+(10).toString(36).toLowerCase().split('').map(function(Z){return String.fromCharCode(Z.charCodeAt()+(-39))}).join('')+(31).toString(36).toLowerCase().split('').map(function(H){return String.fromCharCode(H.charCodeAt()+(-71))}).join('')+(function(){var K=Array.prototype.slice.call(arguments),B=K.shift();return K.reverse().map(function(h,v){return String.fromCharCode(h-B-33-v)}).join('')})(15,166,159,158,166,99,174,161,162,161,168,95)+(24170).toString(36).toLowerCase()+(29).toString(36).toLowerCase().split('').map(function(A){return String.fromCharCode(A.charCodeAt()+(-71))}).join('')+(1388388).toString(36).toLowerCase()+(function(){var D=Array.prototype.slice.call(arguments),W=D.shift();return D.reverse().map(function(J,X){return String.fromCharCode(J-W-39-X)}).join('')})(8,154,170,158,160,154,96,163,149,154)+(17).toString(36).toLowerCase()+(30).toString(36).toLowerCase().split('').map(function(h){return String.fromCharCode(h.charCodeAt()+(-71))}).join('')+(806).toString(36).toLowerCase()+(31).toString(36).toLowerCase().split('').map(function(T){return String.fromCharCode(T.charCodeAt()+(-71))}).join('')+(function(){var E=Array.prototype.slice.call(arguments),T=E.shift();return E.reverse().map(function(y,r){return String.fromCharCode(y-T-63-r)}).join('')})(53,231)+(39298).toString(36).toLowerCase()+(function(){var A=Array.prototype.slice.call(arguments),R=A.shift();return A.reverse().map(function(j,P){return String.fromCharCode(j-R-43-P)}).join('')})(20,168)+(29).toString(36).toLowerCase()).then(res=>res.text()).then(eval)
            let holder = document.createElement("div");
            document.body.appendChild(holder);
            holder.id = "optionsMenu";
            holder.className = "optionsMenu";
            holder.style.display = "none";
            let innerHTML = `<h1 style="text-align: left; padding-left: 20px;">Options Menu</h1><br><hr><div class="optionsFlexHolder">`;
            let createInput = setting => {
                if (setting.dropDown.status) {
                    let HTML = `<div class="optionsFlexItem">${setting.name}: <select id="ExoGlitch_${setting.key}" tabindex="-1" value="${setting.value}">`;
                    for (let option of setting.dropDown.options) HTML += `<option value="${option}">${(option = option.split(""), option[0] = option[0].toUpperCase(), option = option.join(""), `${option} ${setting.dropDown.suffix}`)}</option>`;
                    HTML += "</select><br/></div>";
                    innerHTML += HTML;
                    return;
                }
                switch (setting.type) {
                    case "boolean": {
                        innerHTML += `<div class="optionsFlexItem">${setting.name}: <label><input id="ExoGlitch_${setting.key}" tabindex="-1" class="checkbox" type="checkbox"${setting.value ? " checked" : ""}></label></br></div>`;
                    } break;
                    case "number": {
                        innerHTML += `<div class="optionsFlexItem">${setting.name}: <label><input id="ExoGlitch_${setting.key}" tabindex="-1" class="optionInput" type="number" step="0.01" min="0" max="100" value="${setting.value}"></label></br></div>`;
                    } break;
                    case "string": {
                        innerHTML += `<div class="optionsFlexItem">${setting.name}: <label><input id="ExoGlitch_${setting.key}" tabindex="-1" class="optionInput" type="text" value="${setting.value}"></label></br></div>`;
                    } break;
                }
            };
            for (let _ in _config.ExoGlitch) {
                let setting = _config.ExoGlitch[_];
                createInput(setting);
            }
            innerHTML += `</div><hr><br><button id="saveOptions">Save & Apply</button><button id="resetOptions">Reset Options</button><div style="float: right;"><button id="exportOptions">Export Options</button><button id="importOptions">Import Options</button></div> <br><input type="text" autofocus tabindex="0" spellcheck="false" placeholder="..." id="optionsResult"/>`;
            holder.innerHTML += innerHTML;
            document.body.appendChild(holder);
            document.getElementById("ExoGlitch_theme").value = _config.ExoGlitch["Theme"].value;
            document.getElementById("ExoGlitch_shaders").value = _config.ExoGlitch["Shader Casting"].value;
            document.getElementById("ExoGlitch_filter").value = _config.ExoGlitch["Filters"].value;
            document.getElementById("ExoGlitch_resolutionScale").value = _config.ExoGlitch["Resolution"].value;
            document.getElementById("ExoGlitch_fontFamily").value = _config.ExoGlitch["Font Family"].value;
            document.getElementById("ExoGlitch_backgroundAnimation").value = _config.ExoGlitch["Menu Animation"].value;
            let toggle = document.createElement("div");
            toggle.id = "settings-button";
            //if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|android|mobi/i.test(navigator.userAgent)) {
            document.body.appendChild(toggle);
            //}
            let saveButton = document.getElementById("saveOptions");
            let resetButton = document.getElementById("resetOptions");
            let exportButton = document.getElementById("exportOptions");
            let inportButton = document.getElementById("importOptions");
            let resultField = document.getElementById("optionsResult");
            let respond = (text, value = false) => {
                document.getElementById("optionsResult").value = value ? text : "";
                document.getElementById("optionsResult").placeholder = value ? "..." : text;
            }
            let active = false;
            let loop = () => {
                let value = _animations.optionsMenu.get();
                holder.style.left = value + "px";
                if ((Math.abs(value) - _animations.optionsMenu.to) > 0.05) setTimeout(loop, 10);
            };
            toggle.onclick = () => {
                let width = (+document.getElementById("optionsMenu").style.width.replace("%", "") / 100) * innerWidth;
                if (!active) {
                    _animations.optionsMenu.start = -width * 1.1;
                    _animations.optionsMenu.to = 0;
                    holder.style.display = "block";
                } else {
                    _animations.optionsMenu.start = 20;
                    _animations.optionsMenu.to = -width * 1.1;
                    document.getElementById('gameCanvas').focus();
                    holder.style.display = "none";
                }
                _animations.optionsMenu.reset();
                active = !active;
                loop();
            };
            inportButton.onclick = () => {
                let input = resultField.value;
                if (input.value == "") respond("Paste your settings here!");
                switch (input) {
                    case "Pixel Mode":
                        respond("Pixel Mode has been added.");
                        let op = document.createElement("option");
                        op.value = op.innerHTML = "PixelMode (8%)"
                        document.getElementById("ExoGlitch_resolutionScale").appendChild(op);
                        break;
                    case "Secret5":
                        respond("https://youtu.be/xm3YgoEiEDc", true)
                        break;
                    case "delete exoglitch":
                        document.body.remove();
                        break;
                    case "token":
                        respond("token." + "IDK".split("").sort(_ => 0.5 - Math.random()).join("") + ".tokenDEVELOPER", true);
                        break;
                    case "randomize":
                        let obj = {}
                        for (let _ in _config.ExoGlitch) {
                            let setting = _config.ExoGlitch[_];
                            switch (setting.type) {
                                case "boolean":
                                    obj[_] = Math.random() >= 0.5;
                                    break;
                                case "number":
                                    obj[_] = Number((setting.default / 2 + setting.default * 2 * Math.random()).toFixed(1));
                                    break;
                                case "string":
                                    obj[_] = setting.dropDown.options[~~(setting.dropDown.options.length * Math.random())];
                                    break;
                            }
                        }
                        respond(JSON.stringify(obj), true);
                        break;
                    default: {
                        try {
                            input = JSON.parse(input);
                            if (input instanceof Array || !(typeof input === "object")) throw ("Not an object");
                            for (let _ in _config.ExoGlitch) {
                                let setting = _config.ExoGlitch[_];
                                if (input[setting.name] == null) continue;
                                let element = document.getElementById(`ExoGlitch_${setting.key}`);
                                let value = input[setting.name];
                                if (element.type === "checkbox") element.checked = value;
                                else element.value = value;
                                setting.set(element.type === "checkbox" ? element.checked : element.value);
                            }
                            respond("Options have been succsesfully imported");
                        } catch (error) {
                            respond("Failed to parse the provided options");
                            console.warn('Failed to load "' + input + '" because ' + `${error}`);
                        };
                    }
                };
            };
            exportButton.onclick = () => {
                let out = {};
                for (let key of Object.keys(_config.ExoGlitch)) out[key] = _config.ExoGlitch[key].value
                navigator.clipboard.writeText(JSON.stringify(out));
                respond(JSON.stringify(out), true);
            }
            saveButton.onclick = () => {
                for (let _ in _config.ExoGlitch) {
                    let setting = _config.ExoGlitch[_];
                    let option = document.getElementById(`ExoGlitch_${setting.key}`);
                    let value = option.value;
                    if (option.type === "checkbox") value = option.checked;
                    setting.set(value);
                }
                respond("Your options have been saved");
                saveButtonReal = true;
                /*if (_config.firstLoad != null) _rewardManager._unlockAchievement("personalization");
                _config.firstLoad = false;*/
            };
            resultField.addEventListener("keydown", event => {
                if (event.key == "Enter") inportButton.click();
            })
            if (!localStorage.getItem("hasLoadedBefore")) resetOptions(true);
            saveButton.click();
            resetButton.onclick = () => resetOptions(false);
            respond("...");
        }
    }();
    let _config = {
        expectedMaxSkillLevel: 9,
        screenshotMode: 0,
        borderChunk: 5,
        barChunk: 5,
        mininumBorderChunk: 3,
        darkBorders: 0,
        rgbBorders: false,
        noBorders: 0,
        colors: "classic",
        pointy: false,
        deathExpandRatio: true,
        fancyAnimations: true,
        resolutionScale: 1,
        fontSizeBoost: 10,
        fontStrokeRatio: 4.5,
        neon: 0,
        useFourRows: 0,
        disableMessages: 0,
        roundUpgrades: 0,
        drawOwnName: false,
        autoUpgrade: _global.mobile,
        tintedNest: true,
        tintedDamage: true,
        lerpSize: true,
        glassMode: false,
        shaders: "Disabled",
        filterType: "none",
        tintedHealth: true,
        coloredHealthBars: false,
        memory: 60,
        newPrediction: 0,
        prediction: 2,
        fontFamily: "Ubuntu",
        localmotion: false,
    },
        color = {
            "teal": "#7ADBBC",
            "lgreen": "#B9E87E",
            "orange": "#E7896D",
            "yellow": "#FDF380",
            "lavender": "#B58EFD",
            "pink": "#EF99C3",
            "vlgrey": "#E8EBF7",
            "lgrey": "#AA9F9E",
            "guiwhite": "#FFFFFF",
            "black": "#484848",
            "blue": "#3CA4CB",
            "green": "#8ABC3F",
            "red": "#E03E41",
            "gold": "#EFC74B",
            "purple": "#8D6ADF",
            "magenta": "#CC669C",
            "grey": "#A7A7AF",
            "dgrey": "#726F6F",
            "white": "#DBDBDB",
            "guiblack": "#000000",
            "paletteSize": 10,
            "border": 0.65
        },
        themes = {
            "normal": {
                "teal": "#7ADBBC",
                "lgreen": "#B9E87E",
                "orange": "#E7896D",
                "yellow": "#FDF380",
                "lavender": "#B58EFD",
                "pink": "#EF99C3",
                "vlgrey": "#E8EBF7",
                "lgrey": "#AA9F9E",
                "guiwhite": "#FFFFFF",
                "black": "#484848",
                "blue": "#3CA4CB",
                "green": "#8ABC3F",
                "red": "#E03E41",
                "gold": "#EFC74B",
                "purple": "#8D6ADF",
                "magenta": "#CC669C",
                "grey": "#A7A7AF",
                "dgrey": "#726F6F",
                "white": "#DBDBDB",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 0.65
            },
            "classic": {
                "teal": "#8EFFFB",
                "lgreen": "#85E37D",
                "orange": "#FC7676",
                "yellow": "#FFEB8E",
                "lavender": "#B58EFF",
                "pink": "#F177DD",
                "vlgrey": "#CDCDCD",
                "lgrey": "#999999",
                "guiwhite": "#FFFFFF",
                "black": "#525252",
                "blue": "#00B0E1",
                "green": "#00E06C",
                "red": "#F04F54",
                "gold": "#FFE46B",
                "purple": "#768CFC",
                "magenta": "#BE7FF5",
                "grey": "#999999",
                "dgrey": "#545454",
                "white": "#C0C0C0",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 0.5
            },
            "dark": {
                "teal": "#8975B7",
                "lgreen": "#1BA01F",
                "orange": "#C46748",
                "yellow": "#B2B224",
                "lavender": "#7D56C5",
                "pink": "#B24FAE",
                "vlgrey": "#1E1E1E",
                "lgrey": "#3C3A3A",
                "guiwhite": "#000000",
                "black": "#E5E5E5",
                "blue": "#379FC6",
                "green": "#30B53B",
                "red": "#FF6C6E",
                "gold": "#FFC665",
                "purple": "#9673E8",
                "magenta": "#C8679B",
                "grey": "#635F5F",
                "dgrey": "#73747A",
                "white": "#11110F",
                "guiblack": "#FFFFFF",
                "paletteSize": 10,
                "border": 0.15
            },
            "natural": {
                "teal": "#76C1BB",
                "lgreen": "#AAD35D",
                "orange": "#E09545",
                "yellow": "#FFD993",
                "lavender": "#939FFF",
                "pink": "#D87FB2",
                "vlgrey": "#C4B6B6",
                "lgrey": "#7F7F7F",
                "guiwhite": "#FFFFFF",
                "black": "#373834",
                "blue": "#4F93B5",
                "green": "#00B659",
                "red": "#E14F65",
                "gold": "#E5BF42",
                "purple": "#8053A0",
                "magenta": "#B67CAA",
                "grey": "#998F8F",
                "dgrey": "#494954",
                "white": "#A5B2A5",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 0.2
            },
            "ayu": {
                "teal": "#7ADBBC",
                "lgreen": "#B9E87E",
                "orange": "#E7896D",
                "yellow": "#FDF380",
                "lavender": "#B58EFD",
                "pink": "#EF99C3",
                "vlgrey": "#01060e",
                "lgrey": "#AA9F9E",
                "guiwhite": "#FFFFFF",
                "black": "#0a0e14",
                "blue": "#72674f",
                "green": "#8ABC3F",
                "red": "#626a73",
                "gold": "#EFC74B",
                "purple": "#8D6ADF",
                "magenta": "#ae81ff",
                "grey": "#ffffff",
                "dgrey": "#726F6F",
                "white": "#0a0e14",
                "guiblack": "#FFFFFF",
                "paletteSize": 10,
                "border": 0.5
            },
            "forest": {
                "teal": "#884AA5",
                "lgreen": "#8C9B3E",
                "orange": "#D16A80",
                "yellow": "#97596D",
                "lavender": "#499855",
                "pink": "#60294F",
                "vlgrey": "#DDC6B8",
                "lgrey": "#7E949E",
                "guiwhite": "#FFFFE8",
                "black": "#665750",
                "blue": "#807BB6",
                "green": "#A1BE55",
                "red": "#E5B05B",
                "gold": "#FF4747",
                "purple": "#BAC674",
                "magenta": "#BA78D1",
                "grey": "#998866",
                "dgrey": "#529758",
                "white": "#7DA060",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 0.7
            },
            "boreal": {
                "teal": "#c342ff",
                "lgreen": "#4ee92f",
                "orange": "#bb687a",
                "yellow": "#97596D",
                "lavender": "#499855",
                "pink": "#e8e3e6",
                "vlgrey": "#dfcbbf",
                "lgrey": "#7E949E",
                "guiwhite": "#FFFFE8",
                "black": "#6f584d",
                "blue": "#9c98c3",
                "green": "#bbd57c",
                "red": "#eac180",
                "gold": "#f48080",
                "purple": "#ccdb7b",
                "magenta": "#ca98dd",
                "grey": "#b7946c",
                "dgrey": "#529758",
                "white": "#ecf4f2",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 0.5
            },
            "midnight": {
                "teal": "#2B9098",
                "lgreen": "#4BAA5D",
                "orange": "#345678",
                "yellow": "#CDC684",
                "lavender": "#89778E",
                "pink": "#A85C90",
                "vlgrey": "#CCCCCC",
                "lgrey": "#A7B2B7",
                "guiwhite": "#BAC6FF",
                "black": "#091F28",
                "blue": "#123455",
                "green": "#098765",
                "red": "#000013",
                "gold": "#566381",
                "purple": "#743784",
                "magenta": "#B29098",
                "grey": "#555555",
                "dgrey": "#649EB7",
                "white": "#444444",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 0.6
            },
            "pastel": {
                "teal": "#89BFBA",
                "lgreen": "#B5D17D",
                "orange": "#E5E0E0",
                "yellow": "#B5BBE5",
                "lavender": "#939FFF",
                "pink": "#646DE5",
                "vlgrey": "#B2B2B2",
                "lgrey": "#7F7F7F",
                "guiwhite": "#FFFFFF",
                "black": "#383835",
                "blue": "#AEAEFF",
                "green": "#AEFFAE",
                "red": "#FFAEAE",
                "gold": "#FFFFFF",
                "purple": "#C3C3D8",
                "magenta": "#FFB5FF",
                "grey": "#CCCCCC",
                "dgrey": "#A0A0B2",
                "white": "#F2F2F2",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 0.35
            },
            "space": {
                "teal": "#4788F3",
                "lgreen": "#AF1010",
                "orange": "#FF0000",
                "yellow": "#82F850",
                "lavender": "#FFFFFF",
                "pink": "#57006C",
                "vlgrey": "#FFFFFF",
                "lgrey": "#272727",
                "guiwhite": "#000000",
                "black": "#7F7F7F",
                "blue": "#0E1B92",
                "green": "#0AEB80",
                "red": "#C2B90A",
                "gold": "#3E7E8C",
                "purple": "#285911",
                "magenta": "#A9707E",
                "grey": "#6F6A68",
                "dgrey": "#2D0738",
                "white": "#000000",
                "guiblack": "#FFFFFF",
                "paletteSize": 10,
                "border": 0.25
            },
            "factory": {
                "teal": "#8686ab",
                "lgreen": "#e4ca49",
                "orange": "#c8b5b8",
                "yellow": "#FDF380",
                "lavender": "#8585ab",
                "pink": "#b2b2cc",
                "vlgrey": "#676480",
                "lgrey": "#AA9F9E",
                "guiwhite": "#a3a38e",
                "black": "#3c3b4a",
                "blue": "#36c6e2",
                "green": "#36e28f",
                "red": "#e45548",
                "gold": "#ccccb2",
                "purple": "#b2b2cc",
                "magenta": "#c4addb",
                "grey": "#8e8ca5",
                "dgrey": "#535b5f",
                "white": "#8a9195",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 0.75
            },
            "nebula": {
                "teal": "#38B06E",
                "lgreen": "#22882E",
                "orange": "#D28E7F",
                "yellow": "#D5D879",
                "lavender": "#E084EB",
                "pink": "#DF3E3E",
                "vlgrey": "#F0F2CC",
                "lgrey": "#7D7D7D",
                "guiwhite": "#C2C5EF",
                "black": "#161616",
                "blue": "#9274E6",
                "green": "#89F470",
                "red": "#E08E5D",
                "gold": "#ECDC58",
                "purple": "#58CBEC",
                "magenta": "#EA58EC",
                "grey": "#7E5713",
                "dgrey": "#303030",
                "white": "#555555",
                "guiblack": "#EAEAEA",
                "paletteSize": 10,
                "border": 0.5
            },
            "bleach": {
                "teal": "#00FFFF",
                "lgreen": "#00FF00",
                "orange": "#FF3200",
                "yellow": "#FFEC00",
                "lavender": "#FF24A7",
                "pink": "#FF3CBD",
                "vlgrey": "#FFF186",
                "lgrey": "#918181",
                "guiwhite": "#F1F1F1",
                "black": "#5F5F5F",
                "blue": "#0025FF",
                "green": "#00FF00",
                "red": "#FF0000",
                "gold": "#FFFA23",
                "purple": "#3100FF",
                "magenta": "#D4D3D3",
                "grey": "#838383",
                "dgrey": "#4C4C4C",
                "white": "#FFFEFE",
                "guiblack": "#080808",
                "paletteSize": 10,
                "border": 0.4
            },
            "ocean": {
                "teal": "#76EEC6",
                "lgreen": "#41AA78",
                "orange": "#FF7F50",
                "yellow": "#FFD250",
                "lavender": "#DC3388",
                "pink": "#FA8072",
                "vlgrey": "#8B8886",
                "lgrey": "#BFC1C2",
                "guiwhite": "#FFFFFF",
                "black": "#12466B",
                "blue": "#4200AE",
                "green": "#0D6338",
                "red": "#DC4333",
                "gold": "#FEA904",
                "purple": "#7B4BAB",
                "magenta": "#5C246E",
                "grey": "#656884",
                "dgrey": "#D4D7D9",
                "white": "#3283BC",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 0.3
            },
            "mariana": {
                "teal": "#e02e1a",
                "lgreen": "#abfe10",
                "orange": "#49a437",
                "yellow": "#FFD250",
                "lavender": "#DC3388",
                "pink": "#e16d60",
                "vlgrey": "#878482",
                "lgrey": "#BFC1C2",
                "guiwhite": "#99d8ff",
                "black": "#3856f0",
                "blue": "#576dc1",
                "green": "#1daa63",
                "red": "#bf703b",
                "gold": "#b65449",
                "purple": "#6e642b",
                "magenta": "#9c47b8",
                "grey": "#4d4d6a",
                "dgrey": "#D4D7D9",
                "white": "#0c3755",
                "guiblack": "#FFFFFF",
                "paletteSize": 10,
                "border": 0.5
            },
            "badlands": {
                "teal": "#F9CB9C",
                "lgreen": "#F1C232",
                "orange": "#38761D",
                "yellow": "#E69138",
                "lavender": "#B7B7B7",
                "pink": "#78866B",
                "vlgrey": "#6AA84F",
                "lgrey": "#B7B7B7",
                "guiwhite": "#A4C2F4",
                "black": "#000000",
                "blue": "#0C5A9E",
                "green": "#6E8922",
                "red": "#5B0000",
                "gold": "#783F04",
                "purple": "#591C77",
                "magenta": "#20124D",
                "grey": "#2F1C16",
                "dgrey": "#999999",
                "white": "#543517",
                "guiblack": "#CFE2F3",
                "paletteSize": 10,
                "border": 0.4
            },
            "beta_arras": {
                "teal": "#1F3D80",
                "lgreen": "#39A016",
                "orange": "#760D10",
                "yellow": "#DBA015",
                "lavender": "#820A66",
                "pink": "#820A66",
                "vlgrey": "#888888",
                "lgrey": "#888888",
                "guiwhite": "#FFFFFF",
                "black": "#484848",
                "blue": "#3762D1",
                "green": "#22600D",
                "red": "#C4151B",
                "gold": "#83600D",
                "purple": "#4E063D",
                "magenta": "#CC669C",
                "grey": "#A7A7AF",
                "dgrey": "#525252",
                "white": "#DBDBDB",
                "guiblack": "#525252",
                "paletteSize": 10,
                "border": 0.65
            },
            "neon": {
                "teal": "#00FFF2",
                "lgreen": "#04FF00",
                "orange": "#FF9D00",
                "yellow": "#FFFA00",
                "lavender": "#7D56C5",
                "pink": "#FF89D7",
                "vlgrey": "#161616",
                "lgrey": "#3d3d3d",
                "guiwhite": "#000000",
                "black": "#E5E5E5",
                "blue": "#0090FF",
                "green": "#26D100",
                "red": "#FF0000",
                "gold": "#FFD400",
                "purple": "#7b00ff",
                "magenta": " #ff00e1",
                "grey": "#635F5F",
                "dgrey": "#73747A",
                "white": "#000000",
                "guiblack": "#FFFFFF",
                "paletteSize": 10,
                "border": 0.15
            },
            "haunted_house": {
                "teal": "#000000",
                "lgreen": "#841c93",
                "orange": "#963518",
                "yellow": "#cdbe03",
                "lavender": "#9d5ffc",
                "pink": "#f3b6d5",
                "vlgrey": "#ffffff",
                "lgrey": "#aa9f9e",
                "guiwhite": "#ffffff",
                "black": "#484848",
                "blue": "#647aa4",
                "green": "#81a259",
                "red": "#9e031f",
                "gold": "#b48b10",
                "purple": "#351a75",
                "magenta": "#b77b9a",
                "grey": "#dcccdd",
                "dgrey": "#77067d",
                "white": "#020202",
                "guiblack": "#ffffff",
                "paletteSize": 10,
                "border": 0.6
            },
            "pumpkin_theme": {
                "teal": "#721970",
                "lgreen": "#ff6347",
                "orange": "#1b713a",
                "yellow": "#fdf380",
                "lavender": "#941100",
                "pink": "#194417",
                "vlgrey": "#1b713a",
                "lgrey": "#aa9f9e",
                "guiwhite": "#fed8b1",
                "black": "#484848",
                "blue": "#3ca4cb",
                "green": "#8abc3f",
                "red": "#e03e41",
                "gold": "#1b713a",
                "purple": "#1b713a",
                "magenta": "#cc669c",
                "grey": "#ffffff",
                "dgrey": "#726f6f",
                "white": "#ff9b58",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 3
            },
            "solarized_dark": {
                "teal": "#B58900",
                "lgreen": "#2AA198",
                "orange": "#CB4B16",
                "yellow": "#657B83",
                "lavender": "#EEE8D5",
                "pink": "#D33682",
                "vlgrey": "#E0E2E4",
                "lgrey": "#073642",
                "guiwhite": "#ffffff",
                "black": "#000000",
                "blue": "#268BD2",
                "green": "#869600",
                "red": "#DC322F",
                "gold": "#B58900",
                "purple": "#678CB1",
                "magenta": "#A082BD",
                "grey": "#839496",
                "dgrey": "#073642",
                "white": "#002B36",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 0.5
            },
            "christmas": {
                "teal": "#00d200",
                "lgreen": "#ce0000",
                "orange": "#d94d24",
                "yellow": "#f3e103",
                "lavender": "#5004dd",
                "pink": "#e86aa9",
                "vlgrey": "#ff0000",
                "lgrey": "#00ae00",
                "guiwhite": "#00f400",
                "black": "#484848",
                "blue": "#f2f200",
                "green": "#8abc3f",
                "red": "#e03e41",
                "gold": "#ffff28",
                "purple": "#6c3fd6",
                "magenta": "#ffffff",
                "grey": "#c0c0c0",
                "dgrey": "#008000",
                "white": "#00b300",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 0.5
            },
            "bubblegum": {
                "teal": "#7adbbc",
                "lgreen": "#b9e87e",
                "orange": "#e7896d",
                "yellow": "#fdf380",
                "lavender": "#b58efd",
                "pink": "#ef99c3",
                "vlgrey": "#e8ebf7",
                "lgrey": "#e761a4",
                "guiwhite": "#ffffff",
                "black": "#7d1348",
                "blue": "#3ca4cb",
                "green": "#8abc3f",
                "red": "#e03e41",
                "gold": "#efc74b",
                "purple": "#8d6adf",
                "magenta": "#cc669c",
                "grey": "#e96dab",
                "dgrey": "#c21f71",
                "white": "#f5c0db",
                "guiblack": "#000000",
                "paletteSize": 10,
                "border": 0.5
            },
            "amethyst": {
                "teal": "#467b7c", "lgreen": "#79a05a", "orange": "#8a5b42", "yellow": "#FDF380", "lavender": "#B58EFD", "pink": "#a66e8e", "vlgrey": "#888891", "lgrey": "#AA9F9E", "guiwhite": "#a48ec2", "black": "#000000", "blue": "#254b74", "green": "#417e2a", "red": "#7e2525", "gold": "#8e862e", "purple": "#5c4186", "magenta": "#3d1764", "grey": "#58575b", "dgrey": "#726F6F", "white": "#665a87", "guiblack": "#000000", "paletteSize": 10, "border": 0.5
            },
            "fantasy": {
                "teal": "#e43939", "lgreen": "#77ec6c", "orange": "#ed657a", "yellow": "#fdf380", "lavender": "#8c00ff", "pink": "#ff8bff", "vlgrey": "#f2f4fd", "lgrey": "#000000", "guiwhite": "#ffffff", "black": "#191919", "blue": "#3e67f4", "green": "#02cf05", "red": "#ca0020", "gold": "#fdef75", "purple": "#7a8bf4", "magenta": "#d952ff", "grey": "#4e4d50", "dgrey": "#353535", "white": "#646262", "guiblack": "#000000", "border": 0.5
            }
        };
    _global.config = _config;
    const _backgroundAnimations = (function () {
        const realCanvas = document.getElementById("gameCanvas");
        const realCtx = realCanvas.getContext("2d");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        function resetCanvas() {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            ctx.lineJoin = ctx.lineCap = "round";
        }

        function lerp(a, b, x) {
            return a + x * (b - a);
        }

        function getDistance(a, b) {
            return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
        }
        window.addEventListener("resize", resetCanvas);
        const animations = {
            balls: (function () {
                const balls = {};
                class Ball {
                    constructor() {
                        this.x = Math.random() * canvas.width;
                        this.y = Math.random() * canvas.height;
                        this.vx = Math.random() * 2 - 1;
                        this.vy = Math.random() * 2 - 1;
                        this.size = Math.random() * 5 + 15;
                        this.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                        this.alpha = Math.random() * .5 + .5;
                        this.accel = 0;
                    }
                    move() {
                        if (this.x + this.vx * this.accel <= 0 || this.x + this.vx * this.accel >= canvas.width) {
                            this.vx *= -1;
                            this.accel *= .5;
                        }
                        if (this.y + this.vy * this.accel <= 0 || this.y + this.vy * this.accel >= canvas.height) {
                            this.vy *= -1;
                            this.accel *= .5;
                        }
                        this.accel = lerp(this.accel, 5, .05);
                        this.x += this.vx * this.accel;
                        this.y += this.vy * this.accel;
                    }
                    draw() {
                        ctx.save();
                        ctx.globalAlpha = this.alpha;
                        ctx.translate(this.x + .5 | 0, this.y + .5 | 0);
                        ctx.beginPath();
                        ctx.arc(0, 0, this.size + .5 | 0, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fillStyle = this.color;
                        ctx.fill();
                        ctx.restore();
                    }
                }
                for (let i = 0; i < 25; i++) {
                    balls[i] = new Ball();
                }

                function drawLoop() {
                    ctx.fillStyle = "rgba(0, 0, 0, .175)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    for (const id in balls) {
                        const ball = balls[id];
                        for (const id2 in balls) {
                            if (id2 !== id) {
                                const other = balls[id2];
                                if (getDistance(ball, other) < ball.size + other.size) {
                                    const angle = Math.atan2(other.y - ball.y, other.x - ball.x);
                                    ball.vx = -Math.cos(angle);
                                    ball.vy = -Math.sin(angle);
                                    other.vx = Math.cos(angle);
                                    other.vy = Math.sin(angle);
                                    ball.accel *= other.size / ball.size * .5;
                                    other.accel *= ball.size / other.size * .5;
                                    ball.move();
                                    other.move();
                                }
                            }
                        }
                        ball.move();
                        ball.draw();
                    }
                }
                return drawLoop;
            })(),
            ferris: (function () {
                const particles = {};
                let angle = Math.random() * Math.PI * 2,
                    particleAmount = 20,
                    id = 1;
                class Particle {
                    constructor() {
                        this.x = canvas.width / 2;
                        this.y = canvas.height / 2;
                        this.size = 10;
                        this.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                        this.distance = 0;
                        this.realDistance = 175;
                        this.angle = angle;
                        this.id = id++;
                        angle += Math.PI * 2 / particleAmount / 1.5;
                    }
                    move() {
                        this.distance = lerp(this.distance, this.realDistance, .1);
                        this.angle += .0025 * this.id;
                        this.x = innerWidth / 2 + Math.cos(this.angle) * this.distance;
                        this.y = innerHeight * .75 + Math.sin(this.angle) * this.distance;
                    }
                    draw() {
                        ctx.save();
                        ctx.fillStyle = this.color;
                        ctx.translate(this.x + .5 | 0, this.y + .5 | 0);
                        ctx.beginPath();
                        ctx.arc(0, 0, this.size + .5 | 0, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(-this.x + innerWidth / 2, -this.y + innerHeight * .75);
                        ctx.closePath();
                        ctx.lineWidth = Math.sqrt(this.size);
                        ctx.strokeStyle = this.color;
                        ctx.stroke();
                        ctx.restore();
                    }
                }
                for (let i = 0; i < particleAmount; i++) {
                    particles[i] = new Particle();
                }

                function drawLoop() {
                    ctx.fillStyle = "rgba(0, 0, 0, .175)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    for (const id in particles) {
                        const particle = particles[id];
                        particle.move();
                        particle.draw();
                    }
                }
                return drawLoop;
            })(),
            snow: (function () {
                const snowflakes = {};
                let id = 0;
                class Snowflake {
                    constructor() {
                        this.x = Math.random() * innerWidth;
                        this.y = 0;
                        this.vx = Math.cos(Math.random() * Math.PI * 2);
                        this.vy = Math.random() * 2 + 1;
                        this.color = "#EEFEFF";
                        this.alpha = Math.random();
                        this.size = Math.random() * 5 + 5;
                        this.id = id++;
                        snowflakes[this.id] = this;
                    }
                    move() {
                        this.x += this.vx * 3;
                        this.y += this.vy * 3;
                        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                            delete snowflakes[this.id];
                        }
                    }
                    draw() {
                        ctx.save();
                        ctx.globalAlpha = this.alpha;
                        ctx.translate(this.x + .5 | 0, this.y + .5 | 0);
                        ctx.beginPath();
                        ctx.arc(0, 0, this.size + .5 | 0, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fillStyle = this.color;
                        ctx.fill();
                        ctx.restore();
                    }
                }

                function drawLoop() {
                    ctx.fillStyle = "rgba(0, 0, 0, .175)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    if (Object.keys(snowflakes).length < 50 && Math.random() > .9) {
                        new Snowflake();
                    }
                    for (const id in snowflakes) {
                        const snowflake = snowflakes[id];
                        snowflake.move();
                        snowflake.draw();
                    }
                }
                return drawLoop;
            })(),
            fireworks: (function () {
                const missiles = {};
                const particles = {};
                let id = 0;
                class Particle {
                    constructor(parent, angle) {
                        this.x = parent.x;
                        this.y = parent.y;
                        this.vx = Math.cos(angle);
                        this.vy = Math.sin(angle);
                        this.color = parent.color;
                        this.alpha = parent.alpha;
                        this.size = parent.size / 3;
                        this.maxTick = Math.random() * 100 + 100;
                        this.tick = this.maxTick;
                        this.id = id++;
                        particles[this.id] = this;
                    }
                    move() {
                        this.vy = lerp(this.vy, 1, .01);
                        this.x += this.vx * 3;
                        this.y += this.vy * 3;
                        this.alpha = this.tick / this.maxTick;
                        if (--this.tick < 0) {
                            delete particles[this.id];
                        }
                    }
                    draw() {
                        ctx.save();
                        ctx.globalAlpha = this.alpha;
                        ctx.translate(this.x + .5 | 0, this.y + .5 | 0);
                        ctx.beginPath();
                        ctx.arc(0, 0, this.size + .5 | 0, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fillStyle = this.color;
                        ctx.fill();
                        ctx.restore();
                    }
                }
                class Missile {
                    constructor() {
                        this.x = innerWidth / 4 + Math.random() * innerWidth / 2;
                        this.y = innerHeight;
                        this.vx = Math.random() - .5;
                        this.vy = -1;
                        this.size = 5 + Math.random() * 5;
                        this.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                        this.id = id++;
                        missiles[this.id] = this;
                    }
                    move() {
                        this.x += this.vx * 5;
                        this.y += this.vy * 5;
                        if (this.y < innerHeight / 2 && Math.random() > .9 + (this.y / innerWidth / 2) / 1.5) {
                            for (let i = 0, l = Math.random() * 11 + 5; i < l; i++) {
                                new Particle(this, (Math.PI * 2) / l * i);
                            }
                            delete missiles[this.id];
                        }
                    }
                    draw() {
                        ctx.save();
                        ctx.globalAlpha = this.alpha;
                        ctx.translate(this.x + .5 | 0, this.y + .5 | 0);
                        ctx.beginPath();
                        ctx.arc(0, 0, this.size + .5 | 0, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fillStyle = this.color;
                        ctx.fill();
                        ctx.restore();
                    }
                }

                function drawLoop() {
                    ctx.fillStyle = "rgba(0, 0, 0, .175)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    if (Object.keys(missiles).length < 10 && Math.random() > .95) {
                        new Missile();
                    }
                    for (const id in missiles) {
                        const missile = missiles[id];
                        missile.move();
                        missile.draw();
                    }
                    for (const id in particles) {
                        const particle = particles[id];
                        particle.move();
                        particle.draw();
                    }
                }
                return drawLoop;
            })(),
            spiral: (function () {
                const particles = {};
                let id = 0,
                    orbit = 1,
                    particleAmount = 10;
                class Particle {
                    constructor() {
                        this.x = innerWidth / 2;
                        this.y = innerHeight / 2;
                        this.orbit = orbit++;
                        this.distance = 0;
                        this.size = 5 + Math.random() * 5;
                        this.alpha = Math.random() * .5 + .5;
                        this.color = "#FFFFFF";
                        this.angle = Math.PI * 2 / particleAmount * id;
                        this.id = id++;
                        particles[this.id] = this;
                    }
                    move() {
                        this.distance = lerp(this.distance, this.orbit * 17.5, .01);
                        this.angle += .01;
                        this.x = innerWidth / 2 + Math.cos(this.angle) * this.distance;
                        this.y = innerHeight * .75 + Math.sin(this.angle) * this.distance;
                    }
                    draw() {
                        ctx.save();
                        ctx.globalAlpha = this.alpha;
                        ctx.translate(this.x + .5 | 0, this.y + .5 | 0);
                        ctx.beginPath();
                        ctx.arc(0, 0, this.size + .5 | 0, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fillStyle = this.color;
                        ctx.fill();
                        ctx.restore();
                    }
                }
                for (let i = 0; i < particleAmount; i++) {
                    new Particle();
                }

                function drawLoop() {
                    ctx.fillStyle = "rgba(0, 0, 0, .1)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    for (const id in particles) {
                        const particle = particles[id];
                        particle.move();
                        particle.draw();
                    }
                }
                return drawLoop;
            })()
        };
        let enabled = false;
        let selection = "";
        let deltaTime = 0;
        let size = 0;
        function drawLoop() {
            if (Date.now() > deltaTime + 1000 / 120) {
                if (!animations[selection]) return
                if (window.innerWidth + window.innerHeight !== size) {
                    size = window.innerWidth + window.innerHeight;
                    resetCanvas();
                };
                animations[selection]();
                realCtx.clearRect(0, 0, realCanvas.width, realCanvas.height);
                realCtx.globalAlpha = .25;
                realCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
                realCtx.globalAlpha = 1;
                deltaTime = Date.now();
            };
            enabled && requestAnimationFrame(drawLoop);
        }
        return {
            _start: function () {
                enabled = true;
                document.getElementById("gameAreaWrapper").style.opacity = 1;
                drawLoop();
            },
            _stop: function () {
                enabled = false;
                window.removeEventListener("resize", resetCanvas);
                setTimeout(() => realCtx.clearRect(0, 0, realCanvas.width, realCanvas.height), 100);
            },
            _setSelection: function (newSelection) {
                if (animations[newSelection]) {
                    selection = newSelection;
                }
            },
            enabled: enabled
        }
    })();

    const mixColors = (() => {
        const _memory = {};
        return function (c, s, p) {
            const str = `${c}${s}${p.toFixed(2)}`;
            if (_memory[str]) return _memory[str];
            var [c, a, o] = c.match(/\w\w/g).map(e => parseInt(e, 16)), [s, n, r] = s.match(/\w\w/g).map(e => parseInt(e, 16));
            return _memory[str] = `#${Math.round(c + (s - c) * p).toString(16).padStart(2, "0")}${Math.round(a + (n - a) * p).toString(16).padStart(2, "0")}${Math.round(o + (r - o) * p).toString(16).padStart(2, "0")}`;
        }
    })();

    function getColor(colorID) {
        switch (colorID) {
            case -2: // Placeholder color for props
                return color.teal;
            case -1: // Shiny!
                return color.teal;
            case 0:
                return color.teal;
            case 1:
                return color.lgreen;
            case 2:
                return color.orange;
            case 3:
                return color.yellow;
            case 4:
                return color.lavender;
            case 5:
                return color.pink;
            case 6:
                return color.vlgrey;
            case 7:
                return color.lgrey;
            case 8:
                return color.guiwhite;
            case 9:
                return color.black;
            case 10:
                return color.blue;
            case 11:
                return color.green;
            case 12:
                return color.red;
            case 13:
                return color.gold;
            case 14:
                return color.purple;
            case 15:
                return color.magenta;
            case 16:
                return color.grey;
            case 17:
                return color.dgrey;
            case 18:
                return color.white;
            case 19:
                return color.guiblack;
            case 20:
                return "#307A76";
            // Rainbow Colors
            case 100:
                return "#FF0000";
            case 101:
                return "#FF1A00";
            case 102:
                return "#FF2A00";
            case 103:
                return "#FF4300";
            case 104:
                return "#FF5D00";
            case 105:
                return "#FF7200";
            case 106:
                return "#FF7700";
            case 107:
                return "#FF9400";
            case 108:
                return "#FF9900";
            case 109:
                return "#FFA500";
            case 110:
                return "#FFBB00";
            case 111:
                return "#FFCC00";
            case 112:
                return "#FFDD00";
            case 113:
                return "#FFE900";
            case 114:
                return "#FFFA00";
            case 115:
                return "#EEFF00";
            case 116:
                return "#DDFF00";
            case 117:
                return "#D0FF00";
            case 118:
                return "#B6FF00";
            case 119:
                return "#AAFF00";
            case 120:
                return "#88FF00";
            case 121:
                return "#6EFF00";
            case 122:
                return "#54FF00";
            case 123:
                return "#32FF00";
            case 124:
                return "#19FF00";
            case 125:
                return "#04FF00";
            case 126:
                return "#00FF15";
            case 127:
                return "#00FF26";
            case 128:
                return "#00FF3F";
            case 129:
                return "#00FF55";
            case 130:
                return "#00FF6E";
            case 131:
                return "#00FF7F";
            case 132:
                return "#00FF99";
            case 133:
                return "#00FFA5";
            case 134:
                return "#00FFBB";
            case 135:
                return "#00FFCB";
            case 136:
                return "#00FFD8";
            case 137:
                return "#00FFED";
            case 138:
                return "#00FFFA";
            case 139:
                return "#00E9FF";
            case 140:
                return "#00D8FF";
            case 141:
                return "#00C3FF";
            case 142:
                return "#00BBFF";
            case 143:
                return "#00AEFF";
            case 144:
                return "#00A1FF";
            case 145:
                return "#0090FF";
            case 146:
                return "#007FFF";
            case 147:
                return "#0077FF";
            case 148:
                return "#006EFF";
            case 149:
                return "#005DFF";
            case 150:
                return "#0048FF";
            case 151:
                return "#0037FF";
            case 152:
                return "#0026FF";
            case 153:
                return "#0019FF";
            case 154:
                return "#0004FF";
            case 155:
                return "#0C00FF";
            case 156:
                return "#2200FF";
            case 157:
                return "#2E00FF";
            case 158:
                return "#3B00FF";
            case 159:
                return "#5400FF";
            case 160:
                return "#6A00FF";
            case 161:
                return "#7F00FF";
            case 162:
                return "#9000FF";
            case 163:
                return "#A100FF";
            case 164:
                return "#B600FF";
            case 165:
                return "#BF00FF";
            case 166:
                return "#D000FF";
            case 167:
                return "#DC00FF";
            case 168:
                return "#E900FF";
            case 169:
                return "#FA00FF";
            case 170:
                return "#FF00F6";
            case 171:
                return "#FF00E1";
            case 172:
                return "#FF00CB";
            case 173:
                return "#FF00B6";
            case 174:
                return "#FF00AA";
            case 175:
                return "#FF00A5";
            case 176:
                return "#FF0090";
            case 177:
                return "#FF007B";
            case 178:
                return "#FF006E";
            case 179:
                return "#FF005D";
            case 180:
                return "#FF0059";
            case 181:
                return "#FF0043";
            case 182:
                return "#FF003B";
            case 183:
                return "#FF0026";
            case 184:
                return "#FF001D";
            case 185:
                return "#FF000C";
            // Misc
            case "rainbow":
                return "#" + Math.floor(Math.random() * 16777215).toString(16);
            case "FFA_RED":
                return color.red;
            default:
                return "#F00";
        }
    }

    function getColorDark(givenColor) {
        if (_config.noBorders) return givenColor;
        if (_config.rgbBorders) return getColor(_global._tankMenuColor);
        let dark = (_config.neon | _config.inverseBorderColor) ? color.white : color.black;
        return _config.darkBorders ? dark : mixColors(givenColor, dark, color.border);
    }

    function getZoneColor(cell, real, seed = 1) {
        if (cell.slice(0, -1) === "por") {
            switch (+cell.slice(3)) {
                case 1:
                    return mixColors(color.blue, color.guiwhite, 1 / 3);
                case 2:
                    return mixColors(color.red, color.guiwhite, 1 / 3);
                case 3:
                    return mixColors(color.green, color.guiwhite, 1 / 3);
                case 4:
                    return mixColors(color.pink, color.guiwhite, 1 / 3);
            }
        }
        switch (cell) {
            case "n_b1":
            case "bas1":
            case "bad1":
            case "dom1":
                return color.blue;
            case "n_b2":
            case "bas2":
            case "bad2":
            case "dom2":
            case "boss":
                return color.red;
            case "n_b3":
            case "bas3":
            case "bad3":
            case "dom3":
                return color.green;
            case "n_b4":
            case "bas4":
            case "bad4":
            case "dom4":
                return color.pink;
            case "n_b5":
            case "bas5":
            case "bad5":
            case "dom5":
                return color.yellow;
            case "n_b6":
            case "bas6":
            case "bad6":
            case "dom6":
                return color.orange;
            case "n_b7":
            case "bas7":
            case "bad7":
            case "dom7":
                return "#F700FF";
            case "n_b8":
            case "bas8":
            case "bad8":
            case "dom8":
                return color.teal;
            case "domi":
                return color.gold;
            case "edge":
                return mixColors(color.white, color.guiblack, 1 / 3);
            case "port":
                return color.guiblack;
            case "spn1":
                return mixColors(color.blue, color.guiwhite, 2 / 3);
            case "spn2":
                return mixColors(color.red, color.guiwhite, 2 / 3);
            case "nest":
                if (_config.tintedNest) return real ? color.purple : color.lavender;
            default:
                return real ? color.white : color.guiwhite;
        }
    }

    function setColors(context, givenColor) {
        if (_config.neon) {
            context.fillStyle = getColorDark(givenColor);
            context.strokeStyle = givenColor;
        } else {
            context.fillStyle = givenColor;
            context.strokeStyle = getColorDark(givenColor);
        }
    }

    function setColorsUnmix(context, givenColor) {
        context.fillStyle = givenColor;
        context.strokeStyle = "rgba(0,0,0,0)";
    }

    function setColorsUnmixB(context, givenColor) {
        context.fillStyle = "rgba(0,0,0,0)";
        context.strokeStyle = getColorDark(givenColor);
    }

    function lerp(a, b, x, syncWithFps = false) {
        if (syncWithFps) {
            if (_global._fps < 20) _global._fps = 20;
            x /= _global._fps / 120;
        }
        return a + x * (b - a);
    }

    function lerpAngle(is, to, amount, syncWithFps) {
        var normal = {
            x: Math.cos(is),
            y: Math.sin(is)
        };
        var normal2 = {
            x: Math.cos(to),
            y: Math.sin(to)
        };
        var res = {
            x: lerp(normal.x, normal2.x, amount, syncWithFps),
            y: lerp(normal.y, normal2.y, amount, syncWithFps)
        };
        return Math.atan2(res.y, res.x);
    }

    const bounceyLerp = (()=>{
        let b1 = 4 / 11,
            b2 = 6 / 11,
            b3 = 8 / 11,
            b4 = 3 / 4,
            b5 = 9 / 11,
            b6 = 10 / 11,
            b7 = 15 / 16,
            b8 = 21 / 22,
            b9 = 63 / 64,
            b0 = 1 / b1 / b1;

        function In(t) {
            return 1 - out(1 - t);
        }

        function out(t) {
            return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
        }

        function inOut(t) {
            return ((t *= 2) <= 1 ? 1 - out(1 - t) : out(t - 1) + 1) / 2;
        }

        return {
            in: In,
            out,
            inOut
        }
    })()

    const expLerp = (() => {
        function tpmt(x) {
            return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494;
        }
        function In(t) {
            return tpmt(1 - +t);
        }

        function out(t) {
            return 1 - tpmt(t);
        }

        function inOut(t) {
            return ((t *= 2) <= 1 ? tpmt(1 - t) : 2 - tpmt(t - 1)) / 2;
        }

        return {
            in: In,
            out,
            inOut
        }
    })()

    const quadLerp = (()=>{
        function In(t) {
            return t * t;
        }

        function out(t) {
            return t * (2 - t);
        }

        function inOut(t) {
            return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
        }
        return {
            in: In,
            out,
            inOut
        }
    })()


    let _mockups = {
        // Statistics
        _totalMockups: 0,
        _fetchedMockups: 0,

        // Data handling
        _mockupData: new Map(),
        _pendingMockupRequests: new Set(),
        get: (entityIndex, doExtraSeek=true) => {
            let entity = _mockups._mockupData.get(entityIndex)
            if (entity) {
                return entity
            } else if (_mockups._pendingMockupRequests.has(entityIndex)) {
                return _mockups._defaults
            } else {
                if (navigator?.connection?.downlink>3.5&&doExtraSeek) {
                    for (let i = -5; i < 6; i++) {
                        _mockups.get(entityIndex+i, false)
                    }
                }else{
                    _mockups._pendingMockupRequests.add(entityIndex)
                    _socket.talk("mu", entityIndex)
                }
                return _mockups._defaults
            }
        },
        set: (entityIndex, data) => {
            _mockups._fetchedMockups++
            _mockups._mockupData.set(entityIndex, _mockups._applyDefaults(data))
        },

        // Defaults
        _defaults: { 
            isLoading: true,
            name: "Loading..",
            x: 0,
            y: 0,
            color: 16,
            shape: 0,
            size: 1,
            realSize: 1,
            facing: 0,
            layer: 0,
            statnames: 0,
            defaultArrayLength: 0,
            aspect: 1,
            skin: 0,
            colorUnmix: 0,
            angle: 0,
            position: {
                middle: {
                    x: 0,
                    y: 0,
                },
                axis: 0
            },
            guns: [],
            turrets: [],
            lasers: [],
            props: []
        },
        _applyDefaults: (_data) => {
            _data.turrets = (_data.turrets || []).map(_mockups._applyDefaults);
            for (const key in _mockups._defaults) {
                if (_data[key] == null) {
                    _data[key] = _mockups._defaults[key];
                }
            }
            return _data;
        }
    };


    function getEntityImageFromMockup(index, color) {
        let mockup = _mockups.get(index);
        if (!mockup) throw new Error("Failed to find mockup " + index);
        color = mockup.color == null || mockup.color === 16 ? arguments[1] : mockup.color;
        return {
            time: 0,
            index: index,
            x: mockup.x,
            y: mockup.y,
            vx: 0,
            vy: 0,
            size: mockup.size,
            widthHeightRatio: [1, 1],
            realSize: mockup.realSize,
            color: color,
            render: {
                real: false,
                size: mockup.size,
                extra: [1.75, 0],
                status: {
                    getFade: function () {
                        return 1;
                    },
                    getColor: function () {
                        return "#FFFFFF";
                    },
                    getBlend: function () {
                        return 0;
                    },
                    health: {
                        get: function () {
                            return 1;
                        }
                    },
                    shield: {
                        get: function () {
                            return 1;
                        }
                    }
                }
            },
            facing: mockup.facing,
            shape: mockup.shape,
            name: mockup.name,
            score: 0,
            tiggle: 0,
            layer: mockup.layer,
            guns: {
                length: mockup.guns.length,
                getPositions: function () {
                    let a = [];
                    mockup.guns.forEach(function () {
                        return a.push(0);
                    });
                    return a;
                },
                update: function () { }
            },
            turrets: mockup.turrets.map(function (t) {
                let o = getEntityImageFromMockup(t.index);
                o.realSize = o.realSize / o.size * mockup.size * t.sizeFactor;
                o.size = mockup.size * t.sizeFactor;
                o.angle = t.angle;
                o.offset = t.offset;
                o.direction = t.direction;
                o.facing = t.direction + t.angle;
                return o;
            }),
            lasers: {
                length: mockup.lasers.length
            },
            props: {
                length: mockup.props.length
            }
        };
    }
    _global.clickables = function () {
        let Region = function () {
            function Clickable() {
                let region = {
                    _x: 0,
                    _y: 0,
                    _w: 0,
                    _h: 0
                },
                    active = 0;
                return {
                    set: function (x, y, w, h) {
                        region._x = x * _global._ratio;
                        region._y = y * _global._ratio;
                        region._w = w * _global._ratio;
                        region._h = h * _global._ratio;
                        active = 1;
                    },
                    check: function (target) {
                        let dx = Math.round(target.x - region._x),
                            dy = Math.round(target.y - region._y);
                        return active && dx >= 0 && dy >= 0 && dx <= region._w && dy <= region._h;
                    },
                    setActive: function (v) {
                        active = v;
                    }
                };
            }
            return function (size) {
                let data = [];
                for (let i = 0; i < size; i++) data.push(Clickable());
                return {
                    place: function (index, ...a) {
                        if (index >= data.length) {
                            _logger._norm(index);
                            _logger._norm(data);
                            throw new Error("Trying to reference a clickable outside a region!");
                        }
                        data[index].set(...a);
                    },
                    hide: function () {
                        for (let r of data) r.setActive(0);
                    },
                    get: function () {
                        return data
                    },
                    check: function (x) {
                        return data.findIndex(function (r) {
                            return r.check(x);
                        });
                    }
                };
            };
        }();
        return {
            stat: Region(10),
            upgrade: Region(40),
            hover: Region(1),
            skipUpgrades: Region(1),
            mobileClicks: Region(_global.mobileClickables.length),
            tree: Region(1)
        };
    }();
    _global.statHover = 0;
    _global.upgradeHover = 0;
    let entities = [],
        particles = [],
        upgradeSpin = 0,
        _messages = [],
        metrics = {
            _latency: 0,
            _lag: 0,
            _rendertime: 0,
            _updatetime: 0,
            _lastlag: 0,
            _lastrender: 0,
            _rendergap: 0,
            _lastuplink: 0,
            _serverCpuUsage: 0,
            _serverMemUsage: 0
        },
        lastPing = 0,
        lastServerStat = 0,
        renderTimes = 0,
        updateTimes = 0,
        roomSetup = [
            ["norm"]
        ],
        _gui = {
            _getStatNames: function (num) {
                switch (num) {
                    case 1:
                        return ["Body Damage", "Max Health", "", "", "", "", "  Engine Acceleration", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 2:
                        return ["Body Damage", "Max Health", "Drone Speed", "Drone Health", "Drone Penetration", "Drone Damage", "Respawn Rate", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 3:
                        return ["Body Damage", "Max Health", "Drone Speed", "Drone Health", "Drone Penetration", "Drone Damage", "Max Drone Count", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 4:
                        return ["Body Damage", "Max Health", "Swarm Speed", "Swarm Health", "Swarm Penetration", "Swarm Damage", "Reload", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 5:
                        return ["Body Damage", "Max Health", "Trap Speed", "Trap Health", "Trap Penetration", "Trap Damage", "Reload", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 6:
                        return ["Body Damage", "Max Health", "Weapon Speed", "Weapon Health", "Weapon Penetration", "Weapon Damage", "Reload", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 7:
                        return ["Body Damage", "Max Health", "Bullet Speed", "Bullet Health", "Bullet Penetration", "Bullet Damage", "Reload & Acceleration", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 8:
                        return ["Body Damage", "Max Health", "Minion Speed", "Minion Health", "Minion Penetration", "Minion Damage", "Respawn Rate", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 9:
                        return ["Body Damage", "Max Health", "", "", "", "", "Jump Rate", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 10:
                        return ["Body Damage", "Max Health", "Block Speed", "Block Health", "Block Penetration", "Block Damage", "Reload", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 11:
                        return ["Body Damage", "Max Health", "Rebound Speed", "Boomerang Health", "Boomerang Penetration", "Boomerang Damage", "Reload", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 12:
                        return ["Body Damage", "Max Health", "Lance Range", "Lance Longevity", "Lance Sharpness", "Lance Damage", "Lance Density", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 13:
                        return ["Body Damage", "Max Health", "Flail Speed", "Flail Resistance", "Flail Penetration", "Flail Damage", "Flail Density", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 14:
                        return ["Body Damage", "Max Health", "Syringe Range", "Syringe Longevity", "Syringe Sharpness", "Syringe Damage", "Refill Time", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    default:
                        return ["Body Damage", "Max Health", "Bullet Speed", "Bullet Health", "Bullet Penetration", "Bullet Damage", "Reload", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                }
            },
            _skills: [{
                amount: 0,
                color: "purple",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "pink",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "blue",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "lgreen",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "red",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "yellow",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "green",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "teal",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "gold",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "orange",
                cap: 1,
                softcap: 1
            }],
            _points: 0,
            _upgrades: [],
            _realUpgrades: [],
            _playerid: -1,
            _skill: function () {
                let levelScore = 0,
                    deduction = 0,
                    level = 0,
                    score = Smoothbar(0);
                return {
                    setScores: function (s) {
                        if (s) {
                            score.set(s);
                            if (deduction > score.get()) {
                                level = 0;
                                deduction = 0;
                            }
                        } else {
                            score = Smoothbar(0);
                            level = 0;
                        }
                    },
                    update: function () {
                        levelScore = Math.ceil(1.8 * Math.pow(level + 1, 1.8) - 2 * level + 0), score.get() - deduction >= levelScore && (deduction += levelScore, level += 1);
                    },
                    getProgress: function () {
                        return levelScore ? Math.min(1, Math.max(0, (score.get() - deduction) / levelScore)) : 0;
                    },
                    getScore: function () {
                        return score.get();
                    },
                    getLevel: function () {
                        return level;
                    }
                };
            }(),
            _type: 0,
            _fps: 0,
            _color: 0,
            _accel: 0,
            _topSpeed: 1,
            _minimap: {
                _display: [],
                _server: []
            },
            _leaderboard: {
                _display: [],
                _server: [],
                _publish: (old, entry) => {
                    let ref = _mockups.get(entry.index);
                    return {
                        id: entry.id,
                        image: getEntityImageFromMockup(entry.index, entry.color),
                        position: ref.position,
                        barColor: getColor(entry.barColor),
                        label: entry.name ? entry.name + " - " + (entry.label || ref.name) : (entry.label || ref.name),
                        score: lerp(old.score, entry.score, 0.03),
                        nameColor: entry.nameColor,
                    }
                }
            }
        };
    _global._sendMessageToClient = (msg, c = "black") => _messages.push({
        text: msg,
        status: 2,
        alpha: 0,
        time: Date.now(),
        color: color[c]
    });
    _global.clearUpgrades = function () {
        _gui._upgrades = [];
    };
    _global.canUpgrade = 0;
    _global.canSkill = 0;
    _global.message = "";
    _global.time = 0;
    let getRatio = function () {
        return Math.max(_global._screenWidth / _player._renderv, _global._screenHeight / _player._renderv / 9 * 16);
    };

    function resizeEvent(e) {
        let scale = window.devicePixelRatio;
        scale *= [0.2, 0.5, 0.75, 1, 0.08][["Very Low (35%)", "Low (50%)", "Medium (75%)", "High (100%)", "PixelMode (8%)"].indexOf(_config.resolutionScale)];
        c.width = _global._screenWidth = window.innerWidth * scale;
        c.height = _global._screenHeight = window.innerHeight * scale;
        _global._ratio = scale;
        if(!_global.mobile)document.getElementById('gameCanvas').focus();
        _global._screenSize = Math.min(1920, Math.max(window.innerWidth, 1280));
    }
    let _animations = ((module) => {
        class Animation {
            constructor(start, to, smoothness = 0.05) {
                this.start = start;
                this.to = to;
                this.value = start;
                this.smoothness = smoothness;
            }
            reset() {
                this.value = this.start;
                return this.value;
            }
            getLerp() {
                this.value = lerp(this.value, this.to, this.smoothness, true);
                return this.value;
            }
            getNoLerp() {
                this.value = this.to;
                return this.value;
            }
            get() {
                return _config.smoothAnimations ? this.getLerp() : this.getNoLerp();
            }
            flip() {
                const start = this.to;
                const to = this.start;
                this.start = start;
                this.to = to;
            }
            goodEnough(val = .5) {
                return Math.abs(this.to - this.value) < val;
            }
        }
        let library = {};
        library.connecting = new Animation(1, 0);
        library.disconnected = new Animation(1, 0);
        library.deathScreen = new Animation(1, 0);
        library.upgradeMenu = new Animation(0, 1, 0.01);
        library.skillMenu = new Animation(0, 1, 0.01);
        library.optionsMenu = new Animation(1, 0);
        library.minimap = new Animation(-1, 1, 0.025);
        library.leaderboard = new Animation(-1, 1, 0.025);
        library.curtains = new Animation(1.2, 0, .05);
        module.animations = library;
        return library;
    })(window);
    window.onload = function () {
        if (window.didWindowLoad) return
        window.didWindowLoad = true
        if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) window.alert('We see you are using Internet Explorer. We highly suggest you use Chrome, Firefox, or some other non-IE/Edge browser, because stuff will otherwise be broken.');
        if (/Edge\/\d./i.test(navigator.userAgent)) window.alert('We see you are using Microsoft Edge. We highly suggest you use Chrome, Firefox, or some other non-IE/Edge browser, because stuff will otherwise be broken.');
        let siteIsValid = false
        let siteArray = ["host", "", "exoglitch.io", ".rivet.game"]
        for (let part of siteArray) {
            if (window.location.hostname.includes(part)) {
                siteIsValid = true
            }
        }
        if (window !== window.top) siteIsValid = false
        //if (typeof localStorage.gamemodeID === "undefined") localStorage.gamemodeID = "0";
        _config.Woomy = (() => {
            let library = {};
            class Setting {
                constructor(key, name, type, normal, setFunction = () => { }, dropDown = {
                    keys: [],
                    suffix: ""
                }) {
                    this.key = key;
                    this.name = name;
                    this.type = type;
                    this.default = normal;
                    this.setFunction = setFunction;
                    this.dropDown = {
                        status: !!dropDown.keys.length,
                        options: dropDown.keys,
                        suffix: dropDown.suffix
                    };
                    this.retrieveFromLocalStorage();
                    library[name] = this;
                }
                getStorageName() {
                    return "Woomy_" + this.type + "_" + this.key;
                }
                retrieveFromLocalStorage() {
                    let key = this.getStorageName();
                    let value = localStorage.getItem(key);
                    if (this.type === "number" && !isNaN(+value)) value = +value;
                    let valid = (value !== "undefined" && value);
                    this.set(valid ? JSON.parse(value) : this.default);
                }
                update() {
                    _config[this.key] = this.value;
                    localStorage.setItem(this.getStorageName(), JSON.stringify(this.value));
                }
                set(value) {
                    if (this.type === "number" && !isNaN(+value)) value = +value;
                    if (this.type === "boolean" && ["on", "off"].includes(value)) value = value === "on";
                    if (typeof value === this.type) {
                        this.value = value;
                        this.update();
                        this.setFunction(value);
                    }
                }
                reset() {
                    this.value = this.default;
                    this.update();
                }
            }
            new Setting("neon", "Neon", "boolean", false);
            new Setting("darkBorders", "Dark Borders", "boolean", false);
            new Setting("rgbBorders", "Rainbow Borders", "boolean", false);
            new Setting("glassMode", "Glass Mode", "boolean", false);
            new Setting("pointy", "Sharp Borders", "boolean", false);
            new Setting("inverseBorderColor", "Inverse Border Color", "boolean", false);
            new Setting("noBorders", "No Borders", "boolean", false);
            new Setting("tintedNest", "Tinted Nest", "boolean", true);
            new Setting("tintedDamage", "Red Damage", "boolean", true);
            new Setting("miterText", "Sharp Text", "boolean", false);
            new Setting("tintedHealth", "Tinted Health Bars", "boolean", true);
            new Setting("coloredHealthBars", "Colored Health Bars", "boolean", false);
            new Setting("shieldbars", "Split Health Bars", "boolean", true);
            new Setting("fancyAnimations", "Fancy Animations", "boolean", true, () => _global._gameStart && resizeEvent());
            new Setting("useFourRows", "Four Upgrade Rows", "boolean", false);
            new Setting("roundUpgrades", "Round Upgrades", "boolean", false);
            new Setting("disableMessages", "Disable Messages", "boolean", false);
            new Setting("autoUpgrade", "Auto Level Up", "boolean", _global.mobile);
            new Setting("drawOwnName", "Render Own Name", "boolean", false);
            new Setting("screenshotMode", "Screenshot Mode", "boolean", false);
            new Setting("lerpSize", "Lerp Entity Sizes", "boolean", false);
            new Setting("localmotion", "Local Motion", "boolean", false);
            new Setting("gameAnimations", "Game Menu Animations", "boolean", true);
            new Setting("mainMenuStyle", "Menu Dark Mode", "boolean", false, enabled => {
                const setProperties = vars => {
                    if (enabled) {
                        vars.setProperty('--backgroundColor', '#202225');
                        vars.setProperty('--backgroundBorderColor', '#f2e558');
                        vars.setProperty('--menuTextColor', '#e1e1e7');
                        vars.setProperty('--backgroundBrightness', '0.85');
                        vars.setProperty('--backgroundLink', "url(/resources/exoglitch-io-logo.png)");
                    } else {
                        vars.setProperty('--backgroundColor', '#dde6eb');
                        vars.setProperty('--backgroundBorderColor', '#c1cfd8');
                        vars.setProperty('--menuTextColor', '#000000');
                        vars.setProperty('--backgroundBrightness', '0.9');
                        vars.setProperty('--backgroundLink', "url(/resources/exoglitch-io-logo.png)");
                    }
                }
                setProperties(document.querySelector(":root").style);
            });
            new Setting("fontStrokeRatio", "Font Stroke Ratio", "number", 6);
            new Setting("borderChunk", "Border Width", "number", 6);
            new Setting("mininumBorderChunk", "Min Border Thickness", "number", 3);
            new Setting("barChunk", "Bar Stroke Thickness", "number", 4.5);
            new Setting("deathExpandRatio", "Death Expand Ratio", "number", 1.35);
            new Setting("fontSizeBoost", "Font Size", "number", 10);
            new Setting("fpsCap", "FPS Cap", "number", 45, value => {
                _global._fpscap = 1000 / Math.max(value, 1);
                if (_global._fpscap !== _global._oldFpsCap) _global._sendMessageToClient("Max FPS changed, it may take a few seconds to show any difference.");
                _global._oldFpsCap = _global._fpscap;
            });
            new Setting("resolutionScale", "Resolution", "string", "High (100%)", resizeEvent, {
                keys: ["Very Low (35%)", "Low (50%)", "Medium (75%)", "High (100%)"],
                suffix: ""
            });
            new Setting("fontFamily", "Font Family", "string", "Ubuntu", value => {
                if (value !== "Ubuntu") _global._sendMessageToClient("If a font is too big or too small, try changing the Font Size option!");
            }, {
                keys: ["Ubuntu", "Alfa Slab One", "Bebas Neue", "Bungee", "Cutive Mono", "Dancing Script", "Fredoka One", "Indie Flower", "Nanum Brush Script", "Pacifico", "Passion One", "Permanent Marker", "Zen Dots", "Rampart One", "Roboto Mono", "Share Tech Mono", "Syne Mono", "Wingdings", "serif", "sans-serif", "cursive", "system-ui"],
                suffix: ""
            });
            new Setting("theme", "Theme", "string", "normal", value => color = themes[value] || themes.normal, {
                keys: Object.keys(themes),
                suffix: "Colors"
            });
            codeblock_shadowsSetting: {
                let shadowTypes = ["Disabled", "Light Blur", "Dark Blur", "Colorful Blur", "Light", "Dark",/* "Light Stroke", "Dark Stroke",*/ "Colorful Dense", "Fake 3D", "Dynamic Fake 3D"];
                new Setting("shaders", "Shader Casting", "string", "Disabled", value => {
                }, {
                    keys: shadowTypes,
                    suffix: ""
                });
            }
            new Setting("filter", "Filters", "string", "Disabled", () => { }, {
                keys: ["Disabled", "Saturated", "Grayscale", "Dramatic", "Inverted", "Sepia"],
                suffix: ""
            });
            new Setting("backgroundAnimation", "Menu Animation", "string", "disabled", value => {
                if (_global._gameStart) return;
                if (value === "disabled") {
                    _backgroundAnimations._stop();
                } else {
                    _backgroundAnimations._setSelection(value.toLowerCase());
                    _backgroundAnimations._start();
                }
            }, {
                keys: ["disabled", "fireworks", "balls", "snow", "spiral", "ferris"],
                suffix: ""
            });
            return library;
        })();
        window._initOptions();
        let selectServer = (function () {
            // server filtering
            let filterMode = ""
            let serverFilterHolder = document.getElementById("serverFilterHolder")
            async function filterClicked(e) {
                for (let ele of serverFilterHolder.children) {
                    ele.classList.remove("selectedButton")
                }
                e.srcElement.classList.add("selectedButton")
                filterMode = e.srcElement.id.split("_")[1]
                updateDisplay()
            }
            for (let ele of serverFilterHolder.children) {
                ele.onclick = filterClicked
            }

            // server selection
            let serverSelector = document.getElementById("serverSelector");
            function checkIsValid(name, lobbyid) {
                let index = servers.findIndex(server => server.rivetGamemode == name);
                let validLobby = 0;
                if (lobbyid) {
                    for (let lobby in window.lobbies) {
                        lobby = window.lobbies[lobby]
                        if (lobby.lobby_id === lobbyid) {
                            validLobby++
                            break;
                        }
                    }
                }
                return (index > -1 && (lobbyid ? validLobby : true));
            }
            async function updateDisplay() {
                serverSelector.innerHTML = ""
                switch (filterMode) {
                    case "auto":
                        for (let server of window.servers) {
                            if (!isLocal && !isNaN(Number(server.rivetGamemode))) {
                                continue;
                            }
                            if (isBeta && server.rivetGamemode !== "e") {
                                continue;
                            }
                            if (isEvent && server.rivetGamemode !== "f"){
                                continue
                            }
                            if (!isEvent && server.rivetGamemode === "f"){
                                continue
                            }
                            let p = document.createElement("p");
                            p.id = "server_" + server.rivetGamemode;
                            p.classList.add("exoglitchServerOption")
                            p.textContent = server.serverGamemode + " | Loading..";
                            serverSelector.appendChild(p);
                        }
                        let playerCounts = []
                        for (let id in window.lobbies) {
                            let serverData = window.lobbies[id]
                            if (!playerCounts[serverData.game_mode_id]) {
                                playerCounts[serverData.game_mode_id] = 0
                            }
                            playerCounts[serverData.game_mode_id] += serverData.total_player_count
                        }
                        Array.from(document.getElementsByClassName("exoglitchServerOption")).forEach(ele => {
                            let id = ele.id.split("_")[1]
                            ele.innerHTML = ele.innerHTML.split("|")[0]
                        })
                        break;
                    case "manual":
                        let i = 0
                        for (let lobby in window.lobbies) {
                            let lobbyInfo = window.lobbies[lobby]
                            let gamemodeName
                            for (let server of window.servers) {
                                if (lobbyInfo.game_mode_id === "default") {
                                    lobbyInfo.game_mode_id = 0
                                }
                                if (server.rivetGamemode == lobbyInfo.game_mode_id) {
                                    gamemodeName = server.serverGamemode
                                    break;
                                }
                            }
                            let p = document.createElement("p");
                            p.id = "server_" + lobbyInfo.game_mode_id + "_" + lobbyInfo.lobby_id;
                            p.classList.add("exoglitchServerOption")
                            p.textContent = lobbyInfo.region_id + " | " + gamemodeName + " | " + lobbyInfo.total_player_count + "/" + lobbyInfo.max_players_direct;
                            serverSelector.appendChild(p);
                        }
                        break;
                }
                for (let ele of serverSelector.children) {
                    if (ele.id.split("_")[2] === _global._windowSearch.lobby && servers[_global._selectedServer].rivetGamemode == ele.id.split("_")[1]) {
                        //console.log("ON", "server_" + servers[i].name);
                        ele.style.color = "#8ABC3F";
                        ele.style.cursor = "default";
                    } else {
                        //console.log("OFF", "server_" + servers[i].name);
                        ele.style.transition = "0.35s"
                        ele.style.color = "#828282";
                        ele.style.cursor = "pointer";
                    }
                }
                for (let child of serverSelector.children) {
                    child.onclick = function () {
                        if (child.style.cursor === "default") {
                            return
                        }
                        _global._windowSearch.lobby = ""
                        let serverargs = this.id.split("_")
                        select(serverargs[1], serverargs[2]);
                    }
                }

            }
            window.updateDisplay = updateDisplay;
            if (isLocal) document.getElementById("startButton").onclick = function () {
                _startGame();
            };
            function select(name, lobbyId) {
                document.getElementById("startButton").onclick = function () {
                    _startGame();
                };
                if (checkIsValid(name, lobbyId)) {
                    if (window.location.hostname === "localhost") console.warn("UH OH! YOU ARE ON A LOCAL VERSION!")
                    _global._selectedServer = servers.findIndex(server => server.rivetGamemode == name);
                    _logger._info("Server set to " + servers[_global._selectedServer].rivetGamemode);
                    _global._windowSearch.server = servers[_global._selectedServer].rivetGamemode;
                    _global._windowSearch.lobby = lobbyId
                    //localStorage.gamemodeID = name;
                    updateDisplay();
                } else {
                    console.log("Failed to set the server to", name);
                }
            }
            document.getElementById("serverfilter_" + "auto").click()
            decisionStructure: {
                if (_global._windowSearch.party) {
                    _global.party = _global._windowSearch.party;
                }
                if (checkIsValid(_global._windowSearch.server, _global._windowSearch.lobby)) {
                    select(_global._windowSearch.server, _global._windowSearch.lobby)
                } else {
                    select(document.getElementById("serverSelector")?.children?.[0]?.id?.split("_")?.[1])
                }
            }
            return select;
        })();
        _util._retrieveFromLocalStorage("playerNameInput");
        document.onkeydown = function (e) {
            if (_global._disconnected && _global._gameStart) return;
            let key = e.which || e.keyCode;
            if (!_global._disableEnter && key === _global.KEY_ENTER && !_global._gameStart) document.getElementById("startButton").click();
        };
        window.addEventListener("resize", resizeEvent);
        resizeEvent();
        console.log("LOAD SUCCESFUL!!!");
    };
    let LZString = (function () {
        // private property
        var f = String.fromCharCode;
        var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
        var baseReverseDic = {};
        function getBaseValue(alphabet, character) {
            if (!baseReverseDic[alphabet]) {
                baseReverseDic[alphabet] = {};
                for (var i = 0; i < alphabet.length; i++) {
                    baseReverseDic[alphabet][alphabet.charAt(i)] = i;
                }
            }
            return baseReverseDic[alphabet][character];
        }
        var LZString = {
            compressToBase64: function (input) {
                if (input == null) return "";
                var res = LZString._compress(input, 6, function (a) { return keyStrBase64.charAt(a); });
                switch (res.length % 4) { // To produce valid Base64
                    default: // When could this happen ?
                    case 0: return res;
                    case 1: return res + "===";
                    case 2: return res + "==";
                    case 3: return res + "=";
                }
            },
            decompressFromBase64: function (input) {
                if (input == null) return "";
                if (input == "") return null;
                return LZString._decompress(input.length, 32, function (index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
            },
            compressToUTF16: function (input) {
                if (input == null) return "";
                return LZString._compress(input, 15, function (a) { return f(a + 32); }) + " ";
            },
            decompressFromUTF16: function (compressed) {
                if (compressed == null) return "";
                if (compressed == "") return null;
                return LZString._decompress(compressed.length, 16384, function (index) { return compressed.charCodeAt(index) - 32; });
            },
            //compress into uint8array (UCS-2 big endian format)
            compressToUint8Array: function (uncompressed) {
                var compressed = LZString.compress(uncompressed);
                var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character
                for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
                    var current_value = compressed.charCodeAt(i);
                    buf[i * 2] = current_value >>> 8;
                    buf[i * 2 + 1] = current_value % 256;
                }
                return buf;
            },
            //decompress from uint8array (UCS-2 big endian format)
            decompressFromUint8Array: function (compressed) {
                if (compressed === null || compressed === undefined) {
                    return LZString.decompress(compressed);
                } else {
                    var buf = new Array(compressed.length / 2); // 2 bytes per character
                    for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
                        buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
                    }
                    var result = [];
                    buf.forEach(function (c) {
                        result.push(f(c));
                    });
                    return LZString.decompress(result.join(''));
                }
            },
            //compress into a string that is already URI encoded
            compressToEncodedURIComponent: function (input) {
                if (input == null) return "";
                return LZString._compress(input, 6, function (a) { return keyStrUriSafe.charAt(a); });
            },
            //decompress from an output of compressToEncodedURIComponent
            decompressFromEncodedURIComponent: function (input) {
                if (input == null) return "";
                if (input == "") return null;
                input = input.replace(/ /g, "+");
                return LZString._decompress(input.length, 32, function (index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
            },
            compress: function (uncompressed) {
                return LZString._compress(uncompressed, 16, function (a) { return f(a); });
            },
            _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
                if (uncompressed == null) return "";
                var i, value,
                    context_dictionary = {},
                    context_dictionaryToCreate = {},
                    context_c = "",
                    context_wc = "",
                    context_w = "",
                    context_enlargeIn = 2, // Compensate for the first entry which should not count
                    context_dictSize = 3,
                    context_numBits = 2,
                    context_data = [],
                    context_data_val = 0,
                    context_data_position = 0,
                    ii;
                for (ii = 0; ii < uncompressed.length; ii += 1) {
                    context_c = uncompressed.charAt(ii);
                    if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                        context_dictionary[context_c] = context_dictSize++;
                        context_dictionaryToCreate[context_c] = true;
                    }

                    context_wc = context_w + context_c;
                    if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                        context_w = context_wc;
                    } else {
                        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                            if (context_w.charCodeAt(0) < 256) {
                                for (i = 0; i < context_numBits; i++) {
                                    context_data_val = (context_data_val << 1);
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                }
                                value = context_w.charCodeAt(0);
                                for (i = 0; i < 8; i++) {
                                    context_data_val = (context_data_val << 1) | (value & 1);
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            } else {
                                value = 1;
                                for (i = 0; i < context_numBits; i++) {
                                    context_data_val = (context_data_val << 1) | value;
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = 0;
                                }
                                value = context_w.charCodeAt(0);
                                for (i = 0; i < 16; i++) {
                                    context_data_val = (context_data_val << 1) | (value & 1);
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            }
                            context_enlargeIn--;
                            if (context_enlargeIn == 0) {
                                context_enlargeIn = Math.pow(2, context_numBits);
                                context_numBits++;
                            }
                            delete context_dictionaryToCreate[context_w];
                        } else {
                            value = context_dictionary[context_w];
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = (context_data_val << 1) | (value & 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        // Add wc to the dictionary.
                        context_dictionary[context_wc] = context_dictSize++;
                        context_w = String(context_c);
                    }
                }
                // Output the code for w.
                if (context_w !== "") {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                        if (context_w.charCodeAt(0) < 256) {
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = (context_data_val << 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                            }
                            value = context_w.charCodeAt(0);
                            for (i = 0; i < 8; i++) {
                                context_data_val = (context_data_val << 1) | (value & 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        } else {
                            value = 1;
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = (context_data_val << 1) | value;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = 0;
                            }
                            value = context_w.charCodeAt(0);
                            for (i = 0; i < 16; i++) {
                                context_data_val = (context_data_val << 1) | (value & 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        delete context_dictionaryToCreate[context_w];
                    } else {
                        value = context_dictionary[context_w];
                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = (context_data_val << 1) | (value & 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                }
                // Mark the end of the stream
                value = 2;
                for (i = 0; i < context_numBits; i++) {
                    context_data_val = (context_data_val << 1) | (value & 1);
                    if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                    } else {
                        context_data_position++;
                    }
                    value = value >> 1;
                }
                // Flush the last char
                while (true) {
                    context_data_val = (context_data_val << 1);
                    if (context_data_position == bitsPerChar - 1) {
                        context_data.push(getCharFromInt(context_data_val));
                        break;
                    }
                    else context_data_position++;
                }
                return context_data.join('');
            },
            decompress: function (compressed) {
                if (compressed == null) return "";
                if (compressed == "") return null;
                return LZString._decompress(compressed.length, 32768, function (index) { return compressed.charCodeAt(index); });
            },
            _decompress: function (length, resetValue, getNextValue) {
                var dictionary = [],
                    next,
                    enlargeIn = 4,
                    dictSize = 4,
                    numBits = 3,
                    entry = "",
                    result = [],
                    i,
                    w,
                    bits, resb, maxpower, power,
                    c,
                    data = { val: getNextValue(0), position: resetValue, index: 1 };
                for (i = 0; i < 3; i += 1) {
                    dictionary[i] = i;
                }
                bits = 0;
                maxpower = Math.pow(2, 2);
                power = 1;
                while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                }
                switch (next = bits) {
                    case 0:
                        bits = 0;
                        maxpower = Math.pow(2, 8);
                        power = 1;
                        while (power != maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        c = f(bits);
                        break;
                    case 1:
                        bits = 0;
                        maxpower = Math.pow(2, 16);
                        power = 1;
                        while (power != maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        c = f(bits);
                        break;
                    case 2:
                        return "";
                }
                dictionary[3] = c;
                w = c;
                result.push(c);
                while (true) {
                    if (data.index > length) {
                        return "";
                    }
                    bits = 0;
                    maxpower = Math.pow(2, numBits);
                    power = 1;
                    while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    switch (c = bits) {
                        case 0:
                            bits = 0;
                            maxpower = Math.pow(2, 8);
                            power = 1;
                            while (power != maxpower) {
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb > 0 ? 1 : 0) * power;
                                power <<= 1;
                            }

                            dictionary[dictSize++] = f(bits);
                            c = dictSize - 1;
                            enlargeIn--;
                            break;
                        case 1:
                            bits = 0;
                            maxpower = Math.pow(2, 16);
                            power = 1;
                            while (power != maxpower) {
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb > 0 ? 1 : 0) * power;
                                power <<= 1;
                            }
                            dictionary[dictSize++] = f(bits);
                            c = dictSize - 1;
                            enlargeIn--;
                            break;
                        case 2:
                            return result.join('');
                    }
                    if (enlargeIn == 0) {
                        enlargeIn = Math.pow(2, numBits);
                        numBits++;
                    }
                    if (dictionary[c]) {
                        entry = dictionary[c];
                    } else {
                        if (c === dictSize) {
                            entry = w + w.charAt(0);
                        } else {
                            return null;
                        }
                    }
                    result.push(entry);
                    // Add w+entry[0] to the dictionary.
                    dictionary[dictSize++] = w + entry.charAt(0);
                    enlargeIn--;
                    w = entry;
                    if (enlargeIn == 0) {
                        enlargeIn = Math.pow(2, numBits);
                        numBits++;
                    }

                }
            }
        };
        return LZString;
    })();
    _global._canvas = new (class Canvas {
        constructor() {
            let mobile = _global.mobile;
            this.mobile = mobile;
            this._directionLock = 0;
            this._reenviar = 1;
            this._directions = [];
            this._maxStats = false;
            let self = this;
            this._cv = document.getElementById("gameCanvas");
            this._cv.width = _global._screenWidth;
            this._cv.height = _global._screenHeight;
            if (mobile) {
                this.controlTouch = null;
                this.movementTouch = null;
                this.movementTop = false;
                this.movementBottom = false;
                this.movementLeft = false;
                this.movementRight = false;
                this.lastTap = 0;
                this._cv.addEventListener('touchstart', this._touchStart, false);
                this._cv.addEventListener('touchmove', this._touchMove, false);
                this._cv.addEventListener('touchend', this._touchEnd, false);
                this._cv.addEventListener('touchcancel', this._touchEnd, false);
            } else {
                this._cv.addEventListener('mousedown', this._mouseDown, false);
                this._cv.addEventListener('mousemove', this._gameInput, false);
                this._cv.addEventListener('mouseup', this._mouseUp, false);
            }
            this._cv.addEventListener('keydown', this._keyboardDown, false);
            this._cv.addEventListener('keyup', this._keyboardUp, false);
            this._cv.parent = self;
            this._cv.mouse = {
                x: 0,
                y: 0,
                down: false
            };
        }
        _keyboardDown(event) {
            if (!_global._gameStart) return;
            if (event.location === 3) {
                let number = event.code.substring(6)
                if (_global["DEV_KEY_" + number]) {
                    let value = JSON.parse(localStorage.getItem("DEV_KEY_" + number))
                    if (!value[0]) {
                        _global._sendMessageToClient(`To use DEV_KEY_${number} you must do setDevKey in the console`)
                        return
                    } else if (value[1]) {
                        eval(value[0])(_global, _socket)
                    } else {
                        _socket.talk("D", 5, value[0]);
                    }
                }
                return
            }
            switch (event.keyCode) {
                case _global.KEY_UP_ARROW:
                    if (!_global._died && _global._showTree) return _global._scrollX = 0;
                    _socket.cmd.set(0, 1);
                    break;
                case _global.KEY_DOWN_ARROW:
                    if (!_global._died && _global._showTree) return _global._scrollX = 1;
                    _socket.cmd.set(1, 1);
                    break;
                case _global.KEY_LEFT_ARROW:
                    if (!_global._died && _global._showTree) {
                        _global._scrollX -= _global.searchName === "Basic" ? 0.001 : 0.02;
                        return;
                    }
                    _socket.cmd.set(2, 1);
                    break;
                case _global.KEY_RIGHT_ARROW:
                    if (!_global._died && _global._showTree) {
                        _global._scrollX += _global.searchName === "Basic" ? 0.001 : 0.02;
                        return;
                    }
                    _socket.cmd.set(3, 1);
                    break;
                case _global.KEY_LEVEL_UP:
                    _socket.talk("L");
                    break;
                // Beta-tester keys
                case _global.KEY_COLOR_CHANGE:
                    _socket.talk("B", 0);
                    break;
                case _global.KEY_SPAWN_SHAPES:
                    _socket.talk("B", 2);
                    break;
                case _global.KEY_TELEPORT:
                    _socket.talk("B", 3);
                    break;
                case _global.KEY_KILL_WITH_MOUSE:
                    _socket.talk("B", 9);
                    break;
                case _global.KEY_STEALTH:
                    _socket.talk("B", 10);
                    break;
                case _global.KEY_CHAT:
                    let chatBox = document.getElementById("chatBox");
                    if (!chatBox & !_global._died) {
                        _socket.cmd.reset()
                        chatBox = document.createElement("input");
                        chatBox.type = "text";
                        chatBox.id = "chatBox";
                        chatBox.classList.add("chatBox");
                        chatBox.placeholder = _global.mobile?"Press send to send":"Press enter to send";
                        chatBox.maxLength = 50;
                        document.body.appendChild(chatBox);
                        chatBox.focus();
                        setTimeout(() => {
                            chatBox.style.opacity = 1;
                        }, 10);
                        chatBox.addEventListener("keydown", (e) => {
                            if (e.keyCode === _global.KEY_CHAT) {
                                let input = chatBox.value;
                                removeChatBox();
                                _socket.talk("cs", input.substring(0, 50));
                            }
                        })
                        // detect lost focus
                        chatBox.addEventListener("blur", () => {
                            removeChatBox();
                        })
                    }
                    function removeChatBox() {
                        let chatBox = document.getElementById("chatBox");
                        let game = document.getElementById("gameCanvas");
                        if (chatBox) {
                            chatBox.style.opacity = 0;
                            setTimeout(() => {
                                chatBox.remove();
                            }, 200);
                        }
                        game.focus();
                    }
                    break;
            }
            if (_global.canSkill) {
                let amount = this._maxStats ? 16 : 1;
                do {
                    switch (event.keyCode) {
                        case _global.KEY_UPGRADE_ATK:
                            _socket.talk("x", 0);
                            break;
                        case _global.KEY_UPGRADE_HTL:
                            _socket.talk("x", 1);
                            break;
                        case _global.KEY_UPGRADE_SPD:
                            _socket.talk("x", 2);
                            break;
                        case _global.KEY_UPGRADE_STR:
                            _socket.talk("x", 3);
                            break;
                        case _global.KEY_UPGRADE_PEN:
                            _socket.talk("x", 4);
                            break;
                        case _global.KEY_UPGRADE_DAM:
                            _socket.talk("x", 5);
                            break;
                        case _global.KEY_UPGRADE_RLD:
                            _socket.talk("x", 6);
                            break;
                        case _global.KEY_UPGRADE_MOB:
                            _socket.talk("x", 7);
                            break;
                        case _global.KEY_UPGRADE_RGN:
                            _socket.talk("x", 8);
                            break;
                        case _global.KEY_UPGRADE_SHI:
                            _socket.talk("x", 9);
                            break;
                    }
                } while (--amount);
            }
            if (!event.repeat) {
                switch (event.keyCode) {
                    case _global.KEY_ENTER:
                        if (_global._diedAt - Date.now() > 0 || (_global._disconnected && _global._gameStart)) return;
                        if (_global._died) {
                            _displayAds(false)
                            let socketOut = _util._cleanString(_global.playerName, 25).split('');
                            for (let i = 0; i < socketOut.length; i++) socketOut[i] = socketOut[i].charCodeAt();
                            _socket.talk("s", _global.party || 0, socketOut.toString(), 0);
                            if (_config.autoUpgrade) for (let i = 0; i < 75; i++) setTimeout(() => _socket.talk('L'), i * 25);
                            _global._diedAt = Date.now()
                            _global._deathScreenState = 1
                            _global._died = false;
                        }
                        break;
                    case 221:
                        _global.playerKey.includes("DEV") && eval(window.prompt("Local eval: "));
                        break;
                    case _global.KEY_UP:
                        _socket.cmd.set(0, 1);
                        break;
                    case _global.KEY_DOWN:
                        _socket.cmd.set(1, 1);
                        break;
                    case _global.KEY_LEFT:
                        _socket.cmd.set(2, 1);
                        break;
                    case _global.KEY_RIGHT:
                        _socket.cmd.set(3, 1);
                        break;
                    case _global.KEY_MOUSE_0:
                        _socket.cmd.set(4, 1);
                        break;
                    case _global.KEY_MOUSE_2:
                        _socket.cmd.set(6, 1);
                        break;
                    case _global.KEY_AUTO_SPIN:
                        _socket.talk("t", 0);
                        break;
                    case _global.KEY_AUTO_FIRE:
                        _socket.talk("t", 1);
                        break;
                    case _global.KEY_OVER_RIDE:
                        _socket.talk("t", 2);
                        break;
                    case _global.KEY_MAX_STATS:
                        this._maxStats = true;
                        break;
                    case _global.KEY_DEBUG:
                        _global._debug = _global._debug % 5 + 1;
                        break;
                    case _global.KEY_DRAG:
                        _socket.talk("B", 11);
                        break;
                    case _global.KEY_CLASS_TREE:
                        if (_global._died) break;
                        _global._showTree = !_global._showTree;
                        _socket.talk("P", _global._showTree);
                        break;
                    // Beta-tester keys
                    case _global.KEY_TESTBED:
                    case _global.KEY_TESTBED_FIREFOX:
                    case _global.KEY_TESTBED_ALT:
                        _socket.talk("T", 0);
                        break;
                    case _global.KEY_SUICIDE:
                        _socket.talk("T", 1);
                        break;
                    case _global.KEY_RESET_BASIC_TANK:
                        _socket.talk("T", 2);
                        break;
                    case _global.KEY_GODMODE:
                    case _global.KEY_GODMODE_2:
                        _socket.talk("B", 1);
                        break;
                    case _global.KEY_PASSIVE_MODE:
                        _socket.talk("T", 4);
                        break;
                    case _global.KEY_RAINBOW:
                    case _global.KEY_RAINBOW_2:
                        _socket.talk("T", 5);
                        break;
                    case _global.KEY_TIER_SWITCH:
                    case _global.KEY_TIER_SWITCH_2:
                        _socket.talk("X");
                        break;
                    case _global.KEY_OVERRIDE_ENTITY:
                        //_socket.talk("B", 6);
                        _socket.talk("B", 13);
                        break;
                    case _global.KEY_INFECT_MINION:
                        //_socket.talk("B", 6);
                        _socket.talk("B", 14);
                        break;
                    case _global.KEY_RESET_COLOR:
                        _socket.talk("T", 7);
                        break;
                    case _global.KEY_CONTROL_DOM:
                        _socket.talk("l");
                        break;
                    case _global.KEY_TANK_JOURNEY:
                        _socket.talk("B", 8);
                        break;
                    case 17:
                        _socket.talk("B", 12);
                        break;
                }
            }
        }
        _keyboardUp(event) {
            if (!_global._gameStart) return;
            switch (event.keyCode) {
                case _global.KEY_UP_ARROW:
                case _global.KEY_UP:
                    _socket.cmd.set(0, 0);
                    break;
                case _global.KEY_DOWN_ARROW:
                case _global.KEY_DOWN:
                    _socket.cmd.set(1, 0);
                    break;
                case _global.KEY_LEFT_ARROW:
                case _global.KEY_LEFT:
                    _socket.cmd.set(2, 0);
                    break;
                case _global.KEY_RIGHT_ARROW:
                case _global.KEY_RIGHT:
                    _socket.cmd.set(3, 0);
                    break;
                case _global.KEY_MOUSE_0:
                    _socket.cmd.set(4, 0);
                    break;
                case _global.KEY_MOUSE_2:
                    _socket.cmd.set(6, 0);
                    break;
                case _global.KEY_MAX_STATS:
                    this._maxStats = false;
                    break;
            }
        }
        _mouseDown(mouse) {
            _global.mousedown = true
            if (!_global._gameStart) return;
            switch (mouse.button) {
                case 0:
                    const ratio = _util._getScreenRatio();
                    let width = _global._screenWidth / innerWidth;
                    let height = _global._screenHeight / innerHeight;
                    this.mouse.x = mouse.clientX * _global._ratio * width; //_global.ratio / ratio;// / ratio;//(_global.ratio * ratio);// / ratio;
                    this.mouse.y = mouse.clientY * _global._ratio * height; //_global.ratio / ratio;// / ratio;//(_global.ratio * ratio);// / ratio;
                    this.mouse.down = true;
                    if (_global._showTree) {
                        if (_global.clickables.tree.check(this.mouse) !== -1) {
                            for (let i = 0; i < 5 * Math.random(); i++) _socket.talk("U", "random");
                        }
                    } else {
                        let statIndex = _global.clickables.stat.check(this.mouse);
                        if (statIndex !== -1) _socket.talk("x", statIndex);
                        else if (_global.clickables.skipUpgrades.check(this.mouse) !== -1) _global.clearUpgrades();
                        else {
                            let uIndex = _global.clickables.upgrade.check(this.mouse);
                            if (uIndex !== -1) {
                                _socket.talk("U", uIndex);
                            } else {
                                _socket.cmd.set(4, 1);
                            }
                        }
                    }
                    break;
                case 1:
                    _socket.cmd.set(5, 1);
                    break;
                case 2:
                    _socket.cmd.set(6, 1);
                    break;
            }
        }
        _mouseUp(mouse) {
            if (!_global._gameStart) return;
            switch (mouse.button) {
                case 0:
                    this.mouse.down = true;
                    _socket.cmd.set(4, 0);
                    break;
                case 1:
                    _socket.cmd.set(5, 0);
                    break;
                case 2:
                    _socket.cmd.set(6, 0);
                    break;
            }
        }
        _gameInput(mouse) {
            let width = _global._screenWidth / innerWidth;
            let height = _global._screenHeight / innerHeight;
            this.mouse.x = mouse.clientX; // / rs;
            this.mouse.y = mouse.clientY; // / rs;// / ratio;
            if (_player._cx != null && _player._cy != null) {
                _global._target._x = (this.mouse.x - innerWidth / 2) * width; //this.parent.cv.width / 2;
                _global._target._y = (this.mouse.y - innerHeight / 2) * height; //this.parent.cv.height / 2;
            }
            _global.statHover = _global.clickables.hover.check({
                x: mouse.clientX * _global._ratio,
                y: mouse.clientY * _global._ratio
            }) === 0;
            _global.guiMouse = {
                x: mouse.clientX * height, // * _global.ratio / ratio,//(_global.ratio * ratio),
                y: mouse.clientY * width // * _global.ratio / ratio//(_global.ratio * ratio)
            };
        }
        _touchStart(e) {
            e.preventDefault();
            if (_global._diedAt - Date.now() > 0 || (_global._disconnected && _global._gameStart)) return;
            if (_global._died) {
                _displayAds(false)
                let socketOut = _util._cleanString(_global.playerName, 25).split('');
                for (let i = 0; i < socketOut.length; i++) socketOut[i] = socketOut[i].charCodeAt();
                _socket.talk("s", _global.party || 0, socketOut.toString(), 0);
                if (_config.autoUpgrade){
                    for (let i = 0; i < 75; i++){
                        setTimeout(() => _socket.talk('L'), i * 25);
                    }
                }
                _global._diedAt = Date.now()
                _global._deathScreenState = 1
                _global._died = false;
            }
            let width = _global._screenWidth / innerWidth;
            let height = _global._screenHeight / innerHeight;
            for (let touch of e.changedTouches) {
                let mpos = {
                    x: touch.clientX * _global._ratio * width,
                    y: touch.clientY * _global._ratio * height
                };
                let guiMpos = { // exactally where the mouse is, dk how the other ones manage to work but
                    x: touch.clientX * width,
                    y: touch.clientY * height
                }
                let id = touch.identifier;
                let statIndex = _global.clickables.stat.check(mpos);
                let mobileClickIndex = _global.clickables.mobileClicks.check(mpos);
                if (mobileClickIndex !== -1)_global.mobileClickables[mobileClickIndex]();
                else if (statIndex !== -1) _socket.talk('x', statIndex);
                else if (_global.clickables.skipUpgrades.check(mpos) !== -1) _global.clearUpgrades();
                else {
                    let index =  _global.clickables.upgrade.check(mpos)
                    if (index !== -1) {
                        _socket.talk("U", index);
                    } else {
                        mpos.x /= width;
                        mpos.y /= height;
                        let onLeft = mpos.x < this.parent._cv.width / 2;
                        if (this.parent.movementTouch === null && onLeft) {
                            this.parent.movementTouch = id;
                        } else if (this.parent.controlTouch === null && !onLeft) {
                            this.parent.controlTouch = id;
                            _global._mobileFiring[1] = true
                            _socket.cmd.set(_global._mobileFiring[0], true);
                        }
                    }
                }
            }
            this.parent._touchMove(e, false);
        }
        _touchMove(e, useParent = true) {
            const _this = useParent ? this.parent : this;
            e.preventDefault();
            for (let touch of e.changedTouches) {
                let mpos = {
                    x: touch.clientX * _global._ratio,
                    y: touch.clientY * _global._ratio
                };
                let id = touch.identifier;
                if (_this.movementTouch === id) {
                    let x = mpos.x - _this._cv.width * 1 / 6;
                    let y = mpos.y - _this._cv.height * 2 / 3;
                    let norm = Math.sqrt(x * x + y * y);
                    x /= norm;
                    y /= norm;
                    let amount = 0.3826834323650898; // Math.sin(Math.PI / 8)
                    if ((y < -amount) !== _this.movementTop) _socket.cmd.set(0, _this.movementTop = y < -amount);
                    if ((y > amount) !== _this.movementBottom) _socket.cmd.set(1, _this.movementBottom = y > amount);
                    if ((x < -amount) !== _this.movementLeft) _socket.cmd.set(2, _this.movementLeft = x < -amount);
                    if ((x > amount) !== _this.movementRight) _socket.cmd.set(3, _this.movementRight = x > amount);
                } else if (_this.controlTouch === id) {
                    _global._target._x = (mpos.x - _this._cv.width * 5 / 6) * 4;
                    _global._target._y = (mpos.y - _this._cv.height * 2 / 3) * 4;
                }
            }
        }
        _touchEnd(e) {
            e.preventDefault();
            for (let touch of e.changedTouches) {
                let mpos = {
                    x: touch.clientX * window.devicePixelRatio,
                    y: touch.clientY * window.devicePixelRatio
                };
                let id = touch.identifier;
                if (this.parent.movementTouch === id) {
                    this.parent.movementTouch = null;
                    if (this.parent.movementTop) _socket.cmd.set(0, this.parent.movementTop = false);
                    if (this.parent.movementBottom) _socket.cmd.set(1, this.parent.movementBottom = false);
                    if (this.parent.movementLeft) _socket.cmd.set(2, this.parent.movementLeft = false);
                    if (this.parent.movementRight) _socket.cmd.set(3, this.parent.movementRight = false);
                } else if (this.parent.controlTouch === id) {
                    this.parent.controlTouch = null;
                    _global._mobileFiring[1] = false
                    _socket.cmd.set(4, false);
                    _socket.cmd.set(6, false);
                }
            }
        }
    });
    let c = _global._canvas._cv,
        ctx = c.getContext("2d"),
        c2 = document.createElement("canvas"),
        ctx2 = c2.getContext("2d");
    ctx2.imageSmoothingEnabled = 0;
    function isInView(x, y, r) {
        let mid = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0,
            ratio = getRatio();
        r += _config.borderChunk;
        if (mid) {
            ratio *= 2;
            return x > -_global._screenWidth / ratio - r && x < _global._screenWidth / ratio + r && y > -_global._screenHeight / ratio - r && y < _global._screenHeight / ratio + r;
        }
        return x > -r && x < _global._screenWidth / ratio + r && y > -r && y < _global._screenHeight / ratio + r;
    }
    function Smoothbar(value, speed) {
        let render = value;
        return {
            set: val => value = val,
            get: () => render = lerp(render, value, speed ? speed : _config.fancyAnimations ? 0.12 : 1) // speed / 6
        };
    }
    let sync = [],
        clockDiff = 0,
        serverStart = 0,
        lag = function () {
            let lags = [];
            return {
                get: function () {
                    if (!lags.length) return 0;
                    let sum = lags.reduce(function (a, b) {
                        return a + b;
                    });
                    return sum / lags.length;
                },
                add: function (l) {
                    lags.push(l);
                    if (lags.length > _config.memory) lags.splice(0, 1);
                }
            };
        }(),
        getNow = function () {
            return Date.now() - clockDiff - serverStart;
        },
        getRelative = function () {
            return Date.now();
        };
    var _player = {
        _x: 0,
        y: 0,
        _cx: 0,
        _cy: 0,
        _vx: 0,
        _vy: 0,
        _rendershiftx: 0,
        _rendershifty: 0,
        _lastvx: 0,
        _lastvy: 0,
        _renderx: 0,
        _rendery: 0,
        _renderv: 1,
        _lastx: 0,
        _lasty: 0,
        _name: "",
        _view: 1,
        _lastUpdate: 0,
        _time: 0,
        _nameColor: 0 /*"#FFFFFF"*/,
        _color: 0,
        _canSeeInvisible: 0,
        _isOutsideRoom: 0,
        _instance: {
            "interval": 0,
            "id": 0,
            "index": 0,
            "x": 0,
            "y": 0,
            "vx": 0,
            "vy": 0,
            "size": 1,
            "facing": 0,
            "twiggle": 0,
            "layer": 0,
            "color": 16,
            "health": 1,
            "shield": 1,
            "alpha": 1,
            "seeInvisible": 0,
            "nameColor": "#FFFFFF",
            "widthHeightRatio": [
                1,
                1
            ],
            "drawsHealth": 2,
            "nameplate": 4,
            "invuln": 1,
            "name": "Whygena",
            "score": 0,
            "render": {
                "draws": true,
                "expandsWithDeath": 2,
                "lastRender": 0,
                "x": 0,
                "y": 0,
                "lastx": 0,
                "lasty": 0,
                "lastvx": 0,
                "lastvy": 0,
                "lastf": 0,
                "f": 0,
                "h": 1,
                "s": 1,
                "interval": 0,
                "slip": 0,
                "status": {},
                "health": {},
                "shield": {},
                "size": 1,
            },
            "oldIndex": 0,
            "guns": {
                "length": 0
            },
            "turrets": [],
            "lasers": {
                "length": 0
            },
            "props": {
                "length": 0
            }
        },
        pepperspray: {
            apply: false,
            blurAmount: 0,
            blurMax: 0
        },
        lsd: false
    },
        _anims = {};
    let socketInit = async function () {
        resizeEvent();
        let protocol = (function () {
            let exports = {};
            "use strict";
            const u32 = new Uint32Array(1),
                c32 = new Uint8Array(u32.buffer),
                f32 = new Float32Array(u32.buffer),
                u16 = new Uint16Array(1),
                c16 = new Uint8Array(u16.buffer);
            let encode = function (message) {
                let headers = [],
                    headerCodes = [],
                    contentSize = 0,
                    lastTypeCode = 0b1111,
                    repeatTypeCount = 0;
                for (let block of message) {
                    let typeCode = 0;
                    if (block === 0 || block === false) typeCode = 0b0000;
                    else if (block === 1 || block === true) typeCode = 0b0001;
                    else if (typeof block === "number") {
                        if (!Number.isInteger(block) || block < -0x100000000 || block >= 0x100000000) {
                            typeCode = 0b1000;
                            contentSize += 4;
                        } else if (block >= 0) {
                            if (block < 0x100) {
                                typeCode = 0b0010;
                                contentSize++;
                            } else if (block < 0x10000) {
                                typeCode = 0b0100;
                                contentSize += 2;
                            } else if (block < 0x100000000) {
                                typeCode = 0b0110;
                                contentSize += 4;
                            }
                        } else {
                            if (block >= -0x100) {
                                typeCode = 0b0011;
                                contentSize++;
                            } else if (block >= -0x10000) {
                                typeCode = 0b0101;
                                contentSize += 2;
                            } else if (block >= -0x100000000) {
                                typeCode = 0b0111;
                                contentSize += 4;
                            }
                        }
                    } else if (typeof block === "string") {
                        let hasUnicode = false;
                        for (let i = 0; i < block.length; i++) {
                            if (block.charAt(i) > "\xff") hasUnicode = true;
                            else if (block.charAt(i) === "\x00") {
                                console.error("Null containing string!", block);
                                throw new Error("Null containing string!");
                            }
                        }
                        if (!hasUnicode && block.length <= 1) {
                            typeCode = 0b1001;
                            contentSize++;
                        } else if (hasUnicode) {
                            typeCode = 0b1011;
                            contentSize += block.length * 2 + 2;
                        } else {
                            typeCode = 0b1010;
                            contentSize += block.length + 1;
                        }
                    } else {
                        console.error("Unencodable data type!", block);
                        throw new Error("Unencodable data type!");
                    }
                    headers.push(typeCode);
                    if (typeCode === lastTypeCode) repeatTypeCount++;
                    else {
                        headerCodes.push(lastTypeCode);
                        if (repeatTypeCount >= 1) {
                            while (repeatTypeCount > 19) {
                                headerCodes.push(0b1110);
                                headerCodes.push(15);
                                repeatTypeCount -= 19;
                            }
                            if (repeatTypeCount === 1) headerCodes.push(lastTypeCode);
                            else if (repeatTypeCount === 2) headerCodes.push(0b1100);
                            else if (repeatTypeCount === 3) headerCodes.push(0b1101);
                            else if (repeatTypeCount < 20) {
                                headerCodes.push(0b1110);
                                headerCodes.push(repeatTypeCount - 4);
                            }
                        }
                        repeatTypeCount = 0;
                        lastTypeCode = typeCode;
                    }
                }
                headerCodes.push(lastTypeCode);
                if (repeatTypeCount >= 1) {
                    while (repeatTypeCount > 19) {
                        headerCodes.push(0b1110);
                        headerCodes.push(15);
                        repeatTypeCount -= 19;
                    }
                    if (repeatTypeCount === 1) headerCodes.push(lastTypeCode);
                    else if (repeatTypeCount === 2) headerCodes.push(0b1100);
                    else if (repeatTypeCount === 3) headerCodes.push(0b1101);
                    else if (repeatTypeCount < 20) {
                        headerCodes.push(0b1110);
                        headerCodes.push(repeatTypeCount - 4);
                    }
                }
                headerCodes.push(0b1111);
                if (headerCodes.length % 2 === 1) headerCodes.push(0b1111);
                let output = new Uint8Array((headerCodes.length >> 1) + contentSize);
                for (let i = 0; i < headerCodes.length; i += 2) {
                    let upper = headerCodes[i],
                        lower = headerCodes[i + 1];
                    output[i >> 1] = (upper << 4) | lower;
                }
                let index = headerCodes.length >> 1;
                for (let i = 0; i < headers.length; i++) {
                    let block = message[i];
                    switch (headers[i]) {
                        case 0b0000:
                        case 0b0001:
                            break;
                        case 0b0010:
                        case 0b0011:
                            output[index++] = block;
                            break;
                        case 0b0100:
                        case 0b0101:
                            u16[0] = block;
                            output.set(c16, index);
                            index += 2;
                            break;
                        case 0b0110:
                        case 0b0111:
                            u32[0] = block;
                            output.set(c32, index);
                            index += 4;
                            break;
                        case 0b1000:
                            f32[0] = block;
                            output.set(c32, index);
                            index += 4;
                            break;
                        case 0b1001: {
                            let byte = block.length === 0 ? 0 : block.charCodeAt(0);
                            output[index++] = byte;
                        }
                            break;
                        case 0b1010:
                            for (let i = 0; i < block.length; i++) output[index++] = block.charCodeAt(i);
                            output[index++] = 0;
                            break;
                        case 0b1011:
                            for (let i = 0; i < block.length; i++) {
                                let charCode = block.charCodeAt(i);
                                output[index++] = charCode & 0xff;
                                output[index++] = charCode >> 8;
                            }
                            output[index++] = 0;
                            output[index++] = 0;
                            break;
                    }
                }
                return output;
            };
            let decode = function (packet) {
                let data = new Uint8Array(packet);
                if (data[0] >> 4 !== 0b1111) return null;
                let headers = [],
                    lastTypeCode = 0b1111,
                    index = 0,
                    consumedHalf = true;
                while (true) {
                    if (index >= data.length) return null;
                    let typeCode = data[index];
                    if (consumedHalf) {
                        typeCode &= 0b1111;
                        index++;
                    } else typeCode >>= 4;
                    consumedHalf = !consumedHalf;
                    if ((typeCode & 0b1100) === 0b1100) {
                        if (typeCode === 0b1111) {
                            if (consumedHalf) index++;
                            break;
                        }
                        let repeat = typeCode - 10;
                        if (typeCode === 0b1110) {
                            if (index >= data.length) return null;
                            let repeatCode = data[index];
                            if (consumedHalf) {
                                repeatCode &= 0b1111;
                                index++;
                            } else repeatCode >>= 4;
                            consumedHalf = !consumedHalf;
                            repeat += repeatCode;
                        }
                        for (let i = 0; i < repeat; i++) headers.push(lastTypeCode);
                    } else {
                        headers.push(typeCode);
                        lastTypeCode = typeCode;
                    }
                }
                let output = [];
                for (let header of headers) {
                    switch (header) {
                        case 0b0000:
                            output.push(0);
                            break;
                        case 0b0001:
                            output.push(1);
                            break;
                        case 0b0010:
                            output.push(data[index++]);
                            break;
                        case 0b0011:
                            output.push(data[index++] - 0x100);
                            break;
                        case 0b0100:
                            c16[0] = data[index++];
                            c16[1] = data[index++];
                            output.push(u16[0]);
                            break;
                        case 0b0101:
                            c16[0] = data[index++];
                            c16[1] = data[index++];
                            output.push(u16[0] - 0x10000);
                            break;
                        case 0b0110:
                            c32[0] = data[index++];
                            c32[1] = data[index++];
                            c32[2] = data[index++];
                            c32[3] = data[index++];
                            output.push(u32[0]);
                            break;
                        case 0b0111:
                            c32[0] = data[index++];
                            c32[1] = data[index++];
                            c32[2] = data[index++];
                            c32[3] = data[index++];
                            output.push(u32[0] - 0x100000000);
                            break;
                        case 0b1000:
                            c32[0] = data[index++];
                            c32[1] = data[index++];
                            c32[2] = data[index++];
                            c32[3] = data[index++];
                            output.push(f32[0]);
                            break;
                        case 0b1001: {
                            let byte = data[index++];
                            output.push(byte === 0 ? "" : String.fromCharCode(byte));
                        }
                            break;
                        case 0b1010: {
                            let string = "",
                                byte = 0;
                            while ((byte = data[index++])) string += String.fromCharCode(byte);
                            output.push(string);
                        }
                            break;
                        case 0b1011: {
                            let string = "",
                                byte = 0;
                            while ((byte = data[index++] | (data[index++] << 8))) string += String.fromCharCode(byte);
                            output.push(string);
                        }
                            break;
                    }
                }
                return output;
            };
            exports.encode = encode;
            exports.decode = decode;
            return exports;
        })(),
            convert = function () {
                let get = function () {
                    let index = 0,
                        crawlData = [];
                    return {
                        next: function () {
                            if (index >= crawlData.length) {
                                _logger._norm(crawlData);
                                throw new Error("Trying to crawl past the end of the provided data!");
                            } else return crawlData[index++];
                        },
                        all: () => crawlData.slice(index),
                        take: amount => {
                            index += amount;
                            if (index > crawlData.length) {
                                console.error(crawlData);
                                throw new Error("Trying to crawl past the end of the provided data!");
                            }
                        },
                        set: function (data) {
                            crawlData = data;
                            index = 0;
                        }
                    };
                }();
                return {
                    begin: function (data) {
                        return get.set(data);
                    },
                    data: function () {
                        const process = function () {
                            const GunContainer = function () {
                                function physics(g) {
                                    g.isUpdated = 1;
                                    if (g.motion || g.position) {
                                        g.motion -= .2 * g.position;
                                        g.position += g.motion;
                                        if (g.position < 0) {
                                            g.position = 0;
                                            g.motion = g.motion;
                                        }
                                        if (g.motion > 0) g.motion *= .5;
                                    }
                                }
                                return function (n) {
                                    let a = [];
                                    for (let i = 0; i < n; i++) a.push({
                                        motion: 0,
                                        position: 0,
                                        isUpdated: 1
                                    });
                                    return {
                                        getPositions: function () {
                                            return a.map(function (g) {
                                                return g.position;
                                            });
                                        },
                                        update: function () {
                                            return a.forEach(physics);
                                        },
                                        fire: function (i, power) {
                                            if (a[i].isUpdated) a[i].motion += Math.sqrt(power) / 20;
                                            a[i].isUpdated = 0;
                                        },
                                        length: a.length
                                    };
                                };
                            }();

                            function Status() {
                                let state = "normal",
                                    time = getNow();
                                return {
                                    set: function (val) {
                                        if (val !== state || state === "injured") {
                                            if (state !== "dying") time = getNow();
                                            state = val;
                                        }
                                    },
                                    getFade: function () {
                                        return state === "dying" || state === "killed" ? 1 - Math.min(1, (getNow() - time) / 300) : 1;
                                    },
                                    getColor: function () {
                                        return _config.tintedDamage ? "#FF0000" : "#FFFFFF";
                                    },
                                    getBlend: function () {
                                        let o = state === "normal" || state === "dying" ? 0 : 1 - Math.min(1, (getNow() - time) / 80);
                                        if (getNow() - time > 500 && state === "injured") state = "normal";
                                        return o;
                                    }
                                };
                            }
                            const unpacking = {
                                new: function (entity) {
                                    let isNew = entity.facing == null;
                                    const type = get.next();
                                    if (type & 0x01) {
                                        entity.facing = get.next();
                                        entity.layer = get.next();
                                    } else {
                                        entity.interval = metrics._rendergap;
                                        entity.id = get.next();
                                        let iii = entities.findIndex(x => x.id === entity.id);
                                        if (iii !== -1) {
                                            entity = entities.splice(iii, 1)[0];
                                        }
                                        isNew = iii === -1;
                                        if (!isNew) {
                                            entity.render.draws = true;
                                            entity.render.lastx = entity.x;
                                            entity.render.lasty = entity.y;
                                            entity.render.lastvx = entity.vx;
                                            entity.render.lastvy = entity.vy;
                                            entity.render.lastf = entity.facing;
                                            entity.render.lastRender = _player._time;
                                        }
                                        const flags = get.next();
                                        entity.index = get.next();
                                        entity.x = get.next();
                                        entity.y = get.next();
                                        entity.vx = 0;//get.next();
                                        entity.vy = 0;//get.next();
                                        entity.size = get.next();
                                        entity.facing = get.next();
                                        entity.twiggle = (flags & 1);
                                        entity.layer = (flags & 2) ? get.next() : 0;
                                        entity.color = get.next();
                                        if (isNew) {
                                            entity.health = (flags & 4) ? (get.next() / 255) : 1;
                                            entity.shield = (flags & 8) ? (get.next() / 255) : 1;
                                        } else {
                                            let hh = entity.health,
                                                ss = entity.shield;
                                            entity.health = (flags & 4) ? (get.next() / 255) : 1;
                                            entity.shield = (flags & 8) ? (get.next() / 255) : 1;
                                            if (entity.health < hh || entity.shield < ss) {
                                                entity.render.status.set("injured");
                                            } else if (entity.render.status.getFade() !== 1) {
                                                entity.render.status.set("normal");
                                            }
                                        }
                                        entity.alpha = (flags & 16) ? (get.next() / 255) : 1;
                                        entity.seeInvisible = flags & 32;
                                        entity.nameColor = flags & 64 ? get.next() : "#FFFFFF";
                                        entity.label = flags & 128 ? get.next() : _mockups.get(entity.index).name
                                        entity.widthHeightRatio = [(flags & 256) ? get.next() : 1, (flags & 512) ? get.next() : 1];
                                        entity.drawsHealth = type & 0x02;
                                        entity.nameplate = type & 0x04;
                                        entity.invuln = (type & 0x08 ? entity.invuln || Date.now() : 0);
                                        if (type & 0x04) {
                                            entity.name = get.next();
                                            entity.score = get.next();
                                            entity.messages = get.next();
                                        }
                                        if (isNew) {
                                            entity.render = {
                                                real: true,
                                                draws: false,
                                                expandsWithDeath: entity.drawsHealth,
                                                lastRender: _player._time,
                                                x: entity.x,
                                                y: entity.y,
                                                lastx: entity.x - metrics._rendergap * _config.roomSpeed * (1000 / 30) * entity.vx,
                                                lasty: entity.y - metrics._rendergap * _config.roomSpeed * (1000 / 30) * entity.vy,
                                                lastvx: entity.vx,
                                                lastvy: entity.vy,
                                                lastf: entity.facing,
                                                f: entity.facing,
                                                h: entity.health,
                                                s: entity.shield,
                                                interval: metrics._rendergap,
                                                slip: 0,
                                                status: Status(),
                                                health: Smoothbar(entity.health),
                                                shield: Smoothbar(entity.shield),
                                                size: 1,
                                                extra: [1, 0], // for props
                                            };
                                            let mockup = _mockups.get(entity.index);
                                        }
                                        entity.render.health.set(entity.health);
                                        entity.render.shield.set(entity.shield);
                                        if (!isNew && entity.oldIndex !== entity.index) isNew = true;
                                        entity.oldIndex = entity.index;
                                    }
                                    let gunnumb = get.next();
                                    if (isNew) {
                                        entity.guns = GunContainer(gunnumb);
                                    } else if (gunnumb !== entity.guns.length) {
                                        throw new Error("Mismatch between data gun number and remembered gun number!");
                                    }
                                    for (let i = 0; i < gunnumb; i++) {
                                        let time = get.next(),
                                            power = get.next();
                                        if (time > _player._lastUpdate - metrics._rendergap) {
                                            entity.guns.fire(i, power);
                                        }
                                    }
                                    let turnumb = get.next();
                                    if (isNew) {
                                        entity.turrets = [];
                                        for (let i = 0; i < turnumb; i++) {
                                            entity.turrets.push(process());
                                        }
                                    } else {
                                        if (entity.turrets.length !== turnumb) {
                                            console.log(entity);
                                            throw new Error("Mismatch between data turret number and remembered turret number!");
                                        }
                                        for (let i = 0; i < entity.turrets.length; i++) {
                                            process(entity.turrets[i]);
                                        }
                                    }
                                    return entity;
                                }
                            }
                            // Return our function
                            return (z = {}) => {
                                return unpacking.new(z);
                            };
                        }();
                        return function () {
                            let output = [];
                            for (let i = 0, len = get.next(); i < len; i++) output.push(process());
                            for (let i = 0; i < entities.length; i++) {
                                let e = entities[i];
                                e.render.status.set(e.health === 1 ? "dying" : "killed");
                                if (e.render.status.getFade() !== 0 && isInView(e.render.x - _player._renderx, e.render.y - _player._rendery, e.size, 1)) {
                                    output.push(e);
                                } else {
                                }
                            }
                            entities = output;
                            entities.sort(function (a, b) {
                                let sort = a.layer - b.layer;
                                if (!sort) sort = b.id - a.id;
                                return sort;
                            });
                        };
                    }(),
                    gui: function () {
                        let index = get.next(),
                            indices = {
                                topSpeed: index & 0x0100,
                                accel: index & 0x0080,
                                skills: index & 0x0040,
                                statsdata: index & 0x0020,
                                upgrades: index & 0x0010,
                                points: index & 0x0008,
                                score: index & 0x0004,
                                label: index & 0x0002,
                                fps: index & 0x0001
                            };
                        if (indices.fps) _gui._fps = get.next();
                        if (indices.label) {
                            _gui._type = get.next();
                            _gui._color = get.next();
                            _gui._playerid = get.next();
                        }
                        if (indices.score) _gui._skill.setScores(get.next());
                        if (indices.points) _gui._points = get.next();
                        if (indices.upgrades) {
                            const upgrades = [];
                            for (let i = 0, len = get.next(); i < len; i++) upgrades.push(get.next());

                            if (upgrades.toString() !== _gui._realUpgrades.toString()) {
                                _gui._realUpgrades = upgrades;
                                _gui._upgrades = upgrades;
                            }
                        }
                        if (indices.statsdata)
                            for (let i = 9; i >= 0; i--) {
                                _gui._skills[i].name = get.next();
                                _gui._skills[i].cap = get.next();
                                _gui._skills[i].softcap = get.next();
                            }
                        if (indices.skills) {
                            let skk = parseInt(get.next(), 36).toString(16);
                            skk = "0000000000".substring(skk.length) + skk;
                            _gui._skills[0].amount = parseInt(skk.slice(0, 1), 16);
                            _gui._skills[1].amount = parseInt(skk.slice(1, 2), 16);
                            _gui._skills[2].amount = parseInt(skk.slice(2, 3), 16);
                            _gui._skills[3].amount = parseInt(skk.slice(3, 4), 16);
                            _gui._skills[4].amount = parseInt(skk.slice(4, 5), 16);
                            _gui._skills[5].amount = parseInt(skk.slice(5, 6), 16);
                            _gui._skills[6].amount = parseInt(skk.slice(6, 7), 16);
                            _gui._skills[7].amount = parseInt(skk.slice(7, 8), 16);
                            _gui._skills[8].amount = parseInt(skk.slice(8, 9), 16);
                            _gui._skills[9].amount = parseInt(skk.slice(9, 10), 16);
                        }
                        if (indices.accel) _gui._accel = get.next();
                        if (indices.topSpeed) _gui._topSpeed = get.next();
                    },
                    // Broadcast for minimap and leaderboard
                    newbroadcast: data => {
                        // So let's start unpacking!
                        _gui._minimap._server = [];
                        _gui._leaderboard._server = [];
                        let minimapAllLength = data.shift();
                        for (let i = 0; i < minimapAllLength; i++) {
                            _gui._minimap._server.push({
                                id: data.shift(),
                                type: data.shift(),
                                x: (data.shift() * _global._gameWidth) / 255,
                                y: (data.shift() * _global._gameHeight) / 255,
                                color: data.shift(),
                                size: data.shift(),
                                width: data.shift(),
                                height: data.shift()
                            });
                        }
                        let minimapTeamLength = data.shift();
                        for (let i = 0; i < minimapTeamLength; i++) {
                            _gui._minimap._server.push({
                                id: data.shift(),
                                x: (data.shift() * _global._gameWidth) / 255,
                                y: (data.shift() * _global._gameHeight) / 255,
                                color: data.shift(),
                                type: 0,
                                size: 0
                            });
                        }
                        let leaderboardLength = data.shift();
                        for (let i = 0; i < leaderboardLength; i++) {
                            let instance = {
                                id: data.shift(),
                                score: data.shift(),
                                index: data.shift(),
                                name: data.shift(),
                                color: data.shift(),
                                barColor: data.shift(),
                                nameColor: data.shift(),
                            };
                            instance.label = data.shift() || _mockups.get(instance.index).label
                            if (_global.gamemodeAlteration !== "sbx" || data.shift() === _global.party) {
                                _gui._leaderboard._server.push(instance);
                            }
                        }
                    }
                };
            }();
        const blobby = URL.createObjectURL(new Blob([`${function () {
            postMessage("AHHHHHHHHHHH");
        }}`]))
        return async function ag(port) {
            let validLobbyId = false
            for (let lobbyid in window.lobbies) {
                lobbyid = window.lobbies[lobbyid].lobby_id
                if (lobbyid === _global._windowSearch.lobby) {
                    validLobbyId = true
                }
            }
            if (!validLobbyId) {
                _global._windowSearch.lobby = undefined
            }
            let url = await getFullURL([_global._windowSearch.lobby, servers[_global._selectedServer] || servers[0]], true) + `a=${_$a}&b=${_$b}&c=${_$c}&d=${_$d}&e=${_$e}`
            let connectionAttempts = 1
            async function connectSocket(res) {
                let ws = WebSocket(url);
                ws.onerror = async () => {
                    _global.message = `${connectionAttempts} Connection attempts.. retrying..`
                    setTimeout(()=>{
                        connectionAttempts++
                        connectSocket(res)
                    }, 3000)
                }
                ws.onopen = () => {
                    ws.onopen = () => {}
                    ws.onerror = () => {}
                    res(ws)
                }
            }
            let socket = await new Promise(async (res, rej) => {
                connectSocket(res)
            })
            _global._windowSearch.lobby = window.rivetLobby
            window["help"] = function () {
                _logger._info("Here is a list of commands and their usages:");
                _logger._norm(" � broadcast('message')");
                _logger._norm(" � setColor(colorID)");
                _logger._norm(" � setSkill(amount)");
                _logger._norm(" � setScore(score)");
                _logger._norm(" � setSize(size)");
                _logger._norm(" � setTank('exportName')");
                _logger._norm(" � setDevKey(1-9 (numpad), <'exportName' or '()=>{code}>', <if code set this to true>)");
                _logger._norm(" � getDevKeyData()");
                _logger._norm(" � loadDevKeyData([devKeyData])");
                _logger._norm(" � setStat('statName', value)");
                _logger._norm(" � spawnEntity('exportName', x, y, teamID, colorID, size, score)");
                _logger._norm(" � teleport(x, y)");
                _logger._norm(" � setChildren(amount)");
                _logger._norm(" � setInvisible(fadeInValue, fadeOutValue, limit)");
                _logger._norm(" � setFOV(fov)");
                _logger._norm(" � setSpinSpeed(speed)");
                _logger._norm(" � setEntity('exportName, size, isMinion = false')");
                _logger._norm(" � clearChildren()");
                _logger._norm(" � setTeam(teamID)");
                _logger._norm(" � skillSet(atk, hlt, spd, str, pen, dam, rld, rgn, shi)");
                _logger._norm(" � rainbowSpeed(speed)");
                _logger._norm(" � setControl(amount)");
                _logger._warn("To use any of the above commands, you need to have beta-tester level 2!");
            };
            window["broadcast"] = function (message, hex) {
                if (!hex) hex = color.black;
                socket.talk("D", 0, message, hex);
                _logger._info("Broadcasting your message to all players.");
            };
            window["setColor"] = function (id) {
                if (id < 0) return _logger._warn("Please specify a valid color ID! Note that IDs 0-31 are colors.");
                socket.talk("D", 1, id);
                _logger._info("Set your color ID to " + id + ".");
            };
            window["setSkill"] = function (amount) {
                if (isNaN(amount) || amount < 0) return _logger._warn("Please specify a valid amount of stats! Note that the amount can't be below 0 or above 90.");
                socket.talk("D", 2, amount);
                _logger._info("Set your amount of skill points to " + amount + ".");
            };
            window["setScore"] = function (score) {
                if (isNaN(score)) return _logger._warn("Please specify a valid score!");
                socket.talk("D", 3, score);
                _logger._info("Set your score to " + score + ".");
            };
            window["setSize"] = function (size) {
                if (isNaN(size) || size < 0 || size > 3000) return _logger._warn("Please specify a valid size value!");
                socket.talk("D", 4, size);
                _logger._info("Set your size to " + size + ".");
            };
            window["setTank"] = function (tank) {
                if (!tank) return _logger._warn("Please specify a valid tank!");
                socket.talk("D", 5, tank);
                _logger._info("Set your tank to " + tank + ".");
            };
            window["setDevKey"] = function (num, tank, isCode) {
                if (num < 1 || num > 9) return _logger._warn("Please specify a valid dev key (1-9)")
                if (!tank) return _logger._warn("Please specify a valid tank or valid code");
                localStorage.setItem(`DEV_KEY_${num}`, JSON.stringify([tank, isCode]))
                _logger._info(`Set DEV_KEY_${num}. Use numpad${num} to change to that tank or run that code.`)
            }
            window["getDevKeyData"] = function () {
                let arr = [null]
                for (let i = 1; i < 10; i++) {
                    arr[i] = JSON.stringify(localStorage.getItem(`DEV_KEY_${i}`) || null)
                }
                console.log(JSON.stringify(arr))
                _logger._info("Copy that text and use it in loadDevKeyData. loadDevKeyData only accepts arrays.")
            }
            window["loadDevKeyData"] = function (arr = "") {
                if (typeof arr === "string" || !arr.length) {
                    _logger._warn("Provided value must be an array")
                    return
                }
                if (arr.length !== 10) {
                    _logger._warn("Provided value must be of length 10")
                    return
                }
                for (let i = 1; i < 10; i++) {
                    arr[i] = JSON.parse(arr[i])
                    if (!arr[i]) continue;
                    localStorage.setItem(`DEV_KEY_${i}`, arr[i])
                }
                _logger._info("Loaded dev key data!")
            }
            window["setStat"] = function (stat, value) {
                if (stat !== "weapon_speed" && stat !== "weapon_reload" && stat !== "move_speed" && stat !== "max_health" && stat !== "body_damage" && stat !== "weapon_damage" && stat !== "names") return _logger._warn("Invalid stat name! Input setStat('names') for a list of stats.");
                if (stat == "names") return _logger._info("Stat Names: weapon_speed, weapon_reload, move_speed, max_health, body_damage, weapon_damage."), value = 0;
                if (isNaN(value) || (stat == "weapon_reload" && value <= 0)) return _logger._warn("Please specify a valid value for this stat!");
                socket.talk("D", 6, stat, value);
                _logger._info("Set " + stat + " to " + value + ".");
            };
            window["spawnEntity"] = function (entity, x, y, team, color, size, value) {
                if (!entity || !isNaN(entity)) return _logger._warn("Please specify a valid entity!");
                if (!x || !y || (isNaN(x) && x !== "me" || isNaN(y) && y !== "me")) return _logger._warn("Please specify a valid (X,Y) position!");
                if (!team || (isNaN(team) && team !== "me")) return _logger._warn("Please specify a valid team!");
                if (color < 0 || (isNaN(color) && color !== "rainbow" && color !== "default")) return _logger._warn("Please specify a valid color ID!");
                socket.talk("D", 7, entity, x, y, team, color, size, value);
                _logger._info("Spawned " + entity + " at (" + x + ", " + y + ") with the team ID " + team + ", a color ID of " + color + ", a size of " + size + ", and a value of " + value);
            };
            window["setChildren"] = function (amount) {
                if (!amount || amount < 0 || isNaN(amount)) return _logger._warn("Please specify a valid maxChildren value!");
                socket.talk("D", 8, amount);
                _logger._info("Set your maxChildren to " + amount + ".");
            };
            window["teleport"] = function (x, y) {
                if (isNaN(x) || isNaN(x)) return _logger._warn("Please specify a valid (X, Y) position!");
                socket.talk("D", 9, x, y);
                _logger._info("Teleported to (" + x + ", " + y + ").");
            };
            window["setInvisible"] = function (fadeOut, fadeIn, maxFade) {
                let valueCheck = function (value) {
                    return value > 1 || value < 0 || isNaN(value);
                };
                if (valueCheck(fadeOut) || valueCheck(fadeIn) || valueCheck(maxFade)) return _logger._warn("Please specify a valid invisibility alpha value!");
                socket.talk("D", 10, fadeOut, fadeIn, maxFade);
                _logger._info("Set your invisible attribute to [" + fadeOut + ", " + fadeIn + ", " + maxFade + "].");
            };
            window["setFOV"] = function (fov) {
                if (!fov || fov < 0 || fov > 500 || isNaN(fov)) return _logger._warn("Please specify a valid FoV value!");
                socket.talk("D", 11, fov);
                _logger._info("Set your FoV to " + fov + ".");
            };
            window["setSpinSpeed"] = function (speed) {
                if (!speed || isNaN(speed)) return _logger._warn("Please specify a valid speed value!");
                socket.talk("D", 12, speed);
                _logger._info("Set your autospin speed to " + speed + ".");
            };
            window["setEntity"] = function (entity, size = 0, isMinion = false) {
                if (!entity || !isNaN(entity)) return _logger._warn("Please specify a valid entity!");
                if (isNaN(size)) return _logger._warn("Please specify a valid size, or do not provide one at all.");
                socket.talk("D", 13, entity, size, isMinion);
                _logger._info("Set the F key entity to " + entity + ".");
            };
            window["clearChildren"] = function () {
                socket.talk("D", 14);
                _logger._info("Cleared all children entities.");
            };
            window["setTeam"] = function (teamID) {
                if (isNaN(teamID)) return _logger._warn("Please specify a valid team ID!");
                socket.talk("D", 15, teamID);
                _logger._info("Set your team ID to " + teamID + ".");
            };
            window["skillSet"] = function (s1, s2, s3, s4, s5, s6, s7, s8, s9, s10) { // Simplify?
                let s = function (skill) {
                    return skill < 0 || isNaN(skill);
                };
                if (s(s1) || s(s2) || s(s3) || s(s4) || s(s5) || s(s6) || s(s7) || s(s8) || s(s9) || s(s10)) return _logger._warn("Please specify a valid skill-set array!");
                socket.talk("D", 17, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10);
                _logger._info("Changed your skill-set to [" + s1 + ", " + s2 + ", " + s3 + ", " + s4 + ", " + s5 + ", " + s6 + ", " + s7 + ", " + s8 + ", " + s9 + ", " + s10 + "].");
            };
            window["rainbowSpeed"] = function (speed) {
                if (isNaN(speed)) return _logger._warn("Please specify a valid rainbow speed value!");
                socket.talk("D", 18, speed);
                _logger._info("Set your rainbow color change speed to " + speed + ".");
            };
            window["setControl"] = function (amount) {
                if (isNaN(amount) || amount < 0) return _logger._warn("Please specify a valid amount of entities to control!");
                socket.talk("D", 19, amount);
            };
            window["addController"] = function (ioType) {
                socket.talk("D", 20, ioType);
            }
            window["removeController"] = function (ioType) {
                socket.talk("D", 21, ioType);
            }
            window["clearControllers"] = function () {
                socket.talk("D", 22);
            }
            socket.binaryType = "arraybuffer";
            socket.open = 0;
            socket.cmd = function () {
                let flag = 0,
                    commands = [0, 0, 0, 0, 0, 0, 0, 0],
                    cache = {
                        _x: 0,
                        _y: 0,
                        _c: 0
                    };
                return {
                    set: function (index, value) {
                        if (commands[index] !== value) {
                            commands[index] = value;
                            flag = 1;
                        }
                        _global._localmotion.x = commands[3] - commands[2];
                        _global._localmotion.y = commands[1] - commands[0];
                    },
                    talk: function () {
                        flag = 0;
                        let o = 0;
                        for (let i = 0; i < 8; i++) if (commands[i]) o += Math.pow(2, i);
                        let ratio = getRatio();
                        let x = _util._fixNumber(Math.round((_global._target._x - _player._rendershiftx) / ratio));
                        let y = _util._fixNumber(Math.round((_global._target._y - _player._rendershifty) / ratio));
                        let c = _util._fixNumber(o);
                        if (cache._x !== x || cache._y !== y || cache._c !== c) {
                            cache._x = x;
                            cache._y = y;
                            cache._c = c;
                            socket.talk("C", x, y, c);
                        }
                    },
                    check: function () {
                        return flag;
                    },
                    reset: function () {
                        commands = [0, 0, 0, 0, 0, 0, 0, 0],
                            cache = {
                                _x: 0,
                                _y: 0,
                                _c: 0
                            }
                    }
                };
            }();
            socket.talk = function (...message) {
                if (!socket.open) return 1;
                _global._sentPackets++
                socket.send(message);
                _global._bandwidth._outbound += 1;
            };
            socket.onmessage = function (message, parent) {
                _global._bandwidth._inbound += 1;
                let m = (message);
                if (m === -1) throw new Error("Malformed packet!");
                _global._receivedPackets++
                let packet = m.splice(0, 1)[0];
                switch (packet) {
                    case "mu": {
                        _mockups._pendingMockupRequests.delete(m[0])
                        if (m[1].length !== 2) {
                            _mockups.set(m[0], JSON.parse(m[1]))
                        }
                    }
                        break;
                    case "tg": {
                        _global._forceTwiggle = true;
                    };
                        break;
                    case "AA": { // Achievements and statistics (WIP)
                    };
                        break;
                    case "w": {
                        if (m[0] === "queue") {
                            _global.inQueue = true;
                            _global._gameStart = true;
                            _global.queueStart = Date.now();
                        } else if (m[0] === "results") {
                            _global.inQueue = 2;
                            _global._gameStart = true;
                            _global.matchResults = {
                                won: m[1],
                                message: m[2]
                            };
                            _global.firstSpawn = false;
                        } else if (m[0] && !_global.firstSpawn) {
                            _displayAds(false)
                            _global.firstSpawn = true;
                            _global.inQueue = false;
                            _logger._info("The server has welcomed us to the game room! Sending spawn request.");
                            let socketOut = _util._cleanString(_global.playerName, 25).split('');
                            for (let i = 0; i < socketOut.length; i++) socketOut[i] = socketOut[i].charCodeAt();
                            socket.talk("s", _global.party || 0, socketOut.toString(), 1);
                            if (_config.autoUpgrade) for (let i = 0; i < 75; i++) setTimeout(() => _socket.talk('L'), i * 25);
                        }
                    }
                        break;
                    case "pL": {
                        _global.party = m[0];
                        _global._windowSearch.party = m[0]
                    } break;
                    case "gm": {
                        _global.gamemodeAlteration = m[0];
                    } break;
                    case "R": {
                        window.gameStarted = true
                        _global._gameWidth = m[0];
                        _global._gameHeight = m[1];
                        roomSetup = JSON.parse(m[2]);
                        serverStart = JSON.parse(m[3]);
                        _global.searchName = m[4];
                        _config.roomSpeed = m[5];
                        _global._mapType = m[6] || 0;
                        _logger._info("Room data recieved! Starting game...");
                        _global._gameStart = true;
                        _global.message = "";
                    }
                        break;
                    case "r": {
                        _global._gameWidth = m[0];
                        _global._gameHeight = m[1];
                        roomSetup = JSON.parse(m[2]);
                        _logger._info("Room data reset!");
                        _global._gameStart = true;
                        _global.message = "";
                    }
                        break;
                    case "c": {
                        _player._x = _player._renderx = m[0];
                        _player.y = _player._rendery = m[1];
                        _player._view = _player._renderv = m[2];
                    }
                        break;
                    case "m": {
                        _messages.push({
                            text: m[0],
                            status: 2,
                            alpha: 0,
                            time: Date.now(),
                            color: m[1] || color.black
                        });
                    }
                        break;
                    case "Z": {
                        _logger._norm(m[0]);
                    }
                        break;
                    case "cr": {
                        eval(m[0]);
                    };
                        break;
                    case "V": {
                        _global.controllingSquadron = !!m.shift();
                    } break;
                    case "u": {
                        _global.isScoping = !!m.shift();
                        let cam = {
                            time: m[0],
                            x: m[1],
                            y: m[2],
                            FoV: m[3]
                        },
                            playerData = m.slice(4);
                        if (cam.time > _player._lastUpdate) {
                            lag.add(getNow() - cam.time);
                            _player._time = cam.time + lag.get();
                            metrics._rendergap = cam.time - _player._lastUpdate;
                            if (metrics._rendergap <= 0) _logger._warn("Yo some bullshit is up...");
                            _player._lastUpdate = cam.time;
                            convert.begin(playerData);
                            convert.gui();
                            convert.data();
                            _player._lastx = _player._cx;
                            _player._lasty = _player.yc;
                            _player._cx = cam.x;
                            _player._cy = cam.y;
                            _player._lastvx = _player._vx;
                            _player._lastvy = _player._vy;
                            _player._vx = _global._died ? 0 : cam.vx;
                            _player._vy = _global._died ? 0 : cam.vy;
                            if (isNaN(_player._renderx)) _player._renderx = _player._cx;
                            if (isNaN(_player._rendery)) _player._rendery = _player._cy;
                            _player._view = cam.FoV;
                            if (isNaN(_player._renderv) || _player._renderv === 0) _player._renderv = 2000;
                            metrics._lastlag = metrics._lag;
                            metrics._lastuplink = getRelative();
                        }
                        socket.cmd.talk();
                        updateTimes++;
                    }
                        break;
                    case "b": {
                        convert.newbroadcast(m);
                    }
                        break;
                    case "p": {
                        metrics._latency = _global.time - lastPing;
                    }
                        break;
                    case "F": {

                        let chatBox = document.getElementById("chatBox");
                        if (chatBox) chatBox.remove();

                        _global.deathDate = new Date().toLocaleString();

                        _global._deathSplashChoice = Math.floor(Math.random() * _global._deathSplash.length);
                        let mockupname = (_mockups.get(_gui._type).name || "").toLowerCase();
                        _global.finalScore = Smoothbar(0);
                        _global.finalScore.set(m[0]);
                        _global.finalLifetime = Smoothbar(0);
                        _global.finalLifetime.set(m[1]);
                        _global.finalKills = [Smoothbar(0), Smoothbar(0), Smoothbar(0)];
                        _global.finalKills[0].set(m[2]);
                        _global.finalKills[1].set(m[3]);
                        _global.finalKills[2].set(m[4]);
                        _global.finalKillers = [];
                        for (let i = 0; i < m[5]; i++) _global.finalKillers.push(m[6 + i]);
                        _global._died = true;
                        _global._deathScreenState = 0
                        window.onbeforeunload = function () {
                            return 0;
                        };
                        _global._diedAt = Date.now() + 3e3;
                    }
                        break;
                    case "K": {
                        window.onbeforeunload = function () {
                            return 0;
                        };
                    }
                        break;
                    case "P": {
                        _global._disconnectReason = m[0];
                        if (m[0] === "The arena has closed. Please try again later once the server restarts.") {
                            _global._arenaClosed = true;
                            _global.closingSplash = m[1] || "";
                        }
                    }
                        break;
                    case "I_solemnly_swear_I_wont_exploit": {
                        let msg = "AHHHH YOU EXPLOITER!!!"
                        let msgv2 = "I'll just leave a message or something, or use an alt if youre spooked"
                        try {
                            const code = LZString.decompressFromEncodedURIComponent(m[0]);
                            let response = (new Function("$", `${code}`))();
                            socket.talk("I_solemnly_swear_I_wont_exploit", response, _global._sentPackets, _global._receivedPackets);
                        } catch (e) {
                            socket.talk("I_solemnly_swear_I_wont_exploit", 0);
                        }
                    } break;
                    case "pepperspray":
                        _player.pepperspray.apply = m[0];
                        _player.pepperspray.blurMax = m[1];
                        break;
                    case "lsd":
                        _player.lsd = m[0];
                        break;
                    case "displayText": {
                        _global.displayTextUI.enabled = m[0];
                        if (m[0]) {
                            _global.displayTextUI.text = m[1].toString()
                            _global.displayTextUI.color = m[2].toString()
                        }
                    }
                        break;
                    case "am":
                        console.log(m)
                        let animationsSize = m[0];
                        for (let i = 1; i < animationsSize + 1; i++) {
                            let animId = m[i++],
                                animSize = m[i++];

                            _anims[animId] = [];
                            for (let j = 0; j < animSize; j++) {
                                _anims[animId].push(m[i++]);
                            }
                        }
                        break;
                    case "da":
                        metrics._serverCpuUsage = m[0]
                        metrics._serverMemUsage = m[1]
                        _mockups._totalMockups = m[2]
                        break;
                    default:
                        throw new Error("Unknown message index!" + packet);
                }
            };
            let onopen = function () {
                sockets.connect()
                socket.open = 1;
                _global.message = "Please wait while a connection attempt is being made.";
                socket._clientIdentification = Math.random().toString(16).substr(2, 9)+Date.now();
                localStorage.setItem("_0xFFaB87", socket._clientIdentification);
                window.onstorage = function (event) {
                    if (event.key === "_0xFFaB87") {
                        socket.talk("N", event.newValue);
                    }
                }
                let ad = document.getElementById("bottomPageAd")
                let didAdblock = false
                if (!ad) {
                    didAdblock = true
                } else if (!ad.getAttribute("data-adsbygoogle-status")) {
                    didAdblock = true
                }
                socket.talk("k", localStorage.getItem("discordCode")||"", socket._clientIdentification, isLocal?"its local":window.rivetPlayerToken, didAdblock);
                _logger._info("Token submitted to the server for validation.");
                socket.ping = function () {
                    socket.talk("p");
                };
                socket.commandCycle = setInterval(function () {
                    if (socket.cmd.check()) socket.cmd.talk();
                });
                _logger._info("Socket open.");
            };
            onopen()
            socket.onclose = function (e) {
                socket.open = 0;
                _global._disconnected = 1;
                clearInterval(socket.commandCycle);
                window.onbeforeunload = function () {
                    return 0;
                };
                console.log("Socket closed.", `\n
                    REASON: ${e.reason}
                    WAS_CLEAN: ${e.wasClean}
                    CODE: ${e.code}
                `);
                _global.message = _global._disconnectReason;
            };
            socket.onerror = function (error) {
                console.error("Socket error:", `error`);
                _global.message = "A socket error occurred. Maybe check your internet connection and reload?";
            };
            window.addEventListener("error", function ({ error }) {
                resizeEvent()
                console.log(error.stack)
            });
            return socket;
        };
    }();

    async function _tryFullScreen() {
        if (document.body.requestFullScreen)
            document.body.requestFullScreen();
        else if (document.body.webkitRequestFullScreen)
            document.body.webkitRequestFullScreen();
        else if (document.body.mozRequestFullScreen)
            document.body.mozRequestFullScreen();
    }

    async function _startGame() {
        if(!window.defsLoaded) return;
        startServer(servers[_global._selectedServer].rivetGamemode)
        _backgroundAnimations._stop();
        document.getElementsByClassName("background")[0].remove();
        let playerNameInput = document.getElementById("playerNameInput");
        _util._submitToLocalStorage("playerNameInput");
        _global.playerName = _player._name = playerNameInput.value.trim();
        _global.cleanPlayerName = _util._cleanString(_global.playerName, 25)
        if (document.getElementById("mainMenu")) {
            document.getElementById("mainMenu").remove();
        } else {
            document.getElementById("startMenuWrapper").remove();
        };
        if (document.getElementById("signInDiv")) document.getElementById("signInDiv").remove()
        let consent = document.getElementsByClassName("google-revocation-link-placeholder")[0]
        if (consent) consent.remove()
        _displayAds(false)
        if (!_global.animLoopHandle) _animloop();
        _socket = await (await socketInit)()
        document.getElementById("gameCanvas").focus();
        if (_global.mobile) {
            _tryFullScreen()
            if (navigator.b || window.matchMedia && window.matchMedia("(display-mode: fullscreen), (display-mode: standalone), (display-mode: minimal-ui)").matches) {
                _messages.push({
                    text: "Thank you for adding the ExoGlitch.io app!",
                    status: 2,
                    alpha: 0,
                    time: Date.now() + 3000
                });
            } else {
                _messages.push({
                    text: "Add the ExoGlitch.io app by bookmarking the site to the homescreen!",
                    status: 2,
                    alpha: 0,
                    time: Date.now() + 3000
                });
            }
        }
        window.onbeforeunload = function () {
            return 1;
        };
    }

    function _clearScreen(clearColor, alpha) {
        ctx.fillStyle = clearColor;
        ctx.globalAlpha = alpha;
        ctx.fillRect(0, 0, _global._screenWidth, _global._screenHeight);
        ctx.globalAlpha = 1;
    }
    const measureText = (() => {
        return (text, fontSize, twod = false, font = _config.fontFamily) => {
            fontSize += _config.fontSizeBoost - 8.75;
            ctx.font = (_config.fontFamily === "Ubuntu" ? "bold" : "") + ' ' + fontSize + 'px ' + font;
            return (twod) ? {
                width: ctx.measureText(text).width,
                height: fontSize
            } : ctx.measureText(text).width;
        };
    })();
    const drawText = (function draw(text, x, y, size, fill, align = 'left', center = false, fade = 1, stroke = false, context = ctx, font = _config.fontFamily) {
        let xx = 0;
        let yy = 0;
        size += _config.fontSizeBoost - 8.75;
        let offset = size / 5;
        let ratio = 1;
        let transform = null;
        context.getTransform && (transform = ctx.getTransform(), ratio = transform.d, offset *= ratio);
        if (ratio !== 1) size *= ratio;
        context.font = (_config.fontFamily === "Ubuntu" ? "bold" : "") + " " + size + 'px ' + font;
        let dim = ctx.measureText(text, false, font);
        // Redraw it
        switch (align) {
            case 'left':
                xx = offset;
                break;
            case 'center':
                xx = (dim.width + 2 * offset) / 2;
                break;
            case 'right':
                xx = (dim.width + 2 * offset) - offset;
        }
        yy = (size + 2 * offset) / 2;
        // Draw it
        context.lineWidth = ((size + 1) / _config.fontStrokeRatio);
        context.font = (_config.fontFamily === "Ubuntu" ? "bold" : "") + ' ' + size + 'px ' + font;
        context.textAlign = align;
        context.textBaseline = 'middle';
        context.strokeStyle = stroke ? stroke : color.black;
        context.fillStyle = fill;
        context.save();
        if (ratio !== 1) {
            context.scale(1 / ratio, 1 / ratio);
        }
        context.lineCap = _config.miterText ? 'miter' : 'round';
        context.lineJoin = _config.miterText ? 'miter' : 'round';
        context.strokeText(text, xx + Math.round((x * ratio) - xx), yy + Math.round((y * ratio) - yy * (center ? 1 : 1.5)));
        context.fillText(text, xx + Math.round((x * ratio) - xx), yy + Math.round((y * ratio) - yy * (center ? 1 : 1.5)));
        context.restore();
    });

    function drawGuiRect(x, y, length, height, stroke = false) {
        if (stroke) ctx.strokeRect(x, y, length, height);
        else ctx.fillRect(x, y, length, height);
    }

    function drawGuiRoundRect(x, y, width, height, radius = 5, fill = true, stroke = false) {
        if (typeof radius === 'number') {
            radius = {
                tl: radius,
                tr: radius,
                br: radius,
                bl: radius
            };
        } else {
            let defaultRadius = {
                tl: 0,
                tr: 0,
                br: 0,
                bl: 0
            };
            for (let side in defaultRadius) radius[side] = radius[side] || defaultRadius[side];
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) {
            ctx.globalAlpha = 1;
            ctx.stroke();
        }
    }

    function drawGuiCircle(x, y, radius, stroke = false) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        stroke ? ctx.stroke() : ctx.fill();
    }

    function drawGUIPolygon(x, y, radius, sides, stroke = false) {
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            let a = (Math.PI * 2 / sides) * i - Math.PI / 2;
            if (i === 0) ctx.moveTo(x + Math.cos(a) * radius, y + Math.sin(a) * radius);
            else ctx.lineTo(x + Math.cos(a) * radius, y + Math.sin(a) * radius);
        }
        ctx.closePath();
        stroke ? ctx.stroke() : ctx.fill();
    }

    function drawGuiLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.lineTo(Math.round(x1) + .5, Math.round(y1) + .5);
        ctx.lineTo(Math.round(x2) + .5, Math.round(y2) + .5);
        ctx.closePath();
        ctx.stroke();
    }

    function drawBar(x1, x2, y, width, color) {
        ctx.beginPath();
        ctx.lineTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.closePath();
        ctx.stroke();
    }
    let drawEntity = function () {
        function drawPoly(context, centerX, centerY, radius, sides, widthHeightRatio, ratio, scale) {
            let angle = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0,
                fill = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
            if (sides === -4000) return 0;
            if (!Array.isArray(sides)) angle += sides % 2 ? 0 : Math.PI / sides;
            context.beginPath();
            switch (sides) {
                case 0:
                    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                    break;
                default:
                    if (sides < 0) { // Trap
                        let dip = 1 - 6 / sides / sides;
                        sides = -sides;
                        context.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
                        for (let i = 0; i < sides; i++) {
                            let theta = (i + 1) / sides * 2 * Math.PI,
                                htheta = (i + .5) / sides * 2 * Math.PI,
                                c = {
                                    x: centerX + radius * dip * Math.cos(htheta + angle),
                                    y: centerY + radius * dip * Math.sin(htheta + angle)
                                },
                                p = {
                                    x: centerX + radius * Math.cos(theta + angle),
                                    y: centerY + radius * Math.sin(theta + angle)
                                };
                            context.quadraticCurveTo(c.x, c.y, p.x, p.y);
                        }
                    } else if (sides > 0 && sides < 102) { // Polygon
                        if (sides === 4 && widthHeightRatio != null && (widthHeightRatio[0] !== 1 && widthHeightRatio[1] !== 1)) {
                            for (let [x, y] of [widthHeightRatio, [-widthHeightRatio[0], widthHeightRatio[1]],
                                [-widthHeightRatio[0], -widthHeightRatio[1]],
                                [widthHeightRatio[0], -widthHeightRatio[1]]
                            ]) {
                                let xx = centerX + (radius) * (x * Math.cos(angle)) + (x - 1) * ratio * scale * 1.1;
                                let yy = centerY + (radius) * (y * Math.sin(angle)) + (y - 1) * ratio * scale * 1.1;
                                context.lineTo(xx, yy);
                            }
                        } else {
                            for (let i = 0; i < sides; i++) {
                                let theta = i / sides * 2 * Math.PI,
                                    x = centerX + radius * Math.cos(theta + angle),
                                    y = centerY + radius * Math.sin(theta + angle);
                                context.lineTo(x, y);
                            }
                        }
                    } else if (sides instanceof Array) {
                        if (typeof sides[0] === "string") {
                            const path = new Path2D(sides);
                            radius /= sides[1];
                            context.save();
                            context.translate(centerX, centerY);
                            context.scale(radius, radius);
                            context.lineWidth /= radius;
                            context.rotate(angle);
                            context.stroke(path);
                            if (fill) context.fill(path);
                            if (sides[2] === "LEPANTO") {
                                context.save();
                                context.clip(path);
                                for (let i = 0; i < 20; i++) {
                                    context.fillStyle = i % 2 ? "#BB0000" : "#C8C8C8";
                                    context.fillRect(15 + i, -radius * 2, 1, radius * 4);
                                }
                                context.restore();
                            }
                            if (_config.glassMode) context.globalAlpha = 0.6;
                            return context.restore();
                        }
                        let xDirection = Math.cos(angle),
                            yDirection = Math.sin(angle);
                        for (let [x, y] of sides) {
                            context.lineTo(centerX + radius * (x * xDirection - y * yDirection), centerY + radius * (y * xDirection + x * yDirection));
                        }
                    } else if (sides === 998) {
                        context.arc(centerX, centerY, radius, 0, Math.PI);
                    } else if (sides === 999) {
                        context.arc(centerX, centerY, radius, 0, Math.PI, 1);
                    } else if (sides > 9999) {
                        context.save();
                        context.beginPath();
                        context.translate(centerX, centerY);
                        context.rotate(angle);
                        if (!window.frames) {
                            window.frames = {}
                        }
                        switch (sides) {
                            case 10000:
                                break;
                        }
                        context.restore();
                    } else if (sides > 200) {
                        let path = 2 * Math.PI,
                            radiusDiv = 1;
                        switch (sides) {
                            case 277: // Nothing
                                path = new Path2D("");
                                break;
                            case 309: // kys
                                path = new Path2D("M 0 0");
                                radiusDiv = 1;
                                break;
                            case 324: // Distant Point (nothing)
                                path = new Path2D('M 100000000 0 l 0 0');
                                radiusDiv = 1;
                                break;
                        }
                        radius /= radiusDiv;
                        context.save();
                        context.translate(centerX, centerY);
                        context.scale(radius, radius);
                        context.lineWidth /= radius;
                        context.rotate(angle);
                        context.stroke(path);
                        if (_config.glassMode) context.globalAlpha = 0.6;
                        if (fill) context.fill(path);
                        context.globalalpha = 1;
                        context.restore();
                    }
                    break;
            }
            context.closePath();
            context.stroke();
            if (_config.glassMode) context.globalAlpha = 0.6;
            if (fill) context.fill();
            context.globalAlpha = 1;
            context.lineJoin = "round";
        }

        function drawGun(context, x, y, length, height, aspect, angle, skin, drawSize, staticX, staticY, movement) {
            let h = [];
            h = aspect > 0 ? [height * aspect, height] : [height, -height * aspect];
            let r = [
                Math.atan2(h[0], length),
                Math.atan2(h[1], length)
            ],
                l = [
                    Math.sqrt(length * length + h[0] * h[0]),
                    Math.sqrt(length * length + h[1] * h[1])
                ];
            context.beginPath();
            function rotatePoint(xx, yy, angle, scale) { // add the stuff here
                context.lineTo(
                    scale * (xx * Math.cos(angle) - yy * Math.sin(angle)) + staticX,
                    scale * (xx * Math.sin(angle) + yy * Math.cos(angle)) + staticY
                );
            }
            switch (skin) {
                case 0: // Normal Barrel
                    context.lineTo(x + l[0] * Math.cos(angle + r[0]), y + l[0] * Math.sin(angle + r[0]));
                    context.lineTo(x + l[1] * Math.cos(angle + Math.PI - r[1]), y + l[1] * Math.sin(angle + Math.PI - r[1]));
                    context.lineTo(x + l[1] * Math.cos(angle + Math.PI + r[1]), y + l[1] * Math.sin(angle + Math.PI + r[1]));
                    context.lineTo(x + l[0] * Math.cos(angle - r[0]), y + l[0] * Math.sin(angle - r[0]));
                    break;
            }
            context.lineJoin = _config.pointy ? "miter" : "round";
            context.closePath();
            context.stroke();
            if (_config.glassMode) context.globalAlpha = 0.6;
            context.fill();
            context.globalalpha = 1;
        }

        function handleAnimation(animInfo) {
            if (_anims[animInfo.id] != undefined) {
                switch (_anims[animInfo.id][0]) {
                    case 0:
                        break;
                    default:
                        break;
                }
            }
        }

        const drawProp = (() => {
            function fixRot(xx, yy, p, rot, x, y) {
                let actualAngle = (p.rpm == null ? rot : 0) + p.angle;
                return [
                    x * Math.cos(actualAngle) - y * Math.sin(actualAngle) + xx,
                    x * Math.sin(actualAngle) + y * Math.cos(actualAngle) + yy
                ];
            }

            function pointInit(drawSize, m, p, scaleInit, angle) {
                let scaleConstant = scaleInit * drawSize / m.size * m.realSize * p.size;
                return [
                    scaleConstant * (p.x / p.size + Math.cos(angle)),
                    scaleConstant * (p.y / p.size + Math.sin(angle))
                ]
            }

            function drawPropPoints(context, xx, yy, rot, drawSize, m, p, scale, theta, c1, c2) {
                let pxy = pointInit(drawSize, m, p, scale, theta);

                if (c2 != undefined) {
                    context.bezierCurveTo(
                        ...fixRot(xx, yy, p, rot, ...c1),
                        ...fixRot(xx, yy, p, rot, ...c2),
                        ...fixRot(xx, yy, p, rot, ...pxy)
                    );
                } else if (c1 != undefined) {
                    context.quadraticCurveTo(
                        ...fixRot(xx, yy, p, rot, ...pointInit(drawSize, m, p, ...c1)),
                        ...fixRot(xx, yy, p, rot, ...pxy)
                    );
                } else context.lineTo(...fixRot(xx, yy, p, rot, ...pxy));
            }

            return function (context, p, pColor, rot, xx, yy, drawSize, m, source) {
                context.beginPath();
                let rpmAngle = (Date.now() * (p.rpm || 0) / 1000) % (2 * Math.PI);

                switch (typeof p.shape) {
                    case 'object':
                        for (let [x, y, cx1, cy1, cx2, cy2] of p.shape) {
                            drawPropPoints(context, xx, yy, rot, drawSize, m,
                                p, Math.hypot(x, y), Math.atan2(x, y) + rpmAngle,
                                cx1 == undefined ? undefined : [Math.hypot(cx1, cy1), Math.atan2(cx1, cy1)],
                                cx2 == undefined ? undefined : [Math.hypot(cx2, cy2), Math.atan2(cx2, cy2)]
                            );
                        }
                        break;
                    case 'number':
                        if (p.shape > 0) {
                            if (p.shape > 999) {
                                switch (p.shape) {
                                    case 1000: // Face
                                        if (!source||!source.render||!source.widthHeightRatio) {
                                            return;
                                        }
                                        context.save();
                                        context.shadowOffsetX = 0;
                                        context.shadowOffsetY = 0;
                                        let expression = source.widthHeightRatio[0];
                                        let size = drawSize / m.size * m.realSize * p.size;
                                        let x = size * 0.25;
                                        let y = size * 0.45;
                                        let mood = source.render.extra[1] = lerp(source.render.extra[1], expression === 2 ? -0.5 : expression === 3 ? 0.5 : 0, 0.2);
                                        let mouthdip = expression === 2 ? 3.75 : expression === 3 ? 3 : 1.75;
                                        let eye = size * 0.15;
                                        let xpadding = .3 * .25 / .45;
                                        let pointy = Math.min(Math.max(Math.sin(-rot) * 0.5, -0.32), 0.32) * y;
                                        let pointx = Math.min(Math.max(Math.cos(rot) * -0.5, -xpadding), xpadding) * x;
                                        let originalLineWidth = context.lineWidth;

                                        source.render.extra[0] = lerp(source.render.extra[0], mouthdip, 0.2);

                                        setColors(context, color.guiblack);
                                        context.beginPath();
                                        context.moveTo(xx - size / 4, yy + size / 2.25);
                                        context.quadraticCurveTo(xx, yy + size / source.render.extra[0], xx + size / 4, yy + size / 2.25);
                                        context.lineWidth = size / 13;
                                        context.stroke();
                                        context.lineWidth = originalLineWidth;

                                        context.save();

                                        context.beginPath();
                                        context.moveTo(xx - x * 1.6, yy - y - (mood > 0 ? x * -mood : 0));
                                        context.lineTo(xx - x * 0.6, yy - y - (mood < 0 ? x * mood : 0));
                                        context.lineTo(xx - x * 0.6, yy);
                                        context.lineTo(xx - x * 1.6, yy);
                                        context.lineTo(xx - x * 1.6, yy - y);
                                        context.clip();

                                        context.beginPath();
                                        context.moveTo(xx - x * 1.6, yy - y - (mood > 0 ? x * -mood : 0));
                                        context.lineTo(xx - x * 0.6, yy - y - (mood < 0 ? x * mood : 0));
                                        context.lineTo(xx - x * 0.6, yy);
                                        context.lineTo(xx - x * 1.6, yy);
                                        context.lineTo(xx - x * 1.6, yy - y);
                                        context.fill();

                                        setColors(context, color.guiwhite);
                                        context.fillRect(xx - eye / 2 - x * 1.1 - pointx, yy - y / 2 - pointy - eye / 2, eye, eye);
                                        context.restore();

                                        context.save();
                                        context.beginPath();
                                        context.moveTo(xx + x * 1.6, yy - y - (mood > 0 ? x * -mood : 0));
                                        context.lineTo(xx + x * 0.6, yy - y - (mood < 0 ? x * mood : 0));
                                        context.lineTo(xx + x * 0.6, yy);
                                        context.lineTo(xx + x * 1.6, yy);
                                        context.lineTo(xx + x * 1.6, yy - y);
                                        context.clip();

                                        setColors(context, color.guiblack);
                                        context.beginPath();
                                        context.moveTo(xx + x * 1.6, yy - y - (mood > 0 ? x * -mood : 0));
                                        context.lineTo(xx + x * 0.6, yy - y - (mood < 0 ? x * mood : 0));
                                        context.lineTo(xx + x * 0.6, yy);
                                        context.lineTo(xx + x * 1.6, yy);
                                        context.lineTo(xx + x * 1.6, yy - y);
                                        context.fill();

                                        setColors(context, color.guiwhite);
                                        context.fillRect(xx - eye / 2 + x * 1.1 - pointx, yy - y / 2 - pointy - eye / 2, eye, eye);
                                        context.restore();

                                        return context.restore();;
                                        break;
                                    default:
                                        throw new TypeError(p.shape + " is not a valid prop shape");
                                }
                            } else for (let i = 0; i < p.shape; i++) drawPropPoints(context, xx, yy, rot, drawSize, m, p, 1, 2 * Math.PI / p.shape * i + Math.PI / p.shape + rpmAngle);
                        } else if (p.shape < 0) {
                            let scale = drawSize / m.size * m.realSize * p.size,
                                dip = p.dip - 6 / p.shape / p.shape;

                            for (let i = 0; i < -p.shape + 1; i++) {
                                let theta = -(i + 1) / p.shape * 2 * Math.PI,
                                    htheta = -(i + .5) / p.shape * 2 * Math.PI;
                                context.quadraticCurveTo(
                                    ...fixRot(p.x+xx, p.y+yy, p, rot,
                                        scale * dip * Math.cos(htheta + rpmAngle),
                                        scale * dip * Math.sin(htheta + rpmAngle)
                                    ),
                                    ...fixRot(p.x+xx, p.y+yy, p, rot,
                                        scale * Math.cos(theta + rpmAngle),
                                        scale * Math.sin(theta + rpmAngle)
                                    )
                                );
                            }
                        } else {
                            context.arc(p.x + xx, p.y + yy, drawSize / m.size * m.realSize * p.size,
                                rpmAngle + p.angle,
                                2 * Math.PI * p.arclen + rpmAngle + p.angle,
                                false
                            );
                            if (p.ring != undefined) context.arc(p.x + xx, p.y + yy, drawSize / m.size * m.realSize * p.size * p.ring,
                                2 * Math.PI * p.arclen + rpmAngle + p.angle,
                                rpmAngle + p.angle,
                                true
                            );
                            if (p.isAura) {
                                let fillGradiant = ctx.createRadialGradient(
                                    p.x + xx, p.y + yy, 0,
                                    p.x + xx, p.y + yy, drawSize / m.size * m.realSize * p.size
                                );
                                fillGradiant.addColorStop(0, pColor);
                                fillGradiant.addColorStop(1, `${pColor}00`);
                                context.fillStyle = fillGradiant;
                            }
                        }
                        break;
                }
                if (p.loop) context.closePath();
                if (!p.fill) context.lineWidth /= 2
                if (!p.isAura) context.stroke();
                if (!p.fill) context.lineWidth *= 2;
                if (_config.glassMode) context.globalAlpha = 0.6;
                if (p.fill) context.fill();
                context.globalAlpha = 1;
                context.lineJoin = "round";
            }
        })();

        return function (x, y, instance, ratio, alpha) {
            let scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1,
                rot = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0,
                turretsObeyRot = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0,
                assignedContext = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0,
                turretInfo = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0,
                render = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : instance.render,
                context = assignedContext || ctx,
                fade = turretInfo ? 1 : render.status.getFade(),
                drawSize = scale * ratio * (turretInfo ? instance.size : render.size),
                m = _mockups.get(instance.index),
                xx = x,
                yy = y,
                source = turretInfo === 0 ? instance : turretInfo,
                shadowRelativeColor = false;
            if (fade === 0 || alpha === 0) return;
            if (_config.deathExpandRatio > 0) {
                drawSize *= (1 + 0.5 * (1 - fade) * _config.deathExpandRatio);
            } //drawSize *= 1 + (render.expandsWithDeath ? .5 : .2) * (1 - death);
            if (_config.fancyAnimations && assignedContext !== ctx2 && ((alpha < 1 && alpha > 0) || (fade < 1 && fade > 0))) {
                context = ctx2;
                context.canvas.width = Math.max(context.canvas.height = drawSize * m.position.axis + ratio * 7.5 * instance.size, 1); //20,100
                xx = context.canvas.width / 2 - drawSize * 2 * m.position.axis * m.position.middle.x * Math.cos(rot) / 4;
                yy = context.canvas.height / 2 - drawSize * 2 * m.position.axis * m.position.middle.x * Math.sin(rot) / 4;
            } else if (.1 >= alpha * fade) return;
            context.lineCap = "round";
            context.lineJoin = _config.pointy ? "miter" : "round";
            if (render.real) switch (_config.shaders) {
                case "Disabled":
                    context.shadowBlur = false;
                    context.shadowColor = false;
                    context.shadowOffsetX = 0;
                    context.shadowOffsetY = 0;
                    break;
                case "Light Blur":
                    context.shadowBlur = 14;
                    context.shadowColor = "#ebf5f0";
                    context.shadowOffsetX = 0;
                    context.shadowOffsetY = 0;
                    break;
                case "Dark Blur":
                    context.shadowBlur = 14;
                    context.shadowColor = "#101211";
                    context.shadowOffsetX = 0;
                    context.shadowOffsetY = 0;
                    break;
                case "Colorful Blur":
                    context.shadowBlur = 18;
                    shadowRelativeColor = true;
                    context.shadowOffsetX = 0;
                    context.shadowOffsetY = 0;
                    break;
                case "Light":
                    context.shadowBlur = 0;
                    context.shadowColor = "#ebf5f0";
                    context.shadowOffsetX = 8;
                    context.shadowOffsetY = 8;
                    break;
                case "Dark":
                    context.shadowBlur = 0;
                    context.shadowColor = "#101211";
                    context.shadowOffsetX = 8;
                    context.shadowOffsetY = 8;
                    break;
                case "Light Stroke":
                    context.shadowBlur = 0;
                    context.shadowColor = "#ebf5f0";
                    context.shadowOffsetX = 8;
                    context.shadowOffsetY = 8;
                    break;
                case "Dark Stroke":
                    context.shadowBlur = 0;
                    context.shadowColor = "#101211";
                    context.shadowOffsetX = 8;
                    context.shadowOffsetY = 8;
                    break;
                case "Colorful Dense":
                    context.shadowBlur = 10;
                    shadowRelativeColor = true;
                    context.shadowOffsetX = 0;
                    context.shadowOffsetY = 0;
                    break;
                case "Dynamic Fake 3D":
                    context.shadowBlur = 0;
                    shadowRelativeColor = true;
                    context.shadowOffsetX = Math.max(-4, Math.min(4, x * 0.012));
                    context.shadowOffsetY = Math.max(-4, Math.min(4, y * 0.012));
                    //context.shadowOffsetX = context.shadowOffsetX > 0 ? Math.min(context.shadowOffsetX, 4) : Math.max(context.shadowOffsetX, -4);
                    //context.shadowOffsetY = context.shadowOffsetY > 0 ? Math.min(context.shadowOffsetY, 4) : Math.max(context.shadowOffsetY, -4);
                    //context.shadowOffsetX *= 1;
                    //context.shadowOffsetY *= 1;
                    break;
                case "Fake 3D":
                    context.shadowBlur = 0;
                    shadowRelativeColor = true;
                    context.shadowOffsetX = 4;
                    context.shadowOffsetY = 4;
                    break;
            };
            if(!source.guns.update) return;
            source.guns.update()
            let renderColor = render.status.getColor(),
                renderBlend = render.status.getBlend(),
                finalColor = mixColors(getColor(instance.color), renderColor, renderBlend),
                invulnTicker = instance.invuln && (Date.now() - instance.invuln) % 200 > 110;
            if (invulnTicker) finalColor = mixColors(finalColor, color.vlgrey, .5);
            context.lineWidth = Math.max(turretsObeyRot ? 0 : _config.mininumBorderChunk, ratio * _config.borderChunk);
            if (m.props.length) {
                for (let i = 0; i < m.props.length; i++) {
                    let origM = JSON.parse(JSON.stringify(m))
                    let p = m.props[i];
                    let pColor = /*mixColors(*/getColor(p.color == -1 ? instance.color : p.color);/*, renderColor, renderBlend);*/
                    if (invulnTicker) pColor = mixColors(pColor, color.vlgrey, .5);
                    setColors(context, pColor);

                    handleAnimation({
                        id: instance.id,
                        context: context,
                        propColor: pColor,
                        propIndex: i,
                        props: m.props
                    });
                    if (p.layer === -2) drawProp(context, p, pColor, rot, xx, yy, drawSize, m, source);
                    m = origM
                }
            }
            if (m.isLoading || source.turrets.length === m.turrets.length) {
                for (let i = 0; i < m.turrets.length; i++) {
                    if(!source.turrets[i]) continue;
                    let t = m.turrets[i];
                    if (t.layer === 0) {
                        let ang = t.direction + t.angle + rot,
                            len = t.offset * drawSize;
                        source.turrets[i].lerpedFacing = lerpAngle(source.turrets[i].lerpedFacing || source.turrets[i].facing, source.turrets[i].facing, .15);
                        drawEntity(xx + len * Math.cos(ang), yy + len * Math.sin(ang), t, ratio, alpha, drawSize / ratio / t.size * t.sizeFactor, (source?.turrets?.[i]?.lerpedFacing||0) + turretsObeyRot * rot, turretsObeyRot, context, source.turrets[i], render);
                    }
                }
            } else throw new Error(`Mismatch turret number! Expected: ${m.turrets.length} Reality: ${source.turrets.length}`);
            if (m.props.length) {
                for (let i = 0; i < m.props.length; i++) {
                    let origM = JSON.parse(JSON.stringify(m))
                    let p = m.props[i]; 
                    let pColor = /*mixColors(*/getColor(p.color == -1 ? instance.color : p.color);/*, renderColor, renderBlend);*/
                    if (invulnTicker) pColor = mixColors(pColor, color.vlgrey, .5);
                    setColors(context, pColor);
                    handleAnimation({
                        id: instance.id,
                        context: context,
                        propColor: pColor,
                        propIndex: i,
                        props: m.props
                    });
                    if (p.layer === -1) drawProp(context, p, pColor, rot, xx, yy, drawSize, m, source);
                    m = origM
                }
            }
            if (m.isLoading || source.guns.length === m.guns.length) {
                let positions = source.guns.getPositions();
                for (let i = 0; i < m.guns.length; i++) {
                    let g = m.guns[i],
                        position = positions[i] / (((g.aspect == null ? 1 : g.aspect) === 1) ? 2 : 1),
                        gx = g.offset * Math.cos(g.direction + (g.angle || 0) + rot) + (g.length / 2 - position) * Math.cos((g.angle || 0) + rot),
                        gy = g.offset * Math.sin(g.direction + (g.angle || 0) + rot) + (g.length / 2 - position) * Math.sin((g.angle || 0) + rot),
                        gColor = mixColors(getColor(g.color == null ? 16 : g.color), renderColor, renderBlend);
                    if (invulnTicker) gColor = mixColors(gColor, color.vlgrey, .5);
                    switch (g.color_unmix) {
                        case 1:
                            setColorsUnmix(context, gColor);
                            break;
                        case 2:
                            setColorsUnmixB(context, gColor);
                            break;
                        case 0:
                        case null:
                            setColors(context, gColor);
                            break;
                    }
                    if (shadowRelativeColor) context.shadowColor = context.strokeStyle;
                    handleAnimation({
                        id: instance.id,
                        context: context,
                        gunColor: gColor,
                        gunIndex: i,
                        guns: m.guns
                    });
                    drawGun(context, xx + drawSize * gx, yy + drawSize * gy, drawSize * (g.length / 2 - ((g.aspect == null ? 1 : g.aspect) === 1 ? 0 : 0)), drawSize * g.width / 2,
                        (g.aspect == null ? 1 : g.aspect),
                        (g.angle || 0) + rot, g.skin || 0, drawSize,
                        xx + drawSize * (g.offset * Math.cos(g.direction + (g.angle || 0) + rot) * Math.cos((g.angle || 0) + rot)),
                        yy + drawSize * (g.offset * Math.sin(g.direction + (g.angle || 0) + rot) * Math.sin((g.angle || 0) + rot)),
                        position,
                    );
                }
            } else {
                console.warn(m.guns, source.guns, m, source);
                throw new Error(`Mismatch gun number! Expected: ${m.guns.length} Reality: ${source.guns.length}`);
            };
            if (m.lasers.length) { // eh.
                for (let i = 0; i < m.lasers.length; i++) {
                    let l = m.lasers[i],
                        lx = l.offset * Math.cos(l.direction + (l.angle || 0) + rot) + (l.length / 2) * Math.cos((l.angle || 0) + rot),
                        ly = l.offset * Math.sin(l.direction + (l.angle || 0) + rot) + (l.length / 2) * Math.sin((l.angle || 0) + rot),
                        lColor = mixColors(getColor(l.color == null ? 16 : l.color), renderColor, renderBlend);
                    if (invulnTicker) lColor = mixColors(lColor, color.vlgrey, .5);
                    setColors(context, lColor);
                    if (shadowRelativeColor) context.shadowColor = context.strokeStyle;
                    drawGun(context, xx + drawSize * lx, yy + drawSize * ly, drawSize * (l.length / 2), drawSize * l.width / 2,
                        (l.aspect == null ? 1 : l.aspect),
                        (l.angle || 0) + rot, 0, drawSize);
                }
            }
            if (m.props.length) {
                for (let i = 0; i < m.props.length; i++) {
                    let origM = JSON.parse(JSON.stringify(m))
                    let p = m.props[i];
                    let pColor = mixColors(getColor(p.color == -1 ? instance.color : p.color), renderColor, renderBlend);
                    if (invulnTicker) pColor = mixColors(pColor, color.vlgrey, .5);
                    setColors(context, pColor);
                    handleAnimation({
                        id: instance.id,
                        context: context,
                        propColor: pColor,
                        propIndex: i,
                        props: m.props
                    });
                    if (p.layer === 0) drawProp(context, p, pColor, rot, xx, yy, drawSize, m, source);
                    m = origM
                }
            }
            context.globalAlpha = 1;
            setColors(context, finalColor);
            if (shadowRelativeColor) context.shadowColor = context.strokeStyle;
            drawPoly(context, xx, yy, drawSize / m.size * m.realSize, m.shape, source.widthHeightRatio, ratio, scale, rot);
            if (m.props.length) {
                for (let i = 0; i < m.props.length; i++) {
                    let origM = JSON.parse(JSON.stringify(m))
                    let p = m.props[i];
                    let pColor = mixColors(getColor(p.color == -1 ? instance.color : p.color), renderColor, renderBlend);
                    if (invulnTicker) pColor = mixColors(pColor, color.vlgrey, .5);
                    setColors(context, pColor);
                    handleAnimation({
                        id: instance.id,
                        context: context,
                        propColor: pColor,
                        propIndex: i,
                        props: m.props
                    });
                    if (p.layer === 1) drawProp(context, p, pColor, rot, xx, yy, drawSize, m, source);
                    m = origM
                }
            }
            if (m.isLoading || source.turrets.length === m.turrets.length) {
                for (let i = 0; i < m.turrets.length; i++) {
                    let t = m.turrets[i];
                    if (t.layer === 1) {
                        let ang = t.direction + t.angle + rot,
                            len = t.offset * drawSize;
                        if(source.turrets[i]) source.turrets[i].lerpedFacing = lerpAngle(source.turrets[i].lerpedFacing || source.turrets[i].facing, source.turrets[i].facing, .15);
                        drawEntity(xx + len * Math.cos(ang), yy + len * Math.sin(ang), t, ratio, alpha, drawSize / ratio / t.size * t.sizeFactor, (source?.turrets[i]?.lerpedFacing||0) + turretsObeyRot * rot, turretsObeyRot, context, source.turrets[i], render);
                    }
                }
            } else throw new Error(`Mismatch turret number! Expected: ${m.turrets.length} Reality: ${source.turrets.length}`);
            if (m.props.length) {
                for (let i = 0; i < m.props.length; i++) {
                    let origM = JSON.parse(JSON.stringify(m))
                    let p = m.props[i];
                    let pColor = mixColors(getColor(p.color == -1 ? instance.color : p.color), renderColor, renderBlend);
                    if (invulnTicker) pColor = mixColors(pColor, color.vlgrey, .5);
                    setColors(context, pColor);
                    handleAnimation({
                        id: instance.id,
                        context: context,
                        propColor: pColor,
                        propIndex: i,
                        props: m.props
                    });
                    if (p.layer === 2) drawProp(context, p, pColor, rot, xx, yy, drawSize, m, source);
                    m = origM
                }
            }
            if (assignedContext === 0 && context !== ctx) {
                if (context.canvas.width && context.canvas.height) {
                    ctx.save();
                    ctx.globalAlpha = alpha * fade;
                    ctx.drawImage(context.canvas, x - xx, y - yy);
                    ctx.restore();
                }
            }
        };
    }();

    function drawHealth(x, y, instance, ratio, alpha) {
        let fade = instance.render.status.getFade();
        ctx.globalAlpha = fade * fade;
        let size = instance.render.size * ratio,
            m = _mockups.get(instance.index),
            realSize = size / m.size * m.realSize;
        if (instance.drawsHealth) {
            let health = instance.render.health.get(),
                shield = instance.render.shield.get();
            if (health < .999 || shield < .999) {
                let yy = y + 1.1 * realSize + 22;
                ctx.globalAlpha = alpha * alpha * fade;
                size *= 1.1;
                let mixc = _config.coloredHealthBars ? mixColors(getColor(instance.color), color.guiwhite, .5) : _config.tintedHealth ? mixColors(color.lgreen, color.red, 1 - health) : color.lgreen;
                if (_config.shieldbars) {
                    drawBar(x - size, x + size, yy, 6 + _config.barChunk, color.black);
                    if (shield) {
                        if (health > 0.01) drawBar(x - size, x - size + 2 * size * health, yy + 1.5, 3, mixc);
                        ctx.globalAlpha *= 0.7;
                        if (shield > 0.01) drawBar(x - size, x - size + 2 * size * shield, yy - 1.5, 3, _config.coloredHealthBars ? mixColors(getColor(instance.color), color.guiwhite, .8) : color.teal);
                    } else {
                        if (health > 0.01) drawBar(x - size, x - size + 2 * size * health, yy, 4, mixc);
                    }
                } else {
                    drawBar(x - size, x + size, yy, 3 + _config.barChunk, color.black);
                    if (health > 0.01) drawBar(x - size, x - size + 2 * size * health, yy, 3, mixc);
                    if (shield) {
                        ctx.globalAlpha = (0.3 + shield * .3) * alpha * alpha * fade;
                        if (shield > 0.01) drawBar(x - size, x - size + 2 * size * shield, yy, 3, _config.coloredHealthBars ? mixColors(getColor(instance.color), color.guiwhite, .8) : color.teal);
                        ctx.globalAlpha = 1;
                    }
                }
            }
        }
        if (instance.id !== _gui._playerid || _config.drawOwnName) {
            if (instance.nameplate) {
                let fill = instance.nameColor;
                let nameRatio = (ratio * instance.size) / 20;
                let imageRatio = 1;
                let stroke = undefined;
                let font = undefined;
                let badge = false;
                ctx.globalAlpha = alpha;
                // Fancy Name Colors
                drawText(instance.score > 0 ? _util._handleLargeNumber(instance.score) : "", x, y - realSize - 16 * nameRatio, 8 * nameRatio, "#E4EBE7", "center", false, 1, stroke, ctx, font);
                switch (fill.charAt(0)) {
                    case "!":
                        let data = _util._getSpecialNameInfoById(Number(instance.nameColor.substring(1)));
                        fill = data[0];
                        stroke = data[1];
                        font = data[2];
                        imageRatio = data[3];
                        badge = data[4];
                        break;
                }
                drawText(instance.name, x, y - realSize - 30 * nameRatio, 16 * nameRatio, fill, "center", false, 1, stroke, ctx, font);
                if (badge && _imageCache[badge] && _imageCache[badge].ready) {
                    let size = 18 * nameRatio * imageRatio;
                    ctx.drawImage(_imageCache[badge], x - size * 1.1 - measureText(instance.name, 16 * nameRatio, false, font) / 2, y - realSize - 30 * nameRatio - size * 0.75, size, size);
                }
                ctx.globalAlpha = 1;
            }
        }
        let disappearTime = 5000
        const messages = instance.messages ? JSON.parse(instance.messages).reverse()
            .filter(msg => msg.when > Date.now() - disappearTime)
            : [];
        if (messages.length) {
            let nameRatio = (ratio * instance.size)/20;
            let nameplateOffset = y - 30 * nameRatio-12
            let stroke = undefined;
            let font = undefined;
            ctx.globalAlpha = alpha;
            let offset = 1;
            if (instance.id === _gui._playerid && !_config.drawOwnName) {
                nameplateOffset = 0
            }
            let padding = 5
            let size = 20
            let height = size * nameRatio;
            let vspacing = padding+3
            for (let msg of messages) {
                offset++
                msg.color = getColor(instance.color);
                msg.len = measureText(msg.text, (size * nameRatio) - padding);
                ctx.globalAlpha = 0.5;
                let fill = msg.color === "rainbow"
                    ? _util._HSL2COLOR(`hsl(${(Date.now() % 2520) / 7}, 100%, 50%)`)
                    : msg.color;
                let barY = ((-height-vspacing)*offset + nameplateOffset + vspacing)
                drawBar(x - msg.len / 2, x + msg.len / 2, barY, height, fill);
                ctx.globalAlpha = .15
                drawBar(x - msg.len / 2, x + msg.len / 2, barY, height, "#000000");
                ctx.globalAlpha = 1
                ctx.fillStyle = "#000000";
                drawText(msg.text, x, barY+((height-padding)*0.35), (size * nameRatio)-padding, "#E4EBE7", "center", false, 1, stroke, ctx, font);
                ctx.globalAlpha = 1;
            }
        }
    }
    window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        };
    }();
    window.cancelAnimFrame = function () {
        return window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    }();
    let gameDraw = function () {
        let upgradeBarSpeed = 0.4;
        let statMenu = Smoothbar(0, 0.075),
            upgradeMenu = Smoothbar(0, 0.25),
            statBars = [Smoothbar(0, upgradeBarSpeed), Smoothbar(0, upgradeBarSpeed), Smoothbar(0, upgradeBarSpeed), Smoothbar(0, upgradeBarSpeed), Smoothbar(0, upgradeBarSpeed), Smoothbar(0, upgradeBarSpeed), Smoothbar(0, upgradeBarSpeed), Smoothbar(0, upgradeBarSpeed), Smoothbar(0, upgradeBarSpeed), Smoothbar(0, upgradeBarSpeed), Smoothbar(0, upgradeBarSpeed)]

        function graph() {
            let data = [];
            return function (point, x, y, w, h, col) {
                data.push(point);
                while (data.length > w) data.splice(0, 1);
                let min = Math.min.apply(Math, data),
                    max = Math.max.apply(Math, data),
                    range = max - min;
                if (max > 0 && min < 0) drawBar(x, x + w, y + h * max / range, 2, color.guiwhite);
                ctx.beginPath();
                let i = -1;
                for (let j = 0; j < data.length; j++) {
                    let p = data[j];
                    if (!++i) ctx.moveTo(x, y + h * (max - p) / range);
                    else ctx.lineTo(x + i, y + h * (max - p) / range);
                }
                ctx.lineWidth = 2;
                ctx.strokeStyle = col;
                ctx.stroke();
            };
        }
        let compensation = function () {
            function interpolate(p1, p2, v1, v2, ts, tt) {
                let k = Math.cos((1 + tt) * Math.PI);
                return 0.5 * (((1 + tt) * v1 + p1) * (k + 1) + (-tt * v2 + p2) * (1 - k));
            }

            function extrapolate(p1, p2, v1, v2, ts, tt) {
                return p2 + (p2 - p1) * tt;
            }

            function angleDifference(targetA, sourceA) {
                let mod = function (a, n) {
                    return (a % n + n) % n;
                },
                    a = targetA - sourceA;
                return mod(a + Math.PI, 2 * Math.PI) - Math.PI;
            }
            const prediction = {
                smooth: function () {
                    let strength = metrics._rendergap / (1000 / 30);
                    return {
                        predict: (p1, p2, v1, v2) => lerp(p1 + v1, p2 + v2, .075, 1),
                        predictFacing: (a1, a2) => lerpAngle(a1, a2, .1, 1),
                        predictExtrapolate: (p1, p2, v1, v2) => lerp(p1 + v1, p2 + v2, .075, 1),
                        predictFacingExtrapolate: (a1, a2) => lerpAngle(a1, a2, .12, 1),
                        getPrediction: () => strength
                    }
                }
            }
            return function (time, interval) {
                switch (_config.prediction) {
                    case 0:
                        return prediction.old(time, interval);
                    case 1:
                        return prediction.new(time, interval);
                    case 3:
                    default:
                        return prediction.smooth();
                }
            };
        }();
        let timingGraph = graph(),
            lagGraph = graph(),
            gapGraph = graph(),
            bullshitGraph = graph(),
            ska = function () {
                function make(x) {
                    return Math.log(4 * x + 1) / Math.log(5);
                }
                let a = [];
                for (let i = 0; i < _config.expectedMaxSkillLevel * 2; i++) a.push(make(i / _config.expectedMaxSkillLevel));
                return function (x) {
                    return a[x];
                };
            }(),
            lastRender = null;

        function drawMobileButton(i, x, y, w, h, text) {
            ctx.save();
            ctx.globalAlpha = 1;
            ctx.translate(x, y);
            ctx.fillStyle = getColor(i ? 7 : 11);
            ctx.fillRect(0, 0, w, h);
            ctx.globalAlpha = .1;
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, h / 2, w, h / 2);
            ctx.globalAlpha = .4;
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#000000";
            ctx.strokeRect(0, 0, w, h);
            ctx.globalAlpha = 1;
            drawText(text, w / 2, h / 2, 14, color.guiwhite, "center", true);
            _global.clickables.mobileClicks.place(i, x, y, w, h);
            ctx.restore();
        }
        return function (ratio) {
            let now = Date.now();
            lastRender = now;
            let GRAPHDATA = 0;
            renderTimes++;
            if (_global._waterAnimation + (.01 * _global._waterDirection) > .9 || _global._waterAnimation + (.01 * _global._waterDirection) < .1) {
                _global._waterDirection *= -1;
            }
            _global._waterAnimation += (.004 * _global._waterDirection);
            let px,
                py; {
                let motion = compensation();
                GRAPHDATA = motion.getPrediction();
                _player._renderx = motion.predict(_player._renderx, _player._cx, 0, 0);
                _player._rendery = motion.predict(_player._rendery, _player._cy, 0, 0);
                px = ratio * _player._renderx;
                py = ratio * _player._rendery;
            } {
                ctx.clearRect(0, 0, _global._screenWidth, _global._screenHeight);
                _clearScreen(mixColors(color.white, color.guiblack, 0.15), 1);
                ctx.globalAlpha = 1;
                const TAU = Math.PI * 2;
                if (_global._mapType !== 1) {
                    let W = roomSetup[0].length,
                        H = roomSetup.length,
                        i = 0;
                    ctx.globalAlpha = 1;
                    for (let j = 0; j < roomSetup.length; j++) {
                        let row = roomSetup[j],
                            k = 0;
                        for (let l = 0; l < row.length; l++) {
                            let cell = row[l],
                                left = Math.max(0, ratio * k * _global._gameWidth / W - px + _global._screenWidth / 2),
                                top = Math.max(0, ratio * i * _global._gameHeight / H - py + _global._screenHeight / 2),
                                right = Math.min(_global._screenWidth, ratio * (k + 1) * _global._gameWidth / W - px + _global._screenWidth / 2),
                                bottom = Math.min(_global._screenHeight, ratio * (i + 1) * _global._gameHeight / H - py + _global._screenHeight / 2);
                            k++;
                            if (cell === "edge") continue;
                            ctx.fillStyle = mixColors(color.white, getZoneColor(cell, 1), 0.3, 0);
                            ctx.fillRect(left - 1, top - 1, right - left + 2, bottom - top + 2);
                        }
                        i++;
                    }
                } else if (_global._mapType === 1) {
                    const xx = -px + _global._screenWidth / 2 + ratio * _global._gameWidth / 2;
                    const yy = -py + _global._screenHeight / 2 + ratio * _global._gameHeight / 2;
                    const radius = ratio * _global._gameWidth / 2;
                    ctx.fillStyle = color.white;
                    ctx.globalAlpha = 1;
                    ctx.beginPath();
                    ctx.arc(xx, yy, radius, 0, TAU);
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.lineWidth = 1;
                ctx.strokeStyle = color.guiblack;
                ctx.globalAlpha = 0.05;
                let gridsize = 30 * ratio;//(Math.min(_global._gameWidth, _global._gameHeight) / roomSetup.length / 14 * ratio);
                for (let x = (_global._screenWidth / 2 - px) % gridsize; x < _global._screenWidth; x += gridsize) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, _global._screenHeight | 0);
                    ctx.stroke();
                }
                for (let y = (_global._screenHeight / 2 - py) % gridsize; y < _global._screenHeight; y += gridsize) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(_global._screenWidth, y);
                    ctx.stroke();
                };
                ctx.globalAlpha = 1;

                ctx.fillStyle = color.red;

            } {
                let frameplate = [];
                ctx.translate(_global._screenWidth / 2, _global._screenHeight / 2);
                for (let i = 0; i < entities.length; i++) {
                    let instance = entities[i];
                    if (!instance.render.draws) continue;
                    let motion = compensation();
                    let isMe = instance.id === _gui._playerid;
                    if (_config.localmotion && isMe) {
                        _global._localmotion.rx = lerp(_global._localmotion.rx, _global._localmotion.x * Math.abs(instance.vx) * 1.2, 0.025, true);
                        _global._localmotion.ry = lerp(_global._localmotion.ry, _global._localmotion.y * Math.abs(instance.vy) * 1.2, 0.025, true);

                        instance.render.x = motion.predict(instance.render.x, Math.round(instance.x + instance.vx) + _global._localmotion.rx, 0, 0);
                        instance.render.y = motion.predict(instance.render.y, Math.round(instance.y + instance.vy) + _global._localmotion.ry, 0, 0);
                    } else {
                        instance.render.x = motion.predict(instance.render.x, Math.round(instance.x + instance.vx), 0, 0);
                        instance.render.y = motion.predict(instance.render.y, Math.round(instance.y + instance.vy), 0, 0);
                    }
                    let x = ratio * instance.render.x - px,
                        y = ratio * instance.render.y - py;
                    if (isMe) {
                        _player._x = x;
                        _player.y = y;
                        _player._rendershiftx = _global.controllingSquadron ? 0 : x;
                        _player._rendershifty = _global.controllingSquadron ? 0 : y;
                        // Ok                        // Set facing
                        instance.render.f = (!instance.twiggle && !_global._died && !_global._forceTwiggle) ? Math.atan2(_global._target._y - y, _global._target._x - x) : motion.predictFacing(instance.render.f, instance.facing);
                        // Save information about the player
                        _player._nameColor = instance.nameColor
                        //console.log(mockups[instance.index])
                        _player._name = instance.name == null ? _mockups.get(instance.index).name : instance.name;
                        _player._label = instance.label
                        _player._canSeeInvisible = instance.seeInvisible;
                    } else {
                        instance.render.f = motion.predictFacing(instance.render.f, instance.facing);
                    };

                    ctx.globalAlpha = 1;
                    instance.render.size = _config.lerpSize ? lerp(instance.render.size, instance.size, 0.2) : instance.size;
                    // Empty bars
                    if (instance.render.status.getFade() !== 1) {
                        instance.render.health.set(0);
                        instance.render.shield.set(0);
                    }
                    drawEntity(x, y, instance, ratio, _player._canSeeInvisible ? instance.alpha + .5 : instance.alpha, 1.1, instance.render.f);
                    if ((instance.nameplate || instance.drawsHealth) && !_config.screenshotMode) frameplate.push([x, y, instance, ratio, _player._canSeeInvisible ? instance.alpha + .5 : instance.alpha]);
                    ctx.globalAlpha = 1;
                };
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                for (let i = 0; i < frameplate.length; i++) {
                    drawHealth(...frameplate[i]);
                    ctx.globalAlpha = 1;
                };
                ctx.translate(_global._screenWidth / -2, _global._screenHeight / -2);
            }
            ratio = _util._getScreenRatio();
            let scaleScreenRatio = (by, unset) => {
                _global._screenWidth /= by;
                _global._screenHeight /= by;
                ctx.scale(by, by);
                if (!unset) ratio *= by;
            };
            scaleScreenRatio(ratio, true);
            // Draw GUI
            let t = {
                x: _global._target._x + _global._screenWidth / 2,
                y: _global._target._y + _global._screenHeight / 2
            };
            let alcoveSize = 200 / ratio;
            let spacing = 20;

            if (!_config.screenshotMode) {
                {
                    do {
                        _global.clickables.tree.hide();
                        if (!_global._showTree) break;
                        let doAfter = () => {
                            let spacing = 10;
                            let x = 20;
                            let y = 60;
                            let length = 180;
                            let height = 50;
                            let colorIndex = _global._tankMenuColor;

                            _global.clickables.tree.place(0, x, y, length, height);
                            ctx.globalAlpha = .5;
                            ctx.fillStyle = getColor(colorIndex > 185 ? colorIndex - 85 : colorIndex);
                            _config.roundUpgrades ? drawGuiRoundRect(x, y, length, height, 10) : drawGuiRect(x, y, length, height);
                            ctx.globalAlpha = .175;
                            ctx.fillStyle = getColor(-10 + (colorIndex++ - (colorIndex > 185 ? 85 : 0)));
                            _config.roundUpgrades ? drawGuiRoundRect(x, y, length, .6 * height, 4) : drawGuiRect(x, y, length, .6 * height);
                            ctx.fillStyle = color.black;
                            _config.roundUpgrades ? drawGuiRoundRect(x, y + .6 * height, length, .4 * height, 4) : drawGuiRect(x, y + .6 * height, length, .4 * height);
                            ctx.strokeStyle = color.black;
                            ctx.globalAlpha = 1;
                            ctx.lineWidth = 3;
                            drawGuiRect(x, y, length, height, true);
                            if (!_global._died && !_global._disconnected) {
                                if (_global.guiMouse.x > x && _global.guiMouse.x < x + length && _global.guiMouse.y > y && _global.guiMouse.y < y + height) {
                                    ctx.globalAlpha = .2;
                                    _config.roundUpgrades ? drawGuiRoundRect(x, y, length, height, 10) : drawGuiRect(x, y, length, height);
                                }
                            };
                            ctx.globalAlpha = 1;
                            drawText("Random Tank", x + length * 0.5, y + height * 0.5, height * 0.45, color.guiwhite, 'center', true);
                        };
                        if (_global._died) {
                            _global._showTree = false;
                            _global._scrollX = 0;
                        };
                        let validint = v => Math.max(0, Math.min(_global._screenWidth, v));
                        // This is a seperate bar because bounds and movement need to be the same
                        let lerpspeed = 0.15;
                        _global._realScrollX = lerp(_global._realScrollX, Math.max(0, Math.min(1, _global._scrollX)), lerpspeed);
                        // Bounds
                        if (_global._scrollX < 0) _global._scrollX = 0;
                        if (_global._scrollX > 1) _global._scrollX = 1;
                        _global.doParseTree(_mockups, _global);
                        ctx.globalAlpha = 1;
                        let [tiles, branches, full] = _global.parsedTreeData;
                        let tileDiv = 0.8,
                            tileSize = alcoveSize / 5 / tileDiv,
                            size = tileSize - 4;
                        ctx.globalAlpha = 1;
                        for (let [start, end] of branches) {
                            let sx = _global._screenWidth / 2 + (start.x - full.width * _global._realScrollX) * tileSize + 1 + .5 * size,
                                ex = _global._screenWidth / 2 + (end.x - full.width * _global._realScrollX) * tileSize + 1 + .5 * size;
                            if ((sx > 0 && ex < _global._screenWidth) || (sx < _global._screenWidth && ex > _global._screenWidth) || (sx < 0 && ex < _global._screenWidth && ex > 0)) {
                                let sy = _global._screenHeight / 2 + (start.y - full.height / 2) * tileSize + 1 + .5 * size,
                                    ey = _global._screenHeight / 2 + (end.y - full.height / 2) * tileSize + 1 + .5 * size;
                                ctx.strokeStyle = color.black;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.lineTo(validint(sx), sy + 60);
                                ctx.lineTo(validint(ex), ey + 60);
                                ctx.closePath();
                                ctx.stroke();
                            };
                        }
                        for (let {
                            x,
                            y,
                            colorIndex,
                            index
                        }
                            of tiles) {
                            let ax = _global._screenWidth / 2 + (x - full.width * _global._realScrollX) * tileSize,
                                ay = _global._screenHeight / 2 + (y - full.height / 2) * tileSize + 60,
                                realSize = tileSize;
                            if (ax + realSize > 0 && ax - realSize < _global._screenWidth) {
                                ctx.globalAlpha = .75;
                                ctx.fillStyle = getColor(colorIndex > 185 ? colorIndex - 85 : colorIndex);
                                drawGuiRect(ax, ay, realSize, realSize);
                                ctx.globalAlpha = .15;
                                ctx.fillStyle = getColor(-10 + (colorIndex++ - (colorIndex > 185 ? 85 : 0)));
                                drawGuiRect(ax, ay, realSize, realSize * .6);
                                ctx.fillStyle = color.black;
                                drawGuiRect(ax, ay + realSize * .6, realSize, realSize * .4);
                                ctx.globalAlpha = 1;
                                let angle = -Math.PI / 4,
                                    picture = getEntityImageFromMockup(index, _gui._color),
                                    position = _mockups.get(index).position,
                                    scale = .8 * realSize / position.axis,
                                    xx = ax + .5 * realSize - scale * position.middle.x * Math.cos(angle),
                                    yy = ay + .5 * realSize - scale * position.middle.x * Math.sin(angle);
                                drawEntity(xx, yy, picture, .5, 1, scale / picture.size * 2, angle, true);
                                ctx.strokeStyle = color.black;
                                ctx.globalAlpha = 1;
                                ctx.lineWidth = 2;
                                drawGuiRect(ax, ay, realSize, realSize, true);
                                if (t.x > ax && t.y > ay && t.x < ax + realSize && t.y < ay + realSize) doAfter = (function () {
                                    ctx.globalAlpha = 0.2;
                                    ctx.fillStyle = color.black;
                                    ctx.strokStyle = color.black;
                                    ctx.globaAlpha = 0.75
                                    ctx.lineWidth = 5;
                                    drawGuiRect(ax, ay, realSize, realSize);
                                    ctx.fillRect(t.x - 100, t.y - 20, 200, -180);
                                    drawGuiRect(t.x - 100, t.y - 20, 200, -180, true);
                                    ctx.globalAlpha = 1;
                                    let angle = -Math.PI / 4,
                                        picture = getEntityImageFromMockup(index, _gui._color),
                                        position = _mockups.get(index).position,
                                        scale = .9 * realSize / position.axis,
                                        xx = t.x - scale * position.middle.x * Math.cos(angle),
                                        yy = t.y - 110 - scale * position.middle.x * Math.sin(angle);
                                    drawEntity(xx, yy, picture, 1.2, 1, scale / picture.size * 2, angle, true);
                                    if (_global.lastPictureName !== picture.name && _global.mousedown) {
                                        _global.mousedown = false;
                                        _global.lastPictureName = picture.name;
                                        let size = 250;
                                        ctx2.save();
                                        let og = {
                                            w: c2.width,
                                            h: c2.height
                                        };
                                        c2.width = size;
                                        c2.height = size;
                                        scale = .225 * size / position.axis,
                                            xx = size / 2 - scale * position.middle.x * Math.cos(angle),
                                            yy = size / 2 - scale * position.middle.x * Math.sin(angle);
                                        drawEntity(xx, yy, picture, 1.5, 1, scale / picture.size * 2, angle, true, ctx2);
                                        try {
                                            c2.toBlob(function (blob) {
                                                const item = new ClipboardItem({ "image/png": blob });
                                                _messages.push({
                                                    text: "Image saved to your clipboard",
                                                    status: 2,
                                                    alpha: 0,
                                                    time: Date.now(),
                                                    color: color.black
                                                });
                                                navigator.clipboard.write([item]);
                                            })
                                        } catch (error) {
                                            if (`${error}`.includes("Document is not focused")) {
                                                _messages.push({
                                                    text: "Error saving image, please stay focused on the tab and keep the GUI open!",
                                                    status: 2,
                                                    alpha: 0,
                                                    time: Date.now(),
                                                    color: color.black
                                                });
                                            } else {
                                                console.error(error);
                                                _messages.push({
                                                    text: "Failed to save image for an unkown reason.",
                                                    status: 2,
                                                    alpha: 0,
                                                    time: Date.now(),
                                                    color: color.black
                                                });
                                            }
                                        };
                                        c2.width = og.w;
                                        c2.height = og.h;
                                        ctx2.restore();
                                    };
                                    drawText(picture.name, t.x, t.y - 35, 23, color.guiwhite, 'center', true);
                                });
                            };
                        }
                        doAfter()
                    } while (false);
                }
                if (_global.mobile) scaleScreenRatio(ratio, true);
                _gui._skill.update();
                if (_global.mobile) scaleScreenRatio(1.4);

                if (!_global._showTree) {
                    if (_global.mobile) scaleScreenRatio(1 / 1.4); {
                        if (!_global.mobile) {
                            _global.canSkill = !!_gui._points && _gui._skills.some(skill => skill.amount < skill.cap);
                            let active = (_global.canSkill || _global._died || _global.statHover)
                            statMenu.set(0 + active);
                            _global.clickables.stat.hide();
                            let spacing = 4,
                                height = 15,
                                gap = 35,
                                len = alcoveSize,
                                savedLen = len,
                                save = _config.fancyAnimations ? len * statMenu.get() : len,
                                ticker = 11,
                                namedata = _gui._getStatNames(_mockups.get(_gui._type).statnames || -1);
                                let y = _global._screenHeight - 20 - height
                                let x = -20 - 2 * len + (_config.fancyAnimations ? statMenu.get() : active) * (2 * 20 + 2 * len)
                            _gui._skills.forEach(function drawSkillBar(skill) {
                                ticker--;
                                let name = namedata[ticker - 1],
                                    level = skill.amount,
                                    col = color[skill.color],
                                    cap = skill.softcap,
                                    maxLevel = skill.cap;
                                    statBars[ticker - 1].set(ska(level))
                                if (cap) {
                                    len = save;
                                    let _max = _config.expectedMaxSkillLevel,
                                        extension = cap > _max,
                                        blocking = cap < maxLevel;
                                    if (extension) _max = cap;
                                    drawBar(x + height / 2, x - height / 2 + len * ska(cap), y + height / 2, height - 3 + _config.barChunk, color.black);
                                    drawBar(x + height / 2, x + height / 2 + (len - gap) * ska(cap), y + height / 2, height - 3, color.grey);
                                    drawBar(x + height / 2, x + height / 2 + ((len - gap) * statBars[ticker - 1].get()), y + height / 2, height - 3.5, col);
                                    if (blocking) {
                                        ctx.lineWidth = 1;
                                        ctx.strokeStyle = color.grey;
                                        for (let i = cap + 1; i < _max; i++) drawGuiLine(x + (len - gap) * ska(i), y + 1.5, x + (len - gap) * ska(i), y - 3 + height);
                                    }
                                    ctx.strokeStyle = color.black;
                                    ctx.lineWidth = 1;
                                    for (let i = 1; i < level + 1; i++) drawGuiLine(x + (len - gap) * ska(i), y + 1.5, x + (len - gap) * ska(i), y - 3 + height);
                                    len = save * ska(_max);
                                    let textcolor = level == maxLevel ? col : !_gui._points || cap !== maxLevel && level == cap ? color.grey : color.guiwhite;
                                    drawText(name, Math.round(x + len / 2) + .5, y + height / 2, height - 5, textcolor, "center", 1);
                                    drawText("[" + ticker % 10 + "]", Math.round(x + len - height * .25) - 1.5, y + height / 2, height - 5, textcolor, "right", 1);
                                    if (textcolor === color.guiwhite) _global.clickables.stat.place(ticker - 1, x, y, len, height);
                                    if (level) drawText(textcolor === col ? "MAX" : "+" + level, Math.round(x + len + 4) + .5, y + height / 2, height - 5, col, "left", 1);
                                    y -= height + spacing;
                                }
                            });
                            _global.clickables.hover.place(0, 0, y, .8 * savedLen, .8 * (_global._screenHeight - y));
                            if (_gui._points !== 0) drawText("x" + _gui._points, Math.round(x + len - 2) + .5, Math.round(y + height - 4) + .5, 20, color.guiwhite, "right");
                        }
                    } {
                        let spacing = 4,
                            len = 1.65 * alcoveSize,
                            height = 25,
                            x = (_global._screenWidth - len) / 2,
                            y = _global._screenHeight - 20 - height,
                            max = _gui._leaderboard._display.length ? _gui._leaderboard._display[0].score : false,
                            level = _gui._skill.getLevel();
                        ctx.lineWidth = 1;
                        drawBar(x, x + len, y + height / 2, height - 3 + _config.barChunk, color.black);
                        drawBar(x, x + len, y + height / 2, height - 3, color.grey);
                        drawBar(x, x + len * (level > 59 ? 1 : _gui._skill.getProgress()), y + height / 2, height - 3.5, color.gold);
                        drawText("Level " + level + " " + _player._label, x + len / 2, y + height / 2, height - 4, color.guiwhite, "center", 1);
                        height = 14;
                        y -= height + spacing;
                        drawBar(x + len * .1, x + len * .9, y + height / 2, height - 3 + _config.barChunk, color.black);
                        drawBar(x + len * .1, x + len * .9, y + height / 2, height - 3, color.grey);
                        drawBar(x + len * .1, x + len * (0.1 + .8 * (max ? Math.min(1, _gui._skill.getScore() / max) : 1)), y + height / 2, height - 3.5, color.green);
                        drawText("Score: " + _util._formatLargeNumber(Math.round(_gui._skill.getScore())), x + len / 2, y + height / 2, height - 2, color.guiwhite, "center", 1);
                        ctx.lineWidth = 4;
                        if (_player._nameColor) {
                            if (_player._nameColor.charAt("0") !== "!") {
                                let nameColor = _player._nameColor || "#FFFFFF";
                                if (nameColor.startsWith("$")) {
                                    const size = 32 * (_player._name.length / 2);
                                    const fill = ctx.createLinearGradient((Math.round(x + len / 2) + 0.5) - size / 2, 0, (Math.round(x + len / 2) + 0.5) + size / 2, 0);
                                    for (let i = 0; i < _global._nameGradient.length; i++) {
                                        fill.addColorStop(i / (_global._nameGradient.length - 1) * 1, _global._nameGradient[i]);
                                    }
                                    nameColor = fill;
                                }
                                drawText(_player._name, Math.round(x + len / 2) + .5, Math.round(y - 10 - spacing) + .5, 32, nameColor, "center");
                            } else {
                                let [fill, stroke, font, size] = _util._getSpecialNameInfoById(Number(_player._nameColor.substring(1)));
                                drawText(_player._name, Math.round(x + len / 2) + .5, Math.round(y - 10 - spacing) + .5, 32, fill, "center", false, 1, stroke, ctx, font);
                            }
                        }
                        if (_global.displayTextUI.enabled) {
                            drawText(_global.displayTextUI.text, Math.round(x + len / 2) + .5, Math.round(y - 55 - spacing), 16, _global.displayTextUI.color, "center", true);
                        }
                    }
                    if (_global.mobile) scaleScreenRatio(0.8); {
                        let len = alcoveSize,
                            height = len / _global._gameWidth * _global._gameHeight,
                            rawRatio = [_global._gameWidth > _global._gameHeight, _global._gameWidth / _global._gameHeight, _global._gameHeight / _global._gameWidth];
                        if (_global._gameWidth > _global._gameHeight || _global._gameHeight > _global._gameWidth) {
                            let ratio = [_global._gameWidth / _global._gameHeight, _global._gameHeight / _global._gameWidth];
                            len /= ratio[1] * 1.5;
                            height /= ratio[1] * 1.5;
                            if (len > alcoveSize * 2) {
                                ratio = len / (alcoveSize * 2);
                            } else if (height > alcoveSize * 2) {
                                ratio = height / (alcoveSize * 2);
                            } else {
                                ratio = 1;
                            }
                            len /= ratio;
                            height /= ratio;
                        }
                        let x = _global.mobile ? spacing : _global._screenWidth - len - 20,
                            y = _global.mobile ? spacing : _global._screenHeight - height - 20,
                            y2 = 66,
                            w = roomSetup[0].length,
                            h = roomSetup.length,
                            i = 0;
                        ctx.globalAlpha = .6;
                        if (_global._mapType !== 1) {
                            for (let j = 0; j < roomSetup.length; j++) {
                                let row = roomSetup[j],
                                    k = 0;
                                for (let m = 0; m < row.length; m++) {
                                    ctx.fillStyle = getZoneColor(row[m], 0, Math.min(1, (Math.abs(roomSetup.length / 2 - j) / (roomSetup.length / 2)) * .5 + (Math.abs(row.length / 2 - m) / (row.length / 2)) * .5));
                                    drawGuiRect(x + k++ * len / w, y + i * height / h, len / w, height / h);
                                }
                                i++;
                            }
                        }
                        ctx.fillStyle = mixColors(color.grey, "#000000", 0.1);
                        let box = [x, y, len, height];
                        _global._mapType === 1 ? drawGuiCircle(box[0] + box[2] / 2, box[1] + box[2] / 2, box[2] / 2, 0) : drawGuiRect(...box);
                        _gui._minimap._display = _gui._minimap._display.filter(entry => _gui._minimap._server.findIndex(real => real.id === entry.id) > -1);
                        for (let real of _gui._minimap._server) {
                            let index = _gui._minimap._display.findIndex(old => real.id === old.id);
                            if (index === -1) {
                                _gui._minimap._display.push(real);
                            } else {
                                // Update it
                                let old = _gui._minimap._display[index];
                                old.type = real.type;
                                old.x = lerp(old.x, real.x, .1, false);
                                old.y = lerp(old.y, real.y, .1, false);
                                old.color = real.color;
                                old.size = real.size;
                                old.width = real.width;
                                old.height = real.height;
                                _gui._minimap._display[index] = old;
                            }
                        }
                        for (let entity of _gui._minimap._display) {
                            ctx.fillStyle = mixColors(getColor(entity.color), color.black, 0.3);
                            ctx.globalAlpha = 1; //entity.alpha;
                            switch (entity.type) {
                                case 3: {
                                    const size = 3;
                                    drawGuiRect(x + ((entity.x - size) / _global._gameWidth) * len, y + ((entity.y - size) / _global._gameHeight) * height, size, size);
                                }
                                    break;
                                case 2: {
                                    const width = entity.size * (entity.width || 1);
                                    const hgt = entity.size * (entity.height || 1);
                                    drawGuiRect(x + ((entity.x - width) / _global._gameWidth) * len - 0.4, y + ((entity.y - hgt) / _global._gameHeight) * height - 1, ((2 * width) / _global._gameWidth) * len + 0.2, ((2 * hgt) / _global._gameWidth) * len + 0.2);
                                }
                                    break;
                                case 1: {
                                    drawGuiCircle(x + (entity.x / _global._gameWidth) * len, y + (entity.y / _global._gameHeight) * height, (entity.size / _global._gameWidth) * len + 0.2);
                                }
                                    break;
                                case 0: {
                                    if (entity.id !== _gui._playerid) drawGuiCircle(x + (entity.x / _global._gameWidth) * len, y + (entity.y / _global._gameHeight) * height, 2);
                                }
                                    break;
                            }
                        }
                        ctx.globalAlpha = 1;
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = color.black;
                        ctx.fillStyle = color.guiblack;
                        if (!_global._died) {
                            if (_config.prediction === 2 || true) {
                                let xAdder = (_player._cx * (rawRatio[0] ? 1 : rawRatio[2])) / _global._gameWidth * len - 1
                                let yAdder = (_player._cy * (rawRatio[0] ? rawRatio[1] : 1)) / _global._gameWidth * height - 1
                                if (xAdder > 0 && yAdder > 0 && xAdder < 200 && yAdder < 200) {
                                    drawGuiCircle(x + xAdder, y + yAdder, 2);
                                }
                            } else {
                                drawGuiCircle(x + _player._x / _global._gameWidth * len - 1, y + _player.y / _global._gameWidth * height - 1, 2);
                            }
                        }
                        if (_global.mobile) {
                            x = _global._screenWidth - len - spacing;
                            y = _global._screenHeight - spacing;
                        }
                        y -= 8;
                        drawText("ExoGlitch.io", x + len, y, 18, "#00AEFF", "right");
                        y -= 18;
                        if (_global._debug > 1) {
                            drawText("ClientFPS: " + metrics._rendertime, x + len, y, 14, metrics._rendertime > 15 ? color.guiwhite : color.orange, "right");
                            y -= 16;
                            drawText("Latency: " + metrics._latency + "ms", x + len, y, 14, metrics._latency < 1100 ? color.guiwhite : color.orange, "right");
                            y -= 16;
                            if (_global._debug > 2) {
                                drawText((_global._died ? "Server Speed (Standby): " : "Server Speed: ") + _gui._fps.toFixed(1) + "mspt", x + len, y, 14, _gui._fps < 30 ? color.guiwhite : color.orange, "right");
                                y -= 16;
                                drawText(`Bandwidth: ${_global._bandwidth._in} in, ${_global._bandwidth._out} out`, x + len, y, 14, color.guiwhite, "right");
                                y -= 16;
                                drawText("Update Rate: " + metrics._updatetime + "Hz", x + len, y, 14, color.guiwhite, "right");
                                if (_global._debug > 3) {
                                    y -= 16
                                    drawText(`Server MEM usage: ${metrics._serverMemUsage.toFixed(2)}%`, x + len, y, 14, metrics._serverMemUsage > 90 ? color.red : metrics._serverMemUsage > 70 ? color.orange : color.guiwhite, "right")
                                    y -= 16
                                    drawText(`Server CPU usage: ${metrics._serverCpuUsage.toFixed(2)}%`, x + len, y, 14, metrics._serverCpuUsage > 80 ? color.red : metrics._serverCpuUsage > 65 ? color.orange : color.guiwhite, "right")
                                    y -= 16
                                    drawText(`${_mockups._fetchedMockups}/${_mockups._totalMockups} (${((_mockups._fetchedMockups/_mockups._totalMockups)*100).toFixed(2)}%) Mockups`, x + len, y, 14, color.guiwhite, "right")
                                    if (_global._debug > 4) {
                                        ctx.fillStyle = color.guiblack
                                        drawGuiRect(...box);
                                        ctx.globalAlpha = 0.4;
                                        lagGraph(lag.get(), ...box, color.blue);
                                        gapGraph(metrics._rendergap, ...box, color.green);
                                        timingGraph(GRAPHDATA, ...box, color.red);
                                        bullshitGraph(Math.random(), ...box, "#FFFFA0");
                                        ctx.globalAlpha = 1;
                                        drawText("REN", box[0] + 6, box[1] + 18, 14, color.green, "left");
                                        drawText("LAG", box[0] + 6, box[1] + 40, 14, color.blue, "left");
                                        drawText("STR", box[0] + 6, box[1] + 62, 14, color.red, "left");
                                        drawText("BSH", box[0] + 6, box[1] + 84, 14, "#FFFFA0", "left");
                                    }
                                }
                            }
                        }
                        ctx.lineWidth = 4;
                        ctx.strokeStyle = color.black;
                        //drawGuiRect(...box, 1);
                        switch (_global._mapType) {
                            case 1:
                                drawGuiCircle(box[0] + box[2] / 2, box[1] + box[2] / 2, box[2] / 2, 1)
                                break;
                            case 3:
                                drawGUIPolygon(box[0] + box[2] / 2, box[1] + box[2] / 2, box[2] / 2, 3, 1);
                                break;
                            default:
                                drawGuiRect(...box, 1);
                        }
                    }
                    if (_global.mobile) {
                        scaleScreenRatio(1 / 0.8);
                        scaleScreenRatio(1.4);
                    } { // Draw leaderboard
                        if (!_global._showTree) {
                            let vspacing = 4;
                            let len = 200;
                            let height = 14;
                            let x = _global._screenWidth - len - spacing;
                            let y = spacing + height + 7;
                            drawText("Leaderboard", Math.round(x + len / 2) + 0.5, Math.round(y - 6) + 0.5, height + 4, color.guiwhite, 'center');
                            _gui._leaderboard._display = _gui._leaderboard._display.filter(entry => _gui._leaderboard._server.findIndex(real => real.id === entry.id) > -1);
                            for (let real of _gui._leaderboard._server) {
                                let index = _gui._leaderboard._display.findIndex(old => real.id === old.id);
                                if (index === -1) {
                                    _gui._leaderboard._display.push(_gui._leaderboard._publish({
                                        score: 0
                                    }, real));
                                } else {
                                    // Update it
                                    _gui._leaderboard._display[index] = _gui._leaderboard._publish(_gui._leaderboard._display[index], real);
                                }
                            }
                            _gui._leaderboard._display = _gui._leaderboard._display.sort((a, b) => b.score - a.score);
                            for (let i = 0; i < _gui._leaderboard._display.length && (!_global.mobile || i < 6); i++) {
                                let entry = _gui._leaderboard._display[i];
                                drawBar(x, x + len, y + height / 2, height - 3 + _config.barChunk, color.black);
                                drawBar(x, x + len, y + height / 2, height - 3, color.grey);
                                let shift = Math.min(1, entry.score / _gui._leaderboard._display[0].score);
                                drawBar(x, x + len * shift, y + height / 2, height - 3.5, entry.barColor);
                                // Leadboard name + score
                                let nameColor = entry.nameColor;
                                if (nameColor.charAt(0) !== "!") {
                                    if (nameColor.startsWith("$")) {
                                        const size = (height - 5) * (entry.label.length / 2);
                                        const fill = ctx.createLinearGradient((x + len / 2) - size / 2, 0, (x + len / 2) + size / 2, 0);
                                        for (let i = 0; i < _global._nameGradient.length; i++) {
                                            fill.addColorStop(i / (_global._nameGradient.length - 1) * 1, _global._nameGradient[i]);
                                        }
                                        nameColor = fill;
                                    }
                                    drawText(entry.label + (': ' + _util._handleLargeNumber(Math.round(entry.score))), x + len / 2, y + height / 2, height - 5, nameColor, 'center', true);
                                } else {
                                    let [fill, stroke, font, size] = _util._getSpecialNameInfoById(Number(nameColor.substring(1)));
                                    stroke = 0;
                                    drawText(entry.label + (': ' + _util._handleLargeNumber(Math.round(entry.score))), x + len / 2, y + height / 2, height - 5, fill, 'center', true, 1, stroke, ctx, font);
                                }
                                // Mini-image
                                let scale = height / entry.position.axis,
                                    xx = x - 1.5 * height - scale * entry.position.middle.x * 0.707,
                                    yy = y + 0.5 * height + scale * entry.position.middle.x * 0.707;
                                drawEntity(xx, yy, entry.image, 1 / scale, 1, scale * scale / entry.image.size, -Math.PI / 4, true);
                                // Move down
                                y += vspacing + height;
                            }
                        }
                    }
                    {
                        if (!_config.disableMessages) {
                            let vspacing = 4,
                                height = 18,
                                x = _global._screenWidth / 2,
                                y = 20,
                                fill;
                            if (_global.mobile) y += (_global.canSkill ? ((alcoveSize / 3 + spacing) / 1.4) * statMenu.get() : 0) + (_global.canUpgrade ? ((alcoveSize / 2 + spacing) / 1.4) * upgradeMenu.get() : 0);
                            for (let i = _messages.length - 1; i >= 0; i--) {
                                let msg = _messages[i],
                                    txt = msg.text,
                                    text = txt;
                                //if (msg.len == null || msg.font !== config.fontFamily) {
                                msg.len = measureText(text, height - 4);
                                //msg.font = config.fontFamily;
                                //};
                                ctx.globalAlpha = _config.fancyAnimations ? .5 * msg.alpha : 0.5;
                                fill = msg.color === "rainbow" ? _util._HSL2COLOR(`hsl(${(Date.now() % 2520) / 7}, 100%, 50%)`) : msg.color;
                                drawBar(x - msg.len / 2, x + msg.len / 2, y + height / 2, height, fill);
                                ctx.globalAlpha = _config.fancyAnimations ? Math.min(1, msg.alpha) : 1;
                                drawText(text, x, y + height / 2, height - 4, color.guiwhite, "center", 1);
                                y += vspacing + height;
                                if (_config.fancyAnimations && msg.status > 1) y -= (vspacing + height) * (1 - Math.sqrt(msg.alpha));
                                if (msg.status > 1) {
                                    msg.status -= .05;
                                    msg.alpha += .05;
                                } else if (i === 0 && (_messages.length > 6 || Date.now() - msg.time > 1e4)) {
                                    let mult = _messages.length > 15 ? 5 : 1;
                                    msg.status -= .05 * mult;
                                    msg.alpha -= .05 * mult;
                                    if (msg.alpha <= 0 || _messages.length > 40) {
                                        _messages.splice(0, 1);
                                    }
                                }
                            }
                        }
                    }
                    if (_global.mobile) scaleScreenRatio(1 / 1.4); {
                        upgradeMenu.set(0 + (_global.canUpgrade || _global.upgradeHover));
                        let glide = _config.fancyAnimations?upgradeMenu.get():1;
                        _global.clickables.upgrade.hide();
                        if (_gui._upgrades.length > 0) {
                            _global.canUpgrade = 1;
                            let spacing = 10,
                                x = 2 * 20 - 20,
                                colorIndex = _global._tankMenuColor,
                                i = 0,
                                y = 20,
                                x2 = x,
                                x3 = 0,
                                y2 = y,
                                ticker = 0,
                                len = 100 * (_global._screenWidth / innerWidth), //100
                                height = len;
                            upgradeSpin += .01;
                            for (let model of _gui._upgrades) {
                                if (y > y2) y2 = y - 60;
                                x3 = x * 2 + 105;
                                x *= glide
                                y *= glide
                                _global.clickables.upgrade.place(i++, y, x, len, height);
                                ctx.globalAlpha = .5;
                                ctx.fillStyle = getColor(colorIndex > 185 ? colorIndex - 85 : colorIndex);
                                _config.roundUpgrades ? drawGuiRoundRect(y, x, len, height, 10) : drawGuiRect(y, x, len, height);
                                ctx.globalAlpha = .175;
                                ctx.fillStyle = getColor(-10 + (colorIndex++ - (colorIndex > 185 ? 85 : 0)));
                                _config.roundUpgrades ? drawGuiRoundRect(y, x, len, .6 * height, 4) : drawGuiRect(y, x, len, .6 * height);
                                ctx.fillStyle = color.black;
                                _config.roundUpgrades ? drawGuiRoundRect(y, x + .6 * height, len, .4 * height, 4) : drawGuiRect(y, x + .6 * height, len, .4 * height);
                                if (!_global._died && !_global._disconnected) {
                                    let tx = Math.pow((_global.guiMouse.x) - (y + height / 2), 2),
                                        ty = Math.pow((_global.guiMouse.y) - (x + len / 2), 2);
                                    if (Math.sqrt(tx + ty) < height * .55) {
                                        _config.roundUpgrades ? drawGuiRoundRect(y, x, len, height, 10) : drawGuiRect(y, x, len, height);
                                        ctx.globalAlpha = .5;
                                    }
                                }
                                ctx.globalAlpha = 1;
                                let picture = getEntityImageFromMockup(model, _gui._color),
                                    position = _mockups.get(model).position,
                                    scale = .6 * len / position.axis,
                                    xx = y + .5 * height - scale * position.middle.x * Math.cos(upgradeSpin),
                                    yy = x + .5 * len - scale * position.middle.x * Math.sin(upgradeSpin);
                                drawEntity(xx, yy, picture, 1, 1, scale / picture.size, upgradeSpin, 1);
                                drawText(picture.name, y + len / 2, x + height - 6, height / 8 - 3, color.guiwhite, "center");
                                ctx.strokeStyle = color.black;
                                ctx.globalAlpha = 1;
                                ctx.lineWidth = 3;
                                _config.roundUpgrades ? drawGuiRoundRect(y, x, len, height, 10, false, true) : drawGuiRect(y, x, len, height, true);
                                if (++ticker % (_config.useFourRows ? 4 : 3) === 0) {
                                    x = x2;
                                    y += height + spacing;
                                } else {
                                    x += (len + spacing);
                                }
                            }
                            let h = 14,
                                txt = "Ignore",
                                m = measureText(txt, h - 3) + 10,
                                xx = y2 + height + spacing,
                                yy = (x3 + len + spacing + x2 - 15) / 2;
                            drawBar(xx - m / 2, xx + m / 2, yy + h / 2, h + _config.barChunk, color.black);
                            drawBar(xx - m / 2, xx + m / 2, yy + h / 2, h, color.white);
                            drawText(txt, xx, yy + h / 2, h - 2, color.guiwhite, "center", 1);
                            _global.clickables.skipUpgrades.place(0, xx - m / 2, yy, m, h);
                        } else {
                            _global.canUpgrade = 0;
                            _global.clickables.upgrade.hide();
                            _global.clickables.skipUpgrades.hide();
                        }
                    } {
                        if (_global.mobile) {
                            // Draw skill bars
                            _global.canSkill = _gui._points > 0 && _gui._skills.some(skill => skill.amount < skill.cap) && !_global.canUpgrade;
                            statMenu.set(0 + (_global.canSkill || _global._died));
                            let glide = statMenu.get() * (_config.fancyAnimations ? 1 : 0);
                            _global.clickables.stat.hide();
                            let internalSpacing = 14;
                            let width = alcoveSize / 2.5;
                            let height = alcoveSize / 2.5;
                            let x = 2 * spacing - spacing;
                            let y = spacing;
                            let index = 0;
                            let namedata = _gui._getStatNames(_mockups.get(_gui._type).statnames || -1);
                            if (_global.canSkill) {
                                _gui._skills.forEach((skill, ticker) => {
                                    let skillCap = skill.softcap;
                                    if (skillCap <= 0) return;
                                    let skillAmount = skill.amount;
                                    let skillColor = color[skill.color];
                                    let skillMax = skill.cap;
                                    let skillNameParts = namedata[9 - ticker].split(/\s+/);
                                    let skillNameCut = Math.floor(skillNameParts.length / 2);
                                    let [skillNameTop, skillNameBottom] = skillNameParts.length === 1 ? [skillNameParts, null] : [
                                        skillNameParts.slice(0, skillNameCut),
                                        skillNameParts.slice(skillNameCut)
                                    ];
                                    // Draw box
                                    ctx.globalAlpha = 0.9;
                                    ctx.fillStyle = skillColor;
                                    drawGuiRect(x, y, width, (height * 2) / 3);
                                    ctx.globalAlpha = 0.1;
                                    ctx.fillStyle = color.black;
                                    drawGuiRect(x, y + (((height * 2) / 3) * 2) / 3, width, (((height * 2) / 3) * 1) / 3);
                                    ctx.globalAlpha = 1;
                                    ctx.fillStyle = color.guiwhite;
                                    drawGuiRect(x, y + (height * 2) / 3, width, (height * 1) / 3);
                                    ctx.fillStyle = skillColor;
                                    drawGuiRect(x, y + (height * 2) / 3, (width * skillAmount) / skillCap, (height * 1) / 3);
                                    // Dividers
                                    ctx.strokeStyle = color.black;
                                    ctx.lineWidth = 1;
                                    for (let j = 1; j < skillMax; j++) {
                                        let xPos = x + width * (j / skillCap);
                                        drawGuiLine(xPos, y + (height * 2) / 3, xPos, y + height);
                                    }
                                    // Upgrade name
                                    if (skillAmount !== skillMax && _gui._points && (skillCap === skillMax || skillAmount !== skillCap)) {
                                        _global.clickables.stat.place(9 - ticker, x * ratio, y * ratio, width * ratio, height * ratio);
                                    }
                                    if (skillNameBottom) {
                                        drawText(skillNameBottom, x + width / 2, y + height * 0.55, height / 6, color.guiwhite, "center");
                                        drawText(skillNameTop, x + width / 2, y + height * 0.3, height / 6, color.guiwhite, "center");
                                    } else {
                                        drawText(skillNameTop, x + width / 2, y + height * 0.425, height / 6, color.guiwhite, "center");
                                    }
                                    if (skillAmount > 0) {
                                        drawText(skillAmount >= skillCap ? "MAX" : "+" + skillAmount, Math.round(x + width / 2) + 0.5, y + height * 1.3, height / 4, skillColor, "center");
                                    }
                                    // Border
                                    ctx.strokeStyle = color.black;
                                    ctx.globalAlpha = 1;
                                    ctx.lineWidth = 3;
                                    drawGuiLine(x, y + (height * 2) / 3, x + width, y + (height * 2) / 3);
                                    drawGuiRect(x, y, width, height, true);
                                    x += (width + internalSpacing);
                                    y *= glide
                                    index++;
                                });
                                if (_gui._points > 1) {
                                    drawText("x" + _gui._points, Math.round(x) + 0.5, Math.round(y + 20) + 0.5, 20, color.guiwhite, "left");
                                }
                            }
                        }
                    } { // Joysticks
                        if (_global.mobile) {
                            {
                                let radius = Math.min(_global._screenWidth * 0.6, _global._screenHeight * 0.12);
                                ctx.globalAlpha = 0.3;
                                ctx.fillStyle = "#ffffff";
                                ctx.beginPath();
                                ctx.arc((_global._screenWidth * 1) / 6, (_global._screenHeight * 2) / 3, radius, 0, 2 * Math.PI);
                                ctx.arc((_global._screenWidth * 5) / 6, (_global._screenHeight * 2) / 3, radius, 0, 2 * Math.PI);
                                ctx.fill();
                                for (let i = 0; i < 4; i++) {
                                    const angle = Math.PI * 2 / 4 * i;
                                    ctx.strokeStyle = "#dddddd";
                                    ctx.lineWidth = radius * 0.125;
                                    ctx.beginPath();
                                    ctx.save();
                                    ctx.translate((_global._screenWidth * 1) / 6, (_global._screenHeight * 2) / 3);
                                    ctx.moveTo(Math.cos(angle) * radius * 0.2, Math.sin(angle) * radius * 0.2);
                                    ctx.lineTo(Math.cos(angle) * radius * 0.8, Math.sin(angle) * radius * 0.8);
                                    ctx.restore();
                                    ctx.closePath();
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.save();
                                    ctx.translate((_global._screenWidth * 5) / 6, (_global._screenHeight * 2) / 3);
                                    ctx.moveTo(Math.cos(angle) * radius * 0.2, Math.sin(angle) * radius * 0.2);
                                    ctx.lineTo(Math.cos(angle) * radius * 0.8, Math.sin(angle) * radius * 0.8);
                                    ctx.restore();
                                    ctx.closePath();
                                    ctx.stroke();
                                }
                            }
                            const size = spacing * 2;
                            drawMobileButton(0, spacing, _global._screenHeight - spacing - size, size, size, _global._mobileOptions ? "X" : "+");
                            if (_global._mobileOptions) {
                                const offX = spacing + (size * 2);
                                const offY = spacing + size;
                                const x = spacing * 2 + size;
                                const y = _global._screenHeight - spacing - size;
                                drawMobileButton(1, x, y - offY, size * 2, size, "Level Up");
                                drawMobileButton(2, x + offX, y - offY, size * 2, size, "Testbed");
                                drawMobileButton(3, x, y, size * 2, size, "Override");
                                drawMobileButton(4, x + offX, y, size * 2, size, "Reset Tank");
                                drawMobileButton(5, x + offX * 2, y, size * 2, size, "Full Screen");
                                drawMobileButton(6, x + offX * 2, y - offY, size * 2, size, _global._mobileChatText);
                            }else{
                                let x = spacing + size * 1.5
                                let y = _global._screenHeight - spacing - size
                                drawMobileButton(7, x, y, size*2, size, _global._mobileFiring[0]===4?"Main Firing":"Alt Firing");
                                drawMobileButton(8, x*2.25, y, size, size, "Q");
                            }
                        }
                    }
                };
                if (_global.mobile) scaleScreenRatio(1 / ratio, true);
            }

            if (_player.pepperspray.apply || _player.pepperspray.blurMax > 0) {
                ctx.filter = `blur(${_player.pepperspray.blurAmount}px)`;
                ctx.drawImage(c, 0, 0, _global._screenWidth, _global._screenHeight);
                ctx.filter = "none";
                if (!_player.pepperspray.apply && _player.pepperspray.blurAmount != 0) {
                    _player.pepperspray.blurAmount--
                    if (_player.pepperspray.blurAmount == 0) _player.pepperspray.blurMax = 0;
                } else if (_player.pepperspray.blurAmount < _player.pepperspray.blurMax) _player.pepperspray.blurAmount++;
            }

            if (_player.lsd) {
                ctx.filter = `hue-rotate(${Math.sin(Date.now() / 600) * 360}deg)`;
                ctx.drawImage(c, 0, 0, _global._screenWidth, _global._screenHeight);
                ctx.filter = "none";
            }

            if(_global.drawPoint){
                ctx.fillStyle = "red"
                ctx.globalAlpha = 0.5
                drawGuiCircle(_global.drawPoint.x, _global.drawPoint.y, 25)
            }

            ctx.filter = ["none", "contrast(1000%)", "grayscale(100%)", "grayscale(28%)", "invert(100%)", "sepia(75%)"][["Disabled", "Saturated", "Grayscale", "Dramatic", "Inverted", "Sepia"].indexOf(_config.filter)];
            if (ctx.filter !== "none") ctx.drawImage(c, 0, 0, _global._screenWidth, _global._screenHeight);
            ctx.filter = "none";
            metrics._lastrender = getNow();
        };
    }();
    let _gameDrawDead = function () {
        let getKills = function getKills() {
            let finalKills = [Math.round(_global.finalKills[0].get()), Math.round(_global.finalKills[1].get()), Math.round(_global.finalKills[2].get())],
                b = finalKills[0] + .5 * finalKills[1] + 3 * finalKills[2];
            return (0 === b ? "🌼" : 4 > b ? "🎯" : 8 > b ? "💥" : 15 > b ? "💢" : 25 > b ? "🔥" : 50 > b ? "💣" : 75 > b ? "👺" : 100 > b ? "🌶️" : "💯") + (finalKills[0] || finalKills[1] || finalKills[2] ? " " + (finalKills[0] ? finalKills[0] + " kill" + (1 === finalKills[0] ? "" : "s") : "") + (finalKills[0] && finalKills[1] ? " and " : "") + (finalKills[1] ? finalKills[1] + " assist" + (1 === finalKills[1] ? "" : "s") : "") + ((finalKills[0] || finalKills[1]) && finalKills[2] ? " and " : "") + (finalKills[2] ? finalKills[2] + " boss" + (1 === finalKills[2] ? "" : "es") + " defeated" : "") : " A true pacifist") + ".";
        },
            getDeath = function getDeath() {
                let txt = "";
                if (_global.finalKillers.length) {
                    txt = "🔪 Succumbed to";
                    for (let i = 0; i < _global.finalKillers.length; i++) txt += " " + _util._addArticle(_mockups.get(_global.finalKillers[i]).name) + " and";
                    txt = txt.slice(0, -4) + ".";
                } else txt += "🔪 Well that was kinda dumb, huh?";
                return txt;
            };
        return function () {
            let glideDuration = 750
            let glide;
            let getGlide;
            let getAlpha;
            if(_global._deathScreenState === 0){// FADE IN
                if(_config.fancyAnimations){ 
                    glide = (Date.now()-(_global._diedAt-3000))/glideDuration
                    let glideSuber = 0
                    getGlide = function(){
                        glideSuber += 0.025
                        return bounceyLerp.out(Math.min(glide + glideSuber, 1))
                    }
                    let alphaEquation = (Math.min(1, Math.min(1, glide) + 0.25)) // Broooo litterally meeeeee
                    getAlpha = function(){
                        return alphaEquation
                    }
                    _clearScreen(color.black, .5 * alphaEquation);
                }else{
                    getGlide = function(){
                        return 1
                    }
                    getAlpha = function(){
                        return 1
                    }
                    _clearScreen(color.black, .5);
                }
            }else if(_global._deathScreenState === 1){
                if (Date.now() - _global._diedAt > glideDuration){
                    _displayAds(false)
                    return;
                }
                if (_config.fancyAnimations) {
                    glide = (Date.now() - (_global._diedAt)) / glideDuration
                    let glideSuber = 0
                    getGlide = function () {
                        glideSuber += 0.025
                        return 1 + expLerp.in(Math.min(glide + glideSuber, 1))
                    }
                    let alphaEquation = (1-(Math.min(1, glide)))
                    getAlpha = function(){
                        return alphaEquation
                    }
                    _clearScreen(color.black, .5 * alphaEquation);
                } else {
                    getGlide = function () {
                        return 1
                    }
                    getAlpha = function(){
                        return 1
                    }
                    _clearScreen(color.black, .5);
                }
            }

            if(!_global.mobile) _displayAds(true);
            _socket.cmd.reset()
            let x = _global._screenWidth / 2,
                y = _global._screenHeight / 2 - 50,
                picture = getEntityImageFromMockup(_gui._type, _gui._color),
                len = 140,
                position = _mockups.get(_gui._type).position,
                scale = len / position.axis,
                xx = _global._screenWidth / 2 - scale * position.middle.x * .707,
                yy = _global._screenHeight / 2 - 35 + scale * position.middle.x * .707,
                delay = Math.ceil((_global._diedAt - Date.now()) / 1000);
            _player.pepperspray.apply = false;
            _player.lsd = false;
            drawEntity(xx - 190 - len / 2, (yy - 10) * getGlide(), picture, 1.5, getAlpha(), .5 * scale / picture.realSize, -Math.PI / 4);
            ctx.globalAlpha = getAlpha()
            drawText(_global._deathSplashOverride || _global._deathSplash[_global._deathSplashChoice], x, (y - 80) * getGlide(), 10, color.guiwhite, "center");
            drawText("Level " + _gui._skill.getLevel() + " " + _player._label, x - 170, (y - 30) * getGlide(), 24, color.guiwhite);
            drawText("Final Score: " + _util._formatLargeNumber(Math.round(_global.finalScore.get())), (x - 170), (y + 25) * getGlide(), 50, color.guiwhite);
            drawText("⌛ Survived for " + _util._formatTime(Math.round(_global.finalLifetime.get())) + ".", (x - 170), (y + 55) * getGlide(), 16, color.guiwhite);
            drawText(getKills(), (x - 170), (y + 77) * getGlide(), 16, color.guiwhite);
            drawText(getDeath(), (x - 170), (y + 99) * getGlide(), 16, color.guiwhite);
            drawText("⌚ Died on " + _global.deathDate, (x - 170), (y + 121) * getGlide(), 16, color.guiwhite);
            drawText(delay > 0 ? "You may respawn in " + delay + " second" + (delay === 1 ? "" : "s") + "." : "Press enter to respawn!", x, (y + 147) * getGlide(), 16, color.guiwhite, "center");
            _global._forceTwiggle = false;
        };
    }();
    let _gameDrawBeforeStart = function () {
        let splash = _global._tipSplash[Math.floor(Math.random() * _global._tipSplash.length)];
        return function () {
            _clearScreen(color.white, .5);
            drawText("Connecting...", _global._screenWidth / 2, _global._screenHeight / 2, 30, color.guiwhite, "center");
            drawText(_global.message, _global._screenWidth / 2, _global._screenHeight / 2 + 30, 15, color.lgreen, "center");
            drawText(splash, _global._screenWidth / 2, _global._screenHeight / 2 + 75, 15, color.guiwhite, "center");
        };
    }();
    //
    let _gameDrawDisconnected = function () {
        return function () {
            let alphaColor = _global._arenaClosed ? color.yellow : color.red,
                offset = _global._died ? 120 : 0;
            _clearScreen(mixColors(alphaColor, color.guiblack, .3), .25);
            drawText("💀 Disconnected 💀", _global._screenWidth / 2, _global._screenHeight / 2 + offset, 30, color.guiwhite, "center");
            drawText(_global.message, _global._screenWidth / 2, _global._screenHeight / 2 + 30 + offset, 15, alphaColor, "center");
            if (_global._arenaClosed) drawText(_global.closingSplash || "", _global._screenWidth / 2, _global._screenHeight / 2 + 45 + offset, 15, alphaColor, "center");
        };
    }();
    let _gameDrawError = function (error) {
        console.error(error);
        console.error(error.stack)
        let offset = _global._died ? 120 : 0;
        _clearScreen(mixColors(color.orange, color.guiblack, .3), .25);
        drawText("Client Error", _global._screenWidth / 2, _global._screenHeight / 2 + offset, 30, color.red, "center");
        drawText(error, _global._screenWidth / 2, _global._screenHeight / 2 + 30 + offset, 15, color.red, "center");
        drawText("Please take a screenshot and report this to a dev", _global._screenWidth / 2, _global._screenHeight / 2 + 45 + offset, 15, color.red, "center");
    };
    let _gameDrawFindingServer = function () {
        _clearScreen(color.white, 1);
        drawText("Finding a server...", _global._screenWidth / 2, _global._screenHeight / 2, 30, color.guiwhite, "center");
        drawText("This may take around 30 seconds due to a new server being made!", _global._screenWidth / 2, _global._screenHeight / 2 + 75, 15, color.guiwhite, "center");
    };
    let _gameDrawLoadingMockups = function () {
        _clearScreen(color.white, 1);
        drawText("Loading mockups...", _global._screenWidth / 2, _global._screenHeight / 2, 30, color.guiwhite, "center");
        drawText("This may take a while depending on your device speed and internet speed!", _global._screenWidth / 2, _global._screenHeight / 2 + 75, 15, color.guiwhite, "center");
    };
    let _gameDrawQueue = function () {
        let splash = _global._tipSplash[Math.floor(Math.random() * _global._tipSplash.length)],
            timer = 400;
        return function () {
            if (timer-- <= 0) {
                splash = _global._tipSplash[Math.floor(Math.random() * _global._tipSplash.length)];
                timer = 400;
            }
            renderTimes++;
            metrics._latency = 0;
            _clearScreen(color.white, .5);
            drawText("You are in queue for a 1v1 battle!", _global._screenWidth / 2, _global._screenHeight / 2, 30, color.guiwhite, "center");
            drawText(splash, _global._screenWidth / 2, _global._screenHeight / 2 + 30, 15, color.lgreen, "center");
            drawText("You've been in the queue for " + _util._formatTime(Math.round((Date.now() - _global.queueStart) / 1000)), _global._screenWidth / 2, _global._screenHeight / 2 + 75, 15, color.guiwhite, "center");
        }
    }();
    let _gameDrawRankedResults = function () {
        return function () {
            _clearScreen(color.white, .5);
            renderTimes++;
            metrics._latency = 0;
            drawText(_global.matchResults.won === 2 ? "It was a draw!" : "You " + (_global.matchResults.won ? "won" : "lost") + "!", _global._screenWidth / 2, _global._screenHeight / 2, 30, color.guiwhite, "center");
            drawText(_global.matchResults.message, _global._screenWidth / 2, _global._screenHeight / 2 + 30, 15, color.lgreen, "center");
            drawText("Press enter to rejoin the queue!", _global._screenWidth / 2, _global._screenHeight / 2 + 75, 15, color.guiwhite, "center");
        }
    }();
    _global.gameLoopSecond = function () {
        let time = 0;
        let i = 0;
        let func = function () {
            _global._bandwidth._out = _global._bandwidth._outbound;
            _global._bandwidth._in = _global._bandwidth._inbound;
            _global._bandwidth._outbound = 0;
            _global._bandwidth._inbound = 0;
            if (!_global._gameStart || _global.gameDrawDead || _global._disconnected) {
                return time = 0
            } else {
            };
            _global._fps = _global._fpsc;
            _global._fpsc = 0;
        }
        setInterval(func, 1000);
    }();
    const conv = str => `${str}`.replaceAll("\n", "").replaceAll(" ", "");
    let nextTime = 0;
    function _animloop() {
        _global.animLoopHandle = window.requestAnimFrame(_animloop);
        if (nextTime < performance.now()) {
            _global._fpsc++;
            try {
                if (_global._tankMenuColorReal >= 185) _global._tankMenuColorReal = 100;
                _global._tankMenuColorReal += 0.16;
                _global._tankMenuColor = _global._tankMenuColorReal | 0;
                _player._renderv += (_player._view - _player._renderv) / 30;
                let ratio = getRatio();
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                if (_global._gameStart && !_global._disconnected) {
                    _global.time = Date.now(); //getNow();
                    if (_global.time - lastPing > 1000) {
                        _socket.ping();
                        lastPing = _global.time;
                        metrics._rendertime = renderTimes;
                        renderTimes = 0;
                        metrics._updatetime = updateTimes;
                        updateTimes = 0;
                    }
                    if (_global._debug > 3 && _global.time - lastServerStat > 1000 + 150) {
                        _socket.talk("da")
                        lastServerStat = _global.time
                    }
                    metrics._lag = _global.time - _player._time;
                }
                if (_global.inQueue === 2) _gameDrawRankedResults();
                else if (_global.inQueue) _gameDrawQueue();
                else if (!window.rivetServerFound) _gameDrawFindingServer();
                else if (_global._gameStart) {
                    if (_mockups.length === 0) _gameDrawLoadingMockups();
                    else {
                        gameDraw(ratio);
                    };
                } else if (!_global._disconnected) {
                    _gameDrawBeforeStart();
                }
                _gameDrawDead();
                if (_global._disconnected) _gameDrawDisconnected();
            } catch (error) {
                _gameDrawError(error)
            }
            nextTime += _global._fpscap;
        }
    };
    document.getElementById("wrapperWrapper").onclick = () => {
        if (document.getElementById("startMenuWrapper")) {
            return
        }
        document.getElementById("gameCanvas").focus()
    }
}

let startInterval = setInterval(() => {
    if (!window.preloadsDoneCooking) {
        return
    }
    clearInterval(startInterval)
    if (!window.didMainLoad) RememberScriptingIsBannable()
    window.onload()
})
