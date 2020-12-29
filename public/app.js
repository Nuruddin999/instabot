
let subscribeBtn=document.getElementById("subscribe")
const startSubscribe=async()=>{
    await axios.get("/subscribe")
}
const getTalkers=async()=>{
   let listTalkers= await axios.get("/getTalkers")
return listTalkers
}
subscribeBtn.addEventListener('click',startSubscribe)
