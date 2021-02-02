import React from "react";
import axios from "axios";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import StickyHeadTable from "./LastAccTable";
import StickyTalkersTable from './TalkersTable';
import PlayCircleOutlineSharpIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import TextField from '@material-ui/core/TextField';
import StopIcon from '@material-ui/icons/Stop';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const socket = io("http://localhost:4000");
const Pick = ({ stop }) => {
  const [state, setState] = useState({
    target_accaunt: "",
    last_accaunts: [],
    added: [],
    open: false,
    picked:"",
    all_talkers:[],
    isPlayPressed:false
  });
  const handleChange = (e) => {
    setState((state) => ({ ...state, target_accaunt: e.target.value }));
  };
  const startOperation = async () => {
    if (!state.target_accaunt) {
      setState((state) => ({ ...state, open: true }));
      return;
    }
else if(state.isPlayPressed){
  return
}
    let result = await axios.post("http://localhost:4000/sendlastacc", {
      name: state.target_accaunt,
      date: new Date(),
    });
    let getUpdatedList = await getLastAcc();
    setState((state) => ({ ...state, added: [],isPlayPressed:true }));
    axios.get("http://localhost:4000/getTalkers", {
      params: {
        target_accaunt: state.target_accaunt,
      },
    });
  };
  const stopOperation=()=>{
    stop("talkers")
    setState((state) => ({ ...state, isPlayPressed:false }));
  }
  const getLastAcc = async () => {
    let result = await axios.get("http://localhost:4000/getlastacc");
    setState((state) => ({ ...state, last_accaunts: result.data }));
  };
  const deleteLastAcc = async (name) => {
    let result = await axios.delete(
      `http://localhost:4000/lastacc/delete/${name}`
    );
    if (result) {
      await getLastAcc();
    }
  };
  const getAddedTalkers=async()=>{
    let list=[]
    let result = await axios.get("http://localhost:4000/alltalkers");
   result.data.forEach(el=>list.push(el.name))
    setState((state) => ({ ...state, all_talkers: list }));
  }
  const deleteAlltalkers=async()=>{
    let result = await axios.delete(
      `http://localhost:4000/alltalkers/delete`
    );
    if (result) {
      setState((state) => ({ ...state, all_talkers: [] }));
    }
  }
  useEffect(() => {
    socket.open();
    socket.on("added", (data) => {
      // we get settings data and can do something with it
      console.log("sockets data " + data);
      setState((state) => ({ ...state, added: [...state.added, data] }));
    });
    socket.on("picked", (data) => {
        // we get settings data and can do something with it
        console.log("sockets data " + data);
        setState((state) => ({ ...state, picked:data }));
      });
    getLastAcc();
    getAddedTalkers()
    return () => {
      stop("talkers");
      socket.close();
    };
  }, []);
  useEffect(() => {
    if (state.open) {
      setTimeout(() => setState((state) => ({ ...state, open: false })), 1000);
    }
  }, [state.open]);
  return (
    <div>
    <div className="subscribe-bar">
    <TextField
        placeholder={"введите название аккаунта"}
        value={state.target_accaunt}
        onChange={handleChange}
        
      />
      <div className="subscribe-buttons">
         <PlayCircleOutlineSharpIcon onClick={startOperation}/>
      <StopIcon onClick={() => stop("talkers")}/>   
      <DeleteForeverIcon  className="subscribe-deletebtn"  onClick={deleteAlltalkers}/>
      </div>
    
      <div>{state.open ? <span>Введите целевой аккаунт</span> : null}</div>
    </div>
    
      <div className="datablock">
        <div>
          <h6>Добавленные комментаторы</h6>
          {state.picked ? <span>{state.picked}</span>:null}
          <StickyTalkersTable list={state.added} />
        </div>
        <div>
          <h6>Список комментаторов</h6>
          {state.picked ? <span>{state.picked}</span>:null}
          <StickyTalkersTable list={state.all_talkers} />
        </div>
        <div>
          <h6>Журнал аккаунтов</h6>
          <StickyHeadTable
            list={state.last_accaunts}
            deleteAcc={deleteLastAcc}
          />
        </div>
      </div>
    </div>
  );
};
export default Pick;
