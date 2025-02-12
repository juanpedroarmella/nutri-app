import { DashboardSidebar } from '@/common/components/dashboard-sidebar.component'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex-1 flex flex-col lg:flex-row w-full'>
      <aside className='w-full lg:w-64'>
        <DashboardSidebar />
      </aside>
      <main className='flex-1'>{children}</main>
    </div>
  )
}
