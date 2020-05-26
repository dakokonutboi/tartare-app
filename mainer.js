const fs = require('electron').remote.require('fs')
const electron = require('electron')
const ipc = electron.ipcRenderer

let remember = document.getElementById('remember')

if (fs.existsSync('tartare_private.pem')) {
  console.log('Private key exists')
  remember.innerHTML = '<button type="button" class="button" name="button" onclick="golog()">Use saved keys</button>'
} else {
  console.log('does not')
}

function genkeys(){
  window.location = "genkeys.html"
}

function golog() {
  ipc.send('open-hub')
  window.close()
}
