import React, { Component } from 'react';
import Device_View from './Device_View.jsx'

const _Debuge = true;

class Device_PUMP extends Component {
   constructor(props) {
      super(props);
      this.get_eqp = this.get_eqp.bind(this);
      this.find_ForId = this.find_ForId.bind(this);
      this.state = {
         RSS: this.props.RSS,
         id: this.props.el.id,
         dev_lev2: null,
      };
      this.get_eqp();
   }
   find_ForId(array, code) {
      for (var i = 0; i < array.length; i++) {
         if (array[i].id == code)
            return array[i].nm;
      }
      return "неопределен";
   }

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

   render() {
      let FullEQPMS ='';// "тип          = " + this.props.el.typ;

      var NOZLS = null;

      var t = 0;
      if (this.state.dev_lev2 != null && this.state.dev_lev2.dvc != null) {
         for (const item of this.state.dev_lev2.dvc) {
            let typ = item.typ;
            let nm = item.nm;
            let fuel = item.fuel;
            let NameOil = this.find_ForId(this.props.ListFuels, fuel);
            FullEQPMS = FullEQPMS  + nm + "\n" + NameOil+ "\n";
         }
      }



      return (
         <Device_View azs={this.props.el}
            key={'Device_View ' + this.props.el.id}
            id={'Device_View ' + this.props.el.id}
            RSS={this.state.RSS}
            FullNamePL={FullEQPMS}
            FullEQPMS={FullEQPMS}
            Image='/images/trk1.png'
         />
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