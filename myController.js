const startWork=require("./main") 
module.exports.respond = function(endpoint,socket){
    // this function now expects an endpoint as argument
startWork.startWork(socket).then(r=>console.log(r))
}