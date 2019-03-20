import React from 'react';
import OL_Directory from './OL_Directory.jsx'

class Text_A extends React.Component {
   //{"id":"2","nm":"резервуар"}
   render() {
      const List = this.props.Message;
      var messa = '';
      for (const iterator of this.props.Ob_Mass) {
         var t = new OL_Directory(iterator);
         messa = messa + t.Get_str();
      }
      return (
         <textarea className="te_Mess"
            defaultValue={messa} />
      );
   }
}

export default Text_A;