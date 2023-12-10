import {memo} from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function List({list, renderItem}) {

  
  return (
    <div className='List'>{
      list.map(item =>
        <Link to={`/aboutProduct/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={item._id}>
        <div className='List-item'>
          {renderItem(item)}
        </div>
        </Link>

      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: (item) => {},
}

export default memo(List);
