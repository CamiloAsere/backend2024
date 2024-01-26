function LocalStrategy() {
    this.quote=function (amount, gain) {
        return amount*gain
    } 
}
export default LocalStrategy