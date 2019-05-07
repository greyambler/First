import React, { Component } from 'react';
import Singl_Alarm from './Singl_Alarm.jsx'


class Alarm_Line extends React.Component {
   constructor(props) {
      super(props);
      this.id = props.id;
      this.alarms = props.alarms;
      this.state = {
         _X: this.props._X,
         _Y: this.props._Y,

         _W: this.props._W,
         data: this.props.data,
         S_Alarm_Mas: null,
      };
   }
   componentDidUpdate(prevProps) {
      let Singl_Alarm_Mas = new Array();
      if (this.props.data != prevProps.data) {
         if (this.props.data != null) {
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
            this.setState({ S_Alarm_Mas: Singl_Alarm_Mas });
         } else {
            this.setState({ S_Alarm_Mas: null });
         }
         this.setState({ data: this.props.data });
      }
   }
   render() {
      if (this.state.S_Alarm_Mas != null) {
         const listItems = this.state.S_Alarm_Mas.map((number) => number);
         return (listItems);
      }
      else { return null; }
   }
}

export default Alarm_Line;