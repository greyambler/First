import React, { Component, PropTypes } from 'react';
import MainTree from './Main_Tree.jsx'   // tree
import MainRequest from './MainRequest.jsx'   // main

import TreeExample from './TreeExample.jsx'   // tree
import './main_tree.css';

const _Debuge = true;


class Nav extends Component {
    render() {
        return (
            <nav>
                <div className="topmenu">
                    <div>
                        <div className="header_Inner">
                            <div className="header_Text">
                                <h3>Тестовое приложение на React. [ Диспетчер ]</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}


export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div>
                <Nav />
                <div className="content">
                {_Debuge ?(
                    <TreeExample />
                ):(
                    <MainTree />
                    )}
                    <MainRequest />
                </div>
            </div>
        );
    }
}
