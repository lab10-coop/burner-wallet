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
    <div className="balance row" style={{opacity,paddingBottom:0,paddingLeft:10,paddingRight:10,display:'flex',justifyContent:'space-between'}}>
      <img src={icon}/>
      <div style={{marginTop:7}}>
        <Scaler config={{startZoomAt:400,origin:"200px 30px",adjustedZoom:1}}>
          <div style={{fontSize:40,letterSpacing:-2}}>
            {dollarDisplay(amount)}
          </div>
        </Scaler>
      </div>
    </div>
  )
};
