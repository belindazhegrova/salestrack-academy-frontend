'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import QuizForm from '@/components/forms/QuizForm';
import QuizList from '@/components/modules/quiz/QuizList';
import { getQuestions, type QuizQuestion } from '@/features/quiz/quiz.service';

export default function Page() {
  const params = useParams();
  const lessonId = params.lessonId as string;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const fetchQuestions = async () => {
    const data = await getQuestions(lessonId);
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, [lessonId]);

  return (
    <div className="space-y-6">
      <QuizForm lessonId={lessonId} onSuccess={fetchQuestions} />
      <QuizList questions={questions} onRefresh={fetchQuestions} />
    </div>
  );
}