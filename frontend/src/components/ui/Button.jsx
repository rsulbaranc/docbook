import PropTypes from 'prop-types';

export const Button = ({ children }) => {
  return (
    <button className="relative inline-block items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Button;