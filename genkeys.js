const child_process = require('child_process').execFileSync

function goback(){
  window.location = "index.html"
}

function makekeys(){
  displayer = document.getElementById('displayer')
  displayer.innerHTML = "<h1>Generating...</h1><p>Please wait while we generate your keys.<br>When the generation is done, you will be logged in automatically.</p>"
  child_process('tartarelib/generatersa.exe')
  setTimeout(done, 2000)
}

function done(){
  displayer.innerHTML = "<h1>Done.</h1><p>Your keys were generated, we're logging you in...</p>"
}
