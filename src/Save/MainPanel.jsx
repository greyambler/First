import React, { Component, PropTypes } from 'react';

//import css from './panel.css'

const _Debuge = false;


export default class MainPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="layout">
                <div class="sidebar">Колонка 1</div>
                <div class="content">Колонка 2</div>
            </div>
        );
    }
}
