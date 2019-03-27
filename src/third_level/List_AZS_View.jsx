import React, { Component } from 'react';
import AZS_View from './AZS_View.jsx'
import Text_A from '../core/Text_A.jsx'


const _Debuge = false;

class List_AZS_View extends Component {
   constructor(props) {
      super(props);
      this.ON_Clisck = this.ON_Clisck.bind(this);
   }

   ON_Clisck(e) {
      if (e != null) {
         this.props.on_Click(e);

         const Id = e.currentTarget.id;
         const name = e.currentTarget.name;
         for (const iterator of this.props.List) {

            var elem = document.getElementById('tb' + iterator.id);
            if (elem != null && Id == iterator.id) {
               elem.className = "Def_table_FT_Choose";
            } else {
               elem.className = "Def_table_FT_Not_Choose";
            }
         }
      }
   }


   render() {
      let r = this.props.get_Id_AZS;
      let address = this.props.address;
      if (address == null)
         address = "";
      return (
         <ul className="hr">
            {
               this.props.List.map(el => (
                  <li key={'li ' + el.id}>
                     <AZS_View azs={el} WS={this.props.WS}
                        key={'AZS_View ' + el.id}
                        id={el.id}
                        on_Click={this.ON_Clisck} />
                  </li>
               ))
            }
            {_Debuge &&
               <li>
                  <textarea value={address} className='te_Mess_1' />
               </li>
            }

         </ul>
      );
   }
}

export default List_AZS_View;

/*
<li><AZS_View nameAzs="Test" /></li>
<li><Text_A Message={this.props.mess} /></li>
*/