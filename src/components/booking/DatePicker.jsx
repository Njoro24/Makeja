import { useState, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function DatePicker({
  label,
  selectedDate,
  onChange,
  blockedDates = [],
  minDate = new Date(),
  placeholder = "Select date"
}) {
  const [startDate, setStartDate] = useState(selectedDate || null)

  useEffect(() => {
    if (selectedDate) setStartDate(selectedDate)
  }, [selectedDate])

  const handleChange = (date) => {
    setStartDate(date)
    onChange(date)
  }

  return (
    <div className="mb-4">
      {label && <label className="block mb-2 text-sm font-medium text-gray-300">{label}</label>}
      <ReactDatePicker
        selected={startDate}
        onChange={handleChange}
        dateFormat="yyyy-MM-dd"
        minDate={minDate}
        excludeDates={blockedDates}
        placeholderText={placeholder}
        className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
