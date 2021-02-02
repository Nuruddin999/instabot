import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import {useEffect, useRef, useState} from "react"
import axios from "axios"
import  io  from 'socket.io-client';
import Button from '@material-ui/core/Button';
import StickyHeadTable from './LastAccTable';
import StickyTalkersTable from './TalkersTable';
import StickySubscribedTable from './SubscribedTable';
import Pick from './Pick';
import Subscribe from './Subscribe';
const socket = io("http://localhost:4000");
function App() {
const [state,setState]=useState({socketConnected:false,added:[],target_accaunt:"",last_accaunts:[],subscribed:[],isPickTalkers:true,isSubscribe:true,subscribeFinished:false,currentIndex:""})
// const handleChange=(e)=>{
//   setState(state=>({...state,target_accaunt:e.target.value}));
// }
// const startOperation=async()=>{
//   setState(state=>({...state,isSubscribe:false}));
//  let result= await axios.post("http://localhost:4000/sendlastacc",{name:state.target_accaunt,date:new Date()})
//  let getUpdatedList=await getLastAcc()
//  setState(state=>({...state,added:[]}));
//  axios.get("http://localhost:4000/getTalkers",{ params: {
//   target_accaunt: state.target_accaunt
// }})
// }
const getLastAcc=async()=>{
let result=await axios.get("http://localhost:4000/getlastacc")
setState(state=>({...state,last_accaunts:result.data}));
}
const stopOperation=(operation)=>{
  axios.get("http://localhost:4000/stopgetTalkers")
switch(operation){
  case "talkers":
    setState(state=>({...state,isSubscribe:true}));
  case "subscribe":
    setState(state=>({...state,isPickTalkers:true}));
}
}
const startSubscribe=async()=>{
  setState(state=>({...state,isPickTalkers:false}));
let result =await axios.get("http://localhost:4000/subscribe")

}

useEffect(() => {
  socket.open()
    socket.on('added', (data) => {
      // we get settings data and can do something with it
      console.log("sockets data "+ data)
      setState(state=>({...state,added:[...state.added,data]}));
    })
    socket.on('subscribed', (data) => {
      // we get settings data and can do something with it
      console.log("sockets data "+ data)
      setState(state=>({...state,subscribed:[...state.subscribed,data]}));
    })  
    socket.on('subscribeFinished', (data) => {
      // we get settings data and can do something with it
      console.log("sockets data "+ data)
      setState(state=>({...state,subscribeFinished:true}));
    })
    socket.on("currentIndex", (data) => {
      // we get settings data and can do something with it
      setState(state=>({...state,currentIndex:data}));
    })
    getLastAcc()
  return ()=>socket.close()
}, [])


return <Router>
<div className="App">

<nav>
<div className="navlinks">
   <Link to="/pick"><Button  variant="contained" color="primary">Собрать</Button></Link>
  <Link to="/subscribe"><Button variant="contained" className="subs-btn">Подписка</Button></Link>
</div>
 
</nav>
    <Switch>
          <Route path="/pick">
        <Pick stop={stopOperation}/>
          </Route>
          <Route path="/subscribe">
        <Subscribe stop={stopOperation}/>
          </Route>
        </Switch>
{/* <input placeholder={"введите название аккаунта"}  value={state.target_accaunt} onChange={handleChange}/>
<button onClick={startOperation}> Начать</button>
<button onClick={()=>stopOperation("talkers")}>Остановить</button>
{state.isPickTalkers ?<div className="datablock">

  <div>
  <h6>Добавленные комментаторы</h6> 
 <StickyTalkersTable  list={state.added} />  
  </div>
  <div> 
  <h6>Журнал аккаунтов</h6> 
 <StickyHeadTable   list={state.last_accaunts} />
  </div>
 
</div> :null} */}
{/* {state.isSubscribe ?<React.Fragment>
   <h5>Подписка на комментаторов</h5> 
   <button onClick={startSubscribe}> Начать</button>
<button onClick={()=>stopOperation("subscribe")}>Остановить</button>
  <div>
  {state.subscribeFinished ? <span>Все добавлены</span>:null}
  <span>{state.currentIndex}</span>
  <h6>Добавленные комментаторы</h6> 
 <StickySubscribedTable  list={state.subscribed} />  
  </div>
</React.Fragment>:null} */}

</div>
</Router>
  
}

export default App;
