import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({onAdd,items,totalPrice}) {
  return (
    <div className='Controls'>
      <p>В корзине:</p>
      <div className="totalPrice"> 
      <p>
         {items.length > 0  ? `  ${items.length} ${plural(items.length, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${totalPrice.toLocaleString('ru-RU')}`: 'пусто'}
      </p>
       {items.length > 0  ?<p>₽</p> : ''}
      </div>

      <button className="buttonStyle" onClick={() => onAdd()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
