/*
    Self contain Sandbox?
*/
(function() {
var Gun = (typeof window !== "undefined")? window.Gun : require('../gun');

Gun.chain.token=function(cb, opt){
    console.log("custom test");
    opt = opt || {};
    cb = cb || function(ctx) { return ctx };
    let gun = this;

    return gun;
}

//console.log(SEA)
//console.log(Gun)
//console.dir(Gun)
//console.dir(Gun.User)

Gun.User.prototype.genAppT=function(cb, opt){
    console.log("custom test");
    opt = opt || {};
    cb = cb || function(ctx) { return ctx };
    let gun = this;
    
    return gun;
}


Gun.User.prototype.genKey=function(cb, opt){
    console.log("custom test");
    opt = opt || {};
    cb = cb || function(ctx) { return ctx };
    let gun = this;

    return gun;
}

/*
Gun.User.prototype.genKey02=function(cb, opt){
    console.log("custom test");
    opt = opt || {};
    cb = cb || function(ctx) { return ctx };
    let gun = this;

    return gun;
}
*/

}());