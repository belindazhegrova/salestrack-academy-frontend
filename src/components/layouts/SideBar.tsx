'use client';

import { usePathname, useRouter } from 'next/navigation';

type Role = 'ADMIN' | 'AGENT';

export default function SideBar({ role }: { role: Role }) {
  const router = useRouter();
  const pathname = usePathname();
  const sidebarBg =
  role === 'ADMIN'
    ? 'bg-[var(--primary)]'   
    : 'bg-emerald-700';       

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

  return (
    <aside className={`w-64 min-h-screen  text-white ${sidebarBg} p-6 flex flex-col gap-4`}>
      <h2 className="text-xl font-bold mb-6">SalesTrack</h2>

      {links.map((link) => (
        <button
          key={link.path}
          onClick={() => router.push(link.path)}
          className={`text-left px-4 py-2 rounded ${
            pathname === link.path ? 'bg-white text-black' : ''
          }`}
        >
          {link.label}
        </button>
      ))}
    </aside>
  );
}