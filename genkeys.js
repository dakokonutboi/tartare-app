const child_process = require('child_process').execFileSync
const electron = require('electron')
const { app, BrowserWindow } = require('electron').remote
const ipc = electron.ipcRenderer
const axios = require('axios')
const { dialog } = require('electron').remote
const NodeRSA = require('node-rsa')
const fs = require('fs')


let displayer = document.getElementById('displayer')
let usernamebox = document.getElementById('usernamebox')
let usernamevalue = ''

function goback(){
  window.location = "index.html"
}

function checkusername(){
  displayer.innerHTML = "<h1>Checking...</h1><p>Checking for username availability...</p>"
  usernamevalue = usernamebox.value
  axios.get('http://localhost:5000/api/checkusername', {
    params: {
        username: usernamebox.value
    }
  })
  .then((response) => {
    if(response.data.result == 'success'){
      makekeys()
    }else if (response.data.result == 'failure') {
      displayer.innerHTML = "<h1>Error</h1><p>"+response.data.message+"</p><button class='button' onclick='location.reload()'>Try again</button>"
    }
  }, (error) => {
    dialog.showErrorBox("Server-Client error", "There was an issue with the client-server connection.\n Error log: "+error.toString()+"\n The app will restart.")
    app.relaunch()
    app.exit()
  })

}

function makekeys(){
  displayer.innerHTML = "<h1>Generating...</h1><p>Your username was set. Please wait while we generate your keys.<br>When the generation is done, you will be signed up and logged in automatically.</p>"
  setTimeout(done, 500)
}

function done(){
  let key = new NodeRSA({b: 2048})
  let private = key.exportKey('private')
  let public = key.exportKey('public')
  fs.writeFile('tartare_private.pem', private, function (err) {
  if (err) return console.log(err)
  })
  fs.writeFile('tartare_public.pem', public, function (err) {
  if (err) return console.log(err)
  })
  displayer.innerHTML = "<h1>Done.</h1><p>Your keys were generated. We're signing you up...</p>"
  setTimeout(golog, 500)
}

function golog() {
  let data = fs.readFileSync('tartare_public.pem')
  axios.get('http://localhost:5000/api/signup', {
    params: {
        username: usernamevalue,
        public_key: data.toString()
    }
  })
  .then((response) => {
    if(response.data.result == 'success'){
      ipc.send('open-hub')
      window.close()
    }else if (response.data.result == 'failure') {
      dialog.showErrorBox("Signup error", response.data.message)
      app.relaunch()
      app.exit()
    }
  }, (error) => {
    console.log(error)
  })
}
