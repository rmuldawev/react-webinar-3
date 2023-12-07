import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({onCLick, state,type,title}) {
  console.log('state',state)
  return (
    <div className='Head'>
      {type !== 'aboutProduct' ? <h1>{state === true ? "Store" : " Магазин"}</h1> : <h1>{title}</h1>}
      <button className="langStyles" onClick={onCLick}>{state ? 'RU' : 'EN'}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  state: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(Head);
