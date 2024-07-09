import React, { useId } from 'react'

function Select({
    options,
    label,
    className='',
    ...props 
} ,ref) {
    const id=useId
  return (
    <div className={`w-full `}>
     {label && <label  htmlFor='id'></label>}
     <select 
     className={` bg-white text-black px-3
        py-2 ${className}`}
     {...props}
      id={id}
      ref={ref}>
        {options?.map((val)=> (<options value={val} key={val}>{val}</options>))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)