import { forwardRef } from "react";

const Input = forwardRef((props, ref, className, disabled) => {
  return (
    <input type="text" 
    className=  {`bg-white px-3 py-2 block my-2 w-full border border-gray-300 rounded ${className}`}
    disabled={disabled}
    {...props} 
    ref={ref}
    />
  );
})

Input.displayName = 'Input';

export default Input;