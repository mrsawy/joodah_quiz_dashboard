import React from 'react';

function InputField({
  name,
  label,
  onChange,
  value,
  className,
  inputClassName,
  inputStyle,
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ' +
          inputClassName
        }
        placeholder={label}
        required=""
        style={inputStyle}
      />
    </div>
  );
}

export default InputField;
