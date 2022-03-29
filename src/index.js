class VodPlayer {
    constructor(props) {
        this.el = document.getElementById(props.el && props.el || null)
        this.src = props.src && props.src || null
        this.player = null
        this.callback = props.callback || function () { }
        this.init()
    }

    init() {
        let type = null
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
            let script = document.createElement('script')
            script.src = 'https://cdn.bootcdn.net/ajax/libs/hls.js/1.1.5-0.canary.8301/hls.js'
            document.head.appendChild(script)
            let that = this
            script.onload = function () {
                if (Hls.isSupported()) {
                    var hls = new Hls();
                    hls.loadSource(that.src);
                    hls.attachMedia(that.el);
                    // hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                    //   console.log('video and hls.js are now bound together !');
                    // });
                    that.el.muted = true
                    that.el.play()
                } else {
                    console.log("browser is no support hls");
                }
            }

        } else if (type == 'flv') {
            let script = document.createElement('script')
            script.src = 'https://cdn.bootcdn.net/ajax/libs/flv.js/1.6.2/flv.min.js'
            document.head.appendChild(script)
            let that = this
            script.onload = function () {
                if (flvjs.isSupported()) {
                    var flvPlayer = flvjs.createPlayer({
                        type: 'flv',
                        url: that.src
                    });
                    flvPlayer.attachMediaElement(that.el);
                    flvPlayer.load();
                    flvPlayer.play();
                } else {
                    console.log("browser is no support flv");
                }
            }
        } else {
            this.el.muted = true
            this.el.src = this.src
            this.el.play()
         
        }

        this.callback()


    }
}
