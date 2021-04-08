import React, {lazy, Suspense, useEffect, useState} from 'react';
import './scss/App.scss';
import {Nav, Navbar, NavDropdown, Form, FormControl, Button, Jumbotron} from 'react-bootstrap';
import {Link, Route, Switch} from 'react-router-dom';

let Scroll = lazy(() => { return import('./components/Scroll') });

function App() {
    return (
        <div className="App">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">LHJ's Plugins</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/introduce">Intro</Nav.Link>
                        <Nav.Link as={Link} to="/plugins">Plugins</Nav.Link>
                        <NavDropdown title="Plugin Example" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/plugins/scroll">Scroll</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route exact path="/">
                    <Jumbotron>
                        <Canvas />
                    </Jumbotron>
                </Route>
                <Route path="/introduce">
                    <Jumbotron>
                        <section className="main-content">
                            <h1 className="title">Intro</h1>
                            <h2 className="sub-title"></h2>
                            <p className="content"></p>
                        </section>
                    </Jumbotron>
                </Route>
                <Route exact path="/plugins">
                    <Jumbotron>
                        <section className="main-content">
                            <h1 className="title">Plugins</h1>
                            <h2 className="sub-title"></h2>
                            <p className="content"></p>
                        </section>
                    </Jumbotron>
                </Route>
                <Route path="/plugins/scroll">
                    <Suspense fallback={<div>로딩중입니다.</div>}>
                        <Scroll/>
                    </Suspense>
                </Route>
            </Switch>
        </div>
    );
}

function Canvas() {
    useEffect(() => {
        const canvas = document.querySelector('#canvas1');
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        let particleArray = [];
        let adjustX = 0;
        let adjustY = 0;

        ctx.lineWidth = 3;

        // handle mouse
        const mouse = {
            x: null,
            y: null,
            radius: 150
        }

        ctx.fillStyle = '#586370';
        ctx.font = '25px Verdana';
        // ctx.textAlign = 'center';
        // ctx.textBaseline = 'middle';
        // ctx.fillText('Welcome! FT DEV. \n UI DEV 1 TEAM', canvas.width / 2, canvas.height / 2);
        ctx.fillText('FT.DEV', 0, 30);
        ctx.fillText('UI개발1팀', 0, 60);
        ctx.fillText('INTERACTION', 0, 90);
        const textCoordinates = ctx.getImageData(0, 0, 200, 150);

        class Particle {
            constructor(x, y) {
                this.x = x + 30;
                this.y = y;
                this.size = 2;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 5);
            }
            draw() {
                ctx.fillStyle = '#586370';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }

        function init(a) {
            particleArray = [];
            for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
                for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
                    if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                        // let positionX = x + adjustX;
                        let positionX = x + adjustX;
                        // let positionY = y + adjustY;
                        let positionY = y + adjustY;
                        particleArray.push(new Particle(positionX * a, positionY * a));
                    }
                }
            }
        }

        let rafId;

        function animate(num) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particleArray.length; i++) {
                particleArray[i].draw();
                particleArray[i].update();
            }
            connect(num);
            rafId = requestAnimationFrame(animate.bind(null, num));
        }

        function connect(num) {
            let opacityValue = 1;
            for (let a = 0; a < particleArray.length; a++) {
                for (let b = a; b < particleArray.length; b++) {
                    let dx = particleArray[a].x - particleArray[b].x;
                    let dy = particleArray[a].y - particleArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < num) {
                        opacityValue = 1 - (distance / 50);
                        ctx.strokeStyle = 'rgba(255, 255, 255' + opacityValue + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particleArray[a].x, particleArray[a].y);
                        ctx.lineTo(particleArray[b].x, particleArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        switch (true) {
            case (window.innerWidth > 767):
                init(4);
                animate(7);
                break;
            case (window.innerWidth > 560 && window.innerWidth <= 767):
                init(3);
                animate(4);
                break;
            case (window.innerWidth <= 560):
                init(1.5);
                animate(3);
                break;
            default:
                break;
        }

        const mouseMove = function (e) {
            mouse.x = e.x;
            mouse.y = e.y;
        }

        const resizeFunc = function () {
            cancelAnimationFrame(rafId);
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            switch (true) {
                case (window.innerWidth > 767):
                    init(4);
                    animate(7);
                    break;
                case (window.innerWidth > 560 && window.innerWidth <= 767):
                    init(3);
                    animate(4);
                    break;
                case (window.innerWidth <= 560):
                    init(1.5);
                    animate(3);
                    break;
                default:
                    break;
            }
        }

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('resize', resizeFunc);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('resize', resizeFunc);
        }
    })
    return (
        <canvas id="canvas1" className="main-canvas"></canvas>
    )
}

export default App;
