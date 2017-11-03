"use strict"
let express = require('express');
let app = express();
let net = require('net');
let host = '192.168.100.210';
let port = 4660;

let client = new net.Socket();
let client1 = new net.Socket();

let U8256 = {
  "PV":null,
  "dataAnalog":"@010140*\r\n",
  "dataDigital":"@015145*\r\n",
  "run":"@015301177*\r\n",
  "stop":"@015302174*\r\n"
}

let U82256s = Buffer.alloc(25);

U8256.dataHead = Buffer.from('@');
U8256.dataFoot = Buffer.from('*\r\n');

client.connect(port,host,function(){
  console.log('connected');
});

client1.connect(4660,'192.168.100.211',function(){
  console.log('8226 connected');
}),


client.on('data',function(data){
  U8256.PV += data;
  if (U8256.PV.slice(-3,) == U8256.dataFoot){
    console.log(U8256.PV.length);
    parsePV(U8256.PV.slice(U8256.PV.indexOf(U8256.dataHead,)));
  }
});

function getPV(cmd){
  client.write(cmd);
};

function parsePV(data){
  U8256.PV = null;
  switch (data.slice(3,5).toString()){
      case '01':
        console.log(data);
        Buffer.from(data.slice(5,21)).copy(U82256s,0,0);
        getPV(U8256.dataDigital);
        break;
      case '51':
        console.log(data);
        Buffer.from(data.slice(5,13)).copy(U82256s,16,0);
        break;
  }
  console.log(U82256s);
}

app.get('/',function(req,res){
  res.send(U82256s.toString());
});


app.listen(8888);
setInterval(function(){getPV(U8256.dataAnalog);},1000);
