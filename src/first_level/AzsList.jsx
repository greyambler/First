import React from 'react';


class AzsList extends React.Component {
   //{"id":5,"nm":"Аи-98","fu":"98"}
   render() {
      const List = this.props.obList;
      return (
         <ol className="NumList">
            {
               List.map(el => (
                     <li key={'AzsList_td2 ' + el.id}>{el.nm}</li>
               ))
            }
         </ol>
      );
   }
};

export default AzsList;