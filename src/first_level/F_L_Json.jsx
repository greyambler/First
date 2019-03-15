import React from 'react';

class F_L_Json extends React.Component {
   //{"id":"2","nm":"резервуар"}
   render() {
      const List = this.props.Objests;
      return (
         <td>
            <textarea className="te_Mess"
               defaultValue={this.props} />
         </td>
      );
   }
}

export default F_L_Json;