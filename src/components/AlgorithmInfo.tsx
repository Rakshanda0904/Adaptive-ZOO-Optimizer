import React from 'react';
import { BookOpen, Info } from 'lucide-react';

export const AlgorithmInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">Algorithm Overview</h3>
      </div>
      
      <div className="space-y-4 text-sm text-gray-600">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h4 className="font-medium text-indigo-900 mb-2">Adaptive ZOO with Dimensionality Reduction</h4>
          <p>
            This algorithm combines zeroth-order optimization with random projection to handle high-dimensional problems efficiently. 
            It estimates gradients using finite differences and adapts the step size based on gradient history.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-blue-900 mb-2">Key Features</h5>
            <ul className="space-y-1 text-blue-800">
              <li>• Derivative-free optimization</li>
              <li>• Dimensionality reduction via random projection</li>
              <li>• Adaptive step size control</li>
              <li>• Handles non-convex objectives</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-medium text-green-900 mb-2">Mathematical Form</h5>
            <div className="text-green-800 space-y-1">
              <p><strong>Projection:</strong> z = Φx</p>
              <p><strong>Gradient:</strong> ĝ = (f(Φᵀ(z+δu)) - f(Φᵀz))/δ · u</p>
              <p><strong>Update:</strong> z ← z - η_t · ĝ</p>
              <p><strong>Step size:</strong> η_t = η₀/√(1 + β∑‖ĝ‖²)</p>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-medium text-amber-900 mb-1">Parameter Guidelines</h5>
              <p className="text-amber-800">
                <strong>δ:</strong> Smaller values give more accurate gradients but are sensitive to noise. 
                <strong>η₀:</strong> Initial step size should be tuned based on problem scale. 
                <strong>β:</strong> Controls adaptation rate; higher values lead to faster step size decay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};