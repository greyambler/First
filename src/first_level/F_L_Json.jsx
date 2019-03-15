import React from 'react';

class F_L_Json extends React.Component {
   //{"id":"2","nm":"резервуар"}
   render() {
      const List = this.props.Objests;
      return (
         <textarea className="te_Mess"
            defaultValue={this.props} />
      );
   }
}

export default F_L_Json;