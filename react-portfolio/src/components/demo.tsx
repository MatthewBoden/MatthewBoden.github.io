import CyberneticGridShader from "@/components/ui/cybernetic-grid-shader";

export default function DemoOne() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      <CyberneticGridShader />
      <div className="relative z-10 flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
          Cybernetic Grid
        </h1>
        <p className="text-lg md:text-xl text-blue-200 max-w-lg mb-8 font-light">
          An Interactive WebGL Shader Background built with React, Three.js, and GLSL.
        </p>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors duration-200 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
          Explore Portfolio
        </button>
      </div>
    </div>
  );
}