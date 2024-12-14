import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import './App.css';
import { MdEmail } from 'react-icons/md';
import { FaGithub, FaSoundcloud } from 'react-icons/fa';

function App() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>(Matter.Engine.create({
    gravity: { x: 0, y: 0 }
  }));
  const mousePos = useRef({ x: 0, y: 0 });

  interface CustomBody extends Matter.Body {
    label: string;
    circleRadius: number;
  }

  // Create image elements for icons
  const iconElements = useRef<{ [key: string]: HTMLImageElement }>({});

  // Colors configuration
  const colors = [
    '#00B4D8', // Bright turquoise
    '#0077B6', // Deep blue
    '#48CAE4', // Light turquoise
    '#20B2AA', // Light sea green
    '#40E0D0', // Turquoise
    '#00CED1', // Dark turquoise
    '#5F9EA0', // Cadet blue
    '#4682B4', // Steel blue
    '#008B8B', // Dark cyan
    '#48D1CC', // Medium turquoise
    '#00FFCD'  // Bright mint
  ];

  // Set white background
  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    // Create and load icon SVGs
    const loadIcons = async () => {
      // All logos are defined here - edit these SVGs to change the logos
      const iconPaths = {
        ReactNative: `data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" fill="black">
            <circle cx="0" cy="0" r="2.05"/>
            <g stroke="black" stroke-width="1" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
        `)}`,
        Flutter: `data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
            <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
          </svg>
        `)}`,
        Vercel: `data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
            <path d="M12 2L2 19.778h20L12 2z"/>
          </svg>
        `)}`,
        Supabase: `data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
            <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.659z"/>
          </svg>
        `)}`,
        Ableton: `data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
            <path d="M2 2h4v20H2V2zm8 0h4v20h-4V2zm8 0h4v20h-4V2z"/>
          </svg>
        `)}`,
        Il: `data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-weight="bold" font-size="14" fill="black">Il</text>
          </svg>
        `)}`,
        Ai: `data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-weight="bold" font-size="14" fill="black">Ai</text>
          </svg>
        `)}`,
      };

      for (const [label, path] of Object.entries(iconPaths)) {
        const img = new Image();
        img.src = path;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        iconElements.current[label] = img;
      }
    };

    loadIcons();
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = engineRef.current;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: '#ffffff',
        pixelRatio: window.devicePixelRatio
      }
    });

    // Create walls that adapt to screen size
    const updateWalls = () => {
      const walls = [
        Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 30, window.innerWidth, 60, { 
          isStatic: true,
          render: { fillStyle: 'transparent' }
        }),
        Matter.Bodies.rectangle(window.innerWidth / 2, -30, window.innerWidth, 60, { 
          isStatic: true,
          render: { fillStyle: 'transparent' }
        }),
        Matter.Bodies.rectangle(-30, window.innerHeight / 2, 60, window.innerHeight, { 
          isStatic: true,
          render: { fillStyle: 'transparent' }
        }),
        Matter.Bodies.rectangle(window.innerWidth + 30, window.innerHeight / 2, 60, window.innerHeight, { 
          isStatic: true,
          render: { fillStyle: 'transparent' }
        })
      ];
      return walls;
    };

    // All logos and text are defined here
    const items = [
      { type: 'text', label: 'Software' },      // Text ball 1
      { type: 'text', label: 'Sound' },         // Text ball 2
      { type: 'text', label: 'Design' },        // Text ball 3
      { type: 'text', label: 'Visual' },      // Text ball 4
      { type: 'icon', label: 'ReactNative' },   // Icon ball 1
      { type: 'icon', label: 'Flutter' },       // Icon ball 2
      { type: 'icon', label: 'Vercel' }         // Icon ball 3
    ];

    // Calculate responsive ball sizes based on viewport
    const vw = window.innerWidth / 100;
    const vh = window.innerHeight / 100;
    const baseSize = Math.min(vw, vh);

    // Increase base sizes, especially for mobile
    const minSize = Math.max(baseSize, 5);
    const radii = items.map(item => item.type === 'icon' ? minSize * 8 : minSize * 12);

    // Center the initial positions more
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;

    const balls = items.map((item, index) => {
      const angle = (index / items.length) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      const ball = Matter.Bodies.circle(
        x,
        y,
        radii[index],
        {
          render: {
            fillStyle: colors[index]
          },
          label: item.label,
        }
      ) as CustomBody;
      
      ball.circleRadius = radii[index];
      return ball;
    });

    const walls = updateWalls();
    Matter.World.add(engine.world, [...walls, ...balls]);

    // Handle mouse movement on the window instead of canvas
    const handleMouseMove = (event: MouseEvent) => {
      if (!render.canvas) return;
      
      const bounds = render.canvas.getBoundingClientRect();
      mousePos.current = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top
      };
    };

    // Add mouse move listener to window
    window.addEventListener('mousemove', handleMouseMove);

    const beforeUpdateHandler = () => {
      const repulsionRadius = 100;
      const repulsionStrength = 0.2;
      const centerAttractionStrength = 0.005;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      balls.forEach((ball: CustomBody) => {
        const dx = ball.position.x - mousePos.current.x;
        const dy = ball.position.y - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionRadius) {
          const force = {
            x: (dx / distance) * repulsionStrength,
            y: (dy / distance) * repulsionStrength
          };
          Matter.Body.applyForce(ball, ball.position, force);
        }

        // Center attraction
        const dxCenter = centerX - ball.position.x;
        const dyCenter = centerY - ball.position.y;
        const distanceToCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
        
        const attractionForce = {
          x: (dxCenter / distanceToCenter) * centerAttractionStrength,
          y: (dyCenter / distanceToCenter) * centerAttractionStrength
        };
        
        Matter.Body.applyForce(ball, ball.position, attractionForce);
      });
    };

    Matter.Events.on(engine, 'beforeUpdate', beforeUpdateHandler);

    Matter.Events.on(render, 'afterRender', () => {
      const context = render.context;
      if (context) {
        balls.forEach((ball: CustomBody, index) => {
          const item = items[index];
          const fontSize = Math.max(20, ball.circleRadius * 0.4);
          
          if (item.type === 'icon') {
            // Draw icon only
            const icon = iconElements.current[item.label];
            if (icon) {
              const iconSize = ball.circleRadius * 1.2; // Make icons bigger relative to ball size
              context.save();
              context.translate(ball.position.x, ball.position.y);
              context.drawImage(
                icon,
                -iconSize / 2,
                -iconSize / 2,
                iconSize,
                iconSize
              );
              context.restore();
            } else {
              console.log('Missing icon for:', item.label); // Debug missing icons
            }
          } else {
            // Draw text only
            context.font = `bold ${fontSize}px "Space Grotesk", system-ui, sans-serif`;
            context.fillStyle = '#000000';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(item.label, ball.position.x, ball.position.y);
          }
        });
      }
    });

    // Update ball sizes on window resize
    const handleResize = () => {
      const newVw = window.innerWidth / 100;
      const newVh = window.innerHeight / 100;
      const newBaseSize = Math.max(Math.min(newVw, newVh), 5);
      
      balls.forEach((ball: CustomBody, index) => {
        const item = items[index];
        const sizeFactor = item.type === 'icon' ? 8 : 12;
        const newRadius = newBaseSize * sizeFactor;
        Matter.Body.scale(ball, newRadius / ball.circleRadius, newRadius / ball.circleRadius);
        ball.circleRadius = newRadius;
      });

      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;

      // Remove old walls
      Matter.World.clear(engine.world, false);
      
      // Add new walls and existing balls
      const newWalls = updateWalls();
      Matter.World.add(engine.world, [...newWalls, ...balls]);
    };

    window.addEventListener('resize', handleResize);

    // Create and start the runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      Matter.Events.off(engine, 'beforeUpdate', beforeUpdateHandler);
      window.removeEventListener('resize', handleResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      render.canvas.remove();
    };
  }, []);

  return (
    <div className="App">
      <header className="portfolio-header">
        <nav>
          <div className="social-icons">
            <a href="mailto:dower.julian@gmail.com" aria-label="Email">
              <MdEmail size={24} />
            </a>
            <a href="https://github.com/juliandower" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={24} />
            </a>
            <a href="https://soundcloud.com/yungjuan420" target="_blank" rel="noopener noreferrer" aria-label="SoundCloud">
              <FaSoundcloud size={24} />
            </a>
          </div>
          <h1>julian dower</h1>
        </nav>
      </header>
      <div ref={sceneRef} style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
}

export default App;
