// TagsInput.jsx
import { useState } from 'react';

const TagsInput = ({ title, tags, onChange }) => {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      onChange([...tags, { name: newTag, isDeleted: false }]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    onChange(updatedTags);
  };

  return (
    <div className="mb-4">
      <label htmlFor={title} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <div className="mt-1 flex items-center">
        <input
          type="text"
          id={title}
          className="text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <div className='px-2'>
          <button
            type="button"
            className="ml-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-purple-700"
            onClick={handleAddTag}
          >
            Add Tag
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="mr-2 mt-2 bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-md flex items-center"
          >
            <span>{tag.name}</span>
            <button
              type="button"
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => handleRemoveTag(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;