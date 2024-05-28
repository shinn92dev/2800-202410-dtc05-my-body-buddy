import Image from "next/image";
import "@/components/global/AiLines.scss";

// Type definition for AiLines props
type AiLinesProps = {
    messageTitle?: string; // Optional message title
    messageBody: string;   // Required message body
};

// AiLines component
export default function AiLines({ messageTitle, messageBody }: AiLinesProps) {
    // Convert '\n' to <br> tags for line breaks
    const formattedMessageBody = messageBody.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));

    return (
        <div className="flex flex-col items-start p-2">
            <div className="flex items-start">
                <div className="mr-2">
                    <Image src="/my_boddy_buddy_support_ai_logo.png" className={"support-ai-logo"} alt="support AI logo" width={50} height={50} />
                </div>
                <div className="relative speech-bubble-ai bg-beige p-4 rounded-lg">
                    {messageTitle && <h2 className="font-bold text-lg">{messageTitle}</h2>}
                    <p>{formattedMessageBody}</p>
                </div>
            </div>
        </div>
    );
}
