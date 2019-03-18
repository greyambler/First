import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import Konva from 'konva';
import get_Date from '../core/get_Date.jsx'
import Field from './Field.jsx'


function get_Color(Int) {
   var col = 'while';
   switch (Int) {
      case 1: col = 'green'; break;
      case 2: col = 'yellow'; break;
      case 3: col = 'red'; break;
      default: col = 'grey'; break;
   }
   return col;
}
function get_Text(Int) {
   var col = ' ';
   switch (Int) {
      case 2: col = 'резервуар'; break;
      case 3: col = 'ТРК'; break;
      case 5: col = 'ИБП'; break;
      case 6: col = 'терминал сам.'; break;//'терминал самообслуживания'; break;
      default: col = ' '; break;
   }
   return col;
}

class Singl_Alarm extends React.Component {
   constructor(id, props, x, y, index) {
      super(props);
      this._Height = 20;
      if (index != null) {
         this.state = {
            id: id,
            _X: x,
            _Y: y + (this._Height * index),
            N: index,
            tp: this.props.tp,
            tp_Text: index + '-' + get_Text(this.props.tp),
            var: this.props.stat[0],
            obj_color_val: get_Color(this.props.stat[0]),
            rep: this.props.stat[1],
            obj_color_rep: get_Color(this.props.stat[1]),
            data: '',
            key: 'S_A' + index,
         };
      }
      else {
         let r = 2;
         this.state = {
            id: 0,
            _X: this.props._X,
            _Y: this.props._Y,
            N: r,
            tp: r,
            tp_Text: r + '-' + get_Text(2),
            var: 1,
            obj_color_val: get_Color(1),
            rep: 2,
            obj_color_rep: get_Color(2),
            data: '',
         };
      }
   }
   display() {
      var STR = "\ntp = " + this.state.tp + " - ";
      STR = STR.concat(this.state.tp_Text + "; ");
      STR = STR.concat(this.state.var);
      STR = STR.concat("(" + this.state.obj_color_val + "), ");
      STR = STR.concat(this.state.rep);
      STR = STR.concat("(" + this.state.obj_color_rep + ")");
      return STR;
   }
   render() {
      /* 
      let _te_Mess = document.getElementById("te_Mess");

      if (_te_Mess != null) {
         _te_Mess.value = _te_Mess.value + this.display();
      }


let Fuel_Class = document.getElementById("Fuel_Class");
if(Fuel_Class != null){
   let r =0;
}
*/
      return (
         <Layer key={this.state.key}>
            <Field _W={60} _H={this._Height} obj_color='white' _X={this.state._X} _Y={this.state._Y} s_Width={0} />
            <Text Text={this.state.tp_Text} x={this.state._X + 2} y={this.state._Y + 4} />

            <Field _W={30} _H={this._Height}
               obj_color={this.state.obj_color_val}
               _X={this.state._X + 51} _Y={this.state._Y} s_Width={0} />
            <Text Text={this.state.var} x={this.state._X + 62} y={this.state._Y + 4} />

            <Field _W={30} _H={this._Height}
               obj_color={this.state.obj_color_rep}
               _X={this.state._X + 82} _Y={this.state._Y} s_Width={0} />
            <Text Text={this.state.rep} x={this.state._X + 93} y={this.state._Y + 4} />
         </Layer>
      );
   }
}



export default Singl_Alarm;
