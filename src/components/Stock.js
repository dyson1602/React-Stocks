import React from 'react'


const Stock = (props) => {

  function localClickHandler() {
    props.clickHandler(props.stockObj)
  }

  return (
    <div>
      <div className="card" onClick={localClickHandler}>
        <div className="card-body">
          <h5 className="card-title">{props.stockObj.name}</h5>
          <p className="card-text">{props.stockObj.ticker}: {props.stockObj.price}</p>
        </div>
      </div>
    </div>
  )
}
export default Stock
