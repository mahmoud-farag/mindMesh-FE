# MindMesh Frontend

A modern React-based web application that provides an intelligent study assistant interface. Students can upload documents, generate flashcards, take quizzes, and interact with AI to enhance their learning experience.

## 🚀 Features

### Core Features
- **📚 Document Management**: Upload and manage PDF study materials
- **🎴 Flashcard System**: 
  - AI-generated flashcards from documents
  - Interactive flip cards with questions and answers
  - Favorite/bookmark important flashcards
  - Organized by flashcard sets
- **📝 Quiz System**:
  - AI-generated multiple-choice quizzes
  - Real-time quiz taking with instant feedback
  - Score tracking and performance history
  - Review correct/incorrect answers
- **💬 AI Chat**: 
  - Chat with your documents using AI
  - Get explanations for complex concepts
  - Context-aware responses based on document content
- **📊 Dashboard**: 
  - Recent activity tracking
  - Quick access to documents, flashcards, and quizzes
  - Learning progress overview
- **👤 User Profile**: 
  - Account management
  - Password change functionality
  - User preferences

### UI/UX Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Support**: Eye-friendly dark theme
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Toast Notifications**: Real-time feedback for user actions
- **Protected Routes**: Secure authentication flow
- **Markdown Support**: Rich text rendering for AI responses

## 🛠️ Tech Stack

### Core
- **React 19**: Latest React with hooks and modern features
- **Vite**: Fast build tool and development server
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API requests

### UI & Styling
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **React Hot Toast**: Elegant toast notifications
- **React Markdown**: Markdown rendering with syntax highlighting
- **React Syntax Highlighter**: Code syntax highlighting

### Development Tools
- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **Vite Plugin ESLint**: ESLint integration with Vite

## 📋 Prerequisites

- Node.js v18 or higher
- npm or yarn package manager
- Backend API running (see mindMesh-BE)

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/mindMesh-FE.git
cd mindMesh-FE
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file in the root directory (if needed):

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

**Note**: The API base URL is configured in `src/services/api.js`. Update it there if your backend runs on a different URL.

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5173` with hot module replacement.

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality.

## 📁 Project Structure

```
mindMesh-FE/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable React components
│   │   ├── auth/         # Authentication components
│   │   ├── common/       # Shared components (Navbar, Footer, etc.)
│   │   ├── dashboard/    # Dashboard widgets
│   │   ├── documents/    # Document-related components
│   │   ├── flashCards/   # Flashcard components
│   │   └── quizzes/      # Quiz components
│   ├── context/          # React Context providers
│   │   ├── AuthContext.jsx        # Authentication state
│   │   ├── DocumentContext.jsx    # Document management
│   │   ├── FlashCardContext.jsx   # Flashcard state
│   │   └── QuizContext.jsx        # Quiz state
│   ├── pages/            # Page components
│   │   ├── auth/         # Login, Register
│   │   ├── dashboard/    # Dashboard page
│   │   ├── documents/    # Document pages
│   │   ├── flashCards/   # Flashcard pages
│   │   ├── quizzes/      # Quiz pages
│   │   ├── userProfile/  # User profile page
│   │   └── notFound/     # 404 page
│   ├── services/         # API service layer
│   │   ├── api.js               # Axios instance
│   │   ├── auth-service.js      # Authentication API
│   │   ├── document-service.js  # Document API
│   │   ├── flashcard-service.js # Flashcard API
│   │   ├── quiz-service.js      # Quiz API
│   │   └── ai-service.js        # AI features API
│   ├── utils/            # Utility functions
│   │   ├── constants.js         # App constants
│   │   ├── helpers.js           # Helper functions
│   │   └── validators.js        # Form validators
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # App entry point
│   └── index.css         # Global styles
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
└── package.json
```

## 🎨 Key Components

### Authentication
- **LoginPage**: User login with JWT authentication
- **RegisterPage**: New user registration
- **ProtectedRoute**: Route guard for authenticated pages

### Documents
- **DocumentsPage**: List all uploaded documents
- **DocumentDetailsPage**: View document details and AI actions
- **UploadDocument**: PDF upload component
- **AIActionsTab**: Generate flashcards, quizzes, summaries, and chat

### Flashcards
- **FlashCardsPage**: List all flashcard sets
- **FlashCardsViewer**: Interactive flashcard viewer with flip animation
- **FlashCardItem**: Individual flashcard component

### Quizzes
- **QuizzesPage**: List all quizzes
- **QuizTaker**: Interactive quiz taking interface
- **QuizResults**: Display quiz results and review answers

### Dashboard
- **DashboardPage**: Overview of recent activity
- **RecentActivity**: Recent documents, flashcards, and quizzes
- **QuickActions**: Quick access to common features

## 🔐 Authentication Flow

1. User registers or logs in
2. JWT token stored in localStorage
3. Token included in all API requests via Axios interceptor
4. Protected routes check for valid token
5. Automatic logout on token expiration

## 🌐 API Integration

All API calls are centralized in the `services/` directory:

```javascript
// Example: Using the document service
import documentService from '@/services/document-service';

