import React from 'react';
import { Scaler, Blockie } from "dapparatus";
import burnerloader from '../burnerloader.gif';
import i18next from 'i18next';
export  default ({openScanner, network, total, dollarDisplay, ens, title, titleImage, mainStyle, buttonStyle, balance, address, changeView, view}) => {

  let sendButtonOpacity = 1.0
  if(view==="receive" || view==="send_badge"){
    sendButtonOpacity = 0
  }

  let name = ens
  if(!name){
    name = address.substring(2,8)
  }

  console.log('total: '+ total);
  console.log(total);

  let moneyDisplay
  let blockieDisplay
  if(typeof total == "undefined" || Number.isNaN(total)){
    moneyDisplay = (
      <div style={{opacity:0.1,fontSize:28,paddingTop:15}}>
        connecting...
      </div>
    )
    blockieDisplay = (
      <div>
        <img src ={burnerloader} alt="logo" style={{maxHeight:50,opacity:0.25,marginLeft:-20}}/>
      </div>
    )
  }else{
    /*moneyDisplay = (
      <div>
        {dollarDisplay(total)}
      </div>
    )*/
    moneyDisplay = (
      <div style={{opacity:0.4,fontSize:22,paddingTop:18}}>
        {network}
      </div>
    )
    blockieDisplay = (
      <Blockie
          address={address}
          config={{size:6}}>
      </Blockie>
    )
  }

  let scanButtonStyle = {
    opacity:sendButtonOpacity,
    position:"fixed",
    right:20,
    bottom:20,
    zIndex:2,
    cursor:"pointer"
  }

  if(view==="send_to_address"){
    scanButtonStyle.position = "absolute"
    scanButtonStyle.right = -3
    scanButtonStyle.top = 217
    delete scanButtonStyle.bottom
  }

  let bottomRight = (
    <div style={scanButtonStyle} onClick={() => {
      openScanner({view:"send_to_address"})
    }} >
      <div style={{position:'relative',backgroundImage:"linear-gradient("+mainStyle.mainColorAlt+","+mainStyle.mainColor+")",backgroundColor:mainStyle.mainColor,borderRadius:"50%",width:89,height:89,boxShadow: "0.5px 0.5px 5px #000000"}}>
        <a href="#" style={{color:'#FFFFFF',position:'absolute',left:30,top:28}}>
          <i className="fas fa-qrcode" />
        </a>
      </div>
    </div>
  )



  if(total > 0 && localStorage&&typeof localStorage.setItem == "function"){

    var bottom = <div />
    var nextBackupWarningID = address+"nextBackupWarning";

    var storedNextBackupWarning =  localStorage.getItem(nextBackupWarningID);

    if (storedNextBackupWarning == null)
    {
      storedNextBackupWarning = 0;
    }

    console.log(storedNextBackupWarning);

    if (total > storedNextBackupWarning) {

      let showBackupWarningStyle = {
        display: "inline",
        zIndex: 3,
        position:"fixed",
        height:195,
        width:'100%',
        bottom: 0,
        right: 0,
        backgroundColor:'#ffffff',
        boxShadow: "0.5px 0.5px 5px #000000"
      }

      function allreadyDone(){
        //this number is bigger than the amount of ATS that will ever be.
        storedNextBackupWarning = 1000000000;
        localStorage.setItem(nextBackupWarningID, storedNextBackupWarning);
        
        //TODO: how to make element invisible in react ? can't edit current display
        //showBackupWarningStyle['display'] = 'none';
      }

      function remindMeLater(){
        if (total < 42){
          storedNextBackupWarning = 42;
        } else if (total < 100){
          storedNextBackupWarning = 100;
        } else {
          storedNextBackupWarning = total + 1;
        }

        localStorage.setItem(nextBackupWarningID, storedNextBackupWarning);
        //TODO: how to make element invisible in react ? can't edit current display
        //showBackupWarningStyle.display = 'none';
      }

      bottom = (
        <div style={showBackupWarningStyle} >
          <div style={{position:'relative'}}>
            <h5 style={{color:mainStyle.mainColor, textAlign:'left', paddingLeft: 15, paddingTop: 10}}> {i18next.t('main_card.backup_reminder_header')} </h5>
            <div style={{color:'black', paddingLeft: 15, fontWeight: 300}}> {i18next.t('main_card.backup_reminder_text')} </div>
          </div>
          <div className="content ops row" style={{padding:15}}>
            <div  className="col-6 p-1" style={{width: 200}} >
              <button className="btn w-100" style={buttonStyle.primary} onClick={allreadyDone}>
                <Scaler config={{startZoomAt:400,origin:"50% 50%"}}>
                  {i18next.t('main_card.backup_reminder_done')}
                </Scaler>
              </button>
            </div>
            <div  className="col-6 p-1" style={{width: 200}} >
              <button className="btn w-100" style={buttonStyle.primary} onClick={remindMeLater}>
                <Scaler config={{startZoomAt:400,origin:"50% 50%"}}>
                  {i18next.t('main_card.backup_reminder_later')}
                </Scaler>
              </button>
            </div>
          </div>
        </div>
      )
    }
  }

  

  let opacity = 0.5



  let topLeft

  if(view==="main" || view==="exchange"){
    opacity = 1.0
    var blockscoutURL = '';
    if(network === "ARTIS Sigma1") {
      blockscoutURL = "https://explorer.sigma1.artis.network";
    } else if (network === "ARTIS Tau1") {
      blockscoutURL = "https://explorer.tau1.artis.network";
    } else {
      blockscoutURL = "https://blockscout.com/poa/dai";
    }

    topLeft = (
      <div style={{position:"absolute",left:16,top:4,zIndex:1,cursor:"pointer"}}  >
        <a href={blockscoutURL + "/address/"+address+"/transactions"} target="_blank" rel="noopener noreferrer" style={{color:"#FFFFFF"}}>
          {blockieDisplay} <div style={{position:"absolute",left:60,top:15,fontSize:14}}>{name}</div>
        </a>
      </div>
    )
  }else{
    topLeft = (
      <div style={{position:"absolute",left:16,top:4,zIndex:1,cursor:"pointer"}} onClick={() => changeView('main')} >
          {blockieDisplay} <div style={{position:"absolute",left:60,top:15,fontSize:14}}>{name}</div>
      </div>
    )
  }

  let topRight = (
    <div style={{position:"absolute",right:28,top:-4,zIndex:1,fontSize:46,opacity:0.9}}  >
      {moneyDisplay}
    </div>
  )




  return (
    <div className="header" style={{opacity}}>
      {topLeft}
      {topRight}
      {bottomRight}
      {bottom}
    </div>
  )
};
