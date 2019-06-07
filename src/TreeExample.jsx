import React, { Fragment, PureComponent } from 'react';
import ReactDOM from 'react-dom';

import { Treebeard, decorators } from 'react-treebeard';
import {  get_Full_TreeBar, get_Rss } from './core/core_Function.jsx';


export default class TreeExample extends PureComponent {
    constructor(props) {
        super(props);
        this.notActiv_Node = this.notActiv_Node.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.state = {
            notactive: null,
            cursor: null,
            active: false,
            data: get_Full_TreeBar(get_Rss())
        };
    }

    notActiv_Node() {
        if (this.state.cursor != null) {
        this.state.cursor.active = false;
        }
    }

    onToggle(node, toggled) {
        const { cursor, notactive, data } = this.state;

        if (cursor) {
            this.setState({ notactive: cursor, active: false }, this.notActiv_Node());
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        this.setState({ cursor: node, data: Object.assign({}, data) });
    }

    render() {
        const { data } = this.state;

        return (
            <div className="tree_css">
                <Treebeard
                    data={data}
                    onToggle={this.onToggle}

                    style={{
                        tree: {
                            base: { color: 'brown', background: 'white', fontSize: '11px', fontWeight: 'bold' },
                            node: {
                                activeLink: { color: 'brown', background: 'rgb(1, 107, 107)' }
                            }
                        }
                    }}
                />
            </div>
        );
    }
}


/*
this.Node_Activ_Not())

style={styles.component}

            <div>
                <div className="tree_css">
                    <div style={styles.component}>
                        <Treebeard
                            data={data}
                            onToggle={this.onToggle}
                            decorators={decorators}
                        />
                    </div>
                </div>
            </div>


*/