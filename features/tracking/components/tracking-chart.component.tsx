'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps
} from 'recharts'
import { Tracking, TrackingType } from '../types/tracking.types'

interface TrackingChartProps {
  trackings: Tracking[]
  type: TrackingType
}

export default function TrackingChart({ trackings, type }: TrackingChartProps) {
  const data = trackings.map(tracking => ({
    date: new Date(tracking.date).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC'
    }),
    value: tracking.value
  }))

  // Find min and max value to set chart domain with some padding
  const values = trackings.map(t => t.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const padding = 2 // 2cm padding for better visualization

  const getTitle = () => {
    switch (type) {
      case 'hip':
        return 'Evolución de Cadera (cm)'
      case 'waist':
        return 'Evolución de Cintura (cm)'
      default:
        return 'Evolución'
    }
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].value} cm
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        {getTitle()}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={data} 
          margin={{ top: 5, right: 20, bottom: 25, left: 0 }}
        >
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ 
              stroke: 'hsl(var(--primary))',
              strokeWidth: 2,
              fill: 'hsl(var(--background))',
              r: 4
            }}
            activeDot={{ 
              stroke: 'hsl(var(--primary))',
              strokeWidth: 2,
              fill: 'hsl(var(--primary))',
              r: 6 
            }}
          />
          <CartesianGrid 
            stroke="hsl(var(--border))" 
            strokeDasharray="5 5" 
            vertical={false}
          />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickMargin={10}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            domain={[minValue - padding, maxValue + padding]}
            tickFormatter={(value) => `${value} cm`}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 