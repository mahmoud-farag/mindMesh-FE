import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';


import LoginPage from './pages/auth/Login-page';
import RegisterPage from './pages/auth/Register-page';
import DashboardPage from './pages/dashboard/Dashboard-page';
import DocumentListPage from './pages/documents/DocumentList-page';
import DocumentDetailsPage from './pages/documents/DocumentDetails-page';
import FlashCardListPage from './pages/flashCards/FlashCardList-page';
import FLashCardDetailsPage from './pages/flashCards/FLashCardDetails-page';
import QuizTakePage from './pages/quizzes/QuizTake-Page';
import QuizResultPage from './pages/quizzes/QuizResult-Page';
import UserProfilePage from './pages/userProfile/UserProfile-page';
import NotFoundPage from './pages/notFound/NotFound-page';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './context/authContext';
import { AIActionsTab, ChatTab, ContentTab, FlashcardsTab, QuizzesTab } from './components/documents/tabs';

function App() {


  const { isAuthenticated } = useAuth();



  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/documents" element={<DocumentListPage />} />

          <Route path="/documents/:id" element={<DocumentDetailsPage />}>

            <Route index  element={<Navigate to='content' replace/>} />

            <Route path="content" element={<ContentTab />} />
            <Route path="ai-actions" element={<AIActionsTab />} />
            <Route path="flashcard-study" element={<FlashcardsTab />} />
            <Route path="quizzes-study" element={<QuizzesTab />} />
            <Route path="chat" element={<ChatTab />} />
            
          </Route>

          <Route
            path="/documents/:id/flashcards"
            element={<FLashCardDetailsPage />}
          />

          <Route path="/flashcards" element={<FlashCardListPage />} />

          <Route path="/quizzes/:id" element={<QuizTakePage />} />

          <Route path="/quizzes/:id/result" element={<QuizResultPage />} />

          <Route path="/flashcards" element={<FlashCardListPage />} />

          <Route path="/profile" element={<UserProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
