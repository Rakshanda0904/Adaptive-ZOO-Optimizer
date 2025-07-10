import { MathUtils } from '../utils/math';
import { ZOOConfig } from '../types';

export class AdaptiveZOO {
  private f: (x: number[]) => number;
  private d: number;
  private dReduced: number;
  private delta: number;
  private eta0: number;
  private beta: number;
  private maxIterations: number;
  
  private Phi: number[][];
  private PhiT: number[][];
  private x: number[];
  private z: number[];
  private gHistory: number[] = [];
  private convergenceHistory: number[] = [];
  private gradientNorms: number[] = [];
  private currentIteration: number = 0;

  constructor(
    objectiveFunction: (x: number[]) => number,
    config: ZOOConfig
  ) {
    this.f = objectiveFunction;
    this.d = config.originalDimension;
    this.dReduced = config.reducedDimension;
    this.delta = config.delta;
    this.eta0 = config.eta0;
    this.beta = config.beta;
    this.maxIterations = config.maxIterations;

    // Initialize projection matrix
    this.Phi = MathUtils.generateRandomProjection(this.d, this.dReduced);
    this.PhiT = MathUtils.transpose(this.Phi);
    
    // Initialize starting point
    this.x = MathUtils.randomVector(this.d);
    this.z = MathUtils.matrixVectorMultiply(this.Phi, this.x);
    
    // Initialize history
    this.convergenceHistory = [this.f(this.x)];
    this.gradientNorms = [0];
  }

  private estimateGradient(z: number[]): number[] {
    const u = MathUtils.randomVector(this.dReduced);
    u.forEach((_, i) => u[i] = u[i] / MathUtils.vectorNorm(u)); // Normalize u
    const zPlusDeltaU = z.map((zi, i) => zi + this.delta * u[i]);
    
    const xPlus = MathUtils.matrixVectorMultiply(this.PhiT, zPlusDeltaU);
    const xBase = MathUtils.matrixVectorMultiply(this.PhiT, z);
    
    const fPlus = this.f(xPlus);
    const fBase = this.f(xBase);
    
    const gradientEstimate = u.map(ui => (fPlus - fBase) / this.delta * ui * this.dReduced);
    return gradientEstimate;
  }

  step(): boolean {
    if (this.currentIteration >= this.maxIterations) {
      return false;
    }

    // Estimate gradient
    const g = this.estimateGradient(this.z);
    const gradNorm = MathUtils.vectorNorm(g);
    this.gHistory.push(gradNorm * gradNorm);
    this.gradientNorms.push(gradNorm);

    // Adaptive step size
    const sumG2 = this.gHistory.reduce((sum, val) => sum + val, 0);
    const etaT = this.eta0 / Math.sqrt(1 + this.beta * sumG2);

    // Gradient descent step in reduced space
    this.z = this.z.map((zi, i) => zi - etaT * g[i]);
    
    // Map back to original space
    this.x = MathUtils.matrixVectorMultiply(this.PhiT, this.z);
    
    // Record objective value
    const objVal = this.f(this.x);
    this.convergenceHistory.push(objVal);
    
    this.currentIteration++;
    return true;
  }

  run(): { solution: number[]; history: number[] } {
    while (this.step()) {
      // Continue until max iterations
    }
    return {
      solution: this.x,
      history: this.convergenceHistory
    };
  }

  getState() {
    return {
      convergenceHistory: [...this.convergenceHistory],
      gradientNorms: [...this.gradientNorms],
      currentIteration: this.currentIteration,
      currentSolution: [...this.x],
      isRunning: this.currentIteration < this.maxIterations
    };
  }

  reset(config: ZOOConfig) {
    this.d = config.originalDimension;
    this.dReduced = config.reducedDimension;
    this.delta = config.delta;
    this.eta0 = config.eta0;
    this.beta = config.beta;
    this.maxIterations = config.maxIterations;

    this.Phi = MathUtils.generateRandomProjection(this.d, this.dReduced);
    this.PhiT = MathUtils.transpose(this.Phi);
    this.x = MathUtils.randomVector(this.d);
    this.z = MathUtils.matrixVectorMultiply(this.Phi, this.x);
    
    this.gHistory = [];
    this.convergenceHistory = [this.f(this.x)];
    this.gradientNorms = [0];
    this.currentIteration = 0;
  }
}