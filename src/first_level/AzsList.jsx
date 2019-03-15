import React from 'react';

import makeCounter from '../core/makeCounter.jsx'

var counter = makeCounter();
class AzsList extends React.Component {
   //{"id":5,"nm":"Аи-98","fu":"98"}
   render() {
      const List = this.props.obList;
      return (
         List.map(el => (
            <tr>
               <td>{counter()} </td>
               <td key={el.id}>{el.nm}</td>
            </tr>
         ))
      );
   }
};

export default AzsList;