import React from 'react';
import AiLines from '@/components/global/AiLines';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import "@/components/global/AiLines.scss";
import "@/components/diet_ai_support/GeneratedMenu.scss";

import Image from "next/image";

type GeneratedMenuProps = {
    generatedMenu: string;
};

const GeneratedMenu: React.FC<GeneratedMenuProps> = ({ generatedMenu }) => {
    // const formattedGeneratedMenu = generatedMenu.split('\n').map((line, index) => (
    //     <span key={index}>
    //         {line}
    //         <br />
    //     </span>
    // ));

    return (
        <div>
            <div className="flex flex-col items-start p-2">
                <div className="flex items-start">
                    <div className="mr-2">
                        <div style={{width: '50px', height: '50px', backgroundColor: 'transparent'}}></div>
                    </div>
                    <div className="relative speech-bubble-ai bg-beige p-4 rounded-lg">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{generatedMenu}</ReactMarkdown>
                        {/*<span>{formattedGeneratedMenu}</span>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratedMenu;
