'use client';

import { useState } from 'react';

type LessonFormProps = {
  onSubmit: (formData: FormData) => void | Promise<void>;
  courseId: string;
};

type LessonType = 'TEXT' | 'VIDEO' | 'PDF' | 'AUDIO';

export function LessonForm({ onSubmit, courseId }: LessonFormProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<LessonType>('TEXT');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Title required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('courseId', courseId);

    if (type === 'TEXT') {
      formData.append('content', content);
    }

    if (type === 'VIDEO' && file) {
      formData.append('video', file);
    }

    if (type === 'PDF' && file) {
      formData.append('pdf', file);
    }

    if (type === 'AUDIO' && file) {
      formData.append('audio', file);
    }

    onSubmit(formData);

    setTitle('');
    setContent('');
    setFile(null);
    setType('TEXT');
  };


  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Add Lesson</h2>

      <input
        className="input"
        placeholder="Lesson title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="input"
        value={type}
        onChange={(e) => setType(e.target.value as LessonType)}
      >
        <option value="TEXT">Text</option>
        <option value="VIDEO">Video</option>
        <option value="PDF">PDF</option>
        <option value="AUDIO">Audio</option>
      </select>

      {type === 'TEXT' ? (
        <textarea
          className="input"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      )}

      <button className="btn btn-primary" onClick={handleSubmit}>
        Add Lesson
      </button>
    </div>
  );
}