import React, { Component } from 'react';

import Device_PL from './Device_PL.jsx'
import Device_PUMP from './Device_PUMP.jsx'
import Device_TSO from './Device_TSO.jsx'

const _Debuge = false;

class List_Device_View extends React.Component {
   constructor(props) {
      super(props);
      this.Get_Device = this.Get_Device.bind(this);
      
      this.state = {
         id: this.props.List.id,
         List_Devce: this.props.List.dvc,
         name_azs: this.props.name,
         RSS: this.props.RSS,
      };
   }
   componentDidUpdate(prevProps) {
      if (this.props.List !== prevProps.List) {
         this.setState({ List_Devce: this.props.List.dvc });
      }
   }
   Get_Device(el) {
      switch (el.typ) {
         case 'pl': return <Device_PL el={el} RSS={this.state.RSS} ListFuels={this.props.ListFuels}/>;
         case 'pump': return <Device_PUMP el={el} RSS={this.state.RSS} ListFuels={this.props.ListFuels}/>;
         case 'tso': return <Device_TSO el={el} RSS={this.state.RSS} />;
         default: return null;
      }
   }
   render() {
      return (
         <div>
            <h3> <center>{this.state.name_azs}</center></h3>
            <hr />
            <ul className="hr">
               {
                  this.state.List_Devce.map(el => (
                     <li key={'li ' + el.id}>
                        {this.Get_Device(el)}
                     </li>
                  ))
               }
               {_Debuge &&
                  <li>
                     <textarea value={this.state.RSS} className="te_Mess_1" />
                  </li>
               }
            </ul>
         </div>
      );
   };
}
export default List_Device_View;
