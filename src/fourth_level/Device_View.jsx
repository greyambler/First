import React, { Component } from 'react';
import AZS_Image from '../core/AZS_Image.jsx'
import Field from '../core/Field.jsx'
import makeCounter from '../core/makeCounter.jsx'
import { Stage, Layer, Text } from 'react-konva';

const _Debuge = false;

class Device_View extends Component {
   constructor(props) {
      super(props);

      let r = this.props.get_Id_AZS;
      if (this.props.azs != null) {
         this.state = {
            RSS: this.props.RSS,
            id: this.props.azs.id,
            name_azs: this.props.azs.nm,
            messages: this.props.RSS,
            FullNamePL: this.props.FullNamePL,
         };
      }
   }
   componentDidUpdate(prevProps) {
      if (this.props.FullNamePL !== prevProps.FullNamePL) {
         this.setState({
            messages: this.props.RSS,
            FullNamePL: this.props.FullNamePL
         });
      }
   }

   render() {
      let _W = 190;
      let _H = 90;

      let _W_Image = 60;
      let _H_Image = 70;

      let _X_s = 2;
      let _Y_s = 2;
      let _X_1 = _X_s + _W_Image;
      let _Y_1 = _Y_s + 1;

      return (
         <table className="Def_table_FT">
            <tbody>
               <tr>
                  <th height='12' colSpan='2'><h4>{this.state.name_azs}</h4></th>
               </tr>
               <tr>
                  <td>
                     <Stage className="t_Stage" width={_W} height={_H} x={_X_s} y={_Y_s} >
                        <Layer>
                           <Field _W={_W} _H={_H} obj_color='white' _X={_X_s} _Y={_Y_s} s_Width={0} />
                           <AZS_Image Image={this.props.Image} _W={_W_Image} _H={_H_Image} _X={_X_s + 1} _Y={_Y_1} />
                           <Text Text={this.props.FullEQPMS} x={_X_1 + 2} y={_Y_1 + 2} />
                        </Layer>
                     </Stage>
                  </td>
                  {_Debuge &&
                     <td>
                        <textarea id="te_Mess" ref="te_Mess" className="te_Mess"
                           value={this.state.messages + this.state.FullNamePL}
                           defaultValue={this.state.messages} />
                     </td>
                  }

               </tr>
            </tbody>
         </table>
      );
   }
}

export default Device_View;
/*

<Text Text={this.props.azs.id} x={_X_1 + 2} y={_Y_1 + 2} />


*/