import React from 'react';
import Blockies from 'react-blockies';
import { Scaler } from "dapparatus";

export  default ({icon, text, selected, amount, address, dollarDisplay}) => {

  let opacity = 0.65
  if(text == selected){
    opacity=0.95
  }

  if(isNaN(amount) || typeof amount == "undefined"){
    amount=0.00
    opacity=0.40
  }

  if(opacity<0.9 && parseFloat(amount)<=0.0){
    opacity=0.15
  }
  return (
    <div className="balance row" style={{opacity,paddingBottom:0,paddingLeft:20}}>
      <div className="avatar col p-0">
        <img src={icon} style={{maxWidth:150,maxHeight:150}}/>
        {/* <div style={{position:'absolute',left:60,top:12,fontSize:14,opacity:0.77}}>
          {text}
        </div> */}
      </div>
      <div style={{position:"absolute",right:25,marginTop:7}}>
        <Scaler config={{startZoomAt:400,origin:"200px 30px",adjustedZoom:1}}>
          <div style={{fontSize:40,letterSpacing:-2}}>
            {dollarDisplay(amount)}
          </div>
        </Scaler>
      </div>
    </div>
  )
};
