import React from 'react';


class Fuels extends React.Component {
   constructor(props) {
      super(props);

      this.state = { List: this.props.fuel };
   }
   componentDidUpdate(prevProps) {

      this.setState({ 'List': prevProps.fuel })
   }
   Get_str() {
      let Mes = '';
      if (this.state.List != null) {
         for (const iterator of this.state.List) {
            Mes = Mes + 'id - ' + iterator.id + '\tnm - ' + iterator.nm + "\n";
         }
      }
      return Mes;
   }
   render() {
      if (this.state.List != null) {
         return (
            <ol className="Fuels">
               {
                  this.state.List.map(el => (
                     <li key={'Fuels_li ' + el.id}>{el.nm}</li>
                  ))
               }
            </ol>
         );
      } else {
         return null;
      }
   }
};

export default Fuels;