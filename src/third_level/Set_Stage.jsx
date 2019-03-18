import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import Konva from 'konva';

import Singl_Alarm from './Singl_Alarm.jsx'
import Field from './Field.jsx'
import get_Date from '../core/get_Date.jsx'

let InDex = 0;

class AZS_Image extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         _W: this.props._W,
         _H: this.props._H,
         _X: this.props._X,
         _Y: this.props._Y,

      };
   }
   componentDidMount() {
      const image = new window.Image();
      image.src = '/images/azk3.jpg';
      image.onload = () => {
         this.setState({
            image: image
         });
      };
   }
   render() {
      return <Image image={this.state.image}
         width={this.state._W}
         height={this.state._H}
         x={this.state._X}
         y={this.state._Y}
         draggable
      />;
   }
}

var Singl_Alarm_Mas;

class Obj_Alarms extends React.Component {
   constructor(props) {
      super(props);
      this.id = props.id;
      this.alarms = props.alarms;
      this.state = {
         _X: this.props._X,
         _Y: this.props._Y,
         data: this.props.data,
      };
   }
   componentDidUpdate(prevProps) {
      // Типичный вариант использования (не забудьте сравнить props):
      if (this.props.data !== prevProps.data) {

         if (this.props.data != null) {
            /** сообщение в message *
            InDex++;
            let _te_Mess = document.getElementById("te_Mess");
            if (_te_Mess != null) {
               var Str_Old = _te_Mess.value;
               Str_Old = Str_Old + "\n[ №" + InDex + ";  " + get_Date() + " ]";
               _te_Mess.value = Str_Old;
            }
            ** */
            Singl_Alarm_Mas = new Array();

            var Obj = JSON.parse(this.props.data);



            for (let index = 0; index < Obj.alarms.length; index++) {
               const id = this.id;
               const element = Obj.alarms[index];
               let x = this.state._X;
               let y = this.state._Y;

               let r_Singl_Alarm = new Singl_Alarm(
                  id,
                  element,
                  x,
                  y,
                  index,
               )
               Singl_Alarm_Mas[index] = r_Singl_Alarm.render();
            }

         } else {
            Singl_Alarm_Mas = null;
         }
         this.setState({ data: this.props.data });
      }
   }
   render() {
      if (Singl_Alarm_Mas != null) {

         const listItems = Singl_Alarm_Mas.map((number) =>
            // Правильно! Ключ должен быть указан внутри массива.
            number
         );
         return (
            listItems
         );

      }
      else {
         return null;

      }
   }
}

class Set_Stage extends Component {
   render() {
      let _W = 280;
      let _H = 100;
      let _W_I = _W / 3;

      let _X_s = 2;
      let _Y_s = 2;
      let _X_1 = _X_s + _W_I;
      let _Y_1 = _Y_s + 1;

      let _Y_2 = _Y_1 + 21;
      let _Y_3 = _Y_2 + 21;
      let _Y_4 = _Y_3 + 21;

      return (
         <Stage className="t_Stage" width={_W} height={_H} x={_X_s} y={_Y_s} >
            <Layer>
               <Field _W={_W} _H={_H} obj_color='white' _X={_X_s} _Y={_Y_s} s_Width={0} />
               <AZS_Image _W={_W_I} _H={_H} _X={_X_s + 1} _Y={_Y_1} />
               <Text Text={this.props.name} x={_X_s + 20} y={_Y_s} />
            </Layer>
            <Obj_Alarms _X={_X_1} _Y={_Y_1} id={this.props.id} data={this.props.data} />
         </Stage>
      );
   }
}

export default Set_Stage;

