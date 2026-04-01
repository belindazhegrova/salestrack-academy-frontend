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
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError('All fields are required');
      return;
    }

    if (description.trim().length < 5) {
      setError('Description must be at least 5 characters');
      return;
    }

    try {
      setError('');

      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());

      if (file) {
        formData.append('thumbnail', file);
      }

      await onSubmit(formData);

      setTitle('');
      setDescription('');
      setFile(null);
      setError('');

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      const message =
        err?.response?.message?.[0] ||
        err?.message ||
        'Something went wrong';

      setError(message);
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
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
        />

        <input
          className="input"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (error) setError('');
          }}
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
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              if (error) setError('');
            }}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

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