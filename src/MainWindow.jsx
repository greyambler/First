import React from 'react';
import ReactDOM from 'react-dom';

import N_List from './core/N_List.jsx'       // first_level
import Text_A from './core/Text_A.jsx'       // first_level

import Fuels from './first_level/Fuels.jsx'             // first_level
import TpList from './first_level/TpList.jsx'         // first_level
import AzsList from './first_level/AzsList.jsx'       // first_level
//import F_L_Json from './first_level/F_L_Json.jsx'       // first_levelText_A


import ObList from './second_level/ObList.jsx'        // second_level
import ObList_WS from './third_level/ObList_WS.jsx'   // third_level


var Ob_List_Class;
var Fuels_Class;
var Tp_List_Class;

class MainWindow extends React.Component {
   constructor(props) {
      super(props);
      this.GetMessage = this.GetMessage.bind(this);
   }
   GetMessage(objest) {
      let Mes = '';
      if (objest != null) {
         for (const iterator of objest) {
            Mes = Mes + 'id - ' + iterator.id + '\tnm - ' + iterator.nm + "\n";
         }
      }
      return Mes;
   }

   render() {
      let Objest = this.props.objects;
      let Rss = this.props.Rss;
      let ws = this.props.ws;
      let Mes = "";

      Ob_List_Class = new AzsList(Objest);
      //const R_Ob_List_Class = Ob_List_Class.render();
      Fuels_Class = new Fuels(Objest);
      Tp_List_Class = new TpList(Objest);
      
      Mes = Ob_List_Class.Get_str();
      Mes = Mes + "\n" + Fuels_Class.Get_str();
      Mes = Mes + "\n" + Tp_List_Class.Get_str();

      return (
         <div>
            {Objest != null ?
               (
                  <div>
                     <table className="Def_table_FT">
                        <caption><h3>Справочники</h3></caption>
                        <tbody>
                           <tr>
                              <th>АЗС</th>
                              <th>Топливо (Fuel)</th>
                              <th>Оборудование (TpList)</th>
                              <th>Ответ с сервера</th>
                           </tr>
                           <tr>
                              <td>
                                 {Ob_List_Class.render()}
                              </td>
                              <td>
                                 {Fuels_Class.render()}
                              </td>
                              <td>
                                 {Tp_List_Class.render()}
                              </td>
                              <td>
                                 <Text_A Message={Mes} />
                              </td>
                           </tr>
                        </tbody>
                     </table>

                     <ObList_WS obLists={Objest.obList} WS={ws} />
                     <br />
                     <ObList obLists={Objest.obList} RSS={Rss} />
                     <br />
                  </div>
               ) : (
                  <h1>NULL</h1>
               )
            }
         </div>
      );
   }
}

export default MainWindow;
/*

<td>
 <N_List ListVal={Objest.obList} id="Ob_List_Class" />
</td>
<td>
 <N_List ListVal={Objest.fuel} id="Fuel_Class" />
</td>
<td>
   <N_List ListVal={Objest.tpList} id="Tp_List_Class" />
</td>
<td>
 <Text_A Message={Mes} />
</td>
*/