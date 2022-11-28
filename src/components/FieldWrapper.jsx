import { cloneElement, useId } from "react";

function FieldWrapper({ title, smallDescription, className, render }) {
  const id = useId();
  return (
    <div className={`flex flex-col ${className || ""}`}>
      <label htmlFor={id} className="text-md font-bold text-start">{title}</label>
      {smallDescription && <p className="text-sm text-gray-500">{smallDescription}</p>}
      {render(id)}
    </div>
  );
}

export default FieldWrapper;