// Upload a document
const formData = new FormData();
formData.append('pdf', file);
const response = await documentService.uploadDocument(formData);

// Get all documents
const documents = await documentService.getDocuments();
```

### Available Services
- **authService**: Login, register, profile management
- **documentService**: Document CRUD operations
- **flashcardService**: Flashcard management
- **quizService**: Quiz operations and submissions
- **aiService**: AI-powered features (chat, explanations, generation)

## 🎨 Styling

### Tailwind CSS
The app uses Tailwind CSS 4 for styling. Custom configurations are in `tailwind.config.js`.

### Dark Mode
Dark mode is implemented using Tailwind's dark mode utilities. Toggle is available in the navbar.

### Custom Styles
Global styles and CSS variables are defined in `index.css`.

## 🔄 State Management

### Context API
The app uses React Context for global state management:

- **AuthContext**: User authentication state
- **DocumentContext**: Document list and current document
- **FlashCardContext**: Flashcard sets and favorites
- **QuizContext**: Quiz data and results

### Local State
Component-level state is managed with `useState` and `useReducer` hooks.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧪 Development Best Practices

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- React hooks best practices
- Component composition patterns

### Performance
- Lazy loading for routes
- Memoization with `useMemo` and `useCallback`
- Optimized re-renders
- Code splitting

### Security
- JWT token management
- Protected routes
- Input validation
- XSS prevention

## 🚀 Deployment

### Build the Application
```bash
npm run build
```

### Deploy to Hosting Service
The `dist/` folder can be deployed to:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **AWS S3 + CloudFront**: Upload `dist/` to S3
- **GitHub Pages**: Use `gh-pages` package

### Environment Variables
Set the following in your hosting platform:
- `VITE_API_BASE_URL`: Your backend API URL

## 🐛 Troubleshooting

### API Connection Issues
- Verify backend is running
- Check API base URL in `src/services/api.js`
- Ensure CORS is configured on backend

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Authentication Issues
- Clear localStorage: `localStorage.clear()`
- Check token expiration
- Verify JWT_SECRET matches backend

## 📚 Key Features Guide

### Uploading Documents
1. Navigate to Documents page
2. Click "Upload Document"
3. Select PDF file
4. Document is uploaded to S3 and processed

### Creating Flashcards
1. Open a document
2. Go to "AI Actions" tab
3. Click "Generate Flashcards"
4. AI creates flashcards from document content

### Taking Quizzes
1. Navigate to Quizzes page
2. Select a quiz
3. Answer questions
4. Submit for instant results and review

### Chatting with Documents
1. Open a document
2. Go to "AI Actions" tab
3. Use the chat interface
4. Ask questions about the document

## 🔄 Future Enhancements

- [ ] Offline support with service workers
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Voice input for chat
- [ ] Export flashcards to Anki format

## 📄 License

ISC

## 👨‍💻 Author

Mahmoud Farag

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the development team.
