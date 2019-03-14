import React from 'react';

class Fuel extends React.Component {
   //{"id":5,"nm":"Аи-98","fu":"98"}
   render() {
      const List = this.props.fuels;
      return (
         <table className="Def_table_FT">
            <tbody>
               <tr>
                  <th colSpan={List.length}>Топливо (Fuel)</th>
               </tr>
               <tr>
                  {List.map(el => (
                     <td key={el.id}>{el.nm}</td>
                  ))}
               </tr>
            </tbody>
         </table>
      );
   }
};

export default Fuel;