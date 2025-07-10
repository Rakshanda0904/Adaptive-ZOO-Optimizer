import React from 'react';
import { ZOOConfig } from '../types';
import { Settings, RotateCcw, Play, Pause } from 'lucide-react';

interface ParameterControlsProps {
  config: ZOOConfig;
  onConfigChange: (config: ZOOConfig) => void;
  onReset: () => void;
  onToggleAnimation: () => void;
  isAnimating: boolean;
  objectiveFunction: string;
  onObjectiveFunctionChange: (fn: string) => void;
}

export const ParameterControls: React.FC<ParameterControlsProps> = ({
  config,
  onConfigChange,
  onReset,
  onToggleAnimation,
  isAnimating,
  objectiveFunction,
  onObjectiveFunctionChange
}) => {
  const handleChange = (field: keyof ZOOConfig, value: number) => {
    onConfigChange({ ...config, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Algorithm Parameters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Objective Function
          </label>
          <select
            value={objectiveFunction}
            onChange={(e) => onObjectiveFunctionChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="rastrigin">Rastrigin (Multimodal)</option>
            <option value="sphere">Sphere (Convex)</option>
            <option value="rosenbrock">Rosenbrock (Valley)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Dimension (d)
          </label>
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            value={config.originalDimension}
            onChange={(e) => handleChange('originalDimension', parseInt(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{config.originalDimension}</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reduced Dimension (d̃)
          </label>
          <input
            type="range"
            min="2"
            max={Math.min(config.originalDimension, 50)}
            step="1"
            value={config.reducedDimension}
            onChange={(e) => handleChange('reducedDimension', parseInt(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{config.reducedDimension}</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Finite Difference Step (δ)
          </label>
          <input
            type="range"
            min="0.001"
            max="0.1"
            step="0.001"
            value={config.delta}
            onChange={(e) => handleChange('delta', parseFloat(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{config.delta.toFixed(3)}</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Step Size (η₀)
          </label>
          <input
            type="range"
            min="0.01"
            max="1.0"
            step="0.01"
            value={config.eta0}
            onChange={(e) => handleChange('eta0', parseFloat(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{config.eta0.toFixed(2)}</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adaptation Parameter (β)
          </label>
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={config.beta}
            onChange={(e) => handleChange('beta', parseFloat(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{config.beta.toFixed(2)}</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Iterations
          </label>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={config.maxIterations}
            onChange={(e) => handleChange('maxIterations', parseInt(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{config.maxIterations}</span>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onToggleAnimation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isAnimating ? 'Pause' : 'Start'} Animation
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};