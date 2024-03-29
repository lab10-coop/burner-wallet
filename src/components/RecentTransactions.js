import React from 'react';
import { Blockie } from "dapparatus";
import Ruler from "./Ruler";
import { Scaler } from "dapparatus";
import { relative } from 'path';

export default ({dollarDisplay, view, max, buttonStyle, ERC20TOKEN, vendorName, address, recentTxs, block, changeView}) => {

  function formatAddressReadable(inputAddress, breakerChar = '\n') {
    
    let result = '';

    if (inputAddress.length != 42) 
    {
      console.warn('dont understand address: ' + inputAddress );
      return inputAddress;
    }

    // result = inputAddress.slice(0, 6) + breakerChar
    //        + inputAddress.slice(6, 12) + breakerChar
    //        + inputAddress.slice(12, 18) + breakerChar
    //        + inputAddress.slice(24, 30) + breakerChar
    //        + inputAddress.slice(30, 36) + breakerChar
    //        + inputAddress.slice(36, 42);

    // result = inputAddress.slice(0, 12) + breakerChar
    // + inputAddress.slice(12, 24) + breakerChar
    // + inputAddress.slice(24, 36) + breakerChar
    // + inputAddress.slice(36, 42) ;

    result = inputAddress.slice(2, 8);

    //result = inputAddress.slice(2, 8) + '..' + inputAddress.slice(34, 42);

    return  result;
  }



  let txns = []
  let count=0
  if(!max) max=9999
  for(let r in recentTxs){
    let thisValue = parseFloat(recentTxs[r].value)
    if(thisValue>0.0){

      let extraUp = 10
      if(view=="receive"){
        extraUp=-4
      }
      let extraIcon = ""

      if (recentTxs[r].status) {

        var extraIconText = '';
        var extraIconColor = 'red';

        if (recentTxs[r].status == '0x0') {
          extraIconText = '❌';
          extraIconColor = 'red';
        } else if (recentTxs[r].status == '0x1') {
          extraIconText = '✔️';
          extraIconColor = 'green';
        } else {
          extraIconText = recentTxs[r].status;
        }

        extraIcon = (
          <div style={{position:'absolute',right:15,top:extraUp}}>
            <div style={{color:extraIconColor, fontSize:25}}>{extraIconText}</div>
          </div>
        )

      }

      let dollarView
      if(ERC20TOKEN){
        if(recentTxs[r].token){
          dollarView = (
            <span>
              <span style={{opacity:0.33}}>-</span>{dollarDisplay(recentTxs[r].value)}<span style={{opacity:0.33}}>-></span>
            </span>
          )
        }else{
          dollarView = (
            <span style={{opacity:0.5,fontSize:14}}>
              {dollarDisplay(recentTxs[r].value)}
            </span>
          )
        }

      } else {
        //dollarDisplay
        dollarView = (
          <span>
            <span style={{opacity:0.33}}>-</span>{dollarDisplay(recentTxs[r].value)}<span style={{opacity:0.33}}>-></span>
          </span>
        )
      }

      let toBlockie = (
        <Blockie
          address={recentTxs[r].to}
          config={{size:4}}
        />
      )
      if(recentTxs[r].to==address && recentTxs[r].data) {
        let message = recentTxs[r].data
        let limit = 18
        if(message.length>limit){
          message = message.substring(0,limit-3)+"..."
        }
        toBlockie = (
          <span style={{fontSize:14}}>
            {message}
          </span>
        )
      }

      if(count++<max){
        //if(txns.length>0){
          txns.push(
            <hr key={"ruler"+recentTxs[r].hash} style={{ "color": "#DFDFDF",marginTop:0,marginBottom:7 }}/>
          )
        //}

        let blockAge = block-recentTxs[r].blockNumber

        if(blockAge<=1&&recentTxs[r].to==address){
          txns.push(
            <div key={"green"+count} style={{position:'relative',cursor:'pointer',paddingTop:10,paddingBottom:10,marginTop:10}} key={recentTxs[r].hash} className="content bridge row" onClick={()=>{
              if(recentTxs[r].from==address){
                changeView("account_"+recentTxs[r].to)
              }else{
                changeView("account_"+recentTxs[r].from)
              }
            }}>
              <div className="col-3" style={{textAlign:'center'}}>
                <i className="fas fa-check-circle" style={{color:"#39e917",fontSize:70,opacity:.7}}></i>
              </div>
              <div className="col-3" style={{textAlign:'center',paddingTop:6}}>
                <Blockie
                  address={recentTxs[r].from}
                  config={{size:7}}
                />
              </div>
              <div className="col-3" style={{textAlign:'center',paddingTop:15,whiteSpace:"nowrap",letterSpacing:-1}}>
                <Scaler config={{startZoomAt:400,origin:"50% 50%"}}>
                  {dollarView}
                </Scaler>
              </div>
              <div className="col-3" style={{textAlign:'center',paddingTop:15,whiteSpace:"nowrap",letterSpacing:-1}}>
                {toBlockie}
              </div>
            </div>
          )
        }else{
          txns.push(
            <div key={count} style={{position:'relative',cursor:'pointer'}} key={recentTxs[r].hash} className="content bridge row" onClick={()=>{
              if(recentTxs[r].from==address){
                changeView("account_"+recentTxs[r].to)
              }else{
                changeView("account_"+recentTxs[r].from)
              }
            }}>
              {extraIcon}
              <div className="col-3 p-1" style={{textAlign:'center',whiteSpace:"nowrap"}}>
                <div>
                  <Blockie
                    style={{display: 'block'}}
                    address={recentTxs[r].from}
                    config={{size:4}}
                  />
                  <div style={{display: 'block',textAlign:'center', fontWeight: 300, fontSize: 10, letterSpacing: 0}}>{formatAddressReadable(recentTxs[r].from)}</div>
{/*                   
                  <div style={{fontSize:10, display: 'inline-block', verticalAlign: 'top'}}>
                    <div style={{display: 'inline', whiteSpace: 'pre-wrap', maxWidth: '100px', fontWeight: 300}}>{formatAddressReadable(recentTxs[r].from)}</div>
                  </div> */}
                </div>
              </div>
              
              <div className="col-3 p-1" style={{textAlign:'center',whiteSpace:"nowrap",letterSpacing:-1}}>
                <div style={{position:'relative', top:'30%'}} >
                  <Scaler config={{startZoomAt:600,origin:"25% 50%",adjustedZoom:1}}>
                    {dollarView}
                  </Scaler>
                </div>
              </div>
              <div className="col-3 p-1" style={{textAlign:'center',whiteSpace:"nowrap",letterSpacing:-1}}>
                {toBlockie}
                <div style={{display: 'block',textAlign:'center', fontWeight: 300, fontSize: 10, letterSpacing: 0}}>{formatAddressReadable(recentTxs[r].to)}</div>
              </div>
              <div className="col-2 p-1" style={{textAlign:'center',whiteSpace:"nowrap",letterSpacing:-1, top:10, right:25}}>
                <Scaler config={{startZoomAt:600,origin:"25% 50%",adjustedZoom:1}}>
                <span style={{marginLeft:5,marginTop:0,opacity:0.4,fontSize:12}}>{cleanTime((blockAge)*5)} ago</span>
                </Scaler>
              </div>

            </div>
          )
        }


      }

    }
  }
  if(txns.length>0){
    return (
      <div style={{marginTop:30}}>
        {txns}
      </div>
    )
  }else{
    return (
      <span></span>
    )
  }
}

let cleanTime = (s)=>{
  if(s<60){
    return s+"s"
  }else if(s/60<60){
    return Math.round(s/6)/10+"m"
  }else {
    return Math.round((s/60/6)/24)/10+"d"
  }
}
