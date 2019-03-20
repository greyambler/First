import React from 'react';

import OL_Directory from './core/OL_Directory.jsx'          // first_level
import Text_A from './core/Text_A.jsx'                      // first_level

import ObList from './second_level/ObList.jsx'              // second_level
import List_AZS from './second_level/List_AZS.jsx'          // second_level

import List_AZS_View from './third_level/List_AZS_View.jsx'


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


      let Ob_Mass = new Array();
      Ob_Mass[0] = Objest.obList;
      Ob_Mass[1] = Objest.fuel;
      Ob_Mass[2] = Objest.tpList;

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
                                 <OL_Directory ListVal={Objest.obList} type={'ObList'} id="Ob_List_Class" />
                              </td>
                              <td>
                                 <OL_Directory ListVal={Objest.fuel} type={'Fuel'} id="Fuel_Class" />
                              </td>
                              <td>
                                 <OL_Directory ListVal={Objest.tpList} type={'TpList'} id="Tp_List_Class" />
                              </td>
                              <td>
                                 <Text_A Ob_Mass={Ob_Mass} />
                              </td>
                           </tr>
                        </tbody>
                     </table>
                     <br />
                     <center><h3>Cигнализация</h3></center>
                     <hr />
                     <List_AZS_View id="List_AZS_View" List={Objest.obList} WS={ws} />
                     <br />
                     <center><h3>Оборудованиена объекте</h3></center>
                     <hr />
                     <ObList obLists={Objest.obList} RSS={Rss} />
                     <br />
                     <center><h3>Оборудованиена объекте</h3></center>
                     <hr />
                     <List_AZS obLists={Objest.obList} RSS={Rss} />
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
