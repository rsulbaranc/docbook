export const Label = ({children, htmlFor, className}) => {
  return (
    <label className={`block text-sm font-medium text-gray-700 ${className}`} htmlFor={htmlFor}>
      {children}
    </label>
  )
}

export default Label