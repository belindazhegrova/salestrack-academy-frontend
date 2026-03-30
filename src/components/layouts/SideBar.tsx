'use client';

import { usePathname, useRouter } from 'next/navigation';

type Role = 'ADMIN' | 'AGENT';

type SidebarProps = {
  role: Role;
};

export default function SideBar({ role }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const sidebarClass =
    role === 'ADMIN' ? 'bg-[var(--primary)]' : 'bg-[var(--agent)]';

  const activeClass =
    role === 'ADMIN'
      ? 'bg-white text-[var(--primary)] font-semibold'
      : 'bg-white text-[var(--agent)] font-semibold';

  const adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Courses', path: '/admin/courses' },
    { label: 'Assign Course', path: '/admin/assign' },
    { label: 'Agents', path: '/admin/agents' },
  ];

  const agentLinks = [
    { label: 'Dashboard', path: '/agent/dashboard' },
    { label: 'My Courses', path: '/agent/courses' },
    { label: 'Progress', path: '/agent/progress' },
  ];

  const links = role === 'ADMIN' ? adminLinks : agentLinks;

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <aside
      className={`w-64 min-h-screen ${sidebarClass} text-white p-6 flex flex-col`}
    >
      <h2 className="text-2xl font-bold mb-8">SalesTrack</h2>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => router.push(link.path)}
            className={`w-full text-left px-4 py-3 rounded-xl transition font-medium ${
              isActive(link.path)
                ? activeClass
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}