import React, { useState, useEffect } from "react";

interface EditableCellProps {
  cell: {
    value: string;
  };
  row: {
    index: number;
  };
  column: {
    id: string;
  };
  updateMyData: (index: number, id: string, value: string) => void;
}

const EditableCell = ({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  updateMyData,
}: EditableCellProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    updateMyData(index, id, value);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className="bg-transparent h-8"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default EditableCell;
