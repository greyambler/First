import React from 'react';

let Rss;

function Azs_s(e) {
   const List = e.List;
   if (List != null) {
      const Numb = List.length;
      const Proc = 100 / Numb + "%";
      return (
         <table className="Def_table" key="AZSz">
            <tbody>
               <tr >
                  <th key="th_ObList" colSpan={Numb}>Объекты (ObList) </th>
               </tr>
               <tr>
                  {List.map(el => (
                     <td key={el.id} width={Proc}>
                        <button width={Proc} className="Def_button" id={el.id} onClick={e.on_Click}>{el.nm}</button>
                     </td>
                  ))}
               </tr>
            </tbody>
         </table>
      );
   }
   else {
      return (
         <div><h1>List != null</h1></div>
      );
   }
}

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
                           <caption className="tb_dvcscaption"><h4>Второй уровень запроса {e.name}</h4></caption>
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

function Equip_s(e) {
   const List = e.List;
   return (
      <div>
         {
            (List != null) ?
               (
                  <table className="Def_table" key="equipment">
                     <caption className="tb_dvcscaption"><h4>Третий уровень запроса {e.name}</h4></caption>
                     <tbody>
                        <tr>
                           <th>Оборудование (dvc) </th>
                        </tr>
                        {List.dvc.map(el => (
                           <tr key={el.id} >
                              <td key={el.id}>{el.nm}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               )
               :
               (
                  <h1>List != null</h1>
               )
         }

      </div>
   );
}


class ObList extends React.Component {
   constructor(props) {
      super(props);
      Rss = this.props.RSS;
      this.GetAZS_Click = this.GetAZS_Click.bind(this);
      this.GetDevicesClick = this.GetDevicesClick.bind(this);
      this.state = {
         ObjList: this.props.obLists, nameObj: null,
         dvcs: null, dvcOnasz: null, nameAZS: null
      };
   }
   async GetAZS_Click(e) {
      e.preventDefault();
      const Id = e.currentTarget.id;
      const name = e.currentTarget.innerText;
      var rss = Rss + Id;
      var myRequest = new Request(rss);
      try {
         var response = await fetch(myRequest);
         if (response.ok) {
            /////////////////////
            const Jsons = await response.json();
            this.setState({ dvcs: Jsons, nameObj: name, dvcOnasz: null });
         }
         else {
            throw Error(response.statusText);
         }
      }
      catch (error) {
         console.log(error);
      }
   }
   async GetDevicesClick(e) {
      e.preventDefault();
      const Id = e.currentTarget.id;
      const name = e.currentTarget.innerText;
      var rss = Rss + Id;
      var myRequest = new Request(rss);
      try {
         var response = await fetch(myRequest);
         if (response.ok) {
            /////////////////////
            const Jsons = await response.json();
            this.setState({ dvcOnasz: Jsons, nameAZS: name });
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
      const List = this.state.ObjList;
      if (List != null) {
         return (
            <div>
               {
                  this.state.dvcs == null ?
                     (
                        <Azs_s List={this.state.ObjList} on_Click={this.GetAZS_Click} />
                     )
                     :
                     (
                        this.state.dvcOnasz == null ?
                           (<div>
                              <Azs_s List={this.state.ObjList} on_Click={this.GetAZS_Click} />
                              <br />
                              <Dvc_s List={this.state.dvcs} TowColl="false" name={this.state.nameObj} on_Click={this.GetDevicesClick} />
                              <br />
                           </div>
                           ) : (
                              <div>
                                 <Azs_s List={this.state.ObjList} on_Click={this.GetAZS_Click} />
                                 <br />
                                 <table className="Def_table">
                                    <tbody>
                                       <tr>
                                          <td width='50%'>
                                             <Dvc_s List={this.state.dvcs} TowColl="true" name={this.state.nameObj} on_Click={this.GetDevicesClick} />
                                          </td>
                                          <td width='50%'>
                                             <Equip_s List={this.state.dvcOnasz} name={this.state.nameAZS} />
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           )
                     )
               }
            </div>
         );
      }
   }
}


export default ObList;