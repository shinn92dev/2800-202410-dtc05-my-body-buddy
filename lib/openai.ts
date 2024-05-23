import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateAlternativeWorkout = async (prompt: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: 'user', content: prompt }],
        });
        const messageContent = response.choices?.[0]?.message?.content;
        if (!messageContent) {
            throw new Error('No content in response from OpenAI');
        }
        return messageContent.trim();
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw new Error('OpenAI API request failed');
    }
};
