
let subscribeBtn=document.getElementById("subscribe")
const startSubscribe=async()=>{
    await axios.get("/page")
}
const sendData=async()=>{
let result= await axios({
    method: 'post',     //put
    url: "sendReport",
    data: {
       firstName: 'Keshav', // This is the body part
       lastName: 'Gera'
    }
  });
}
const getTalkers=async()=>{
   let listTalkers= await axios.get("/getTalkers")
return listTalkers
}
var socket = io();
socket.on("hello", (arg) => {
  document.getElementById("list").innerHTML=arg
  });
subscribeBtn.addEventListener('click',startSubscribe)
