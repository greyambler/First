import React, { Component } from 'react';
import AZS_View from './AZS_View.jsx'

//import Text_A from '../core/Text_A.jsx'

class List_AZS_View extends Component {
   render() {
      return (
         <ul className="hr">
            {
               this.props.List.map(el => (
                  <li key={'li ' + el.id}><AZS_View azs={el} WS={this.props.WS}
                     key={'AZS_View ' + el.id}
                     id={'AZS_View ' + el.id} /></li>
               ))
            }
         </ul>
      );
   }
}

export default List_AZS_View;

/*
<li><AZS_View nameAzs="Test" /></li>
<li><Text_A Message={this.props.mess} /></li>
*/