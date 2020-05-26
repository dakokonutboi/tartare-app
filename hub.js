const electron = require('electron')
const axios = require('axios')
const { dialog } = require('electron').remote
const fs = require('fs')
const { app, BrowserWindow } = require('electron').remote
const NodeRSA = require('node-rsa')

let testdiscussions = [['arouf',true],['hlib',false],['jaouda',true],['zwin',false]]

let discussionsdiv = document.getElementById('discussionsdiv')


let pkfile = fs.readFileSync('tartare_private.pem')


let private_key = new NodeRSA(pkfile, 'private')

function login(){
  var data = fs.readFileSync('tartare_public.pem')
  let sending = Math.floor(Date.now()/1000).toString()
  axios.get('http://localhost:5000/api/login', {
    params: {
        public_key: data.toString(),
        time: sending,
        signed: private_key.sign(sending, 'base64')
    }
  })
  .then((response) => {
    if(response.data.result == 'success'){
      if(response.data.verified){
        console.log('successfully logged in')
        console.log(response.data)
        golog()
      }else{
        dialog.showErrorBox("Signature Error","Something is wrong with the key signature, the app will restart.\n"+error.toString())
        app.relaunch()
        app.exit()
      }
    }else if (response.data.result == 'failure') {
      dialog.showErrorBox("Key error", response.data.message)
      app.relaunch()
      app.exit()
    }
  }, (error) => {
    dialog.showErrorBox("Server Error","Something is wrong with the server-client connection, the app will restart.\n"+error.toString())
    app.relaunch()
    app.exit()
  })
}

login()

function discussionconstructor(username, dot,highlighter){
  let dotconst = ''
  let highlight = ''
  if(dot){
    dotconst = '<img class="dot" src="dot.png">'
  }
  if(highlighter){
    highlight = ' selected'
  }
  let rslt = '<div class="discussion'+highlight+'" onclick="focusdiscussion('+"'"+username+"'"+')"><h4 class="discussiontitle">'+username+dotconst+'</h4></div>'
  return rslt
}


function refreshdiscussions(godiscussions,highlight){
  discussionsdiv.innerHTML = ""
  godiscussions.forEach(item => {
    let highlighter = false
    if(item[0] == highlight){
      highlighter = true
    }
    discussionsdiv.innerHTML = discussionsdiv.innerHTML+discussionconstructor(item[0],item[1],highlighter)
  })
}

function focusdiscussion(username){
  refreshdiscussions(testdiscussions,username)
}
