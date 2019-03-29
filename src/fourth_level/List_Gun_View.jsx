import React, { Component } from 'react';
import Device_Gun from './Device_Gun.jsx'

const _Debuge = false;

class List_Gun_View extends Component {
   constructor(props) {
      super(props);     
      
   }

   render() {
      let messages = '';
      return (
         <ul className="hr">
            {
               this.props.guns.map(el => (
                  <li key={'li ' + el.id}>
                     <Device_Gun gun={el} WS={this.props.WS}
                        key={'GUN ' + el.id}
                        ListFuels={this.props.ListFuels}
                        id={el.id}/>
                  </li>
               ))
            }
            {_Debuge &&
               <li>
                  <textarea value={messages} className='te_Mess_1' />
               </li>
            }
         </ul>
      );
   }
}

export default List_Gun_View;
