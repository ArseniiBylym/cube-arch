import React from 'react';
import ParticlesLayout from 'react-particles-js';
import styles from './Particles.module.scss';

export const Particles = React.memo(props => (
    <div className={styles.root}>
        <ParticlesLayout
            width="100vw"
            height="100vh"
            params={{
                "particles": {
                    "number": {
                        "value": 30,
                        "density": {
                            "enable": true,
                            "value_area": 1200
                        }
                    },
                    "size": {
                        "value": 2
                    },
                    "color": {
                        "value": "#c5b2b2"
                    },
                    "shape": {
                        "stroke": {
                            "width": 0
                        }
                    },
                    "line_linked": {
                        "color": "#333",
                        "distance": 400,
                        "opacity": 0.5,
                        "width": 1
                    },
                    "move": {
                        "speed": .85,
                        "random": true,
                    }
                },
                "interactivity": {
                    "events": {
                        "onhover": {
                            "enable": false,
                        },
                        "onclick": {
                            "enable": false,
                        }
                    },
                }
            }}
        />
    </div>
));
