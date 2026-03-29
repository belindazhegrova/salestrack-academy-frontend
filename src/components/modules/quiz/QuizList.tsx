'use client';

import { deleteQuestion, type QuizQuestion } from '@/features/quiz/quiz.service';

export default function QuizList({
  questions,
  onRefresh,
}: {
  questions: QuizQuestion[];
  onRefresh: () => void;
}) {
  const handleDelete = async (id: string) => {
    await deleteQuestion(id);
    onRefresh(); 
  };

  return (
    <div className="card">
      <h2 className="section-title mb-4">Questions</h2>

      {questions.length === 0 && (
        <p className="text-gray-500">No questions yet</p>
      )}

      {questions.map((q) => (
        <div key={q.id} className="border-b py-3">
          <p className="font-medium">{q.title}</p>

          <ul className="ml-4 mt-2 space-y-1">
            {q.answers.map((a) => (
              <li key={a.id}>
                {a.text}{' '}
                {a.isCorrect && (
                  <span className="text-green-500 font-semibold">
                    ✔ Correct
                  </span>
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleDelete(q.id)}
            className="text-red-500 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}