import React, { Component } from 'react';
import List_Gun_View from './List_Gun_View.jsx'

import { Stage, Layer } from 'react-konva';

import AZS_Image from '../core/AZS_Image.jsx'
import Field from '../core/Field.jsx'

const _Debuge = false;

class Device_PUMP_Guns extends Component {
   constructor(props) {
      super(props);
      this.get_eqp = this.get_eqp.bind(this);
      //this.find_ForId = this.find_ForId.bind(this);
      this.state = {
         RSS: this.props.RSS,
         WS: this.props.WS + 'c',
         id: this.props.el.id,
         dev_lev2: null,
         //counters: null,
         IsOpen: false,
      };
      this.get_eqp();
   }
   componentDidUpdate(prevProps) {
      if (this.props.RSS != prevProps.RSS) {
         this.setState({
            RSS: this.props.RSS
         });
      }
      if (this.props.dev_lev2 != prevProps.dev_lev2) {
         this.setState({
            dev_lev2: this.props.dev_lev2
         });
      }
      /*
      if (this.props.counters != prevProps.counters) {
         this.setState({
            counters: this.props.counters
         });
      }
      */
   }



   /*
   find_ForId(array, code) {
      for (var i = 0; i < array.length; i++) {
         if (array[i].id == code)
            return array[i].nm;
      }
      return "неопределен";
   }
*/
   /********************Получить оборудование************************* */

   async get_eqp() {
      if (this.state.id != null) {
         const Id = this.state.id;
         var rss = this.state.RSS + Id;
         this.setState({ messages: rss });

         var myRequest = new Request(rss);
         try {
            var response = await fetch(myRequest);
            if (response.ok) {
               const Jsons = await response.json();
               this.setState({ dev_lev2: Jsons });
            }
            else {
               throw Error(response.statusText);
            }
         }
         catch (error) {
            console.log(error);
         }
      }
   }
   render() {

      let messages = '';
      if (_Debuge) {
         messages = "Данные по \n" + this.state.RSS +
            "\nid = " + this.state.id +
            "\ntype = " + this.props.el.typ +
            "\nname = " + this.props.el.nm +
            "\n\n*************************\n";
      }

      let guns = new Array();
      let t = 0;
      if (this.state.dev_lev2 != null && this.state.dev_lev2.dvc != null) {
         for (const item of this.state.dev_lev2.dvc) {
            //let NameOil = this.find_ForId(this.props.ListFuels, item.fuel);
            if (_Debuge) {
               messages = messages + '\nid = ' + item.id +
                  "\ntype = " + item.typ +
                  "\nname = " + item.nm +
                  "\nfuel = " + item.fuel
                  //"\nТопливо = " + NameOil + "\n"
                  ;
            }
            guns[t] = item;
            t++;
         }
      }

      /********* координаты для отрисовки********************* */
      let _W = 66;
      let _H = 100;

      let _W_Image = 60;
      let _H_Image = 70;

      let _X_s = 2;
      let _Y_s = 2;
      let _X_1 = _X_s + _W_Image;
      let _Y_1 = _Y_s + 1;

      /********* координаты для отрисовки********************* */
      try {
         return (
            <table className="Def_table_FT">
               <tbody>
                  <tr>
                     <th height='12' colSpan='4'><h4>{this.props.el.nm}</h4></th>
                  </tr>
                  <tr>
                     <td>
                        <Stage className="t_Stage" width={_W} height={_H} x={_X_s} y={_Y_s} >
                           <Layer>
                              <Field _W={_W} _H={_H} obj_color='white' _X={_X_s} _Y={_Y_s} s_Width={0} />
                              <AZS_Image Image='/images/trk1.png' _W={_W_Image} _H={_H_Image} _X={_X_s + 1} _Y={_Y_1 + 1} />
                           </Layer>
                        </Stage>
                     </td>
                     <td>
                        <List_Gun_View guns={guns} WS={this.state.WS}
                           ListFuels={this.props.ListFuels}
                           name="List_Gun_View" />
                     </td>
                     {_Debuge &&
                        <td>
                           <textarea id="te_Mess_Lev" className="te_Mess_Lev"
                              defaultValue={messages} value={messages} />
                        </td>
                     }
                  </tr>
               </tbody>
            </table>
         );
      }
      catch (error) {
         console.log(error);
         return "Ошибка Device_PUMP_Guns";
      }
   }
}
export default Device_PUMP_Guns;
/*


*/