import React from 'react';

import Set_Stage from '../third_level/Set_Stage.jsx'


class List_ViewAZSs extends React.Component {
   /*
   constructor(props) {
      super(props);
      if (this.props.obList != null) {
         this.state = { AZSs: this.props.obList };

      }
   }
   componentDidUpdate(prevProps) {
      this.setState({ 'AZSs': prevProps.obList });
      this.Get_TR_AZSs();
   }
   */
   render() {
      const List = this.props.List;
      const Numb = List.length;
      const Numb_T = List.length * 2;
      const Proc = 100 / Numb + "%";
      return (
         <div>
            <table className="Def_table" key="AZS_z">
               <caption className="tb_dvcscaption"><h4>Третий уровень запроса(2)</h4></caption>
               <tbody>
                  <tr>
                     <th key="th_ObList" colSpan={Numb}> Вид объектов WS(2) </th>
                  </tr>
                  <tr colSpan={Numb}>

                     {List.map(el => (
                        <td key={el.id} width={Proc} className="td_WS">
                           <Set_Stage id="set_Stage"
                              id={el.id}
                              name={el.nm}
                              data={this.props.data}
                           />
                        </td>
                     ))}
                  </tr>
               </tbody>
            </table>
         </div>
      );
   }
}

export default List_ViewAZSs;

/*

<Set_Stage id="set_Stage"
                           obList_WS={el}
                           />
*/