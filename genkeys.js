const child_process = require('child_process').execFileSync
const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow
const ipc = electron.ipcRenderer
const axios = require('axios')


let displayer = document.getElementById('displayer')
let usernamebox = document.getElementById('usernamebox')


function goback(){
  window.location = "index.html"
}

function checkusername(){
  axios.get('http://tartanserver.herokuapp.com/check.php', {
    params: {
        username: usernamebox.value
    }
  })
  .then((response) => {
    displayer.innerHTML = response.data.returner
    if(response.data.result == 'success'){
      makekeys()
    }else if (response.data.result == 'failure') {
      displayer.innerHTML = "<h1>Error</h1><p>"+response.data.message+"</p><button class='button' onclick='location.reload()'>Try again</button>"
    }
  }, (error) => {
    console.log(error)
  })
}

function makekeys(){
  displayer.innerHTML = "<h1>Generating...</h1><p>Your username was set. Please wait while we generate your keys.<br>When the generation is done, you will be logged in automatically.</p>"
  setTimeout(done, 500)
}

function done(){
  child_process('tartarelib/generatersa.exe')
  displayer.innerHTML = "<h1>Done.</h1><p>Your keys were generated. We're logging you in...</p>"
  setTimeout(golog, 500)
}

function golog() {
  ipc.send('open-hub')
  window.close()
}
