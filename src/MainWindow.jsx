import React from 'react';
import ReactDOM from 'react-dom';
import Fuel from './first_level/Fuel.jsx'             // first_level
import TpList from './first_level/TpList.jsx'         // first_level
import AzsList from './first_level/AzsList.jsx'       // first_level
import F_L_Json from './first_level/F_L_Json.jsx'       // first_level

import ObList from './second_level/ObList.jsx'        // second_level
import ObList_WS from './third_level/ObList_WS.jsx'   // third_level


class MainWindow extends React.Component {
   render() {
      let Objest = this.props.objects;
      let Rss = this.props.Rss;
      let ws = this.props.ws;
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
                                 <AzsList obList={Objest.obList} />
                              </td>
                              <td>
                                 <Fuel fuels={Objest.fuel} />
                              </td>
                              <td>
                                 <TpList tpLists={Objest.tpList} />
                              </td>
                              <td>
                                 <F_L_Json Objests={this.Objest} />
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

*/