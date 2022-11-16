import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const ambilLocal = ()=>{
     let getLocal = localStorage.getItem('data')
     if(getLocal){
      return JSON.parse(localStorage.getItem('data'))
     }
     else{
      return []
     }
  }

function App() {
  const [namaItem,setNamaItem] = useState('');
  const [isi,setIsi] = useState(ambilLocal());
  const [isEditing,setIsEditing] = useState(false);
  const [alert,setAlert] = useState(
    {show: false, msg: '', type: ''});
  const [editId,setEditId] = useState(null);

  
  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!namaItem){
      //display alert
      setKondisi(true,'danger','Isi Data Dengan Benar!!!')
    }
    else if(namaItem && isEditing){
      //deal with edit
      setIsi(
        isi.map((is)=>{
          if(is.id === editId){
            return {...is,title:namaItem}
          }
          return is;
        })
      )
      setNamaItem('')
      setKondisi(true,'update','Update Data Berhasil')
      setIsEditing(false)
      setEditId(null)
    }
    else {
      //else
      const newItem = {id:new Date().getTime().toString(), title: namaItem};
      setIsi([...isi,newItem])
      setNamaItem('')
      setKondisi(true,'success','Tambah Data berhasil')
    }
  }

  const setKondisi = (show=false,type='',msg='') =>{
    setAlert({ show,type,msg })
  }

  const clearIsi = () =>{
    setKondisi(true,'danger','Semua Data Dihapus')
    setIsi([])
  }

  const deleteById = (id)=>{
    setKondisi(true,'danger','Data berhasil dihapus')
    setIsi(isi.filter((item)=>item.id !== id))
  }

  const editById = (id)=>{
    const getData = isi.find((is)=>is.id === id)
    setEditId(id)
    setIsEditing(true)
    setNamaItem(getData.title)
  }

  useEffect(()=>{
  localStorage.setItem('data',JSON.stringify(isi))
  },[isi])

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        <h3>Cart List</h3>
      {alert.show && <Alert {...alert} hapusAlert={setKondisi} isiList={isi} />}

      <div className='form-control'>
        <input type='text' className='grocery' 
        value={namaItem} 
        onChange={(e)=>setNamaItem(e.target.value)}
        placeholder='e.g VGA NVIDIA'  />
        <button className='submit-btn' type='submit'>
          {isEditing ? 'Edit' : 'Submit'}
        </button>
      </div>

      </form>

      <div className='grocery-container'>
        <List items={isi} deleteId={deleteById} editId={editById} />
        <button className='clear-btn' onClick={()=>clearIsi()}>clear all items</button>
      </div>
      
    </section>
  );
}

export default App
