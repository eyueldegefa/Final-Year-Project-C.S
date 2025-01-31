import React from "react";

export const Button = ({ children, variant = "default", size = "md", onClick, className = "" }) => {
    const baseStyle = "px-4 py-2 rounded font-medium focus:outline-none transition";
    const variantStyles = {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
        destructive: "bg-red-500 text-white hover:bg-red-600",
    };
    const sizeStyles = {
        sm: "text-sm px-3 py-1",
        md: "text-base px-4 py-2",
        lg: "text-lg px-5 py-3",
    };

    return (
        <button
            className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
