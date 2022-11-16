import React, { useEffect } from 'react'

const Alert = (props) => {

  const {type,msg,hapusAlert,isiList} = props;
    useEffect(()=>{
      const timeout =setTimeout(()=>{
        hapusAlert()
      },3000)

      return ()=> clearTimeout(timeout)
    },[isiList])

    return (
      <p className={`alert alert-${type}`} >{msg}</p>
  );
}
  


export default Alert
