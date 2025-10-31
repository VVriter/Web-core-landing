<template>
  <div 
    class="webcore-logo" 
    :class="{ 
      'animate': animated,
      'animate-static': animated && animationType === 'static',
      'animate-full': animated && animationType === 'full'
    }"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="logo-svg"
    >
      <defs>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1">
            <animate attributeName="stop-color" values="#8B5CF6;#D946EF;#F97316;#8B5CF6" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="50%" style="stop-color:#D946EF;stop-opacity:1">
            <animate attributeName="stop-color" values="#D946EF;#F97316;#8B5CF6;#D946EF" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" style="stop-color:#F97316;stop-opacity:1">
            <animate attributeName="stop-color" values="#F97316;#8B5CF6;#D946EF;#F97316" dur="4s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
        
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.8" />
          <stop offset="50%" style="stop-color:#8B5CF6;stop-opacity:0.4" />
          <stop offset="100%" style="stop-color:#D946EF;stop-opacity:0.1" />
        </radialGradient>
        
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feOffset in="coloredBlur" dx="0" dy="0" result="offsetBlur"/>
          <feFlood flood-color="#8B5CF6" flood-opacity="0.3"/>
          <feComposite in2="offsetBlur" operator="in"/>
          <feMerge> 
            <feMergeNode/>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feOffset in="blur" dx="0" dy="0" result="offset"/>
          <feFlood flood-color="#FFFFFF" flood-opacity="0.6"/>
          <feComposite in2="offset" operator="in"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Outer hexagon with gradient -->
      <path
        d="M100 20 L170 60 L170 140 L100 180 L30 140 L30 60 Z"
        fill="url(#hexGradient)"
        stroke="#1E293B"
        stroke-width="4"
        class="hex-outer"
        filter="url(#glow)"
      >
        <animateTransform 
          attributeName="transform" 
          attributeType="XML" 
          type="rotate" 
          values="0 100 100;360 100 100" 
          dur="8s" 
          repeatCount="indefinite"
        />
        <animate 
          attributeName="stroke-width" 
          values="3;6;4;5" 
          dur="3s" 
          repeatCount="indefinite"
        />
      </path>
      
      <!-- Background glow circle -->
      <circle 
        cx="100" 
        cy="100" 
        r="60" 
        fill="url(#glowGradient)" 
        opacity="0.3" 
        class="glow-circle"
      />
      
      <!-- Inner lines creating the star pattern with enhanced effects -->
      <g class="inner-lines" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round">
        <!-- Vertical line -->
        <line x1="100" y1="40" x2="100" y2="160" class="line vertical" filter="url(#innerGlow)">
          <animate attributeName="opacity" values="0;1;0.8;1" dur="3s" repeatCount="indefinite" begin="0s"/>
          <animate attributeName="stroke-width" values="2;5;3;4" dur="3s" repeatCount="indefinite" begin="0s"/>
        </line>
        
        <!-- Diagonal lines -->
        <line x1="65" y1="70" x2="135" y2="130" class="line diagonal-1" filter="url(#innerGlow)">
          <animate attributeName="opacity" values="0;1;0.8;1" dur="3s" repeatCount="indefinite" begin="0.8s"/>
          <animate attributeName="stroke-width" values="2;5;3;4" dur="3s" repeatCount="indefinite" begin="0.8s"/>
        </line>
        
        <line x1="135" y1="70" x2="65" y2="130" class="line diagonal-2" filter="url(#innerGlow)">
          <animate attributeName="opacity" values="0;1;0.8;1" dur="3s" repeatCount="indefinite" begin="1.6s"/>
          <animate attributeName="stroke-width" values="2;5;3;4" dur="3s" repeatCount="indefinite" begin="1.6s"/>
        </line>
      </g>
      
      <!-- Central pulse dot -->
      <circle cx="100" cy="100" r="4" fill="#FFFFFF" class="center-dot">
        <animate attributeName="r" values="2;8;4;6" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;1;0.7;1" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
interface Props {
  animated?: boolean
  size?: number
  animationType?: 'full' | 'static'
}

const props = withDefaults(defineProps<Props>(), {
  animated: false,
  size: 100,
  animationType: 'full'
})
</script>

<style scoped>
.webcore-logo {
  display: inline-block;
  transition: transform 0.3s ease;
  position: relative;
}

.logo-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.webcore-logo:hover {
  transform: scale(1.05);
}

/* Enhanced animation for the logo */
.webcore-logo.animate-full {
  animation: logoFloat 4s ease-in-out infinite;
}

.webcore-logo.animate-static {
  position: relative;
}

.webcore-logo.animate .hex-outer {
  animation: hexPulse 3s ease-in-out infinite, hexRotate 8s linear infinite;
  transform-origin: center;
}

.webcore-logo.animate .inner-lines .line {
  animation: lineEnhancedGlow 2.5s ease-in-out infinite;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}

