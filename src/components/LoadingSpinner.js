import React from 'react'
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import gsap from "gsap";
import { useEffect } from "react";
import snowflake from "../images/snowflake.png"

function LoadingSpinner() {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  // const particlesLoaded = useCallback(async container => {
  //     // await console.log(container);
  // }, []);

  const spinnyBoi = () => {
    gsap.to(`.logo-spinner`, {
        duration: 3,
        rotation: 720,
        ease: "power1",
        repeatDelay: 2,
        repeat: -1,
    });

  } 

  useEffect(() => {
    //resets auth state anytime dependencies change
    spinnyBoi();
  },[]);

  return (
    <div className='loading-screen'>
      <Particles
          id="tsparticles"
          init={particlesInit}
          // loaded={particlesLoaded}
          options={
            
            {
              background: {
                  color: {
                      value: "",
                  },
              },
              fpsLimit: 60,
              //Interaction Options
              interactivity: {
                  events: {
                      onClick: {
                          enable: false,
                          mode: "push",
                      },
                      onHover: {
                          enable: true,
                          mode: "bubble",
                      },
                      resize: true,
                  },
                  modes: {
                      push: {
                          quantity: 4,
                      },
                      repulse: {
                          distance: 100,
                          duration: 0.4,
                      },
                      bubble: {
                        distance: 400,
                        duration: 0.3,
                        mix: false,
                        opacity: 1,
                        size: 4,
                      }
                  },
              },
              //Particle Options
              particles: {
                number: {
                  value: 200,
                  density: {
                    enable: true,
                    value_area: 631.3280775270874
                  }
                },
                color: {
                  value: "#fff"
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "#000000"
                  },
                  polygon: {
                    nb_sides: 5
                  },
                  image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100
                  }
                },
                opacity: {
                  value: 0.5,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                  }
                },
                size: {
                  value: {
                    min: 2,
                    max: 10,
                  },
                  random: {
                    enable: true,
                    minimumValue: 1,
                  },
                  anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                  }
                },
                line_linked: {
                  enable: false,
                  distance: 500,
                  color: "#ffffff",
                  opacity: 0.4,
                  width: 2
                },
                move: {
                  enable: true,
                  speed: 1.5,
                  direction: "bottom",
                  random: false,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                  }
                }
              },
              detectRetina: true,
            }
          }
      />
      <div id="content">
            <h1>L</h1>
            <img src={snowflake} alt="snowflake rotating" className="logo-spinner"></img>
            <h1>ading...</h1>
      </div>
    </div>
  );
}

export default LoadingSpinner
