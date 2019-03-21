import React, { Component } from 'react';
import AZS_View from './AZS_View.jsx'
import Text_A from '../core/Text_A.jsx'


const _Debuge = true;

class List_AZS_View extends Component {
   render() {
      let r = this.props.get_Id_AZS;
      const address = this.props.address;
      if (address == null)
         address = "";
      return (
         <ul className="hr">
            {
               this.props.List.map(el => (
                  <li key={'li ' + el.id}>
                     <AZS_View azs={el} WS={this.props.WS}
                        key={'AZS_View ' + el.id}
                        id={'AZS_View ' + el.id}
                        on_Click={this.props.on_Click} />
                  </li>
               ))
            }
            {_Debuge &&
               <li>
                  <textarea value={address} className="te_Mess_1" />
               </li>
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