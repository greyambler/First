import React, { Component } from 'react';

import Singl_Alarm from './Singl_Alarm.jsx'

var Singl_Alarm_Mas;

class Alarm_Line extends React.Component {
   constructor(props) {
      super(props);
      this.id = props.id;
      this.alarms = props.alarms;
      this.state = {
         _X: this.props._X,
         _Y: this.props._Y,

         _W:this.props._W,
         data: this.props.data,
      };
   }
   componentDidUpdate(prevProps) {
      if (this.props.data !== prevProps.data) {
         if (this.props.data != null) {
            Singl_Alarm_Mas = new Array();
            var Obj = JSON.parse(this.props.data);
            for (let index = 0; index < Obj.alarms.length; index++) {
               const element = Obj.alarms[index];
               let x = this.state._X;
               let y = this.state._Y;
               let w = this.state._W;
               let r_Singl_Alarm = new Singl_Alarm(
                  element,
                  x,
                  y,
                  w,
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

export default Alarm_Line;