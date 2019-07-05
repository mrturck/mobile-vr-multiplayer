
let div = document.createElement('div')
div.classList.add('container')
document.querySelector('body').insertBefore(div, document.querySelector('a-scene'))
div.innerHTML=
`<div class='item-clients'>
  <p id='clients' class='mdl-card__supporting-text' </p>
</div>
<div class='item-views' style='display:none'>
    <p id='views' class='mdl-card__supporting-text' </p>
</div>
<div class='message-text chat '>
  <div class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="text" id="text">
      <label class="mdl-textfield__label" for="sample1">Text...</label>
  </div>
</div>
<div class='chat message-send  '>
  <button id='msg-send' onclick='sendMessage()' class="mdl-button mdl-js-button mdl-button--raised">send</button>
</div>
<img class='item-chat' src="chat.svg" alt="chat bubble" onclick="toggleChat()">

<div id='chat-box' class='chat chat-box-open mdl-card__supporting-text'>
    <p class='chat-msg'>Welcome to chat! Tap chat bubble to toggle this view</p>
</div>`


let state = 0;
      
toggleChat = () => {
  console.log('open chat')
  let cb = document.querySelectorAll('.chat')
  state == 0 ?
  cb.forEach (c => {
      c.classList.remove('chat-box-closed')
      state = 1
      })
      :
      cb.forEach (c => {
      c.classList.add('chat-box-closed')
      state = 0
      })
  
}

sendMessage = () => {
  let text = document.getElementById('text').value
  socket.emit('message', {msg: text})
  updateChat(text, '#555555')
  document.getElementById('text').value = ''
}

updateChat = (data, color) => {
  let cb = document.getElementById('chat-box')
      let p = document.createElement('p')
      p.innerHTML = data
      p.classList.add('chat-msg')
      p.setAttribute('style', `color:${color}`)
      cb.appendChild(p)

}
  if (!socket) {
    let socket = io()
  }
  else {
    socket.on('message',function(data, color = '#0088') {
      updateChat(data.msg, color)
    });

document.getElementById('text').onkeypress=function(e){
    if(e.keyCode==13){
        document.getElementById('msg-send').click();
    }
}
}
let asset = document.createElement('a-asset-item')
asset.id="astro"
asset.setAttribute('src','models/astro.gltf')
let camera = document.createElement('a-entity')
camera.setAttribute('user-info','')
camera.setAttribute('id','camera')
camera.setAttribute('camera','active:true')
camera.setAttribute('look-controls','')
camera.setAttribute('wasd-controls','')
camera.setAttribute('position','0 1.6 0')
let box = document.createElement('a-box')
box.setAttribute('material','opacity:0')
camera.appendChild(box)
box.setAttribute('position','0 0 -1')
let scene = document.querySelector('a-scene')


if (document.querySelector('a-assets')) {
    let assets = document.querySelector('a-assets')
    assets.appendChild(asset)
    scene.insertBefore(assets,scene.firstChild)

}
else {
let assets = document.createElement('a-assets')
assets.appendChild(asset)
scene.insertBefore(assets,scene.firstChild)

}
scene.appendChild(camera);
scene.setAttribute('joystick','');