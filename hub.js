const electron = require('electron')

let testdiscussions = [['arouf',true],['hlib',false],['jaouda',true],['zwin',false]]

let discussionsdiv = document.getElementById('discussionsdiv')

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
