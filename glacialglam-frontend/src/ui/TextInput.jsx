// TextInput.jsx
export default function TextInput({ title, value, onChange,type }) {
    return (
        <>
            <label className="block text-sm font-medium text-gray-700">
                {title}
            </label>
            <input
                type={type}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={value}
                onChange={onChange}
            />
        </>
    );
}
