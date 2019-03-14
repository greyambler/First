import React from 'react';
import ReactDOM from 'react-dom';
//import Websocket from 'react-websocket';
import css from './index.css'

import Fuel from './first_level/Fuel.jsx'             // first_level
import TpList from './first_level/TpList.jsx'         // first_level

import ObList from './second_level/ObList.jsx'        // second_level
import ObList_WS from './third_level/ObList_WS.jsx'   // third_level

const Rss = "http://172.23.16.125:8000/dpfacade-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.dvc/";
const ws = "ws://172.23.16.125:8000/dpws-1.0-SNAPSHOT/alws";

class Objest_Level1 extends React.Component {
   render() {
      let Objest = this.props.objects;
      return (
         <div>
            {Objest != null ?
               (
                  <div>
                     <table className="Def_table">
                        <caption><h3>Первый уровень запроса </h3></caption>
                        <tbody>
                           <tr height="24px">
                              <td ><Fuel fuels={Objest.fuel} /></td>
                              <td><TpList tpLists={Objest.tpList} /></td>
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
class App_AZS extends React.Component {
   constructor(props) {
      super(props);
      this.state = { Objest: null };
   }

   async componentDidMount() {
      var rss = Rss;
      var myRequest = new Request(rss);
      try {
         var response = await fetch(myRequest);
         if (response.ok) {
            const Jsons = await response.json();
            this.setState({ Objest: Jsons });
         }
         else {
            throw Error(response.statusText);
         }
      }
      catch (error) {
         console.log(error);
      }
   }
   render() {
      const _Objects = this.state.Objest;
      return (
         <div>
            {_Objects != null ?
               <Objest_Level1 objects={_Objects} />
               :
               <h1>Нет связи с сервером!!</h1>
            }
         </div>
      );
   }
}
ReactDOM.render(
   <div>
      <App_AZS />
      <br />
   </div >,
   document.getElementById('root')
);
