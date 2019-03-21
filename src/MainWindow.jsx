import React from 'react';

import OL_Directory from './core/OL_Directory.jsx'                  // first_level
import Text_A from './core/Text_A.jsx'                              // first_level
import ObList from './second_level/ObList.jsx'                      // second_level

import List_AZS_View from './third_level/List_AZS_View.jsx'
import List_Device_View from './fourth_level/List_Device_View.jsx'  // fourth_level

const _Debuge = false;

function Dvc_s(e) {
   const List = e.List;
   const TowColl = e.TowColl == "true";

   return (
      <div>
         {
            List != null ?
               (
                  (!TowColl ?
                     (
                        <table className="Def_table" key="Devices">
                           <caption className="tb_dvcscaption"><h4>Второй уровень запроса 0</h4></caption>
                           <tbody>
                              <tr >
                                 <th >Оборудование (dvc) </th>
                              </tr>
                              {List.dvc.map(el => (
                                 <tr key={el.id} >
                                    <td>
                                       <button className="Def_button" id={el.id} onClick={e.on_Click} >{el.nm}</button>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     )
                     :
                     (
                        <table className="Def_table" key="Devices">
                           <caption className="tb_dvcscaption"><h4>Второй уровень запроса {e.name}</h4></caption>
                           <tbody>
                              <tr >
                                 <th >Оборудование (dvc)1 </th>
                              </tr>
                              {List.dvc.map(el => (
                                 <tr key={el.id} >
                                    <td>
                                       <button className="Def_button" id={el.id} onClick={e.on_Click} >{el.nm}</button>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     )
                  )
               )
               :
               (
                  <h1>List != null</h1>
               )
         }
      </div>
   );
}


class MainWindow extends React.Component {
   constructor(props) {
      super(props);
      this.get_Id_AZS = this.get_Id_AZS.bind(this);

      this.state = {
         dvcs: null,
         nameAZS: null,
         test_mess: '',
      };
   }
   async get_Id_AZS(e) {
      if (e != null) {
         const Id = e.currentTarget.id;
         const name = e.currentTarget.name;
         var rss = this.props.Rss + Id;

         var myRequest = new Request(rss);
         try {
            var response = await fetch(myRequest);
            if (response.ok) {
               const Jsons = await response.json();
               this.setState({ dvcs: Jsons, nameAZS: name, test_mess: rss });
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
                              {_Debuge &&
                                 <th>Ответ с сервера</th>
                              }
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
                              {_Debuge &&
                                 <td>
                                    <Text_A Ob_Mass={Ob_Mass} />
                                 </td>
                              }
                           </tr>
                        </tbody>
                     </table>
                     <center><h3>Cигнализация</h3></center>
                     <hr />
                     <List_AZS_View id="List_AZS_View" on_Click={this.get_Id_AZS}
                        List={Objest.obList} WS={ws} address={this.state.test_mess} />
                     <center><h3>Оборудование на объекте</h3></center>
                     <hr />
                     {this.state.dvcs != null &&
                        <List_Device_View id="List_Device_View" List={this.state.dvcs}
                           name={this.state.nameAZS} />
                     }
                     <br />
                     <center><h3>Оборудование на объекте Old</h3></center>
                     <hr />
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
