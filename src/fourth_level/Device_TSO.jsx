import React, { Component } from 'react';
import Device_View from './Device_View.jsx'

const _Debuge = false;

class Device_TSO extends Component {
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
   componentDidUpdate(prevProps) {
      if (this.props.RSS != prevProps.RSS) {
         this.setState({
            RSS: this.props.RSS
         });
      }
      if (this.props.dev_lev2 != prevProps.dev_lev2) {
         this.setState({
            dev_lev2: this.props.dev_lev2
         });
      }
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
      let FullEQPMS = '';// "тип          = " + this.props.el.typ;

      var NOZLS = null;

      var t = 0;
      if (this.state.dev_lev2 != null && this.state.dev_lev2.dvc != null) {
         for (const item of this.state.dev_lev2.dvc) {
            let typ = item.typ;
            let nm = item.nm;
            FullEQPMS = FullEQPMS + "\ntype = " + typ + "\n" + nm;
         }
      }


      try {
         return (
            <Device_View azs={this.props.el}
               key={'Device_TSO ' + this.props.el.id}
               id={'Device_TSO ' + this.props.el.id}
               RSS={this.props.RSS}
               FullNamePL={FullEQPMS}
               FullEQPMS={FullEQPMS}
               Image='/images/tso.jpg'
            />
         );
      }
      catch (error) {
         console.log(error);
         return "Ошибка Device_PUMP_Guns";
      }
   }
}

export default Device_TSO;
