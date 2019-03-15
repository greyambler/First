import React from 'react';

import makeCounter from '../core/makeCounter.jsx'

var counter = makeCounter();
class Fuel extends React.Component {
   //{"id":5,"nm":"Аи-98","fu":"98"}
   render() {
      const List = this.props.fuels;
      return (
         
            List.map(el => (
               <tr>
                  <td>{el.id}</td>
                  <td key={el.id}>{el.nm}</td>
               </tr>
            ))
         
      );
   }
};

export default Fuel;