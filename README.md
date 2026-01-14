# ˗ˏˋ ★ ˎˊ˗ BLUR  ------------------ FRONTEND DESCRIPTION ˗ˏˋ ★ ˎˊ˗ 

A high-fidelity frontend interface designed for a real-time computer vision application. This project serves as both the immersive marketing landing page and the control layer for a YOLOv8-based video segmentation engine.

The application prioritizes visual immersion and performance, utilizing custom WebGL fluid simulations, hardware-accelerated animations, and a unified state management system to transition users from the landing page to the live camera feed without page reloads.

## OVERVIEW

This repository contains the client-side logic and UI architecture. The interface communicates with a local Python backend via REST API to trigger video processing states and manage virtual camera streams.


### FUNCTIONALITY

* **Unified Single-Page Architecture:** A custom layout engine that conditionally renders the marketing sections or the operational `CameraInterface` based on user intent, maintaining high performance without routing overhead.
* **Real-time Control Interface:** Direct manipulation of video processing modes (Blur, Segmentation, Color Replacement).
* **Interactive Fluid Simulation:** A background visualizer based on stable fluids (Navier-Stokes equations), implemented via raw WebGL/Three.js custom shaders.
* **Scroll-Driven UX:** Dynamic navigation that adapts transparency and styling based on scroll position, utilizing Intersection Observers for active section tracking.

## TECHNICAL STACK

* **Framework:** React 18
* **Graphics & Shaders:** Three.js, GLSL (Custom Fragment/Vertex Shaders)
* **Animation:** Framer Motion (Scroll transforms, presence detection), GSAP
* **Styling:** Tailwind CSS
* **State Management:** React Hooks (Context-free local state optimization)

## COMPONENT ARCHITECTURE


### LAYOUT ENGINE (`App.js`)
The root component acts as the central state controller. It bypasses traditional routing to provide an instant switch between the "Landing Mode" and "App Mode" (`CameraInterface`).
* **Scroll Spy:** Implements `IntersectionObserver` to track active viewports and update navigation indicators dynamically.
* **Dynamic Navbar:** A header component that morphs from a floating, bordered capsule to a full-width transparent navigation bar based on scroll threshold.
* **Modal Management:** Handles global overlays for "About Us", video previews, and support widgets.

### LIQUID ETHER (WebGL Simulation)
Located in `components/LiquidEther.js`.
A complex visual implementation of fluid dynamics. Unlike standard video loops, this component solves advection, divergence, and pressure equations in real-time on the GPU.
* **Technique:** Ping-pong frame buffer objects (FBOs) for calculating physics steps.
* **Interaction:** Mouse/Touch input exerts force on the velocity field, creating interactive turbulence.

### KINETIC FOOTER (`Section4.js`)
A highly interactive footer section that utilizes `framer-motion` to interpolate background colors based on scroll progress (shifting from dark to light themes).
* **Features:** Includes a custom `BlurText` reveal animation and a modal-based video player integration.
* **Newsletter Integration:** UI components for subscription and donation processing with hover-state micro-interactions.

### FLOWING MENU (`Section3.js`)
A visual navigation component designed for high-impact imagery.
* **Implementation:** Displays a marquee-style list where hovering over items reveals associated imagery in a fluid motion, utilizing standard CSS and React state logic.

## SETUP

1.  Clone the repository:
    ```bash
    git clone [https://github.com/yourusername/blur-frontend.git](https://github.com/yourusername/blur-frontend.git)
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm start
    ```

*Note: This frontend requires the accompanying Python backend server running on `localhost:5000` to fully function. Without the backend, video feed components will remain in a placeholder state.*

## PROJECT STRUCTURE

```text
src/
├── components/
│   ├── LiquidEther.js       # Core WebGL fluid simulation engine
│   ├── FlowingMenu.js       # Infinite marquee navigation
│   ├── PixelTransition.js   # GSAP-based visual transition
│   └── BlurText.js          # Intersection-observer based text reveals
├── sections/
│   ├── Section1.js          # Hero section with fluid background
│   ├── Section2.js          # Feature showcase with scroll transforms
│   ├── Section3.js          # Flowing menu component integration
│   └── Section4.js          # Kinetic footer and video modal
├── App.js                   # Main layout engine and state controller
└── CameraInterface.js       # Operational computer vision control layer
