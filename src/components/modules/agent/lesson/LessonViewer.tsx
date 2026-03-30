'use client';

import { getFileUrl  } from '@/utils/fileUrl';

type Lesson = {
  title: string;
  content?: string;
  type: 'TEXT' | 'VIDEO' | 'PDF' | 'AUDIO';
  videoUrl?: string;
  pdfUrl?: string;
  audioUrl?: string;
};

function getYouTubeEmbed(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtube.com')) {
      const v = parsed.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;

      if (parsed.pathname.includes('/shorts/')) {
        const id = parsed.pathname.split('/shorts/')[1];
        return `https://www.youtube.com/embed/${id}`;
      }
    }

    if (parsed.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }

    return null;
  } catch {
    return null;
  }
}

export default function LessonViewer({ lesson }: { lesson: Lesson }) {
  const embedUrl =
    lesson.videoUrl && lesson.videoUrl.includes('youtu')
      ? getYouTubeEmbed(lesson.videoUrl)
      : null;

  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">{lesson.title}</h2>

      {lesson.type === 'VIDEO' && lesson.videoUrl && (
        <>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-[400px] rounded-lg"
              allowFullScreen
            />
          ) : (
            <video
              controls
              className="w-full rounded-lg"
              src={getFileUrl(lesson.videoUrl)}
            />
          )}
        </>
      )}
      {lesson.type === 'AUDIO' && lesson.audioUrl && (
        <audio
          controls
          className="w-full"
          src={getFileUrl(lesson.audioUrl)}
        />
      )}

  
      {lesson.type === 'PDF' && lesson.pdfUrl && (
        <iframe
          src={getFileUrl(lesson.pdfUrl)}
          className="w-full h-[600px] border rounded-lg"
        />
      )}

      {lesson.type === 'TEXT' && (
        <p className="whitespace-pre-line text-gray-700">
          {lesson.content || 'No content'}
        </p>
      )}
    </div>
  );
}