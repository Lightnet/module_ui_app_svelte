;(function(){

    /* UNBUILD */
    var root;
    if(typeof window !== "undefined"){ root = window }
    if(typeof global !== "undefined"){ root = global }
    root = root || {};
    var console = root.console || {log: function(){}};
    function USE(arg, req){
      return req? require(arg) : arg.slice? USE[R(arg)] : function(mod, path){
        arg(mod = {exports: {}});
        USE[R(path)] = mod.exports;
      }
      function R(p){
        return p.split('/').slice(-1).toString().replace('.js','');
      }
    }
    if(typeof module !== "undefined"){ var common = module }
    /* UNBUILD */

    ;USE(function(module){

        // We do this with a GUN adapter, we first listen to when a gun instance is created (and when its options change)
        Gun.on('opt', function(at){
            console.log(at);
            //if(!at.sea){ // only add SEA once per instance, on the "at" context.
                //at.sea = {own: {}};
                //at.on('in', security, at); // now listen to all input data, acting as a firewall.
                //at.on('out', signature, at); // and output listeners, to encrypt outgoing data.
                //at.on('node', each, at);
            //}
            this.to.next(at); // make sure to call the "next" middleware adapter.
        });


    })(USE, './index');
    //})(USE, './index');

}());