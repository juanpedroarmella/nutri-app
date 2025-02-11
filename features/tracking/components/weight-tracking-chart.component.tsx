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
import { WeightTracking } from '../types/weight-tracking.types'

interface WeightTrackingChartProps {
  trackings: WeightTracking[]
}

export default function WeightTrackingChart({ trackings }: WeightTrackingChartProps) {
  const data = trackings.map(tracking => ({
    date: new Date(tracking.date).toLocaleDateString(),
    weight: tracking.weight
  }))

  // Find min and max weight to set chart domain with some padding
  const weights = trackings.map(t => t.weight)
  const minWeight = Math.min(...weights)
  const maxWeight = Math.max(...weights)
  const padding = 2 // 2kg padding for better visualization
  
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].value} kg
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Evolución del Peso (kg)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={data} 
          margin={{ top: 5, right: 20, bottom: 25, left: 0 }}
        >
          <Line 
            type="monotone" 
            dataKey="weight" 
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
            domain={[minWeight - padding, maxWeight + padding]}
            tickFormatter={(value) => `${value} kg`}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}