"use strict"

let net = require('net');

class U8256{
  constructor(port=4660,ip){
    this.ip = ip;
    this.port = port;
    this.client = new net.Socket();
    this.response = null;
    this.dataAll = Buffer.alloc(24);
    this.status = null;
    this.dataHead = Buffer.from('@');
    this.dataFoot = Buffer.from('*\r\n');
    this.dataAnalog = '@010140*\r\n';
    this.dataDigital = Buffer.from('@015145*\r\n');
/*    
    this.client.on('data',function(data){
      this.response += data;
      if (data.slice(-3,).toString() == '*\r\n'){
        this.parseRes(this,this.response.slice(this.response.indexOf(this.dataHead),));
      }
      //console.log(data);
    });
   */
  }

  con(){
    this.client.connect(this.port,this.ip,function(){
      console.log('connected');
    });
  }

  getAna(){
    this.client.write(this.dataAnalog);
  }
 
  parseRes(res){
    this.response = null;
    switch (res.slice(3,5).toString()){
      case '01':
        res.slice(5,21).copy(this.dataAll,0,0);
        console.log(this.dataAll);
        break;

      case '51':
        res.slice(5,13).copy(this.dataAll,16,0);

        break;
    }
  }

}


exports.U8256 = U8256;
