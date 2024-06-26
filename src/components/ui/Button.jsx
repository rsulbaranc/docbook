import PropTypes from 'prop-types';

export const Button = ({ children, className, ...props }) => {
  return (
    <button className={`relative inline-block items-center gap-x-1.5 rounded-md bg-custom-blue px-3 py-1.5 
    text-sm font-semibold text-white shadow-sm hover:bg-custom-gray focus-visible:outline 
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible-indigo-500 disabled:opacity-50 
    disabled:cursor-not-allowed ${className}`}
     {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Button;