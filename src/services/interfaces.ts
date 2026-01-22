import { ToastOptions } from "react-hot-toast";

export type options = {
    [key: string]: any;
};

export interface IResponse<T = undefined> {
    success: boolean;
    message?: string;
    data?: T;

}


export interface IDashboardOverview {
    totalDocuments: number;
    totalFlashcardSets: number;
    totalFlashcards: number;
    reviewedFlashcards: number;
    starredFlashcards: number;
    totalQuizzes: number;
    completedQuizzes: number;
    averageScore: string | number;
}

export interface IRecentDocument {
    _id: string;
    title: string;
    originalFileName: string;
    lastAccessed: string;
    status: string;
}

export interface IRecentQuiz {
    _id: string;
    title: string;
    score: number;
    totalQuestions: number;
    completedAt: string;
    lastAttempted: string;
    document?: {
        _id: string;
        title: string;
    };
}

export interface IDashboardData {
    overview: IDashboardOverview;
    recentActivity: {
        documents: IRecentDocument[];
        quizzes: IRecentQuiz[];
    };
}

export interface IToastService {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
};

