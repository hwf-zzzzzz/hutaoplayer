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