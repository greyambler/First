import React from 'react';


class List_AZS extends React.Component {
   constructor(props) {
      super(props);
   }
   render() {
      return (
         <div>
            <center><h3>List_AZS</h3></center>
            <hr/>
            {this.props.obLists.map(el => (
               <tr key={el.id} >
                  <td key={el.id}>{el.id + '  -  ' + el.nm}</td>
               </tr>
            ))}
            <br/>
            <h4>{this.props.RSS}</h4>
            <hr/>
         </div>
      );
   }
}

export default List_AZS;