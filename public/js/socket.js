
var socket = io();
let my_id = ''
let color = `${'#'+((1<<24)*Math.random()|0).toString(16)}`

// sets an active user id
socket.on('welcome',function(data) {
    // console.log(data)
    my_id = data.msg
    // document.getElementById("camera").setAttribute("id",data.msg)
});

// updates active clients
socket.on('broadcast',function(data) {
    document.getElementById("clients").innerHTML=data.msg
    document.getElementById("views").innerHTML=data.views

});

socket.on('disconnect', function(){
  socket.emit('disconnect',{msg: id.toString()});
});

socket.on('delete', function(msg){
    let del = document.getElementById(msg.id)
    del.parentNode.removeChild(del)

});

// each item in data represents an object
// each object has an id and attributes
socket.on('change', function(data) {
  Object.keys(data).forEach( (item) => { 
    if (item != my_id ) {
    // see if item exists before updating, if not create new one
    if ( document.getElementById(item)) {
      let id = document.getElementById(item)
      Object.keys(data[item]["attributes"]).forEach(att => {   
      id.setAttribute(att,data[item]["attributes"][att])
      // id.object3D[att] = data[item]["attributes"][att]

        // updateAttributes(item)
      })
  }
    else {
      let sceneEl = document.querySelector('a-scene');
      let ent = document.createElement('a-entity')
      let box = document.createElement('a-entity')
      box.setAttribute('position','0 -1 0')
      ent.setAttribute('id',item)
      let astro = document.createElement('a-gltf-model')
      astro.setAttribute('src',"#astro")
      ent.setAttribute('lerp',lerp="properties: position, rotation, scale")

      // console.log(box)
      sceneEl.appendChild(ent)
      ent.appendChild(box)
      box.appendChild(astro)
      box.setAttribute('rotation', '0 180 0')

      // updateAttributes(item)
      let id = document.getElementById(item)
      Object.keys(data[item]["attributes"]).forEach(att => {   
      // console.log(data[item]["attributes"][att])
      id.setAttribute(att,data[item]["attributes"][att])
      // id.object3D[att] = data[item]["attributes"][att]
    })
  }}
})
})



// component to send position and rotation data
AFRAME.registerComponent('user-info', {
  init: function() {
    var el = this.el
    var object3D = this.el.object3D
    logger = () => {
      if (this.el.id == "camera") {
        let a = new Object()
        a.id = my_id
        a.attributes = new Object()
        a.attributes.position = el.getAttribute('position')
        // console.log(object3D)
        a.attributes.color = color
        a.attributes.rotation = el.getAttribute('rotation')
        socket.emit('update',{msg : a})
        }
    }
    let emit = setInterval(logger,100)
  }
})
