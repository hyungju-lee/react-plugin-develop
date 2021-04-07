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
                        <section className="main-content">
                            <h1 className="title">Welcome!!</h1>
                            <h2 className="sub-title">FT DEV. UI 개발 1팀</h2>
                            <p className="content">플러그인 소개 페이지입니다.</p>
                        </section>
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

export default App;
