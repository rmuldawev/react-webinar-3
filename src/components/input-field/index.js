import { Controller } from "react-hook-form";
import '../input-field/styles.css';

const CustomInput = ({ name, title, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <div>
          <p className="inputTitle">{title}</p>
          <input className="inputBox" value={value} onChange={onChange} />
        </div>
      )}
    />
  );
};

export default CustomInput;
