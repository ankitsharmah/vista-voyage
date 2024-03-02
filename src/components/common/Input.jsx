import React from 'react'

function Input(props) {
  return (
    <div className={props.className}>
        <h1 className="opacity-70 text-xl">{props.label}</h1>
        <input type={props.type?props.type:"text"} className="transition-all duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md bg-white/10 p-4 border-transparent focus:border-blue-500 border-b-2"/>
    </div>
  )
}

export default Input