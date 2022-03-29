/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/vodPlayer/baseplayer/index.js":
/*!*******************************************!*\
  !*** ./lib/vodPlayer/baseplayer/index.js ***!
  \*******************************************/
/***/ ((module) => {

class basePlayer {
    constructor(props){
        this.player = null
        this.src = props.src&&props.src
        this.el = props.el&&props.el
        this.init()
    }
    init(){
        this.el.muted = true
        this.el.src = this.src
        this.el.play()
    }
}
module.exports = basePlayer

/***/ }),

/***/ "./lib/vodPlayer/flvplayer/index.js":
/*!******************************************!*\
  !*** ./lib/vodPlayer/flvplayer/index.js ***!
  \******************************************/
/***/ ((module) => {

class flvPlayer {
    constructor(props){
        this.flv = null
        this.src = props.src&&props.src
        this.el = props.el&&props.el
        this.init()
    }
    init(){
        this.flv = flvjs.createPlayer({
            type: 'flv',
            url: this.src
        });
        this.flv.attachMediaElement(this.el);
        this.flv.load();
        this.flv.play();
    }
}
module.exports = flvPlayer

/***/ }),

/***/ "./lib/vodPlayer/hlsplayer/index.js":
/*!******************************************!*\
  !*** ./lib/vodPlayer/hlsplayer/index.js ***!
  \******************************************/
/***/ ((module) => {

class hlsPlayer {
    constructor(props){
        this.hls = null
        this.src = props.src&&props.src
        this.el = props.el&&props.el
        this.init()
    }
    init(){
        this.hls = new Hls();
        this.hls.loadSource(this.src);
        this.hls.attachMedia(this.el);
        this.el.muted = true
        this.el.play()
    }
}
module.exports = hlsPlayer

/***/ }),

/***/ "./lib/vodPlayer/index.js":
/*!********************************!*\
  !*** ./lib/vodPlayer/index.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const io = __webpack_require__(/*! ./util/io */ "./lib/vodPlayer/util/io.js")
const hlsPlayer = __webpack_require__(/*! ./hlsplayer/index */ "./lib/vodPlayer/hlsplayer/index.js")
const flvPlayer = __webpack_require__(/*! ./flvplayer/index */ "./lib/vodPlayer/flvplayer/index.js")
const basePlayer = __webpack_require__(/*! ./baseplayer/index */ "./lib/vodPlayer/baseplayer/index.js")

class VodPlayer {
    constructor(props) {
        this.el = document.getElementById(props.el && props.el || null)
        this.src = props.src && props.src || null
        this.callback = props.callback || function () { }
        this.init()
    }

    static player = null

    init() {
        let type = null
        let that = this
        if (VodPlayer.player) {
            console.log('player is exits');
            return
        }
        if (this.src && this.src.toLowerCase().indexOf('m3u8') > 0) {
            type = 'm3u8'
        } else if (this.src && this.src.toLowerCase().indexOf('flv') > 0) {
            type = 'flv'
        } else if (this.src && this.src.toLowerCase().indexOf('mp4') > 0) {
            type = 'mp4'
        } else {
            console.log('Please enter a valid URL');
            return
        }

        if (type == 'm3u8') {
            io.loadJs(
                'https://cdn.bootcdn.net/ajax/libs/hls.js/1.1.5-0.canary.8301/hls.js',
                function () {
                    if (Hls.isSupported()) {
                        VodPlayer.player = new hlsPlayer({
                            src: that.src,
                            el: that.el
                        })
                    } else {
                        console.log("browser is no support hls");
                    }
                }
            )
        } else if (type == 'flv') {
            io.loadJs(
                'https://cdn.bootcdn.net/ajax/libs/flv.js/1.6.2/flv.min.js',
                function () {
                    if (flvjs.isSupported()) {
                        VodPlayer.player = new flvPlayer({
                            src: that.src,
                            el: that.el
                        })
                    } else {
                        console.log("browser is no support flv");
                    }
                }
            )
        } else {
            VodPlayer.player = new basePlayer({
                src: that.src,
                el: that.el
            })
        }
        this.callback()
    }
}

module.exports = window.VodPlayer = VodPlayer


/***/ }),

/***/ "./lib/vodPlayer/util/io.js":
/*!**********************************!*\
  !*** ./lib/vodPlayer/util/io.js ***!
  \**********************************/
/***/ ((module) => {

module.exports.loadJs = function (url,callback){
    let script = document.createElement('script')
    script.src = url
    document.head.appendChild(script)
    script.onload = function () {
        if(callback){
            callback()
        }
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./lib/vodPlayer/index.js");
/******/ 	
/******/ })()
;