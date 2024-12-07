import React from 'react'

const Loader = () => {
  return (
    <div className="px-12 mt-12">
      <svg
        className="animate-spin h-8 w-8 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291V14H0c0 5.523 4.477 10 10 10v-2c-2.21 0-4-1.79-4-4h-2z"
        ></path>
      </svg>
      <p className="mt-4 text-gray-600">Loading content, please wait...</p>
    </div>
  );
}

export default Loader
