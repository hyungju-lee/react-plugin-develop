/* eslint-disable */
import React, {useEffect, useState} from "react";
import {Nav} from 'react-bootstrap';
import '../scss/Scroll.scss';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import axios from "axios";

function Scroll () {
    let [code, codeEdit] = useState([]);
    let [language, languageEdit] = useState(['html', 'css', 'js']);
    let [tab, tabEdit] = useState(0);

    useEffect(() => {
        axios.get('/react-plugin-page/scroll-plugin.json')
            .then((result) => {
                const codeArr = [...code];
                codeArr.push(result.data.scrollExample01.html);
                codeArr.push(result.data.scrollExample01.css);
                codeArr.push(result.data.scrollExample01.js);
                codeEdit(codeArr);
            })
            .catch((err) => {
                console.error(err);
            })

        document.querySelector('.navbar').classList.add('fixed-top');
        const scriptTag = document.createElement('script');
        const scriptTag2 = document.createElement('script');
        scriptTag.src = '/react-plugin-page/scroll-plugin.js';
        scriptTag2.src = '/react-plugin-page/scroll-plugin-ex01.js';
        document.body.appendChild(scriptTag);
        scriptTag.addEventListener('load', () => {
            document.body.appendChild(scriptTag2);
        })

        return () => {
            document.querySelector('.navbar').classList.remove('fixed-top');
        }
    }, [])
    return (
        <div>
            <div className="wrap">
                <div id="scroll-interaction-0" className="scroll-interaction">
                    <div className="fixed-element">
                        <div id="txt-0" className="txt">첫번째 텍스트</div>
                        <div id="txt-1" className="txt txt1">두번째 텍스트</div>
                        <canvas id="canvas-0" className="canvas" width="1920" height="1080"></canvas>
                    </div>
                </div>
                <div id="scroll-interaction-1">
                    Fixed 안된 일반 구간
                    <div id="txt-normal-0">일반구간 인터렉션 텍스트</div>
                </div>
                <div id="scroll-interaction-2" className="scroll-interaction">
                    <div className="fixed-element">
                        <div id="txt-2" className="txt">첫번째 텍스트</div>
                        <div id="txt-3" className="txt txt1">두번째 텍스트</div>
                        <canvas id="canvas-1" className="canvas" width="1920" height="1080"></canvas>
                    </div>
                </div>
            </div>


            <div style={{overflow: 'auto', position: "fixed", right: 0, bottom: 0, maxWidth: '700px', width: '100%', height: 'calc(100% - 60px)'}}>
                <Nav variant="tabs" defaultActiveKey="link-0">
                    <Nav.Item>
                        <Nav.Link eventKey="link-3" onClick={() => {
                            tabEdit(3);
                        }}>접기</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-0" onClick={() => {
                            tabEdit(0);
                        }}>HTML</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" onClick={() => {
                            tabEdit(1);
                        }}>CSS</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2" onClick={() => {
                            tabEdit(2);
                        }}>JavaScript</Nav.Link>
                    </Nav.Item>
                </Nav>

                <TabContent tabNum={tab} code={code} language={language} />
            </div>
        </div>
    )
}

function TabContent(props) {
    if (props.tabNum === 3) return <></>;
    return <Code code={props.code[props.tabNum]} language={props.language[props.tabNum]} />
}

function Code({code, language}) {
    useEffect(() => {
        Prism.highlightAll();
    }, [code]);
    return (
        <div className="Code">
            <pre className="line-numbers">
                <code className={`language-${language}`}>
                    {code}
                </code>
            </pre>
        </div>
    )
}

export default Scroll;