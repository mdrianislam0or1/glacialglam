/* eslint-disable react/prop-types */

const CommonButton = ({ children, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-black text-white  hover:bg-black focus:outline-none shadow-md transform transition-transform hover:scale-105 border-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CommonButton;
