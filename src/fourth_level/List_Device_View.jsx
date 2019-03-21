import React, { Component } from 'react';

const _Debuge = true;

class List_Device_View extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id:this.props.List.id,
         List_Devce: this.props.List.dvc,
         name_azs: this.props.name,
      };
   }
   componentDidUpdate(prevProps) {
      if (this.props.List.id !== prevProps.List.id) {      
         this.setState({ List_Devce: this.props.List.dvc });
      }
   }


   render() {
      let _W = 200;
      let _H = 90;

      let _W_Image = 60;
      let _H_Image = 70;

      let _X_s = 2;
      let _Y_s = 2;
      let _X_1 = _X_s + _W_Image;
      let _Y_1 = _Y_s + 1;
      return (
         <ul className="hr">
            {
               this.state.List_Devce.map(el => (
                  <li key={'li ' + el.id}>
                     <a>[ {el.id} + "   " +{el.nm}]</a>
                  </li>
               ))
            }
         </ul>
      );
   };
}
export default List_Device_View;