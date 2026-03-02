/*"use client";
export default function Home() {
  return <div className="p-8 max-w-md mx-auto">HOME PAGE</div>;
}*/

// for testing. u may delete this part na kirby if goods na ang testing. above code yung original code.
"use client"; 
import { useState } from "react";
import { TextField } from "@/components/shared/textfields";
import { textFieldSchema } from "@/lib/zod/textfields";

export default function TestPage() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const result = textFieldSchema.safeParse({ content: text });
    
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
      alert(`Validation passed! Content: "${result.data.content}"`);
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      
      <TextField 
        onChange={(val) => {
          setText(val);
          if (val.length > 0) setError(""); 
        }}
        error={error}
      />

      <button 
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit (Test)
      </button>
    </div>
  );
}