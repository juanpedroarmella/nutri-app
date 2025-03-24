'use client'

import { Badge } from '@/common/components/ui/badge'
import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/common/components/ui/table'
import { AdminRoutes } from '@/common/types/routes.types'
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown, Pencil, Trash2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { User, UserRole } from '../types/user.types'
import DeleteUserDialog from './dialogs/delete-user-dialog.component'
import EditUserDialog from './dialogs/edit-user-dialog.component'

interface DataTableProps {
  data: User[]
  currentUser: User | null
}

export function UsersTable({ data, currentUser }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const router = useRouter()

  const nameFilter: FilterFn<User> = (row, columnId, filterValue) => {
    const searchValue = filterValue.toLowerCase()
    const fullName = `${row.getValue('firstName')} ${row.original.lastName}`.toLowerCase()
    return fullName.includes(searchValue)
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'firstName',
      filterFn: nameFilter,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0 h-auto font-medium"
          >
            <span className="flex items-center gap-2">
              Nombre
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </span>
          </Button>
        )
      },
      cell: ({ row }) => {
        const firstName = row.getValue('firstName') as string
        const lastName = row.original.lastName
        const isCurrentUser = currentUser?.idAuth === row.original.idAuth

        return (
          <div className="flex items-center gap-2">
            {firstName} {lastName}
            {isCurrentUser && (
              <Badge variant="outline" className="ml-2">
                Tú
              </Badge>
            )}
          </div>
        )
      }
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0 h-auto font-medium"
          >
            <span className="flex items-center gap-2">
              Email
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </span>
          </Button>
        )
      }
    },
    {
      accessorKey: 'role',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0 h-auto font-medium"
          >
            <span className="flex items-center gap-2">
              Rol
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </span>
          </Button>
        )
      },
      cell: ({ row }) => {
        const role = row.getValue('role') as UserRole

        return (
          <Badge variant={role === UserRole.ADMIN ? 'default' : 'secondary'}>
            {role === UserRole.ADMIN ? 'Admin' : 'Usuario'}
          </Badge>
        )
      }
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0 h-auto font-medium"
          >
            <span className="flex items-center gap-2">
              Teléfono
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </span>
          </Button>
        )
      },
      cell: ({ row }) => {
        const phone = row.getValue('phone') as string
        return phone || '-'
      }
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <div className="text-right">Acciones</div>
      ),
      cell: ({ row }) => {
        const user = row.original

        return (
          <div className="flex justify-end gap-2">
            <EditUserDialog user={user}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="sr-only">Editar usuario</span>
                <Pencil className="h-4 w-4" />
              </Button>
            </EditUserDialog>
            <DeleteUserDialog
              userId={user.idAuth}
              currentUser={currentUser}
              disabled={currentUser?.idAuth === user.idAuth}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                disabled={currentUser?.idAuth === user.idAuth}
              >
                <span className="sr-only">Eliminar usuario</span>
                <Trash2 className="h-4 w-4" />
              </Button>
            </DeleteUserDialog>
          </div>
        )
      }
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    },
    filterFns: {
      nameFilter
    }
  })

  const handleRowClick = (userId: string, event: React.MouseEvent) => {
    // Si el click fue en un botón o en un modal, no navegar
    if (
      (event.target as HTMLElement).closest('button') ||
      (event.target as HTMLElement).closest('[role="dialog"]')
    ) return
    router.push(`${AdminRoutes.USERS}/${userId}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filtrar por nombre o apellido..."
          value={(table.getColumn('firstName')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('firstName')?.setFilterValue(event.target.value)
          }
          className="pr-8"
        />
        {(table.getColumn('firstName')?.getFilterValue() as string) && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.getColumn('firstName')?.setFilterValue('')}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer"
                  onClick={(e) => handleRowClick(row.original.id, e)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
} 