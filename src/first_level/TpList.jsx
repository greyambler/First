import React from 'react';

class TpList extends React.Component {
   //{"id":"2","nm":"резервуар"}
   render() {
      const List = this.props.tpLists;
      return (
         <table className="Def_table_FT">
            <tbody>
               <tr>
                  <th colSpan={List.length}>Оборудование (TpList)</th>
               </tr>
               <tr >
                  {List.map(el => (
                     <td key={el.id} align="center">{el.nm}</td>
                  ))}
               </tr>
            </tbody>
         </table>
      );
   }
}

export default TpList;