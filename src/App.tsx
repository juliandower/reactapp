import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import './App.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>(Matter.Engine.create({
    gravity: { x: 0, y: 0 }
  }));
  const runnerRef = useRef<Matter.Runner | undefined>(undefined);
  const mousePos = useRef({ x: 0, y: 0 });

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

    // Create walls
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

    // Create balls with text
    const words = ['Software', 'Music', 'Designs', 'Engineering', 'Float', 'Reactive'];
    const colors = ['#FF4136', '#2ECC40', '#0074D9', '#B10DC9', '#FF851B', '#7FDBFF'];
    const radii = [60, 50, 55, 45, 40, 50];  // Different sizes for each ball
    const balls = words.map((word, index) => {
      return Matter.Bodies.circle(
        Math.random() * (window.innerWidth - 120) + 60,
        Math.random() * (window.innerHeight - 120) + 60,
        60,
        {
          render: {
            fillStyle: colors[index % colors.length]
          },
          label: word,
          restitution: 0.8,
          friction: 0.1,
          frictionAir: 0.03,
          density: 0.005,
          slop: 0,
          isStatic: false
        }
      );
    });

    console.log('Initial ball positions:', balls.map(b => ({ x: b.position.x, y: b.position.y })));

    Matter.World.add(engine.world, [...walls, ...balls]);

    // Create and start the runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Handle mouse movement on the window instead of canvas
    const handleMouseMove = (event: MouseEvent) => {
      if (!render.canvas) return;
      
      const bounds = render.canvas.getBoundingClientRect();
      mousePos.current = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top
      };
      console.log('Mouse moved:', mousePos.current);
    };

    // Add mouse move listener to window
    window.addEventListener('mousemove', handleMouseMove);

    Matter.Events.on(render, 'afterRender', () => {
      const context = render.context;
      if (context) {
        // Draw text for balls
        balls.forEach(ball => {
          context.font = 'bold 24px Arial';
          context.fillStyle = '#000000';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(ball.label, ball.position.x, ball.position.y);
        });
      }
    });

    // Apply repulsion forces
    Matter.Events.on(engine, 'beforeUpdate', () => {
      const repulsionRadius = 200;
      const repulsionStrength = 0.5;
      const centerAttractionStrength = 0.001; // Increased from 0.0001 to 0.001
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      balls.forEach((ball, index) => {
        // Mouse repulsion
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
    });

    Matter.Events.on(engine, 'collisionStart', (event) => {
      console.log('Collision detected:', event.pairs.map(pair => ({
        bodyA: pair.bodyA.label,
        bodyB: pair.bodyB.label
      })));
    });

    // Handle window resize
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      Matter.Body.setPosition(walls[0], Matter.Vector.create(window.innerWidth / 2, window.innerHeight + 30));
      Matter.Body.setPosition(walls[1], Matter.Vector.create(window.innerWidth / 2, -30));
      Matter.Body.setPosition(walls[3], Matter.Vector.create(window.innerWidth + 30, window.innerHeight / 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      Matter.Render.stop(render);
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      render.canvas.remove();
    };
  }, []);

  return (
    <div className="App">
      <header className="portfolio-header">
        <nav>
          <h1>julian dower</h1>
          <div className="menu-container">
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <IoMdClose size={24} /> : <GiHamburgerMenu size={24} />}
            </button>
            <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
              <div className="menu-content">
                <h2>Contact Info</h2>
                <ul>
                  <li>Email: dower.julian@gmail.com</li>
                  <li>GitHub: github.com/juliandower</li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div ref={sceneRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}

export default App;
