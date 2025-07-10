import React from 'react';
import { VisualizationData } from '../types';
import { BarChart3, Target, TrendingDown, Zap } from 'lucide-react';

interface StatisticsPanelProps {
  data: VisualizationData;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ data }) => {
  const currentValue = data.convergenceHistory[data.convergenceHistory.length - 1] || 0;
  const initialValue = data.convergenceHistory[0] || 0;
  const improvement = initialValue - currentValue;
  const improvementPercent = initialValue !== 0 ? ((improvement / Math.abs(initialValue)) * 100) : 0;
  const currentGradNorm = data.gradientNorms[data.gradientNorms.length - 1] || 0;
  const avgGradNorm = data.gradientNorms.length > 0 ? 
    data.gradientNorms.reduce((sum, val) => sum + val, 0) / data.gradientNorms.length : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-gray-800">Statistics</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Current Value</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">
            {currentValue.toFixed(4)}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Improvement</span>
          </div>
          <div className="text-2xl font-bold text-green-900">
            {improvement >= 0 ? '+' : ''}{improvement.toFixed(4)}
          </div>
          <div className="text-xs text-green-700">
            ({improvementPercent.toFixed(1)}%)
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Gradient Norm</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {currentGradNorm.toFixed(4)}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-900">Avg Grad Norm</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">
            {avgGradNorm.toFixed(4)}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Progress:</span>
          <span>{data.currentIteration} / {data.convergenceHistory.length > 0 ? 'Running' : 'Stopped'}</span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: data.isRunning ? `${(data.currentIteration / 1000) * 100}%` : '100%' }}
          />
        </div>
      </div>
    </div>
  );
};