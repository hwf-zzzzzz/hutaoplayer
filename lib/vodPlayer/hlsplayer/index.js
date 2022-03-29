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