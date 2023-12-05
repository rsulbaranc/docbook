import { forwardRef } from "react";

export const Textarea = forwardRef((props, ref) => {
  return (
    <textarea
    className="bg-white px-3 py-2 block my-2 w-full"
    {...props} 
    ref={ref}
    >
    {props.children}
    </textarea>
  );
})

Textarea.displayName = 'Textarea';

export default Textarea;