// Mathematical utility functions for the Adaptive ZOO algorithm

export class MathUtils {
  // Rastrigin function: non-convex, multimodal optimization benchmark
  static rastrigin(x: number[]): number {
    const A = 10;
    const n = x.length;
    return A * n + x.reduce((sum, xi) => sum + xi * xi - A * Math.cos(2 * Math.PI * xi), 0);
  }

  // Sphere function: simple convex benchmark
  static sphere(x: number[]): number {
    return x.reduce((sum, xi) => sum + xi * xi, 0);
  }

  // Rosenbrock function: another classic optimization benchmark
  static rosenbrock(x: number[]): number {
    let sum = 0;
    for (let i = 0; i < x.length - 1; i++) {
      sum += 100 * Math.pow(x[i + 1] - x[i] * x[i], 2) + Math.pow(1 - x[i], 2);
    }
    return sum;
  }

  // Generate random projection matrix
  static generateRandomProjection(originalDim: number, reducedDim: number): number[][] {
    const matrix: number[][] = [];
    for (let i = 0; i < reducedDim; i++) {
      const row: number[] = [];
      for (let j = 0; j < originalDim; j++) {
        row.push(this.gaussianRandom() / Math.sqrt(reducedDim));
      }
      matrix.push(row);
    }
    return matrix;
  }

  // Generate Gaussian random number using Box-Muller transform
  static gaussianRandom(): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  // Matrix-vector multiplication
  static matrixVectorMultiply(matrix: number[][], vector: number[]): number[] {
    return matrix.map(row => 
      row.reduce((sum, val, i) => sum + val * vector[i], 0)
    );
  }

  // Transpose matrix
  static transpose(matrix: number[][]): number[][] {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result: number[][] = [];
    
    for (let j = 0; j < cols; j++) {
      const row: number[] = [];
      for (let i = 0; i < rows; i++) {
        row.push(matrix[i][j]);
      }
      result.push(row);
    }
    return result;
  }

  // Calculate vector norm
  static vectorNorm(vector: number[]): number {
    return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  }

  // Generate random vector
  static randomVector(dimension: number): number[] {
    return Array.from({ length: dimension }, () => this.gaussianRandom());
  }
}