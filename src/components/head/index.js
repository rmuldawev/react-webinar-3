import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({onCLick, state}) {
  console.log('state',state)
  return (
    <div className='Head'>
      <h1>{state === true ? "In Basket" : " В корзине"}</h1>
      <button onClick={onCLick}>Eng</button>
    </div>
  )
}

Head.propTypes = {
  // title: PropTypes.node,
  state: PropTypes.boolean,
  onClick: PropTypes.func,
};

export default memo(Head);
