import React, { Component } from 'react';

function TR_Azs(e) {
   const List = e.List;
   const Numb = List.length;
   const Proc = 100 / Numb + "%";
   return (
      <tr>
         {List.map(el => (
            <td key={el.id} width={Proc} className="td_WS">
               <button width={Proc} className="Def_button"
                  id={el.id} onClick={e.on_Click} >{el.nm}</button>
            </td>
         ))}
      </tr>
   );
}
export default TR_Azs;