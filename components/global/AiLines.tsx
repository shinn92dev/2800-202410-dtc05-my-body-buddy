import Image from "next/image";
import "@/components/global/AiLines.scss";

type AiLinesProps = {
    messageTitle?: string; // オプショナルにする
    messageBody: string;
};

export default function AiLines({ messageTitle, messageBody }: AiLinesProps) {
    // '\n' を <br> タグに変換
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
                    <Image src="/my_boddy_buddy_support_ai_logo.jpg" alt="support AI logo" width={75} height={75} />
                </div>
                <div className="relative speech-bubble-ai bg-beige p-4 rounded-lg">
                    {messageTitle && <h2 className="font-bold text-lg">{messageTitle}</h2>}
                    <p>{formattedMessageBody}</p>
                </div>
            </div>
        </div>
    );
}
