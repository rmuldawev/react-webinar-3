import React from "react"
import '../cartHeader/styles.css'


const CartHeader = ({onClick,title}) => {
    return (
        <div className="titleHead">
          <h1>{title}</h1>
          <button className="headButton" onClick={onClick}>
            Закрыть
          </button>
        </div>
    )
}

export default CartHeader