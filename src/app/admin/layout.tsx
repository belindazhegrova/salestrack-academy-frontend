import SideBar from '@/components/layouts/SideBar';
import Header from '@/components/layouts/Header';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SideBar role="ADMIN" />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}