# Yapper - AI-Powered Tweet Generator

Yapper is a modern web application that helps you transform various types of content into engaging tweets using AI. Whether you're looking to create contrarian takes, promote your podcast, or turn your newsletter into a tweet thread, Yapper has you covered.

## Features

- **Multiple Content Types**:
  - Contrarian tweets from articles
  - Podcast promotional tweets
  - Twitter threads from transcripts
  - Newsletter to tweet series conversion
  - General text to tweet conversion

- **AI-Powered**: Uses Deepseek's advanced AI models for intelligent content generation
- **User Authentication**: Secure Firebase authentication
- **Modern UI**: Built with Next.js and Tailwind CSS
- **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- Frontend/Backend: Next.js 15
- Styling: Tailwind CSS
- Authentication: Firebase Auth
- Database: Firebase Firestore
- AI Integration: Deepseek API
- Deployment: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- Deepseek API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yapper.git
   cd yapper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your Firebase and Deepseek API credentials in the `.env` file.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# AI Model Configuration
NEXT_PUBLIC_DEEPSEEK_API_KEY=your_deepseek_api_key
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The easiest way to deploy Yapper is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


