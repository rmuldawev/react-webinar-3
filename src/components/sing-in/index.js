import { Link } from "react-router-dom"
import '../sing-in/styles.css'

const SingIn = ({title}) => {
    return (
        <div style={{display:'flex',justifyContent:'flex-end'}}>
            <Link to={'/singin'}>
            <button className="buttonStyle" >{title}</button>

            </Link>
        </div>
    )
}

export default SingIn