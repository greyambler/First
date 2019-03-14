import React from "react"

function get_Json_String(mstring) {
   var mS = [];
   mS[0] = mstring;
   const T_Json = JSON.stringify(mS);
   return T_Json;

}
export default get_Json_String;