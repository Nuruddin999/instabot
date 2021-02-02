import React from 'react'
import axios from "axios"
import  io  from 'socket.io-client';
import {useEffect, useState} from "react"
import StickySubscribedTable from './SubscribedTable';
import PlayCircleOutlineSharpIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import StopIcon from '@material-ui/icons/Stop';
const socket = io("http://localhost:4000");
const Subscribe = ({stop}) => {
    const [state,setState]=useState({socketConnected:false,subscribed:[],subscribeFinished:false,currentIndex:"",isEmpty:""})
    const startSubscribe=async()=>{
        setState(state=>({...state,isPickTalkers:false}));
      let result =await axios.get("http://localhost:4000/subscribe")
      
      }
      useEffect(() => {
        socket.open()
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
          socket.on("talkers_empty",(data) => {
            // we get settings data and can do something with it
            setState(state=>({...state,isEmpty:data}));
          })
        return ()=>{
            stop("subscribe")
socket.close()
        }
      }, [])
    return (
        <div>
        <div className="subscribe-bar">
        <span>Подписка на комментаторов</span> 
        <div className="subscribe-buttons">
             <PlayCircleOutlineSharpIcon onClick={startSubscribe}/>
<StopIcon onClick={()=>stop("subscribe")}/>
        </div>

<span>{state.currentIndex}</span>
        </div>
    <div>
  {state.isEmpty ? <span>{state.isEmpty}</span>:null}
  {state.subscribeFinished ? <span>Все добавлены</span>:null}
  <h6>Добавленные комментаторы</h6> 
  <div className="subs-table">
 <StickySubscribedTable  list={state.subscribed} /> 
  </div>
 
  </div>
        </div>
    )
}
export default Subscribe
