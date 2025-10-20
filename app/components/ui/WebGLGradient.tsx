'use client'

import React, { useEffect, useRef } from 'react'

interface ShaderLayer {
  compiledFragmentShaders: string[]
  compiledVertexShaders: string[]
  speed?: number
  animating?: boolean
  data: {
    uniforms?: Record<string, any>
  }
}

interface WebGLGradientProps {
  config: {
    history: ShaderLayer[]
    options: {
      fps?: number
      dpi?: number
    }
  }
  className?: string
}

export function WebGLGradient({ config, className = '' }: WebGLGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programsRef = useRef<WebGLProgram[]>([])
  const startTimeRef = useRef<number>(Date.now())
  const texturesRef = useRef<WebGLTexture[]>([])
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 })
  const randomOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const randomSeedRef = useRef<number>(Math.random() * 1000)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Get WebGL2 context
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    })

    if (!gl) {
      console.error('WebGL2 not supported')
      return
    }

    glRef.current = gl as any

    // Set canvas size based on DPI
    const dpi = config.options?.dpi || 1.5
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpi
    canvas.height = rect.height * dpi
    gl.viewport(0, 0, canvas.width, canvas.height)

    // Compile shaders and create programs
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type)
      if (!shader) return null

      gl.shaderSource(shader, source)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }

      return shader
    }

    const createProgram = (vertexSource: string, fragmentSource: string): WebGLProgram | null => {
      const vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER)
      const fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER)

      if (!vertexShader || !fragmentShader) return null

      const program = gl.createProgram()
      if (!program) return null

      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        return null
      }

      return program
    }

    // Create programs for each layer
    const programs: WebGLProgram[] = []
    config.history.forEach((layer, index) => {
      if (layer.compiledVertexShaders?.[0] && layer.compiledFragmentShaders?.[0]) {
        const program = createProgram(
          layer.compiledVertexShaders[0],
          layer.compiledFragmentShaders[0]
        )
        if (program) {
          programs.push(program)
        }
      }
    })

    programsRef.current = programs

    // Create vertex buffer (full screen quad)
    const vertices = new Float32Array([
      -1, -1, 0,  0, 0,
       1, -1, 0,  1, 0,
      -1,  1, 0,  0, 1,
       1,  1, 0,  1, 1,
    ])

    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    // Create textures for ping-pong rendering
    const createTexture = () => {
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        canvas.width,
        canvas.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
      )
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      return texture
    }

    const framebuffer = gl.createFramebuffer()
    texturesRef.current = [createTexture(), createTexture()]

    // Render function
    const render = () => {
      if (!gl || programs.length === 0) return

      const time = (Date.now() - startTimeRef.current) / 1000
      let currentTexture = 0

      // Create smooth random movement using multiple sine waves
      const seed = randomSeedRef.current
      randomOffsetRef.current = {
        x: 0.5 + Math.sin(time * 0.4 + seed) * 0.2 + Math.sin(time * 0.23 + seed * 2) * 0.12 + Math.cos(time * 0.15) * 0.05,
        y: 0.5 + Math.cos(time * 0.35 + seed * 1.5) * 0.2 + Math.cos(time * 0.27 + seed * 3) * 0.12 + Math.sin(time * 0.18) * 0.05
      }

      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      programs.forEach((program, index) => {
        const layer = config.history[index]
        if (!layer) return

        gl.useProgram(program)

        // Set up attributes
        const positionLocation = gl.getAttribLocation(program, 'aVertexPosition')
        const texCoordLocation = gl.getAttribLocation(program, 'aTextureCoord')

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

        if (positionLocation >= 0) {
          gl.enableVertexAttribArray(positionLocation)
          gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 20, 0)
        }

        if (texCoordLocation >= 0) {
          gl.enableVertexAttribArray(texCoordLocation)
          gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 20, 12)
        }

        // Set uniforms
        const timeLocation = gl.getUniformLocation(program, 'uTime')
        const resolutionLocation = gl.getUniformLocation(program, 'uResolution')
        const mousePosLocation = gl.getUniformLocation(program, 'uMousePos')
        const textureLocation = gl.getUniformLocation(program, 'uTexture')
        const mvMatrixLocation = gl.getUniformLocation(program, 'uMVMatrix')
        const pMatrixLocation = gl.getUniformLocation(program, 'uPMatrix')
        const textureMatrixLocation = gl.getUniformLocation(program, 'uTextureMatrix')

        if (timeLocation) {
          gl.uniform1f(timeLocation, time * (layer.speed || 1))
        }

        if (resolutionLocation) {
          gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
        }

        if (mousePosLocation) {
          // Blend mouse position with random offset for smooth animated movement
          const blendFactor = 0.5 // 50% random movement, 50% mouse tracking
          const finalX = mousePosRef.current.x * (1 - blendFactor) + randomOffsetRef.current.x * blendFactor
          const finalY = mousePosRef.current.y * (1 - blendFactor) + randomOffsetRef.current.y * blendFactor
          gl.uniform2f(mousePosLocation, finalX, finalY)
        }

        // Set up matrices
        const identityMatrix = new Float32Array([
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
        ])

        if (mvMatrixLocation) {
          gl.uniformMatrix4fv(mvMatrixLocation, false, identityMatrix)
        }

        if (pMatrixLocation) {
          gl.uniformMatrix4fv(pMatrixLocation, false, identityMatrix)
        }

        if (textureMatrixLocation) {
          gl.uniformMatrix4fv(textureMatrixLocation, false, identityMatrix)
        }

        // Bind previous layer's output as input texture
        if (textureLocation && index > 0) {
          gl.activeTexture(gl.TEXTURE0)
          gl.bindTexture(gl.TEXTURE_2D, texturesRef.current[currentTexture])
          gl.uniform1i(textureLocation, 0)
        }

        // Render to framebuffer (except last layer)
        if (index < programs.length - 1) {
          gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
          gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            texturesRef.current[1 - currentTexture],
            0
          )
          currentTexture = 1 - currentTexture
        } else {
          gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        }

        // Draw
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      })

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(render)
    }

    // Start rendering
    render()

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      programs.forEach(program => gl.deleteProgram(program))
      texturesRef.current.forEach(texture => gl.deleteTexture(texture))
      gl.deleteBuffer(vertexBuffer)
      gl.deleteFramebuffer(framebuffer)
    }
  }, [config])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      const gl = glRef.current
      if (!canvas || !gl) return

      const dpi = config.options?.dpi || 1.5
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpi
      canvas.height = rect.height * dpi
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [config.options?.dpi])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      mousePosRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height, // Invert Y for WebGL
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
