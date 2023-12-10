import React from "react"
import BasketTool from "../basket-tool"
import NavBar from "../nav-bar"
import '../nav-container/styles.css'

const NavContainer = (props) => {
    return (
        <div className="nav-container">
            <NavBar lang={props.lang} />
            <BasketTool lang={props.lang} amount={props.amount} onOpen={props.onOpen} sum={props.sum}/>
        </div>
    )
}

export default React.memo(NavContainer)