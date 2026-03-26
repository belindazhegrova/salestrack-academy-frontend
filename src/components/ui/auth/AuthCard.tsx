'use client';

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-5">
      {children}
    </div>
  );
}