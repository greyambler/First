import React from 'react';


class OL_Directory extends React.Component {
   constructor(props) {
      super(props);
      this.state = { List: this.props.obList };
   }

   componentDidUpdate(prevProps) {
      //this.setState({ 'List': prevProps.ListVal });
   }

   Get_str() {
      let Mes = '';
      for (const iterator of this.props) {
         Mes = Mes + 'id - ' + iterator.id + '\tnm - ' + iterator.nm + "\n";
      }
      return Mes;
   }

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

export default OL_Directory;