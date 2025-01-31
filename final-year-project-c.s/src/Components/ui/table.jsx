import React from "react";

export const Table = ({ children }) => {
    return <table className="min-w-full bg-white border border-gray-300">{children}</table>;
};

export const TableHead = ({ children }) => {
    return <thead className="bg-gray-100">{children}</thead>;
};

export const TableBody = ({ children }) => {
    return <tbody className="divide-y">{children}</tbody>;
};

export const TableRow = ({ children }) => {
    return <tr className="hover:bg-gray-50">{children}</tr>;
};

export const TableCell = ({ children, className = "" }) => {
    return <td className={`px-4 py-2 border ${className}`}>{children}</td>;
};
