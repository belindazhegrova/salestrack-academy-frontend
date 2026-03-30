'use client';

import { useState } from 'react';
import {
  submitQuiz,
  type QuizQuestion,
} from '@/features/quiz/quiz.service';

type Props = {
  questions: QuizQuestion[];
  courseId: string;
  onCompleted?: (score: number) => void;
};

export default function QuizSection({
  questions,
  courseId,
  onCompleted,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    passed: boolean;
  } | null>(null);

  const handleSelect = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert('Please answer all questions');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        courseId,
        answers: Object.entries(answers).map(([questionId, answerId]) => ({
          questionId,
          answerId,
        })),
      };

      const res = await submitQuiz(payload);

      setResult(res);

      if (onCompleted) {
        onCompleted(res.score);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-white border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quiz</h2>

      {questions.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="font-medium mb-2">{q.title}</p>

          {q.answers.map((a) => (
            <label
              key={a.id}
              className="flex items-center gap-2 mb-1 cursor-pointer"
            >
              <input
                type="radio"
                name={q.id}
                checked={answers[q.id] === a.id}
                onChange={() => handleSelect(q.id, a.id)}
              />
              {a.text}
            </label>
          ))}
        </div>
      ))}

      {!result && (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Quiz'}
        </button>
      )}

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <p className="text-lg font-semibold">
            Score: {result.score}%
          </p>

          <p
            className={
              result.passed
                ? 'text-green-600 font-semibold'
                : 'text-red-600 font-semibold'
            }
          >
            {result.passed ? 'Passed 🎉' : 'Failed ❌'}
          </p>
        </div>
      )}
    </div>
  );
}