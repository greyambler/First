import React from 'react';

import MainWindow from './MainWindow.jsx'   // third_level

const Rss = "http://172.23.16.125:8000/dpfacade-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.dvc/";
const ws = "ws://172.23.16.125:8000/dpws-1.0-SNAPSHOT/alws";


class MainRequest extends React.Component {
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
               <MainWindow objects={_Objects} Rss={Rss} ws={ws} />
               :
               <h1>Нет связи с сервером!!</h1>
            }
         </div>
      );
   }
}

export default MainRequest;