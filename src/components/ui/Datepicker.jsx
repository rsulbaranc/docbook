import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from 'react-icons/fi';

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className="relative">
        <input 
            type="text" 
            onClick={onClick}
            value={value}
            ref={ref}
            readOnly
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-8 cursor-pointer" 
        />
        <FiCalendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" size={20} />
    </div>
));

export const Datepicker = ({ selected, onChange }) => {
    const [startDate, setStartDate] = useState(selected || new Date());

    const handleDateChange = (date) => {
        date.setHours(0, 0, 0, 0);
        const formattedDate = date.toLocaleDateString('es-ES');
        console.log("Selected Date: ", date.toLocaleDateString('es-ES'));
        setStartDate(date);
        if (formattedDate) {
            onChange(formattedDate);
        }
    };

    return (
        <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            customInput={<CustomInput />}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
        />
    );
};