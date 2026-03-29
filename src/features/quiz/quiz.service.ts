import { apiFetch } from '@/services/api';

export type QuizAnswer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  id: string;
  title: string;
  lessonId: string;
  answers: QuizAnswer[];
  createdAt?: string;
};

export type CreateQuestionPayload = {
  title: string;
  lessonId: string;
  answers: {
    text: string;
    isCorrect: boolean;
  }[];
};

export const createQuestion = (data: CreateQuestionPayload) =>
  apiFetch<QuizQuestion>('/quiz', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getQuestions = (lessonId: string) =>
  apiFetch<QuizQuestion[]>(`/quiz?lessonId=${lessonId}`);

export const deleteQuestion = (id: string) =>
  apiFetch(`/quiz/${id}`, {
    method: 'DELETE',
  });