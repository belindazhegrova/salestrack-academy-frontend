'use client';

import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

type CourseFormProps = {
  onSubmit: (formData: FormData) => void | Promise<void>;
  loading: boolean;
};

export function CourseForm({ onSubmit, loading }: CourseFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="card space-y-4">
      <h2 className="text-xl font-semibold">Create Course</h2>

      <div className="grid gap-4 md:grid-cols-3">
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

        <div
          className="input flex items-center justify-between gap-3 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Upload size={18} className="text-gray-500 shrink-0" />
            <span className="text-gray-700 truncate">
              {file ? file.name : 'Choose thumbnail'}
            </span>
          </div>

          <span className="text-sm text-gray-500 shrink-0">Browse</span>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create'}
      </button>
    </div>
  );
}