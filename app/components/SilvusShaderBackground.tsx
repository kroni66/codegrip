'use client';

import { useEffect, useRef } from 'react';

interface SilvusShaderBackgroundProps {
  className?: string;
}

export function SilvusShaderBackground({ className = '' }: SilvusShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }

    // Set canvas size
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Vertex shader
    const vertexShaderSource = `#version 300 es
      precision mediump float;
      in vec3 aVertexPosition;
      in vec2 aTextureCoord;
      uniform mat4 uMVMatrix;
      uniform mat4 uPMatrix;
      out vec2 vTextureCoord;
      out vec3 vVertexPosition;
      
      void main() {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        vTextureCoord = aTextureCoord;
        vVertexPosition = aVertexPosition;
      }
    `;

    // Simplified fragment shader with noise and gradient
    const fragmentShaderSource = `#version 300 es
      precision highp float;
      in vec2 vTextureCoord;
      uniform float uTime;
      uniform vec2 uResolution;
      out vec4 fragColor;
      
      // Noise functions
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      // SDF for blobby cross (rounded cross)
      float sdBlobbyCross(vec2 pos, float he) {
        pos = abs(pos);
        pos = vec2(abs(pos.x - pos.y), 1.0 - pos.x - pos.y) / sqrt(2.0);
        
        float p = (he - pos.y - 0.25 / he) / (6.0 * he);
        float q = pos.x / (he * he * 16.0);
        float h = q * q - p * p * p;
        
        float x;
        if (h > 0.0) {
          float r = sqrt(h);
          x = pow(q + r, 1.0 / 3.0) - pow(abs(q - r), 1.0 / 3.0) * sign(r - q);
        } else {
          float r = sqrt(p);
          x = 2.0 * r * cos(acos(q / (p * r)) / 3.0);
        }
        
        x = min(x, sqrt(2.0) / 2.0);
        vec2 z = vec2(x, he * (1.0 - 2.0 * x * x)) - pos;
        return length(z) * sign(z.y);
      }
      
      float opExtrusion(vec3 p, float d, float h) {
        vec2 w = vec2(d, abs(p.z) - h);
        return min(max(w.x, w.y), 0.0) + length(max(w, 0.0));
      }
      
      float roundedCross(vec3 p, float r) {
        // Rotate to match original orientation
        float angle = 3.14159 * 0.5;
        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        p.xy = rot * p.xy;
        
        float d = sdBlobbyCross(p.xy * 0.6, r * (0.1 + 0.4 * 0.37));
        return opExtrusion(p, d, 0.25);
      }
      
      void main() {
        vec2 uv = vTextureCoord;
        vec2 p = (2.0 * uv - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
        
        // Animated noise
        float noise = snoise(vec3(uv * 3.0, uTime * 0.1)) * 0.5 + 0.5;
        
        // 3D rounded cross with rotation
        float t = uTime * 0.5;
        vec3 p3d = vec3(p * 2.5, 0.0);
        
        // Rotation matrices
        float angleY = t;
        mat3 rotY = mat3(
          cos(angleY), 0.0, sin(angleY),
          0.0, 1.0, 0.0,
          -sin(angleY), 0.0, cos(angleY)
        );
        
        p3d = rotY * p3d;
        
        float cross = roundedCross(p3d, 1.0);
        float shape = smoothstep(0.02, 0.0, cross);
        
        // Color gradient with noise
        vec3 col1 = vec3(0.0, 0.24, 0.23);  // Dark blue-green
        vec3 col2 = vec3(0.79, 0.72, 1.0);  // Light purple
        vec3 color = mix(col1, col2, noise);
        
        // Add shape with fresnel-like effect
        color = mix(color, vec3(1.0), shape * 0.5);
        
        // Add subtle glow
        float glow = exp(-cross * 2.0) * 0.3;
        color += vec3(0.5, 0.3, 0.7) * glow;
        
        // Vignette
        float vignette = 1.0 - length(uv - 0.5) * 0.8;
        color *= vignette;
        
        // Add grey overlay
        vec3 greyOverlay = vec3(0.15, 0.15, 0.15);  // Dark grey
        color = mix(color, greyOverlay, 0.7);  // 70% grey overlay
        
        fragColor = vec4(color, 1.0);
      }
    `;

    // Compile shader
    function compileShader(gl: WebGL2RenderingContext, source: string, type: number): WebGLShader | null {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }

    const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create quad
    const vertices = new Float32Array([
      -1, -1, 0,  0, 0,
       1, -1, 0,  1, 0,
       1,  1, 0,  1, 1,
      -1,  1, 0,  0, 1,
    ]);

    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'aVertexPosition');
    const texCoordLoc = gl.getAttribLocation(program, 'aTextureCoord');

    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 20, 0);

    gl.enableVertexAttribArray(texCoordLoc);
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 20, 12);

    // Get uniforms
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uMVMatrixLoc = gl.getUniformLocation(program, 'uMVMatrix');
    const uPMatrixLoc = gl.getUniformLocation(program, 'uPMatrix');

    // Set matrices
    const mvMatrix = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);

    const pMatrix = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);

    gl.uniformMatrix4fv(uMVMatrixLoc, false, mvMatrix);
    gl.uniformMatrix4fv(uPMatrixLoc, false, pMatrix);

    // Animation loop
    let startTime = Date.now();
    let animationId: number;

    function render() {
      if (!gl || !canvas) return;
      
      const currentTime = (Date.now() - startTime) / 1000;
      
      gl.uniform1f(uTimeLoc, currentTime);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      
      animationId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(vbo);
        gl.deleteBuffer(ibo);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}
