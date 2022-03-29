const io = require('./util/io')
const hlsPlayer = require('./hlsplayer/index')
const flvPlayer = require('./flvplayer/index')
const basePlayer = require('./baseplayer/index')

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
