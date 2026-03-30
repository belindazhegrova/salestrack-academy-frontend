'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import QuizForm from '@/components/forms/QuizForm';
import QuizList from '@/components/modules/quiz/QuizList';
import { getQuestions, type QuizQuestion } from '@/features/quiz/quiz.service';

export default function Page() {
  const params = useParams();
  const courseId = params.id as string;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions(courseId);
      setQuestions(data ?? []);
    } catch (err) {
      console.error(err);
      setQuestions([]);
    }
  };

  useEffect(() => {
    if (!courseId) return;

    const load = async () => {
      setLoading(true);
      await fetchQuestions();
      setLoading(false);
    };

    load();
  }, [courseId]);

  if (loading) return <div>Loading quiz...</div>;

  return (
    <div className="space-y-6">
      <QuizForm
        courseId={courseId} // ✅ FIX
        onSuccess={fetchQuestions}
      />

      <QuizList
        questions={questions}
        onRefresh={fetchQuestions}
      />
    </div>
  );
}