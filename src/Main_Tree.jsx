import React, { Component, PropTypes } from 'react';

import { get_JsonTree, get_Lists, get_Rss } from './core/core_Function.jsx';

import cx from 'classnames';

import './lib/react-ui-tree.css';
import Tree from './lib/react-ui-tree.js';



const _Debuge = false;



export default class Main_Tree extends Component {
   constructor(props) {
      super(props);
      //let TREE = get_JsonTree();
      let TREE = get_Lists(get_Rss());
      this.state = {
         active: null,
         tree: TREE,
      };
   }
   renderNode = node => {
      return (
         <span className={cx('node', { 'is-active': node === this.state.active })}
            onClick={this.onClickNode.bind(null, node)}>
            {node.module}
         </span>
      );
   };
/*
            {node.type == "obList" &&
               for(var item of node.children) {               this.renderNode(item)            }
            }

*/
   onClickNode = node => {
      if (node.id != null)
         alert('id = ' + node.id
            + ', Название = ' + node.module
            + ', Тип = ' + node.type);
      this.setState({ active: node });
   };

   handleChange = tree => {
      this.setState({ tree: tree });
   };
   
   updateTree = () => {
      const { tree } = this.state;
      tree.children.push({ module: 'test' });
      this.setState({ tree: tree });
   };

   render() {
      return (
         <div>
            <div className="tree_css">
               <Tree
                  paddingLeft={6}
                  tree={this.state.tree}
                  isNodeCollapsed={this.isNodeCollapsed}
                  onChange={this.handleChange}
                  renderNode={this.renderNode}
               />
            </div>
         </div>
      );
   }
}

/*
 className="app"
 
isNodeCollapsed={this.isNodeCollapsed}
onChange={this.handleChange}
renderNode={this.renderNode}
*/