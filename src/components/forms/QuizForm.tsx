'use client';

import { useState } from 'react';
import { createQuestion } from '@/features/quiz/quiz.service';

type Answer = {
  text: string;
  isCorrect: boolean;
};

export default function QuizForm({ courseId, onSuccess }: { courseId: string, onSuccess: () => void; }) {
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);

  const addAnswer = () => {
    setAnswers([...answers, { text: '', isCorrect: false }]);
  };

  const removeAnswer = (index: number) => {
    if (answers.length <= 2) return; // minimum 2 answers
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const updateAnswerText = (index: number, value: string) => {
    const updated = [...answers];
    updated[index].text = value;
    setAnswers(updated);
  };

  const selectCorrect = (index: number) => {
    const updated = answers.map((a, i) => ({
      ...a,
      isCorrect: i === index,
    }));
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Question required');
      return;
    }

    const hasCorrect = answers.some((a) => a.isCorrect);
    if (!hasCorrect) {
      alert('Select a correct answer');
      return;
    }

    const hasEmpty = answers.some((a) => !a.text.trim());
    if (hasEmpty) {
      alert('All answers must be filled');
      return;
    }

    await createQuestion({
      title,
      courseId,
      answers,
    });

    onSuccess();
    setTitle('');
    setAnswers([
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ]);
    
  };

  return (
    <div className="card space-y-6">
      <h2 className="text-lg font-semibold">Add Question</h2>


      <input
        className="input"
        placeholder="Enter question..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />


      <div className="space-y-3">
        {answers.map((a, i) => (
          <div
            key={i}
            className="flex items-center gap-3 border p-2 rounded"
          >
           
            <input
              type="radio"
              name="correctAnswer"
              checked={a.isCorrect}
              onChange={() => selectCorrect(i)}
            />

          
            <input
              className="input flex-1"
              placeholder={`Answer ${i + 1}`}
              value={a.text}
              onChange={(e) => updateAnswerText(i, e.target.value)}
            />

         
            <button
              onClick={() => removeAnswer(i)}
              className="text-red-500 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      
      <button onClick={addAnswer} className="btn">
        + Add Answer
      </button>

   
      <button onClick={handleSubmit} className="btn btn-primary">
        Save Question
      </button>
    </div>
  );
}