const child_process = require('child_process').execFileSync

function goback(){
  window.location = "index.html"
}

function makekeys(){
  displayer = document.getElementById('displayer')
  displayer.innerHTML = "<h1>Generating...</h1><p>Wait while we generate your keys.<br>When the generation is done, you will be logged in automatically.</p>"
  child_process('tartarelib/generatersa.exe')
  displayer.innerHTML = "<h1>Done.</h1><p>Your keys were generated, we're logging you in...</p>"
}
