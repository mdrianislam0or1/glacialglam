/* eslint-disable react/prop-types */

const CommonInput = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full my-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500"
    />
  );
};

export default CommonInput;
