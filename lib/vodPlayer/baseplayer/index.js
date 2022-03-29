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