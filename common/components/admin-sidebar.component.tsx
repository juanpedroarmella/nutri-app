'use client'

import { cn } from '@/core/lib/utils'
import { AdminRoutes } from '@/common/types/routes.types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Users, Calendar, ClipboardList } from 'lucide-react'
import { Button } from '@/common/components/ui/button'
import { ScrollArea } from '@/common/components/ui/scroll-area'
import { Separator } from '@/common/components/ui/separator'

const menuItems = [
  {
    title: 'Usuarios',
    href: AdminRoutes.HOME,
    icon: Users
  },
  {
    title: 'Turnos',
    href: AdminRoutes.APPOINTMENTS,
    icon: Calendar
  },
  {
    title: 'Controles',
    href: AdminRoutes.CONTROLS,
    icon: ClipboardList
  },
  {
    title: 'Documentos',
    href: AdminRoutes.DOCUMENTS,
    icon: FileText
  }
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ScrollArea className="lg:h-[calc(100vh-4rem)] sm:px-4">
        <div className="flex flex-col gap-4 py-4">
          <div className="px-3 py-2 flex flex-col gap-1">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Administración
            </h2>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-2",
                      isActive && "bg-secondary"
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>
          <Separator />
        </div>
      </ScrollArea>
    </div>
  )
}