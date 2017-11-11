"use strict"
let express = require('express');
let app = express();

let U8256 = require('./U8256.js').U8256;

let U1 = [
  new U8256(4660,'192.168.100.210'),
  new U8256(4660,'192.168.100.212'),
  new U8256(4660,'192.168.100.211'),
  new U8256(4660,'192.168.100.213')
];
for(let i=0;i<4;i++){
  U1[i].con();
}

U1[0].client.on('data',function(data){
  U1[0].parseRes(data);
  console.log(data.toString());
});

U1[1].client.on('data',function(data){
  console.log(data.toString());
});

U1[2].client.on('data',function(data){
  console.log(data.toString());
});

U1[3].client.on('data',function(data){
  console.log(data.toString());
});


function getAnalog(){
  for(let i=0;i<4;i++){
    U1[i].getAna();
  }
}

setInterval(getAnalog,1000);

