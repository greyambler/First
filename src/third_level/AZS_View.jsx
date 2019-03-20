import React, { Component } from 'react';
//import ReactDOM from 'react-dom';


import AZS_Image from './AZS_Image.jsx'
import Alarm_Line from './Alarm_Line.jsx'
import makeCounter from '../core/makeCounter.jsx'

import { Stage, Layer } from 'react-konva';
//import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
//import Konva from 'konva';
//import Text_A from '../core/Text_A.jsx'
//import Singl_Alarm from './Singl_Alarm.jsx'

import Field from './Field.jsx'
import get_Date from '../core/get_Date.jsx'
import get_Json_String from '../core/get_Json_String.jsx'

let Ws;
var counter = makeCounter();

class AZS_View extends Component {
   constructor(props) {
      super(props);
      Ws = this.props.WS;

      this.start_ws = this.start_ws.bind(this);
      this.stop_ws = this.stop_ws.bind(this);
      this.OnOpen = this.OnOpen.bind(this);

      if (this.props.azs != null) {
         this.state = {
            id: this.props.azs.id,
            name_azs: this.props.azs.nm,
            connection: null,
            N_Test: 1,
            data: null,
            messages: [],
            IsOpen: false,
         };
      }
      this.start_ws()
   }

   start_ws(e) {
      if ((this.state.id != null && this.state.connection == null) || this.state.connection.readyState != 1) {

         this.state.connection = new WebSocket(Ws);
         this.state.connection.onopen = evt => { this.OnOpen(evt.data) }//{ this.add_messages(evt.data) }
         this.state.connection.onclose = evt => { this.add_messages(evt.data) }
         this.state.connection.onerror = evt => { this.add_messages(evt.data) }

         this.state.connection.onmessage = evt => {

            if (evt.data != null) {

               //this.setState({ data: evt.data })// Рабочий
               //this.add_messages("\n" + evt.data);


               /**Test*******************************************/
               let r1 = (((this.state.N_Test + 1) % 4) == 0) ? 1 : (this.state.N_Test + 1) % 4;
               let r2 = (((this.state.N_Test + 2) % 4) == 0) ? 1 : (this.state.N_Test + 2) % 4;
               let r3 = (((this.state.N_Test + 3) % 4) == 0) ? 1 : (this.state.N_Test + 3) % 4;
               this.state.N_Test = (((this.state.N_Test + 1) % 4) == 0) ? 1 : (this.state.N_Test + 1) % 4;

               let Test_Val = '{"id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c",' +
                  '"alarms":' +
                  '[{"tp":2,"stat":[' + r1 + ',' + this.state.N_Test + ']},' +
                  '{"tp":5,"stat":[' + r2 + ',' + r1 + ']},' +
                  '{"tp":6,"stat":[' + r3 + ',' + r2 + ']},' +
                  '{"tp":3,"stat":[' + r1 + ',' + r3 + ']}]}';


               this.setState({ data: Test_Val })
               this.add_messages("\n" + this.state.data);
               /**Test*******************************************/

            }
         }
      }
   }
   OnOpen(e) {
      if (this.state.id != null && !this.state.IsOpen) {//this.state.connection.OPEN) {
         let MS = get_Json_String(this.state.id);
         this.state.connection.send(MS);
         counter.set(1);
         this.setState({ messages: "", IsOpen: true })
         this.add_messages("\n\tOnOpen(e)");
      }
   }
   stop_ws(e) {
      if (this.state.IsOpen) {//(this.state.connection.readyState == 1) {
         this.state.connection.close(1000, "Hello Web Sockets!");
         this.setState({ data: null, IsOpen: false });
         this.add_messages("\n\tstop_ws(e)");

      }

   }
   add_messages(e) {
      if (e != null) {
         this.setState({
            messages: this.state.messages.concat("\n[ №" +
               counter() + ";  " + get_Date() + " ]\n " + e + "\n")
         });
      }
   }



   render() {
      let _W = 200;
      let _H = 90;

      let _W_Image = 60;
      let _H_Image = 70;

      let _X_s = 2;
      let _Y_s = 2;
      let _X_1 = _X_s + _W_Image;
      let _Y_1 = _Y_s + 1;

      return (
         <table height={_H + 41} className="Def_table_FT">
            <tbody>
               <tr>
                  <th height='12' colSpan='2'><h4>{this.state.name_azs}</h4></th>
               </tr>
               <tr>
                  {this.state.IsOpen
                     ? <td colSpan='2'><button className="Def_button" onClick={this.stop_ws}>стоп</button></td>
                     : <td colSpan='2'><button className="Def_button" onClick={this.start_ws}>старт</button></td>
                  }
               </tr>
               <tr>
                  <td>
                     <Stage className="t_Stage" width={_W} height={_H} x={_X_s} y={_Y_s} >
                        <Layer>
                           <Field _W={_W} _H={_H} obj_color='white' _X={_X_s} _Y={_Y_s} s_Width={0} />
                           <AZS_Image _W={_W_Image} _H={_H_Image} _X={_X_s + 1} _Y={_Y_1} />
                        </Layer>
                        <Alarm_Line _X={_X_1 + 2} _Y={_Y_1 + 2} _W={_W - _W_Image}
                           data={this.state.data}
                        />
                     </Stage>
                  </td>
                  <td>
                     <textarea id="te_Mess" ref="te_Mess" className="te_Mess"
                        defaultValue={this.state.messages} />
                  </td>
               </tr>
            </tbody>
         </table>
      );
   }
}

export default AZS_View;

/*
<Stage className="t_Stage" width={_W} height={_H} x={_X_s} y={_Y_s} >
                        <Layer>
                           <Field _W={_W} _H={_H} obj_color='white' _X={_X_s} _Y={_Y_s} s_Width={0} />
                           <AZS_Image _W={_W_I} _H={_H} _X={_X_s + 1} _Y={_Y_1} />
                        </Layer>
                        <Alarm_Line _X={_X_1} _Y={_Y_1} data={this.state.data} />
                     </Stage>

*/