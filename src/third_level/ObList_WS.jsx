import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import Konva from 'konva';

import Set_Stage from '../third_level/Set_Stage.jsx'

import get_Date from '../core/get_Date.jsx'
import get_Json_String from '../core/get_Json_String.jsx'


let Ws;//'ws://172.23.16.125:8000/dpws-1.0-SNAPSHOT/alws');
let MS;
let connection;
let InDex = 0;

let N_Test = 1;

function TR_Azs(e) {
   const List = e.List;
   const Numb = List.length;
   const Proc = 100 / Numb + "%";
   return (
      <tr>
         {List.map(el => (
            <td key={el.id} width={Proc} className="td_WS">
               <button width={Proc} className="Def_button"
                  id={el.id} onClick={e.on_Click} >{el.nm}</button>
            </td>
         ))}
      </tr>
   );
}

function TR_Stop(e) {
   const List = e.List;
   const Numb = List.length;
   const Proc = 100 / Numb + "%";
   return (
      <tr>
         <td key="0" width={Proc}>
            <button width={Proc} className="Def_button" id="0" onClick={e.on_Click} >Stop</button>
         </td>
      </tr>
   );
}

let OldStart = "";
class ObList_WS extends React.Component {
   constructor(props) {
      super(props);
      Ws = this.props.WS;
      this.start_ws = this.start_ws.bind(this);
      this.stop_ws = this.stop_ws.bind(this);
      this.OnOpen = this.OnOpen.bind(this);
      //this.display = this.display.bind(this);
      this.state = {
         messages: [],
         color_val: 'red',
         color_rep: 'green',
         data: null,
      };
   }
   start_ws(e) {
      if (MS == null) {
         MS = get_Json_String(e.currentTarget.id);
         if (connection == null || connection.readyState != 1) {
            connection = new WebSocket(Ws);
            connection.onopen = evt => { this.OnOpen(evt.data) }//{ this.add_messages(evt.data) }
            connection.onclose = evt => { this.add_messages(evt.data) }
            connection.onerror = evt => { this.add_messages(evt.data) }

            connection.onmessage = evt => {

               if (evt.data != null) {
                  //this.setState({ data: evt.data })// Рабочий

                  /**Test*******************************************/
                  let r1 = (((N_Test + 1) % 4) == 0) ? 1 : (N_Test + 1) % 4;
                  let r2 = (((N_Test + 2) % 4) == 0) ? 1 : (N_Test + 2) % 4;
                  let r3 = (((N_Test + 3) % 4) == 0) ? 1 : (N_Test + 3) % 4;



                  this.setState({
                     data: '{"id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c",' +
                        '"alarms":' +
                        '[{"tp":2,"stat":[' + r1 + ',' + N_Test + ']},' +
                        '{"tp":5,"stat":[' + r2 + ',' + r1 + ']},' +
                        '{"tp":6,"stat":[' + r3 + ',' + r2 + ']},' +
                        '{"tp":3,"stat":[' + r1 + ',' + r3 + ']}]}'
                  });
                  N_Test = (((N_Test + 1) % 4) == 0) ? 1 : (N_Test == 0) % 4;
                  /**Test*******************************************/
                  //this.add_messages("\n" + this.state.data);
                  let mess = this.state.messages.concat("\n[ №" + InDex + ";  " + get_Date() + " ] " + e);
                  this.add_messages("\n" + mess);
               }
            }
         }
      } else {
         this.stop_ws();
      }

   }
   OnOpen(e) {
      if (MS != null && connection.OPEN) {
         connection.send(MS);
         InDex = 0;
         this.setState({ messages: "" })
         this.add_messages("\n\tOnOpen(e)");



         /* 
         let _te_Mess = document.getElementById("te_Mess");

         if (_te_Mess != null) {
            _te_Mess.value = null;
         }*/

      }
   }
   stop_ws(e) {
      if (connection.readyState == 1) {
         MS = null;
         connection.close(1000, "Hello Web Sockets!");
         this.add_messages("\n\tstop_ws(e)");
         this.setState({ data: null });
      }
   }
   add_messages(e) {
      if (e != null) {
         //this.setState({ messages: this.state.messages.concat("\n[ №" + InDex + ";  " + get_Date() + " ] " + e) })
         
         this.display(e);
         this.setState({
            color_val: Konva.Util.getRandomColor(),
            color_rep: Konva.Util.getRandomColor(),
         });
      }
   }



   /**/
   display(e) {
      if (e != null) {
         InDex++;
         this.setState({ messages: this.state.messages.concat("\n[ №" + InDex + ";  " +
          get_Date() + " ]" + e) })
      }
   }
   
   render() {
      const List = this.props.obLists;
      const Numb = List.length;
      const Numb_T = List.length * 2;
      const Proc = 100 / Numb + "%";

      return (
         <div>
            <table className="Def_table" key="AZSz">
               <caption className="tb_dvcscaption"><h4>Третий уровень запроса</h4></caption>
               <tbody>
                  <tr>
                     <th key="th_ObList" colSpan={Numb_T}>Объекты (ObList) WS </th>
                  </tr>
                  {MS == null ?
                     <TR_Azs List={List} on_Click={this.start_ws} />
                     :
                     <TR_Stop List={List} on_Click={this.stop_ws} />
                  }
                  <tr colSpan={Numb}>
                     <td colSpan={Numb}>
                        <textarea id="te_Mess" ref="te_Mess" className="te_Mess" defaultValue={this.state.messages} />
                     </td>
                     <td colSpan={Numb} valign="top">
                        <Set_Stage id="set_Stage"
                           obList_WS={this}
                           data={this.state.data}
                           obj_color_val={this.state.color_val}
                           obj_color_rep={this.state.color_rep}

                        />
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      );
   }
}


export default ObList_WS;
