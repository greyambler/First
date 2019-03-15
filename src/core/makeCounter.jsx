import React from "react"

function makeCounter() {
   var currentCount = 1;
 
   // возвращаемся к функции
   function counter() {
     return currentCount++;
   }
 
   // ...и добавляем ей методы!
   counter.set = function(value) {
     currentCount = value;
   };
 
   counter.reset = function() {
     currentCount = 1;
   };
 
   return counter;
 }

export default makeCounter;