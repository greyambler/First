import React from 'react';

import { Rect } from 'react-konva';
import Konva from 'konva';


class Field extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         Objest: null,
         _W: this.props._W,
         _H: this.props._H,
         _X: this.props._X,
         _Y: this.props._Y,
         s_Width: this.props.s_Width,
      };
   }
   render() {
      return (
         <Rect
            width={this.state._W}
            height={this.state._H}
            x={this.state._X}
            y={this.state._Y}
            fill={this.props.obj_color}
            stroke='black'
            strokeWidth={this.state.s_Width}
            valign="top"
         />
      );
   }
}

/*
 id='AZS_Rect'
*/

export default Field;