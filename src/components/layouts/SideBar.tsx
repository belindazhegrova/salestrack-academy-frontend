'use client';

import { usePathname, useRouter } from 'next/navigation';

type Role = 'ADMIN' | 'AGENT';

type SidebarProps = {
  role: Role;
};

export default function SideBar({ role }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Courses', path: '/admin/courses' },
    { label: 'Assign Course', path: '/admin/assign' },
    { label: 'Agents', path: '/admin/agents' }
  ];

  const agentLinks = [
    { label: 'Dashboard', path: '/agent/dashboard' },
    { label: 'My Courses', path: '/agent/courses' },
    { label: 'Progress', path: '/agent/progress' },
  ];

  const links = role === 'ADMIN' ? adminLinks : agentLinks;

  const sidebarBg =
    role === 'ADMIN' ? 'bg-[var(--primary)]' : 'bg-emerald-700';

  const title = role === 'ADMIN' ? 'Admin Panel' : 'Learning Portal';

  return (
    <aside className={`w-64 min-h-screen text-white flex flex-col p-5 ${sidebarBg}`}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">SalesTrack</h2>
        <p className="text-sm text-white/80 mt-1">{title}</p>
      </div>

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.path;

          return (
            <button
              key={link.path}
              onClick={() => router.push(link.path)}
              className={`text-left px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-white text-black font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}