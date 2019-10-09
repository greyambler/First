import React from 'react';

import MainWindow from './MainWindow.jsx'   // third_level
import { get_DateRSS } from './core/core_Function.jsx';

//const Rss_old = "http://172.23.16.125:8000/dpfacade-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.dvc/";
//const ws_old = "ws://172.23.16.125:8000/dpws-1.0-SNAPSHOT/alws";

             
const Rss = "http://172.23.16.18:8080/dprest-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.dvc/";
            
const ws = "ws://172.23.16.18:8080/dpsock-1.0-SNAPSHOT/alws";

/*
http://172.23.16.18:8080/dprest-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.dvc
http://172.23.16.18:8080/dpmark-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpinside.mark
ws://172.23.16.18:8080/dpsock-1.0-SNAPSHOT/alws
*/
const _Debuge = true;


class MainRequest extends React.Component {
   constructor(props) {
      super(props);
      this.tick = this.tick.bind(this);
      this.state = { Objest: null };
   }
   componentDidMount() {
      if (!_Debuge) {
      this.tick();
      }
      else{
         this.setState({ Objest: get_DateRSS() });
      }
      /*
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
      */
   }

   async tick() {
      let rss = Rss;
      var myRequest = new Request(rss);

      try {
         var response = await fetch(myRequest,
            {
               
               method: 'GET',
               headers:
               {
                  'Accept': 'application/json',
               },
            }
         );
         if (response.ok) {
            const Jsons = await response.json();
            this.setState({ Objest: Jsons });
         }
         else {
            throw Error(response.statusText);
         }
         this.setState({ isExistError: false })
      }
      catch (error) {
         this.setState({ isExistError: true })
         console.log(error);
      }
   }

   render() {
      const _Objects = this.state.Objest;
      

      return (
         <div className='WinNotTree'>
            {_Objects != null ?
               <MainWindow objects={_Objects} Rss={Rss} ws={ws} />
               :
               <h1>Нет связи с сервером!!</h1>
            }
         </div>
      );
   }
}

export default MainRequest;