.webcore-logo.animate .inner-lines .vertical {
  animation: lineEnhancedGlow 2.5s ease-in-out infinite, lineDraw 3s ease-out infinite;
  animation-delay: 0s, 0s;
}

.webcore-logo.animate .inner-lines .diagonal-1 {
  animation: lineEnhancedGlow 2.5s ease-in-out infinite, lineDraw 3s ease-out infinite;
  animation-delay: 0.3s, 0.8s;
}

.webcore-logo.animate .inner-lines .diagonal-2 {
  animation: lineEnhancedGlow 2.5s ease-in-out infinite, lineDraw 3s ease-out infinite;
  animation-delay: 0.6s, 1.6s;
}

/* Enhanced keyframes */
@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  25% {
    transform: translateY(-5px) scale(1.02);
  }
  50% {
    transform: translateY(0px) scale(1.05);
  }
  75% {
    transform: translateY(-3px) scale(1.02);
  }
}

@keyframes hexPulse {
  0%, 100% {
    filter: url(#glow) brightness(1) saturate(1);
    transform: scale(1);
  }
  25% {
    filter: url(#glow) brightness(1.3) saturate(1.2);
    transform: scale(1.03);
  }
  50% {
    filter: url(#glow) brightness(1.5) saturate(1.4);
    transform: scale(1.05);
  }
  75% {
    filter: url(#glow) brightness(1.2) saturate(1.1);
    transform: scale(1.02);
  }
}

@keyframes hexRotate {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(90deg) scale(1.02);
  }
  50% {
    transform: rotate(180deg) scale(1.05);
  }
  75% {
    transform: rotate(270deg) scale(1.02);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

@keyframes lineEnhancedGlow {
  0%, 100% {
    opacity: 0.7;
    stroke-width: 2;
    filter: drop-shadow(0 0 3px currentColor);
  }
  25% {
    opacity: 0.9;
    stroke-width: 3.5;
    filter: drop-shadow(0 0 8px currentColor);
  }
  50% {
    opacity: 1;
    stroke-width: 5;
    filter: drop-shadow(0 0 15px currentColor);
  }
  75% {
    opacity: 0.8;
    stroke-width: 3;
    filter: drop-shadow(0 0 6px currentColor);
  }
}

@keyframes lineDraw {
  0% {
    stroke-dashoffset: 100;
    opacity: 0;
  }
  20% {
    opacity: 0.5;
  }
  50% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: -100;
    opacity: 0;
  }
}

/* Enhanced hover effects */
.webcore-logo:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
}

.webcore-logo:hover .hex-outer {
  animation-duration: 1s !important;
}

.webcore-logo:hover .inner-lines .line {
  animation-duration: 1s !important;
}

/* Rotation animation option with enhanced effects */
.webcore-logo.animate.rotate {
  animation: enhancedRotate 6s ease-in-out infinite;
}

@keyframes enhancedRotate {
  0% {
    transform: rotate(0deg) scale(1);
    filter: hue-rotate(0deg);
  }
  25% {
    transform: rotate(90deg) scale(1.1);
    filter: hue-rotate(90deg);
  }
  50% {
    transform: rotate(180deg) scale(1.15);
    filter: hue-rotate(180deg);
  }
  75% {
    transform: rotate(270deg) scale(1.1);
    filter: hue-rotate(270deg);
  }
  100% {
    transform: rotate(360deg) scale(1);
    filter: hue-rotate(360deg);
  }
}

/* Breathing effect */
.webcore-logo.animate.breathe {
  animation: breathe 4s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

/* Enhanced glow circle animation */
.webcore-logo.animate .glow-circle {
  animation: glowPulse 4s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  25% {
    opacity: 0.4;
    transform: scale(1.1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.3);
  }
  75% {
    opacity: 0.3;
    transform: scale(1);
  }
}

/* Center dot enhanced animation */
.webcore-logo.animate .center-dot {
  animation: centerPulse 2s ease-in-out infinite;
}

@keyframes centerPulse {
  0%, 100% {
    filter: drop-shadow(0 0 5px #FFFFFF);
  }
  50% {
    filter: drop-shadow(0 0 15px #8B5CF6);
  }
}

/* Responsive animations */
@media (prefers-reduced-motion: reduce) {
  .webcore-logo.animate,
  .webcore-logo.animate .hex-outer,
  .webcore-logo.animate .inner-lines .line,
  .webcore-logo.animate .glow-circle,
  .webcore-logo.animate .center-dot {
    animation: none !important;
  }
  
  .webcore-logo.animate .hex-outer {
    filter: url(#glow) brightness(1.2);
  }
}

/* Performance optimization */
.webcore-logo.animate {
  will-change: transform;
}

.webcore-logo.animate .hex-outer {
  will-change: transform, filter;
}

.webcore-logo.animate .inner-lines .line {
  will-change: opacity, stroke-width;
}
</style>
