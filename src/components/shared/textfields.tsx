import React, { useState } from 'react';
import { 
  MdExpandMore, 
  MdFormatBold, 
  MdFormatItalic, 
  MdFormatUnderlined, 
  MdFormatAlignLeft, 
  MdFormatAlignCenter, 
  MdFormatAlignRight, 
  MdInsertLink 
} from "react-icons/md";

interface TextFieldProps {
    label?: string;
    onChange: (value: string) => void;
    error?: string;
}

export const TextField: React.FC<TextFieldProps> = ({ label, onChange, error }) => {
    const [unexpectedError, setUnexpectedError] = useState<string | null>(null);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        try {
            setUnexpectedError(null);
            onChange(e.currentTarget.textContent || "");
        } catch (err) {
            setUnexpectedError("Something went wrong...");
            console.error("TextField error:", err);
        }
    };

    return (
        <div className="flex flex-col gap-2 w-[440px]">
            {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
        
            <div className={`flex flex-col border rounded-lg overflow-hidden transition-colors h-[163px] ${
                error || unexpectedError ? 'border-red-500' : 'border-gray-300 focus-within:border-blue-400'
            }`}>
                <div className="flex items-center gap-2 p-2 bg-white flex-wrap">
                    <div className="flex items-center justify-center border border-gray-300 rounded px-2 py-1 gap-2 cursor-pointer hover:bg-gray-50">
                        <span className="text-xs text-gray-400 font-roboto">Roboto</span>
                        <MdExpandMore className="text-gray-400 text-sm" />
                    </div>

                    <div className="flex items-center justify-center border border-gray-300 rounded px-2 py-1 gap-2 cursor-pointer hover:bg-gray-50">
                        <span className="text-xs text-gray-400">Paragraph</span>
                        <MdExpandMore className="text-gray-400 text-sm" />
                    </div>

                    <div className="flex items-center gap-3 px-2 ml-auto">
                        <button type="button" className="text-gray-600 hover:text-black transition-colors">
                            <MdFormatBold size={18} />
                        </button>
                        <button type="button" className="text-gray-600 hover:text-black transition-colors">
                            <MdFormatUnderlined size={18} />
                        </button>
                        <button type="button" className="text-gray-600 hover:text-black transition-colors">
                            <MdFormatItalic size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 px-2">
                        <button type="button" className="text-gray-600 hover:text-black">
                            <MdFormatAlignLeft size={18} />
                        </button>
                        <button type="button" className="text-gray-600 hover:text-black">
                            <MdFormatAlignCenter size={18} />
                        </button>
                        <button type="button" className="text-gray-600 hover:text-black">
                            <MdFormatAlignRight size={18} />
                        </button>
                        <button type="button" className="text-gray-600 hover:text-black ml-1">
                            <MdInsertLink size={20} />
                        </button>
                    </div>
                </div>

                <div 
                    contentEditable
                    className="flex-1 p-4 focus:outline-none text-sm text-gray-600 bg-white relative empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none overflow-y-auto"
                    data-placeholder="Your text goes here"
                    onInput={handleInput}
                    suppressContentEditableWarning={true}
                />
            </div>

            {(error || unexpectedError) && (
                <p className="text-xs text-red-500 mt-1">{error || unexpectedError}</p>
            )}
        </div>
    );
};