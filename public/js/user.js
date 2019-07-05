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

`



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