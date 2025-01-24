'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const pages = {
  // Instagram pages
  'instagram-transcripts': {
    title: 'Long transcripts into snappy Instagram posts',
    description: 'Transform lengthy transcripts into engaging, concise Instagram posts that capture attention.',
  },
  'instagram-captions': {
    title: 'Writes Instagram captions from Reel scripts or image descriptions/context',
    description: 'Create compelling captions for your Reels and images that drive engagement.',
  },
  'instagram-notes': {
    title: 'Personal notes into shareable Instagram moments',
    description: 'Convert your personal notes into Instagram-worthy content that resonates with your audience.',
  },
  'instagram-hashtags': {
    title: 'Written content into trendy Instagram hashtags',
    description: 'Generate relevant and trending hashtags to increase your content visibility.',
  },
  'instagram-trending': {
    title: 'Text transcripts into trending Instagram hashtags',
    description: 'Transform your transcripts into popular hashtags that boost your reach.',
  },

  // LinkedIn pages
  'linkedin-blog': {
    title: 'Converting blog to inspirational professional LinkedIn post',
    description: 'Transform your blog content into engaging LinkedIn posts that inspire professionals.',
  },
  'linkedin-ideas': {
    title: 'Converting ideas into thought-provoking LinkedIn posts',
    description: 'Turn your ideas into compelling LinkedIn content that sparks professional discussions.',
  },
  'linkedin-transcript': {
    title: 'Extracts salient 500-word transcript excerpts for LinkedIn',
    description: 'Extract and refine the most important parts of your transcript for LinkedIn.',
  },
  'linkedin-articles': {
    title: 'Converts articles to professional LinkedIn posts',
    description: 'Transform articles into LinkedIn-optimized content that maintains expertise.',
  },
  'linkedin-thoughts': {
    title: 'Scattered thoughts into engaging LinkedIn posts',
    description: 'Convert your thoughts into cohesive, professional LinkedIn content.',
  },

  // Marketing pages
  'marketing-announcements': {
    title: 'Converts notes into new product announcements',
    description: 'Transform your notes into compelling product announcements that drive interest.',
  },
  'marketing-cta': {
    title: 'This spiral converts calls to action into engaging, actionable styles',
    description: 'Create powerful calls-to-action that convert and engage your audience.',
  },
  'marketing-email': {
    title: 'Rough email sequence outline into strategic email sequences',
    description: 'Convert rough outlines into strategic email sequences that nurture leads.',
  },
  'marketing-summary': {
    title: 'Here is a 6 word summary for the spiral: Summarizing multiple calls-to-action to one',
    description: 'Create concise, powerful summaries from multiple calls-to-action.',
  },
  'marketing-essays': {
    title: 'Converting Twitter calls-to-action to clickable essays',
    description: 'Transform Twitter CTAs into persuasive, long-form content.',
  },

  // Podcast pages
  'podcast-insights': {
    title: 'Distilling podcast insights into concise takeaways',
    description: 'Extract valuable insights from your podcast into clear, actionable takeaways.',
  },
  'podcast-notes': {
    title: 'Transcripts And Notes into Audience-Tailored Podcast Shownotes',
    description: 'Convert your transcripts into engaging show notes that resonate with your audience.',
  },
  'podcast-intros': {
    title: 'Converting pod transcripts to engaging intro snippets',
    description: 'Create compelling podcast intros that hook your listeners from the start.',
  },
  'podcast-titles': {
    title: 'In-depth podcast content into attention-grabbing titles',
    description: 'Generate captivating titles that make your podcast stand out.',
  },
  'podcast-summaries': {
    title: 'Generating engaging podcast episode summaries',
    description: 'Create compelling episode summaries that drive listener interest.',
  },
} as const;

export default function CreatePage({ params }: { params: Promise<{ type: string }> }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const router = useRouter();
  const resolvedParams = React.use(params);
  const pageInfo = pages[resolvedParams.type as keyof typeof pages];

  if (!pageInfo) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedText('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: resolvedParams.type,
          content: input,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setGeneratedText(data.text);
    } catch (err: any) {
      setError(err.message || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <button 
        onClick={() => router.push('/')}
        className="mb-8 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-2">{pageInfo.title}</h1>
      <p className="text-gray-600 mb-8">{pageInfo.description}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your content here..."
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate'
          )}
        </button>
      </form>

      {generatedText && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Generated Content</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="whitespace-pre-wrap">{generatedText}</p>
            <button
              onClick={() => navigator.clipboard.writeText(generatedText)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 