export const MoveFrame = function(model, header, zIndex, flag) {
     let mx = event.pageX
     let my = event.pageY
     let dx = model.offsetLeft
     let dy = model.offsetTop
     flag = true
     model.style.zIndex = model.style.zIndex !== '' ? model.style.zIndex : zIndex
     model.style.zIndex = parseInt(model.style.zIndex) + 5
     header.onmousemove = (eve) => {
         let e = eve || window.event
         let x = e.pageX
         let y = e.pageY
         if (flag) {
             let moveX = dx + x - mx
             let moveY = dy + y - my
             model.style.left = moveX + 'px'
             model.style.top = moveY + 'px'
         }
     }
     header.onmouseup = (eve) => {
         flag = false
     }
}
