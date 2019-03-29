import React, { Component } from 'react';
import Device_View from './Device_View.jsx'

import AZS_Image from '../core/AZS_Image.jsx'
import Field from '../core/Field.jsx'
import { Stage, Layer, Text } from 'react-konva';

const _Debuge = false;

class Device_Gun extends Component {
   constructor(props) {
      super(props);
      this.find_ForId = this.find_ForId.bind(this);
      this.state = {
         RSS: this.props.RSS,
         WS: this.props.WS + 'c',
         
         //id: this.props.gun.id,
         //fuel:this.props.gun.fuel,
         //counters: null,
      };
      
   }

   find_ForId(array, code) {
      for (var i = 0; i < array.length; i++) {
         if (array[i].id == code)
            return array[i].nm;
      }
      return "неопределен";
   }
   render() {
      let messages = '';
      let NameOil = this.find_ForId(this.props.ListFuels, this.props.gun.fuel);
      if (_Debuge) {
         
         messages = '\nid = ' + this.props.gun.id +
               "\ntype = " + this.props.gun.typ +
               "\nname = " + this.props.gun.nm +
               "\nfuel = " + this.props.gun.fuel +
               "\nТопливо = " + NameOil + "\n"
               ;
      }
      
      /********* координаты для отрисовки********************* */
      let _W = 110;
      let _H = 38;

      let _W_Image = 50;
      let _H_Image = 35;

      let _X_s = 2;
      let _Y_s = 2;
      let _X_1 = _X_s + _W_Image;
      let _Y_1 = _Y_s + 1;
      /********* координаты для отрисовки********************* */

      return (
         <table className="Def_table_FT">
            <tbody>
            {_Debuge &&
               <tr>
                  <th height='12' colSpan='2'><h4>{this.props.gun.nm}</h4></th>
               </tr>
            }
               <tr>
                  <td>
                     <Stage className="t_Stage" width={_W} height={_H} x={_X_s} y={_Y_s} >
                        <Layer>
                           <Field _W={_W} _H={_H} obj_color='white' _X={_X_s} _Y={_Y_s} s_Width={0} />
                           <AZS_Image Image='/images/gun.png' _W={_W_Image} _H={_H_Image} _X={_X_s + 1} _Y={_Y_1 + 1} />
                           <Text Text={NameOil} x={_X_1 + 2} y={_Y_1 + 18} />
                        </Layer>
                     </Stage>
                  </td>
                  {_Debuge &&
                     <td>
                        <textarea id="te_Mess" className="te_Mess"
                           value={messages}
                           defaultValue={messages} />
                     </td>
                  }
               </tr>
            </tbody>
         </table>

      );
   }
}

export default Device_Gun;
