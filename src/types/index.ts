export interface ZOOConfig {
  originalDimension: number;
  reducedDimension: number;
  delta: number;
  eta0: number;
  beta: number;
  maxIterations: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface VisualizationData {
  convergenceHistory: number[];
  gradientNorms: number[];
  currentIteration: number;
  currentSolution: number[];
  isRunning: boolean;
}