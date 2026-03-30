import { apiFetch } from '@/services/api';

export type Quiz = {
  id: string;
  courseId: string;
  passingScore: number;
};

export type QuizAnswer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  id: string;
  title: string;
  courseId: string;
  answers: QuizAnswer[];
  createdAt?: string;
};

export type CreateQuestionPayload = {
  title: string;
  courseId: string;
  answers: {
    text: string;
    isCorrect: boolean;
  }[];
};

export const getQuestions = (courseId: string) =>
  apiFetch<QuizQuestion[]>(`/quiz?courseId=${courseId}`);

export const getQuizByCourse = (courseId: string) =>
  apiFetch<Quiz>(`/quiz/course/${courseId}`);



export const createQuiz = (data: { courseId: string }) =>
  apiFetch<Quiz>('/quiz', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  export const createQuestion = (data: CreateQuestionPayload) =>
  apiFetch('/quiz', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const deleteQuestion = (id: string) =>
  apiFetch(`/quiz/${id}`, {
    method: 'DELETE',
  });