import {memo, useCallback, useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './styles.css';

const InputField = (props) =>  {
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChange(value, props.name), 600),
    [props.onChange, props.name]
  );

  const onChange = (event) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Input');
  return (
    <textarea
      className={cn({theme: props.theme})}
      value={value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  )
}

InputField.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
}

InputField.defaultProps = {
  onChange: () => {
  },
  type: 'text',
  theme: ''
}

export default InputField;
