import React, { Component } from 'react';

function TR_Stop(e) {
   const List = e.List;
   const Numb = List.length;
   const Proc = 100 / Numb + "%";
   return (
      <tr>
         <td key="0" width={Proc}>
            <button width={Proc} className="Def_button" id="0" onClick={e.on_Click} >Stop</button>
         </td>
      </tr>
   );
}

export default TR_Stop;