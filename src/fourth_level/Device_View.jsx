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
            messages: this.props.messages,
            FullNamePL: this.props.FullNamePL,
            HeadName: this.props.HeadName,
         };
      }
   }
   componentDidUpdate(prevProps) {
      if (this.props.FullNamePL !== prevProps.FullNamePL) {
         this.setState({
            FullNamePL: this.props.FullNamePL
         });
      }
      if (this.props.messages !== prevProps.messages && this.props.messages != "") {
         this.setState({
            messages: this.props.messages
         });
      }
   }

   render() {
      let _W = 190;
      let _H = 100;

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
                           <Text fontSize={18}
                              /*stroke='grey'*/
                              fill='blue'
                              Text={this.state.HeadName} x={_X_s + 7} y={_Y_1 - 5} />
                           <AZS_Image Image={this.props.Image} _W={_W_Image} _H={_H_Image} _X={_X_s + 1} _Y={_Y_1 + 16} />
                           <Text Text={this.props.FullEQPMS} x={_X_1 + 2} y={_Y_1 + 18} />
                        </Layer>
                     </Stage>
                  </td>
                  {_Debuge &&
                     <td>
                        <textarea id="te_Mess_Lev" className="te_Mess_Lev"
                           value={this.state.RSS + this.state.FullNamePL}
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

value={this.props.COUNETRS}


                  {_Debuge &&
                     <td>
                        <textarea id="te_Mess" ref="te_Mess" className="te_Mess"
                           value={this.state.messages + this.state.FullNamePL}
                           defaultValue={this.state.messages} />
                     </td>
                  }


<Text Text={this.props.azs.id} x={_X_1 + 2} y={_Y_1 + 2} />


*/