import React from 'react';

class TpList extends React.Component {
   //{"id":"2","nm":"резервуар"}
   render() {
      const List = this.props.tpLists;
      return (
         <td>
            {List.map(el => (
               <tr>
                  <td align="left">{el.id}</td>
                  <td key={el.id} align="left">{el.nm}</td>
               </tr>
            ))}
         </td>
      );
   }
}

export default TpList;