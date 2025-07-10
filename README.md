# 🧠 Adaptive Zeroth-Order Optimizer

![License](https://img.shields.io/badge/license-MIT-blue.svg)  
🔗 Live Demo: [adaptive-zoo-optimizer.vercel.app](https://adaptive-zoo-optimizer.vercel.app/)  
📄 Research Paper: *Coming Soon*

---

## 📌 Overview

**Adaptive Zeroth-Order Optimizer** is a gradient-free optimization framework that combines **stochastic zeroth-order optimization (ZOO)** with two powerful strategies:
- **Dimensionality Reduction** (via Random Projection)
- **Adaptive Step Sizes** (based on historical gradient norm)

This method is designed for **black-box optimization problems** where gradients are unavailable or unreliable—particularly useful for **medical**, **financial**, or **AI hyperparameter tuning** applications.

---

## 🚀 Features

- ✅ Gradient-free black-box optimization
- 📉 Adaptive learning rate tuned during optimization
- 🔽 Efficient search in high-dimensional spaces using random projections
- 📊 Live convergence visualization (in browser)
- 🧪 Easily extensible to real-world datasets and models

---

## 🧪 How It Works

We use a two-point stochastic estimator in a reduced dimension space:

> `g ≈ (f(z + δu) - f(z)) / δ * u`

where:
- `z` is the low-dimensional projection of original variable `x`
- `u` is a random direction vector
- `f()` is the black-box objective function

The adaptive step size η is updated as:

> `ηₜ = η₀ / sqrt(1 + β * Σ‖g‖²)`

---

## 🧰 Tech Stack

- Python (NumPy, Matplotlib)
- React + Vercel for website
- GitHub for code and collaboration

---

## 🌐 Website Preview

Visit the deployed web app:  
🔗 [https://adaptive-zoo-optimizer.vercel.app](https://adaptive-zoo-optimizer.vercel.app)

Features:
- Function selection (Rastrigin, Sphere, etc.)
- Adjustable dimensions and projection size
- Real-time optimization curve rendering

---

## 📁 Project Structure

```bash
Adaptive-ZOO-Optimizer/
│
├── /frontend         # React + Vite web app
├── /optimizer        # Core Python implementation
├── README.md
└── LICENSE
