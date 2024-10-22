import React from 'react';

const Alert = ({ type = 'info', message }) => {
  const alertTypes = {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-green-500">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-red-500">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    warning: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 7.5V13m0 4h.01M5.5 20h13a1 1 0 0 0 .9-1.45l-6.5-14a1 1 0 0 0-1.8 0l-6.5 14A1 1 0 0 0 5.5 20z" />
        </svg>
      ),
    },
    info: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-200',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M6 20h12a1 1 0 0 0 .9-1.45l-6.5-14a1 1 0 0 0-1.8 0l-6.5 14A1 1 0 0 0 6 20z" />
        </svg>
      ),
    },
  };

  const { bg, text, border, icon } = alertTypes[type] || alertTypes.info;

  return (
    <div className={`flex items-center p-4 mb-4 border rounded-lg ${bg} ${text} ${border}`}>
      {icon}
      <span className="ml-3">{message}</span>
    </div>
  );
};

export default Alert;
