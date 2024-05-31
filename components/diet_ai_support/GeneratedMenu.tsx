import React from 'react';
import AiLines from '@/components/global/AiLines';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import "@/components/global/AiLines.scss";
import "@/components/diet_ai_support/GeneratedMenu.scss";

import Image from "next/image";

type GeneratedMenuProps = {
    generatedMenu: string;
    onRegenerate?:() => void;
};

const GeneratedMenu: React.FC<GeneratedMenuProps> = ({ generatedMenu , onRegenerate}) => {
    return (
        <div>
            <div className="flex flex-col items-start p-2">
                <div className="flex items-start">
                    <div className="mr-2">
                        <div style={{width: '50px', height: '50px', backgroundColor: 'transparent'}}></div>
                    </div>
                    <div className="relative speech-bubble-ai bg-beige p-4 rounded-lg">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{generatedMenu}</ReactMarkdown>
                        <div className="flex justify-center pt-2">
                            <button
                                onClick={onRegenerate}
                                className="px-4 py-2 bg-gray-500 text-white rounded-full"
                            >
                                ↻ Regenerate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratedMenu;
