const electron = require('electron')
const axios = require('axios')
const { dialog } = require('electron').remote
const fs = require('fs')

let testdiscussions = [['arouf',true],['hlib',false],['jaouda',true],['zwin',false]]

let discussionsdiv = document.getElementById('discussionsdiv')

function login(){
  var data = fs.readFileSync('tartare_private_key.tart')
  axios.get('http://tartanserver.herokuapp.com/login.php', {
    params: {
        public_key: data.toString()
    }
  })
  .then((response) => {
    if(response.data.result == 'success'){
      golog()
    }else if (response.data.result == 'failure') {
      dialog.showErrorBox("Key error", response.data.message)
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

refreshdiscussions(testdiscussions,"")
