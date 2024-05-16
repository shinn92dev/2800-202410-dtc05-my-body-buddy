import Image from "next/image";
import "./AiLines.scss";

type AiLinesProps = {
    messageTitle: string;
    messageBody: string;
};

export default function AiLines({ messageTitle, messageBody }: AiLinesProps) {
    // convert '\n' to <br> tag
    const formattedMessageBody = messageBody.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));

    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex items-start mb-4">
                <div className="mr-2">
                    <Image src="/my_boddy_buddy_support_ai_logo.jpg" alt="support AI logo" width={75} height={75} />
                </div>
                <div className="relative speech-bubble bg-beige p-4 rounded-lg">
                    <h2 className="font-bold text-lg">{messageTitle}</h2>
                    <p>{formattedMessageBody}</p>
                </div>
            </div>
        </div>
    );
}