import { useState, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function DatePicker({
  label,
  selectedDate,
  onChange = () => {},
  blockedDates = [],
  minDate = new Date(),
  placeholder = "Select date"
}) {
  const [startDate, setStartDate] = useState(selectedDate || null)

  useEffect(() => {
    setStartDate(selectedDate || null)
  }, [selectedDate])

  const handleChange = (date) => {
    setStartDate(date)
    onChange(date)
  }

  const isDateBlocked = (date) =>
    blockedDates.some(d =>
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    )

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <ReactDatePicker
        selected={startDate}
        onChange={handleChange}
        dateFormat="yyyy-MM-dd"
        minDate={minDate}
        excludeDates={blockedDates}
        placeholderText={placeholder}
        className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 shadow-sm transition duration-150"
        calendarClassName="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg"
        dayClassName={(date) =>
          isDateBlocked(date)
            ? 'text-gray-500 line-through cursor-not-allowed'
            : 'hover:bg-blue-600 hover:text-white transition rounded-full'
        }
      />
    </div>
  )
}
