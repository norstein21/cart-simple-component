import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({items,deleteId,editId}) => {

  return (
  <div className='grocery-list'>
    {items.map((item)=>{
      const {id,title} = item;
      return (
        <article key={id} className='grocery-item'>
          <p className='title'>{title}</p>
          <div className='btn-container'>
            <button className='edit-btn' onClick={()=>editId(id)}><FaEdit /></button>
            <button className='delete-btn' onClick={()=>deleteId(id)}><FaTrash /></button>
          </div>
        </article>
      )
    })}
  </div>
    )
}

export default List
