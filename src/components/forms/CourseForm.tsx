'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';

type CourseFormProps = {
  onSubmit: (formData: FormData) => void | Promise<void>;
  loading: boolean;
};

export function CourseForm({ onSubmit, loading }: CourseFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert('All fields required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    if (file) {
      formData.append('thumbnail', file);
    }

    onSubmit(formData);

    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <div className="card space-y-4">
      <h2 className="text-xl font-semibold">Create Course</h2>

      <div className="grid gap-2 md:grid-cols-3">
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

          <div className="flex items-center gap-3">
          <Upload size={18} className="text-gray-500 " />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>
    

      <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
    </div>
  );
}