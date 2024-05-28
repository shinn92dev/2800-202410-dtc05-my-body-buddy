import React from 'react';
import AiLines from '@/components/global/AiLines';
import ReactMarkdown from 'react-markdown';
import "@/components/global/AiLines.scss";

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
            <AiLines messageBody={"Generating meal menus that meet your preferences..."}/>
            <div className="flex flex-col items-start p-2">
                <div className="flex items-start">
                    <div className="mr-2">
                        <div style={{width: '75px', height: '75px', backgroundColor: 'transparent'}}></div>
                    </div>
                    <div className="relative speech-bubble-ai bg-beige p-4 rounded-lg">
                        <ReactMarkdown>{generatedMenu}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratedMenu;
