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
