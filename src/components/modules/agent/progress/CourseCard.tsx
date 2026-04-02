import { EnrollmentCourse } from '@/features/enrollment/enrollment.service';

export default function CourseCard({
  item,
  downloadingId,
  onDownload,
}: {
  item: EnrollmentCourse;
  downloadingId: string | null;
  onDownload: (id: string) => void;
}) {
  const totalLessons = item.course.lessons.length;
  const completedLessons = Math.round(
    (item.progress / 100) * totalLessons
  );

  const status = item.completed
    ? 'Completed'
    : item.progress > 0
    ? 'In Progress'
    : 'Not Started';

  const passed = (item.quizScore ?? 0) >= 80;
  const canDownload = item.completed && passed;
  const isDownloading = downloadingId === item.id;

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {item.course.title}
        </h2>

        <span
          className={`text-sm font-medium ${
            item.completed ? 'text-green-600' : 'text-gray-500'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded h-2 mt-3 mb-3">
        <div
          className="h-2 rounded"
          style={{
            width: `${item.progress}%`,
            backgroundColor: 'var(--agent)',
          }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <p>
          <span className="text-gray-500">Progress:</span>{' '}
          <span className="font-medium text-agent">
            {item.progress}%
          </span>
        </p>

        <p>
          <span className="text-gray-500">Lessons:</span>{' '}
          {completedLessons} / {totalLessons}
        </p>

        {item.quizScore != null && (
          <p>
            <span className="text-gray-500">Quiz:</span>{' '}
            <span
              className={
                passed
                  ? 'text-green-600 font-medium'
                  : 'text-red-600 font-medium'
              }
            >
              {item.quizScore}% ({passed ? 'Passed' : 'Failed'})
            </span>
          </p>
        )}
      </div>

      {canDownload && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => onDownload(item.id)}
            disabled={isDownloading}
            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-70 flex items-center gap-2"
          >
            {isDownloading && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {isDownloading
              ? 'Downloading...'
              : 'Download Certificate'}
          </button>
        </div>
      )}
    </div>
  );
}