'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Card {
  id: string;
  title: string;
  route: string;
}

interface Category {
  id: string;
  name: string;
  cards: Card[];
}

interface Tab {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const AppPage = () => {
  const [activeTab, setActiveTab] = useState('create');

  const tabs: Tab[] = [
    {
      id: 'create',
      name: 'Create',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      id: 'history',
      name: 'History',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'saved',
      name: 'Saved',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const categories: Category[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      cards: [
        { id: 'long-transcripts', title: 'Long transcripts into snappy Instagram posts', route: '/create/instagram-transcripts' },
        { id: 'reel-captions', title: 'Writes Instagram captions from Reel scripts or image descriptions/context', route: '/create/instagram-captions' },
        { id: 'personal-notes', title: 'Personal notes into shareable Instagram moments', route: '/create/instagram-notes' },
        { id: 'written-content', title: 'Written content into trendy Instagram hashtags', route: '/create/instagram-hashtags' },
        { id: 'text-transcripts', title: 'Text transcripts into trending Instagram hashtags', route: '/create/instagram-trending' },
      ]
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      cards: [
        { id: 'blog-post', title: 'Converting blog to inspirational professional LinkedIn post', route: '/create/linkedin-blog' },
        { id: 'ideas', title: 'Converting ideas into thought-provoking LinkedIn posts', route: '/create/linkedin-ideas' },
        { id: 'transcript', title: 'Extracts salient 500-word transcript excerpts for LinkedIn', route: '/create/linkedin-transcript' },
        { id: 'articles', title: 'Converts articles to professional LinkedIn posts', route: '/create/linkedin-articles' },
        { id: 'thoughts', title: 'Scattered thoughts into engaging LinkedIn posts', route: '/create/linkedin-thoughts' },
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing',
      cards: [
        { id: 'product-announcements', title: 'Converts notes into new product announcements', route: '/create/marketing-announcements' },
        { id: 'cta', title: 'This spiral converts calls to action into engaging, actionable styles', route: '/create/marketing-cta' },
        { id: 'email-sequence', title: 'Rough email sequence outline into strategic email sequences', route: '/create/marketing-email' },
        { id: 'summary', title: 'Here is a 6 word summary for the spiral: Summarizing multiple calls-to-action to one', route: '/create/marketing-summary' },
        { id: 'clickable', title: 'Converting Twitter calls-to-action to clickable essays', route: '/create/marketing-essays' },
      ]
    },
    {
      id: 'podcast',
      name: 'Podcast',
      cards: [
        { id: 'insights', title: 'Distilling podcast insights into concise takeaways', route: '/create/podcast-insights' },
        { id: 'notes', title: 'Transcripts And Notes into Audience-Tailored Podcast Shownotes', route: '/create/podcast-notes' },
        { id: 'intros', title: 'Converting pod transcripts to engaging intro snippets', route: '/create/podcast-intros' },
        { id: 'titles', title: 'In-depth podcast content into attention-grabbing titles', route: '/create/podcast-titles' },
        { id: 'summaries', title: 'Generating engaging podcast episode summaries', route: '/create/podcast-summaries' },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">Yapper</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
          <div className="p-4 border-t">
            <button className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'create' && (
            <div className="space-y-12">
              {categories.map((category) => (
                <div key={category.id} className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">{category.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {category.cards.map((card) => (
                      <Link
                        key={card.id}
                        href={card.route}
                        className="group block p-4 rounded-xl bg-white hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 text-gray-600">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </div>
                            <div className="w-5 h-5 text-gray-600">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-900">{card.title}</h3>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'history' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">History</h2>
              <p className="text-gray-600">Your generation history will appear here.</p>
            </div>
          )}
          {activeTab === 'saved' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Saved Items</h2>
              <p className="text-gray-600">Your saved items will appear here.</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-gray-600">Account and application settings will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppPage;
