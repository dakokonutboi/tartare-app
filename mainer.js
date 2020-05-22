const fs = require('electron').remote.require('fs')

let remember = document.getElementById('remember')

if (fs.existsSync('tartare_private_key.tart')) {
  console.log('Private key exists')
  remember.innerHTML = '<button type="button" class="button" name="button">Use saved keys</button>'
} else {
  console.log('does not')
}

function genkeys(){
  window.location = "genkeys.html"
}
