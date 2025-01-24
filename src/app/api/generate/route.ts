import { NextResponse } from 'next/server';

const PROMPTS = {
  // Instagram prompts
  'instagram-transcripts': "Transform this long transcript into a concise, engaging Instagram post that captures attention:",
  'instagram-captions': "Create an engaging Instagram caption from this Reel script or image description that drives engagement:",
  'instagram-notes': "Convert these personal notes into a shareable Instagram moment that resonates with followers:",
  'instagram-hashtags': "Generate trendy and relevant Instagram hashtags for this written content:",
  'instagram-trending': "Transform this text transcript into trending Instagram hashtags that increase visibility:",
  
  // LinkedIn prompts
  'linkedin-blog': "Convert this blog post into an inspirational, professional LinkedIn post that provides value:",
  'linkedin-ideas': "Transform these ideas into thought-provoking LinkedIn posts that spark professional discussion:",
  'linkedin-transcript': "Extract and refine the most salient 500 words from this transcript for a LinkedIn post:",
  'linkedin-articles': "Convert this article into a professional LinkedIn post that maintains expertise:",
  'linkedin-thoughts': "Transform these scattered thoughts into an engaging, cohesive LinkedIn post:",
  
  // Marketing prompts
  'marketing-announcements': "Convert these notes into a compelling product announcement that drives interest:",
  'marketing-cta': "Transform this call-to-action into an engaging, actionable style that converts:",
  'marketing-email': "Convert this rough outline into a strategic email sequence that nurtures leads:",
  'marketing-summary': "Create a concise, powerful summary of these multiple calls-to-action:",
  'marketing-essays': "Transform these Twitter calls-to-action into persuasive, clickable essays:",
  
  // Podcast prompts
  'podcast-insights': "Distill these podcast insights into clear, concise takeaways that provide value:",
  'podcast-notes': "Convert these transcripts and notes into audience-tailored podcast show notes:",
  'podcast-intros': "Transform this podcast transcript into an engaging intro snippet that hooks listeners:",
  'podcast-titles': "Create attention-grabbing titles from this in-depth podcast content:",
  'podcast-summaries': "Generate an engaging episode summary from this podcast content that drives interest:",
  contrarian: "Transform this article into a contrarian, punchy tweet that challenges conventional wisdom while maintaining credibility:",
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
        model: 'deepseek-reasoner',
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

      // Double-check it in the logs:
      console.log("Using the following model for request:", requestBody.model);

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