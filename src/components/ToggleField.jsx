function ToggleField({ options, onChange, selectedValue }) {
  return (
    <div className="flex space-x-5">
      {options.map(({ title, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          type="button"
          className={`bg-white flex-1 p-3 uppercase text-sm font-medium shadow rounded-md ${
            value === selectedValue ? "bg-gray-700 text-white" : ""
          }`}
        >
          {title}
        </button>
      ))}
    </div>
  );
}

export default ToggleField;
