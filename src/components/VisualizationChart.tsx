import React, { useEffect, useRef } from 'react';
import { VisualizationData } from '../types';
import { TrendingUp } from 'lucide-react';

interface VisualizationChartProps {
  data: VisualizationData;
  width?: number;
  height?: number;
}

export const VisualizationChart: React.FC<VisualizationChartProps> = ({
  data,
  width = 700,
  height = 400
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up the plotting area
    const margin = { top: 40, right: 40, bottom: 80, left: 100 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    // Draw background
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, width, height);

    // Draw plot area
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(margin.left, margin.top, plotWidth, plotHeight);

    // Draw border
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin.left, margin.top, plotWidth, plotHeight);

    if (data.convergenceHistory.length < 1) {
      // Show "No data" message
      ctx.fillStyle = '#6b7280';
      ctx.font = '16px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('Click "Start Animation" to begin optimization', width / 2, height / 2);
      return;
    }

    // Find data ranges
    const minValue = Math.min(...data.convergenceHistory);
    const maxValue = Math.max(...data.convergenceHistory);
    const valueRange = Math.max(maxValue - minValue, 0.001); // Avoid division by zero

    // Scale functions
    const scaleX = (i: number) => margin.left + (i / Math.max(data.convergenceHistory.length - 1, 1)) * plotWidth;
    const scaleY = (value: number) => margin.top + plotHeight - ((value - minValue) / valueRange) * plotHeight;

    // Draw grid lines first
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;

    // Vertical grid lines
    const numXTicks = 6;
    for (let i = 0; i <= numXTicks; i++) {
      const x = margin.left + (i / numXTicks) * plotWidth;
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, margin.top + plotHeight);
      ctx.stroke();
    }

    // Horizontal grid lines
    const numYTicks = 6;
    for (let i = 0; i <= numYTicks; i++) {
      const y = margin.top + (i / numYTicks) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + plotWidth, y);
      ctx.stroke();
    }

    // Draw convergence curve
    if (data.convergenceHistory.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      
      data.convergenceHistory.forEach((value, i) => {
        const x = scaleX(i);
        const y = scaleY(value);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Add gradient effect under the curve
      const gradient = ctx.createLinearGradient(0, margin.top, 0, margin.top + plotHeight);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.01)');
      
      ctx.beginPath();
      ctx.fillStyle = gradient;
      data.convergenceHistory.forEach((value, i) => {
        const x = scaleX(i);
        const y = scaleY(value);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.lineTo(scaleX(data.convergenceHistory.length - 1), margin.top + plotHeight);
      ctx.lineTo(scaleX(0), margin.top + plotHeight);
      ctx.closePath();
      ctx.fill();
    }

    // Draw current point
    if (data.currentIteration > 0 && data.currentIteration < data.convergenceHistory.length) {
      const currentValue = data.convergenceHistory[data.currentIteration];
      const x = scaleX(data.currentIteration);
      const y = scaleY(currentValue);
      
      // Outer glow
      ctx.beginPath();
      ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      // Inner dot
      ctx.beginPath();
      ctx.fillStyle = '#ef4444';
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw axes labels
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Iteration', width / 2, height - 20);
    
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Objective Value', 0, 0);
    ctx.restore();

    // Draw tick labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px system-ui';

    // X-axis labels
    for (let i = 0; i <= numXTicks; i++) {
      const x = margin.left + (i / numXTicks) * plotWidth;
      const iteration = Math.round((i / numXTicks) * Math.max(data.convergenceHistory.length - 1, 0));
      ctx.textAlign = 'center';
      ctx.fillText(iteration.toString(), x, height - 40);
    }

    // Y-axis labels
    for (let i = 0; i <= numYTicks; i++) {
      const y = margin.top + (i / numYTicks) * plotHeight;
      const value = maxValue - (i / numYTicks) * valueRange;
      ctx.textAlign = 'right';
      ctx.fillText(value.toFixed(3), margin.left - 15, y + 4);
    }

  }, [data, width, height]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Convergence Plot</h3>
        <div className="ml-auto text-sm text-gray-500">
          Iteration: {data.currentIteration} / {data.convergenceHistory.length}
        </div>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border border-gray-200 rounded-lg w-full"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-gray-600">Objective Value</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Current Point</span>
        </div>
      </div>
    </div>
  );
};