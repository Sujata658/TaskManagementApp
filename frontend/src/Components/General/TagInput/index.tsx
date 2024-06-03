import { useState, useEffect, KeyboardEvent } from "react";
import { Tag } from "@/types/Tag";
import { useTag } from "@/context/TagContext";

interface TagInputProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ selectedTags, setSelectedTags }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [isInputActive, setIsInputActive] = useState(false);
  const { tags } = useTag();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
    setInputValue('');
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue && !filteredTags.length) {
      if (!selectedTags.includes(inputValue.trim())) {
        setSelectedTags([...selectedTags, inputValue.trim()]);
        setInputValue('');
      }
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (inputValue) {
      const temp = tags.filter((tag) => tag.name.includes(inputValue));
      setFilteredTags(temp);
    } else {
      setFilteredTags([]);
    }
  }, [inputValue, tags]);

  useEffect(() => {
    if (!inputValue) {
      setFilteredTags([]);
    }
  }, [inputValue]);

  return (
    <div>
      <label className="block text-sm font-medium">Tags</label>
      <input
        className="mt-1 block w-full border border-gray-600 p-2 rounded-md bg-background"
        placeholder="Tags (Press Enter to add)"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsInputActive(true)}
        onBlur={() => setTimeout(() => setIsInputActive(false), 200)}
        onKeyDown={handleKeyDown}
      />
      {isInputActive && filteredTags.length > 0 && (
        <div className="border border-gray-300 rounded-md mt-1 p-2">
          {filteredTags.map((tag) => (
            <div
              key={tag._id}
              className="cursor-pointer p-1 hover:bg-gray-200"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleTagClick(tag.name)}
            >
              {tag.name}
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <div key={tag} className="flex items-center bg-background rounded-full px-3 py-1 text-sm font-semibold border ">
            {tag}
            <button
              type="button"
              className="ml-2 text-gray-600"
              onClick={() => handleTagRemove(tag)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;