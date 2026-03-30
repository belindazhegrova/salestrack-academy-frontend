'use client';

type Lesson = {
  title: string;
  content?: string;
  type: 'TEXT' | 'VIDEO' | 'PDF' | 'AUDIO';
  videoUrl?: string;
  pdfUrl?: string;
  audioUrl?: string;
};

export default function LessonViewerAgent({ lesson }: { lesson: Lesson }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">{lesson.title}</h2>

      {lesson.type === 'VIDEO' && lesson.videoUrl && (
        <video
          controls
          className="w-full rounded-lg"
          src={lesson.videoUrl}
        />
      )}

      {lesson.type === 'AUDIO' && lesson.audioUrl && (
        <audio controls className="w-full" src={lesson.audioUrl} />
      )}
      {lesson.type === 'PDF' && lesson.pdfUrl && (
        <iframe
          src={lesson.pdfUrl}
          className="w-full h-[600px] border rounded-lg"
          title={lesson.title}
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