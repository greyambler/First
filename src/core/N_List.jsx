import React from 'react';

class N_List extends React.Component {
   constructor(props) {
      super(props);

      this.state = { List: this.props.obList };
   }
   componentDidUpdate(prevProps) {
      this.setState({ 'List': prevProps.ListVal })
   }
   /*
   this.display = this.display.bind(this);
 
 display() {

    return "";
 } */
   render() {
      const List = this.props.ListVal;
      if (List != null) {
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
      else if (this.state.List != null) {
         return (
            <ol className="NumList">
               {
                  this.state.List.map(el => (
                     <li key={el.id}>{el.nm}</li>
                  ))
               }
            </ol>
         );
      }
   }
};

export default N_List;