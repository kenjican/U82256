"use strict"

let net = require('net');

class U8256{
  constructor(port=4660,ip){
    this.ip = ip;
    this.port = port;
    this.client = new net.Socket();
    this.status = null;
    this.dataHead = '@';
    this.dataFoot = '*\r\n';
    this.dataAnalog = '@010140*\r\n';
    this.dataDigital = Buffer.from('@015145*\r\n');
  }

  con(){
    this.client.connect(this.port,this.ip,function(){
      console.log('connected');
    });
  }

  getAna(){
    this.client.write(this.dataAnalog);
  }
  
}


exports.U8256 = U8256;
