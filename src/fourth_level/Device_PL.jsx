import React, { Component } from 'react';
//import Device_View from './Device_View.jsx'
import AZS_Image from '../core/AZS_Image.jsx'
import Field from '../core/Field.jsx'
import { Stage, Layer, Text } from 'react-konva';

const _Debuge = false;

class Device_PL extends Component {
   constructor(props) {
      super(props);
      this.find_ForId = this.find_ForId.bind(this);
   }

   find_ForId(array, code) {
      for (var i = 0; i < array.length; i++) {
         if (array[i].id == code) return array[i].nm;
      }
      return -1;
   }

   render() {
      let NameOil = this.find_ForId(this.props.ListFuels, this.props.el.fuel);
      let messages = '';
      if (_Debuge) {
         messages = "Данные по \nid = " + this.props.el.id +
            "\nname_azs = " + this.props.el.nm +
            "\ntype = " + this.props.el.typ +
            "\nfuel = " + this.props.el.fuel + "\n*************************";
      }
      //this.props.ListFuels
      let HeadName = '';
      if (this.props.el.prop != null && this.props.el.prop.length > 0) {
         for (const iterator of this.props.el.prop) {
            HeadName = HeadName +  iterator.capacity + ' (' + NameOil + ')';
            if (_Debuge) {
               messages = messages +
                  "\nобъем(max) = " + iterator.capacity +
                  "\nтип = " + iterator.typ;
            }
         }
      }
      if (_Debuge) {
         messages = messages +
            "\nкод = " + this.props.el.fuel +
            "\nтоплива = " + NameOil;
      }
      if (HeadName == '')
         HeadName = 'Не определено';

      /********* координаты для отрисовки********************* */
      let _W = 190;
      let _H = 100;

      let _W_Image = 60;
      let _H_Image = 70;

      let _X_s = 2;
      let _Y_s = 2;
      let _X_1 = _X_s + _W_Image;
      let _Y_1 = _Y_s + 1;
      /********* координаты для отрисовки********************* */

      return (
         <table className="Def_table_FT">
            <tbody>
               <tr>
                  <th height='12' colSpan='2'><h4>{this.props.el.nm}</h4></th>
               </tr>
               <tr>
                  <td>
                     <Stage className="t_Stage" width={_W} height={_H} x={_X_s} y={_Y_s} >
                        <Layer>
                           <Field _W={_W} _H={_H} obj_color='white' _X={_X_s} _Y={_Y_s} s_Width={0} />
                           <Text fontSize={18}
                              /*stroke='grey'*/
                              fill='blue'
                              Text={HeadName} x={_X_s + 7} y={_Y_1 - 5} />
                           <AZS_Image Image='/images/oil_1.png' _W={_W_Image} _H={_H_Image} _X={_X_s + 1} _Y={_Y_1 + 16} />
                           <Text Text={this.props.FullEQPMS} x={_X_1 + 2} y={_Y_1 + 18} />
                        </Layer>
                     </Stage>
                  </td>
                  {_Debuge &&
                     <td>
                        <textarea id="te_Mess_Lev" className="te_Mess_Lev"

                           defaultValue={messages} />
                     </td>
                  }
               </tr>
            </tbody>
         </table>
      );
      /*
            return (
               <Device_View azs={this.props.el}
                  key={'Device_View ' + this.props.el.id}
                  id={'Device_View ' + this.props.el.id}
                  RSS={this.props.RSS}
                  HeadName={HeadName}
                  FullNamePL={FullNamePL}
                  FullEQPMS={FullEQPMS}
                  messages={FullEQPMS}
                  Image='/images/oil_1.png'
               />
            );
            */
   }
}

export default Device_PL;
