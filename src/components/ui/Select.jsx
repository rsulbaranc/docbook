import React from 'react'

export const Select = ({label, options, chooseOption, onChange, returnValue, className}) => {
  return (
    <>
    <form className={`max-w-auto mx-auto ${className}`}>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <select id="countries"  onChange={(e) => {return returnValue(e.target.value)}}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected disabled>{chooseOption ? chooseOption : 'Selecciona una opción'}</option>
        {options.length > 0 && options.map((option, index) => {
            const value = typeof option === 'object' ? option.value : option;
            const label = typeof option === 'object' ? option.label : option;
            return <option key={index} value={value}>{label}</option>
        })}
        </select>
    </form>
    </>
  )
}