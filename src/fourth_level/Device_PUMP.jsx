import React, { Component } from 'react';
import Device_View from './Device_View.jsx'
import { Stage, Layer, Text } from 'react-konva';

import AZS_Image from '../core/AZS_Image.jsx'
import Field from '../core/Field.jsx'


import makeCounter from '../core/makeCounter.jsx'
import get_Date from '../core/get_Date.jsx'
import get_Json_String from '../core/get_Json_String.jsx'

var counter = makeCounter();

const _Debuge = false;

class Device_PUMP extends Component {
   constructor(props) {
      super(props);
      this.get_eqp = this.get_eqp.bind(this);
      this.get_eqp_counters = this.get_eqp_counters.bind(this);
      this.find_ForId = this.find_ForId.bind(this);

      this.state = {
         RSS: this.props.RSS,
         WS: this.props.WS + 'c',
         id: this.props.el.id,
         dev_lev2: null,
         counters: null,
         IsOpen: false,
      };

      this.get_eqp();
      this.get_eqp_counters();


   }
   find_ForId(array, code) {
      for (var i = 0; i < array.length; i++) {
         if (array[i].id == code)
            return array[i].nm;
      }
      return "неопределен";
   }


   /********************Получить оборудование************************* */
   async get_eqp() {
      if (this.state.id != null) {
         const Id = this.state.id;
         var rss = this.state.RSS + Id;
         this.setState({ messages: rss });

         var myRequest = new Request(rss);
         try {
            var response = await fetch(myRequest);
            if (response.ok) {
               const Jsons = await response.json();
               this.setState({ dev_lev2: Jsons });
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
   /********************Получить счетчики***************************** */
   async get_eqp_counters() {
      if (this.state.id != null) {
         const Id = this.state.id;
         var rss = this.state.RSS + Id + "/counters";
         this.setState({ messages: rss });

         var myRequest = new Request(rss);
         try {
            var response = await fetch(myRequest);
            if (response.ok) {
               const Jsons = await response.json();
               this.setState({ counters: Jsons });
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
   /********************Открыть WS   ********************************* */


   /****************************************************************** */


   render() {
      let FullEQPMS = '';// "тип          = " + this.props.el.typ;
      let COUNETRS = '';
      var NOZLS = null;

      var t = 0;
      if (this.state.dev_lev2 != null && this.state.dev_lev2.dvc != null) {
         for (const item of this.state.dev_lev2.dvc) {
            let typ = item.typ;
            let nm = item.nm;
            let fuel = item.fuel;
            let NameOil = this.find_ForId(this.props.ListFuels, fuel);
            FullEQPMS = FullEQPMS + 'id = ' + item.id + "\n" + nm + "\n" + NameOil + "\n";
         }
      }
      /*********************************/
      if (this.state.counters != null && this.state.counters.cnt != null) {
         for (const item of this.state.counters.cnt) {
            let typ = item.typ;
            let id = item.id;

            let op = '';
            COUNETRS = COUNETRS + 'id = ' + id + "\ntyp = " + typ + "\n";
            if (item != null && item.op != null) {
               for (const iterator of item.op) {
                  let text1 = iterator.text;
                  let id1 = iterator.val;
                  COUNETRS = COUNETRS + '\tid = ' + id1 + "\n\ttext = " + text1 + "\n";
               }
            }
         }
      }

      /********* координаты для отрисовки********************* */

      let _W = 200;
      let _H = 90;

      let _W_Image = 60;
      let _H_Image = 70;

      let _X_s = 2;
      let _Y_s = 2;
      let _X_1 = _X_s + _W_Image;
      let _Y_1 = _Y_s + 1;

      /********* координаты для отрисовки********************* */

      return (
         <div>
            <Device_View azs={this.props.el}
               key={'Device_View ' + this.props.el.id}
               id={'Device_View ' + this.props.el.id}
               RSS={this.state.RSS}
               FullNamePL={FullEQPMS}
               FullEQPMS={FullEQPMS}
               messages={this.state.messages + " " + this.state.WS + " COUNETRS - " + COUNETRS + " FullEQPMS -" + FullEQPMS}
               counters={this.state.counters}
               COUNETRS={COUNETRS}
               Image='/images/trk1.png'
            />
         </div>
      );
   }
}
export default Device_PUMP;

/*

let _FullNamePL = '';
               for (const iterator of Jsons.dvc) {
                  _FullNamePL.concat(
                     "\n id = " + iterator.id +
                     "\n nm = " + iterator.nm +
                     "\n typ = " + iterator.typ +
                     "\n fuel = " + iterator.fuel);
               }
               this.setState({
                  eqps: _FullNamePL, messages: rss
               });

*/