import React, { Component } from 'react';
import Device_View from './Device_View.jsx'

const _Debuge = false;

class Device_PL extends Component {
   constructor(props) {
      super(props);
      this.find_ForId = this.find_ForId.bind(this);
   }

   find_ForId(array, code) {
      for (var i = 0; i < array.length; i++) {
         if (array[i].id == code) return array[i].nm;
      }
      return -1;
   }
   render() {

      let FullNamePL = "type = " + this.props.el.typ +
         "\nfuel = " + this.props.el.fuel +
         "\nname_azs = " + this.props.el.nm;

      let NameOil = this.find_ForId(this.props.ListFuels, this.props.el.fuel);

      //this.props.ListFuels
      let Capacity = '';

      if (this.props.el.prop != null && this.props.el.prop.length > 0) {
         for (const iterator of this.props.el.prop) {
            Capacity = Capacity + "тип          = " + iterator.typ + 
            "\nобъем     = " + iterator.capacity;
         }

      }


      let FullEQPMS = "тип          = резервуар" +
         "\nкод          = " + this.props.el.fuel +
         "\nтоплива  = " + NameOil + Capacity
         ;

      return (
         <Device_View azs={this.props.el}
            key={'Device_View ' + this.props.el.id}
            id={'Device_View ' + this.props.el.id}
            RSS={this.props.RSS}
            FullNamePL={FullNamePL}
            FullEQPMS={FullEQPMS}
            Image='/images/oil_1.png'
         />
      );
   }
}

export default Device_PL;
