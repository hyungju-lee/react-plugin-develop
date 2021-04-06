import React, {lazy, Suspense, useEffect} from 'react';
import './scss/App.css';
import {Nav, Navbar, NavDropdown, Form, FormControl, Button, Jumbotron} from 'react-bootstrap';
import {Link, Route, Switch} from 'react-router-dom';

let Scroll = lazy(() => { return import('./components/Scroll') });

function App() {
    return (
        <div className="App">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">LHJ's Plugins</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/introduce">Intro</Nav.Link>
                        <Nav.Link href="/plugins">Plugins</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/plugins/scroll">Scroll</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>

            <Route exact path="/">
                <Jumbotron>
                    <h1>Welcome!!</h1>
                    <h2>FT DEV. UI 개발 1팀</h2>
                    <p>플러그인 개발 페이지입니다.</p>
                </Jumbotron>
            </Route>
            <Route path="/introduce">
                <div>소개페이지입니다.</div>
            </Route>
            <Route exact path="/plugins">
                <div>플러그인페이지입니다.</div>
            </Route>
            <Route path="/plugins/scroll">
                <Suspense fallback={<div>로딩중입니다.</div>}>
                    <Scroll/>
                </Suspense>
            </Route>
        </div>
    );
}

export default App;
