"use client";

import React, { useState } from "react";

interface ExpandableCopyFieldProps {
  value: string;
}

const ExpandableCopyField: React.FC<ExpandableCopyFieldProps> = ({ value }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    alert("Copied to clipboard!");
  };

  return (
    <div className="flex items-center">
      <span onClick={copyToClipboard} className="cursor-pointer text-blue-600 hover:underline" title="Click to copy">
        {isExpanded ? value : `${value.substring(0, 6)}...${value.substring(value.length - 4)}`}
      </span>
      <button
        onClick={toggleExpanded}
        className="ml-2 text-gray-500 hover:text-gray-800"
        title={isExpanded ? "Collapse" : "Expand"}
      >
        ⇔
      </button>
    </div>
  );
};

export default ExpandableCopyField;
