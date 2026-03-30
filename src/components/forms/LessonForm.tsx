'use client';

import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

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
  const [videoUrl, setVideoUrl] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    if (type === 'VIDEO') {
      if (file) {
        formData.append('video', file);
      } else if (videoUrl.trim()) {
        formData.append('videoUrl', videoUrl);
      } else {
        alert('Upload video or paste YouTube link');
        return;
      }
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
    setVideoUrl('');
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

      {type === 'TEXT' && (
        <textarea
          className="input"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}


      {type === 'VIDEO' && (
        <div className="space-y-3">
          <div
            className="input flex items-center justify-between gap-3 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Upload size={18} className="text-gray-500 shrink-0" />
              <span className="text-gray-700 truncate">
                {file ? file.name : 'Upload video'}
              </span>
            </div>

            <span className="text-sm text-gray-500 shrink-0">Browse</span>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="video/*"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setVideoUrl('');
              }}
            />
          </div>

          <div className="text-center text-gray-400 text-sm">OR</div>

          <input
            className="input"
            placeholder="Paste YouTube link"
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              setFile(null);
            }}
          />
        </div>
      )}
      {(type === 'PDF' || type === 'AUDIO') && (
        <div
          className="input flex items-center justify-between gap-3 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <span>{file ? file.name : 'Upload file'}</span>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
      )}

      <button className="btn btn-primary" onClick={handleSubmit}>
        Add Lesson
      </button>
    </div>
  );
}