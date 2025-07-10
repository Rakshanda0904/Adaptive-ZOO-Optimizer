import React, { useState, useEffect, useCallback } from 'react';
import { AdaptiveZOO } from './algorithms/AdaptiveZOO';
import { MathUtils } from './utils/math';
import { ParameterControls } from './components/ParameterControls';
import { VisualizationChart } from './components/VisualizationChart';
import { GradientChart } from './components/GradientChart';
import { AlgorithmInfo } from './components/AlgorithmInfo';
import { StatisticsPanel } from './components/StatisticsPanel';
import { ZOOConfig, VisualizationData } from './types';
import { Brain, Github, ExternalLink } from 'lucide-react';

const OBJECTIVE_FUNCTIONS = {
  rastrigin: MathUtils.rastrigin,
  sphere: MathUtils.sphere,
  rosenbrock: MathUtils.rosenbrock
};

function App() {
  const [config, setConfig] = useState<ZOOConfig>({
    originalDimension: 100,
    reducedDimension: 20,
    delta: 0.01,
    eta0: 0.1,
    beta: 0.9,
    maxIterations: 200
  });

  const [objectiveFunction, setObjectiveFunction] = useState<string>('rastrigin');
  const [optimizer, setOptimizer] = useState<AdaptiveZOO | null>(null);
  const [visualizationData, setVisualizationData] = useState<VisualizationData>({
    convergenceHistory: [],
    gradientNorms: [],
    currentIteration: 0,
    currentSolution: [],
    isRunning: false
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize optimizer
  const initializeOptimizer = useCallback(() => {
    const objFunc = OBJECTIVE_FUNCTIONS[objectiveFunction as keyof typeof OBJECTIVE_FUNCTIONS];
    const newOptimizer = new AdaptiveZOO(objFunc, config);
    setOptimizer(newOptimizer);
    setVisualizationData(newOptimizer.getState());
  }, [config, objectiveFunction]);

  // Animation loop
  useEffect(() => {
    if (!isAnimating || !optimizer) return;

    const interval = setInterval(() => {
      const canContinue = optimizer.step();
      const newState = optimizer.getState();
      setVisualizationData(newState);
      
      if (!canContinue) {
        setIsAnimating(false);
      }
    }, 50); // 50ms interval for smooth animation

    return () => clearInterval(interval);
  }, [isAnimating, optimizer]);

  // Initialize on mount and when config changes
  useEffect(() => {
    initializeOptimizer();
  }, [initializeOptimizer]);

  const handleConfigChange = (newConfig: ZOOConfig) => {
    setConfig(newConfig);
    setIsAnimating(false);
  };

  const handleReset = () => {
    setIsAnimating(false);
    initializeOptimizer();
  };

  const handleToggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const handleObjectiveFunctionChange = (fn: string) => {
    setObjectiveFunction(fn);
    setIsAnimating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Adaptive ZOO Optimizer
                </h1>
                <p className="text-sm text-gray-600">
                  Zeroth-Order Optimization with Dimensionality Reduction
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Rakshanda0904/Adaptive-ZOO-Optimizer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">Source</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Paper</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls and Info */}
          <div className="lg:col-span-1 space-y-6">
            <ParameterControls
              config={config}
              onConfigChange={handleConfigChange}
              onReset={handleReset}
              onToggleAnimation={handleToggleAnimation}
              isAnimating={isAnimating}
              objectiveFunction={objectiveFunction}
              onObjectiveFunctionChange={handleObjectiveFunctionChange}
            />
            
            <StatisticsPanel data={visualizationData} />
            
            <AlgorithmInfo />
          </div>

          {/* Right Column - Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            <VisualizationChart 
              data={visualizationData}
              width={700}
              height={400}
            />
            
            <GradientChart
              data={visualizationData}
              width={700}
              height={300}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Interactive demonstration of Adaptive ZOO with dimensionality reduction for research and educational purposes.
            </p>
            <p className="text-xs mt-2">
              Built with React, TypeScript, and Canvas for high-performance visualizations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;