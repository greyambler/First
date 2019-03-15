import React from 'react';


class N_List extends React.Component {
   render() {
      const List = this.props.ListVal;
      return (
         <ol className="NumList">
            {
               List.map(el => (
                     <li key={el.id}>{el.nm}</li>
               ))
            }
         </ol>
      );
   }
};

export default N_List;