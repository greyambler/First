import React, { Component } from 'react';
import Device_View from './Device_View.jsx'

const _Debuge = false;

class Device_PUMP extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      return (
         <Device_View azs={this.props.el}
            key={'Device_View ' + this.props.el.id}
            id={'Device_View ' + this.props.el.id}
            Image='/images/trk1.png'
         />
      );
   }
}

export default Device_PUMP;
