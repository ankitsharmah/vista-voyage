import React from 'react'

function Button(props)
{
  return (
    <button className={`${props.className} transition-all duration-300 w-full rounded-md p-4 bg-blue-500 hover:scale-105 active:scale-95 flex justify-center items-center gap-2`}>
        {props.children}
    </button>
  )
}

export default Button