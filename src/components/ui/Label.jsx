export const Label = ({children, htmlFor}) => {
  return (
    <label className="block text-sm font-medium text-gray-700" htmlFor={htmlFor}>
      {children}
    </label>
  )
}

export default Label