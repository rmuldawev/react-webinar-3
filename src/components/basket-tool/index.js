import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";

function BasketTool({sum, amount, onOpen, lang}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link style={{color:'#0087E9'}} to={'/'}>Главная</Link>
      <div>

      <span className={cn('label')}>{lang ? 'In Basket:' : 'В корзине:'}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: lang ? 'product' :'товар',
            few: lang ? 'products' :'товара',
            many: lang ? 'products' :'товаров'
          })} / ${numberFormat(sum)} ₽`
          : `пусто`
        }
      </span>
      <button onClick={onOpen}>{lang ? 'Cross' : 'Перейти'}</button>
      </div>

    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
