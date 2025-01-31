import React from "react";

export const Input = ({ type = "text", placeholder, value, onChange, className = "" }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500 ${className}`}
        />
    );
};
