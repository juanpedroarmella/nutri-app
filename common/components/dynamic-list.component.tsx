import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import { cn } from '@/core/lib/utils'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

interface DynamicListInputProps {
  label: string
  name: string
  placeholder?: string
  defaultValue?: string[]
  className?: string
}

export function DynamicListInput({
  label,
  name,
  placeholder,
  defaultValue = [],
  className
}: DynamicListInputProps) {
  const [items, setItems] = useState<string[]>(defaultValue)
  const [currentItem, setCurrentItem] = useState('')

  const handleAddItem = () => {
    if (currentItem.trim()) {
      setItems([...items, currentItem.trim()])
      setCurrentItem('')
    }
  }

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Label htmlFor={name}>{label}</Label>
      <div className='flex flex-col gap-3'>
        <div className='flex gap-2'>
          <Input
            value={currentItem}
            onChange={e => setCurrentItem(e.target.value)}
            placeholder={placeholder}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddItem()
              }
            }}
          />
          <Button
            type='button'
            variant='outline'
            size='icon'
            onClick={handleAddItem}
          >
            <Plus className='h-4 w-4' />
          </Button>
        </div>
        {items.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {items.map((item, index) => (
              <div
                key={index}
                className='flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md'
              >
                <input type='hidden' name={name} value={item} />
                <span>{item}</span>
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='h-4 w-4 p-0 hover:bg-transparent'
                  onClick={() => handleRemoveItem(index)}
                >
                  <X className='h-3 w-3' />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
