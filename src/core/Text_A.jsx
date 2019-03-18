import React from 'react';

class Text_A extends React.Component {
   //{"id":"2","nm":"резервуар"}
   render() {
      const List = this.props.Message;
      return (
         <textarea className="te_Mess"
            defaultValue={this.props.Message} />
      );
   }
}

export default Text_A;