import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Clock.css'

const Clock = () => {

  document.body.style.backgroundColor='rgb(160,158,140)'
const [breakval, setBreakval]=useState(5)
const[sessionval, setSessionval]=useState(25)
const [isrunning, setIsrunning]=useState(false)
const [seconds, setSeconds]=useState('0')
const [sessionbreak, setSessionbreak]=useState('Session')

  //Breaking length start form this section
const breaking=(event)=>{
if(event.target.value=='increase'){ 
setBreakval(breakval+1) 
if(breakval==60){
setBreakval(60)}

if(seconds>0){
setBreakval(breakval)
}
}

  else if(event.target.value='decrease'){
setBreakval(breakval-1)
if(breakval==1){
setBreakval(1)
}
if(seconds>0){
  setBreakval(breakval)
  }

    }

  }

  //Session start for this section

  const sessioning=(event)=>{

if(event.target.value=='increase'){

  setSessionval(sessionval+1)

  if(sessionval==60){

    setSessionval(60)}

    if(seconds>0){
      setSessionval(sessionval)
      }
}

else if(event.target.value=='decrease'){

  setSessionval(sessionval-1)

  if(sessionval==1){

setSessionval(1)

  }

  if(seconds>0){
    setSessionval(sessionval)
    }

}

  }
  //play timer

const startstop=()=>{
setIsrunning(!isrunning)//true statement
}

 useEffect(
()=>{
  
  
if(isrunning){
var timing=setInterval(() => {
if(seconds>0){
setSeconds(seconds=>seconds-1)
}
  
else if(seconds==0){
  setSessionval(sessionval=>sessionval-1)
  setSeconds(59);

if(sessionval==0 && seconds==0){
  setSessionval(breakval);
  setSeconds(0);
  setSessionbreak('Break');

    let audio=document.getElementById('beep');
    audio.play();
    
    
if(sessionbreak.includes('Break')){

setSessionbreak('Session')
}

}

      
  }


}, 1000);

return()=> clearInterval(timing)

 }
    }

    ),[isrunning, sessionval,breakval,seconds]



    const resetting=()=>{
      setIsrunning(false)
      setSessionval(25)
      setSeconds('0')
      setBreakval(5)
    setSessionbreak('Session');
   var audio=document.getElementById('beep')
   audio.pause()
   audio.currentTime=0;
   
   }
  
   //reseting timer
  return(

      <>

<audio id='beep' src="https://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav"/>

      <div id='break-label'><b>Break Length</b> </div>

      <input type='button' value='increase' id='break-increment' onClick={breaking}/><i class='arrow-up'> </i>

      <div id='break-length'>{breakval}</div>

      <input type='button' value='decrease' id='break-decrement'onClick={breaking}/><i class='arrow-down'> </i>

    
      <div id='timer-label'><b>{sessionbreak}</b> </div>

      <div id='time-left'>{sessionval<10? '0'+sessionval:sessionval}:{seconds<10? '0'+seconds :seconds}</div>

      <div className='fa fa-play' id='start_stop' onClick={startstop}></div>

      <div className='fa fa-pause' id='stop' onClick={startstop}></div>

      <div className='fa fa-refresh' id='reset' onClick={resetting} ></div>

      
      <div id='session-label'> <b>Session Length</b></div>

      <input type='button' value='increase' id='session-increment' onClick={sessioning}/><i class='arrow-up'></i>

      <div id='session-length'>{sessionval}</div>

      <input type='button' value='decrease' id='session-decrement' onClick={sessioning}/><i class='arrow-down'></i>
     

      </>

  )

}



export default Clock