import type { NextApiRequest, NextApiResponse } from 'next';
import { generateAlternativeWorkout } from '@/lib/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { prompt } = req.body;
        if (!prompt) {
            res.status(400).json({ error: 'Prompt is required' });
            return;
        }

        try {
            const result = await generateAlternativeWorkout(prompt);
            res.status(200).json({ result });
        } catch (error) {
            console.error('Error generating workout alternative:', error);
            res.status(500).json({ error: 'Failed to generate workout alternative' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
