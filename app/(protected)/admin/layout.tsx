import { AdminSidebar } from '@/common/components/admin-sidebar.component'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex-1 flex flex-col lg:flex-row w-full'>
      <aside className='w-full lg:w-64'>
        <AdminSidebar />
      </aside>
      <main className='flex-1'>{children}</main>
    </div>
  )
}
