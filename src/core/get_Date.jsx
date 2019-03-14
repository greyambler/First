import React from "react"



function get_Date() {
   var d = new Date();
   var D = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() +
      " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
   return D;
}



export default get_Date;
