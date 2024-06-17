import React from "react";

const InputForm = ({ label, type, name, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-primary p-2 rounded-lg focus:border-primary-300 focus:ring-primary-300 focus:ring-2 focus:outline-none"
      />
    </div>
  );
};

export default InputForm;
