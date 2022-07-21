import React from 'react'

const AddTask = ({active, setActive}) => {
  return (
    <div className="addTask" onClick={() => setActive(true)}>
        <div className="addTask__plus"></div>
    </div>
  )
}

export default AddTask