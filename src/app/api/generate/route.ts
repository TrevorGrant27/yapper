import { NextResponse } from 'next/server';

const PROMPTS = {
  contrarian: "Transform this article into a contrarian, punchy tweet that challenges conventional wisdom while maintaining credibility:",
  podcast: "Convert this podcast transcript into an engaging promotional tweet that captures the key insight and drives listener interest:",
  thread: "Create a conversational yet authoritative Twitter thread from this transcript, maintaining expertise while being approachable:",
  newsletter: "Transform this newsletter content into a series of connected, engaging tweets that maintain the core message:",
  general: "Convert this text into a tweet-friendly format that's engaging and shareable:"
};

export async function POST(request: Request) {
  console.log('Starting API request...');
  
  try {
    const { type, content } = await request.json();
    console.log('Request type:', type);
    console.log('Content length:', content?.length);
    
    const apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
    console.log('API Key configured:', !!apiKey);
    console.log('API Key starts with:', apiKey?.slice(0, 10));
    
    if (!apiKey) {
      console.error('Deepseek API key is not configured');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    if (!PROMPTS[type as keyof typeof PROMPTS]) {
      console.error(`Invalid type provided: ${type}`);
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const prompt = PROMPTS[type as keyof typeof PROMPTS];
    console.log('Using prompt for type:', type);
    
    try {
      console.log('Making API request to Deepseek...');
      const requestBody = {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at converting content into engaging tweets and Twitter threads.'
          },
          {
            role: 'user',
            content: `${prompt}\n\n${content}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      };
      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify(requestBody),
        cache: 'no-store'
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));

      if (!response.ok) {
        console.error('API Error Response:', data);
        throw new Error(data.error?.message || `API request failed with status ${response.status}`);
      }

      if (!data.choices?.[0]?.message?.content) {
        console.error('No content in API response:', data);
        throw new Error('No content generated');
      }

      console.log('Successfully generated content');
      return NextResponse.json({ 
        text: data.choices[0].message.content 
      });
    } catch (apiError: any) {
      console.error('Deepseek API error:', {
        error: apiError,
        message: apiError.message,
        stack: apiError.stack
      });
      throw apiError;
    }
  } catch (error: any) {
    console.error('Generation error:', {
      error,
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to generate content',
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          stack: error.stack,
          name: error.name
        } : undefined
      },
      { status: 500 }
    );
  }
} 