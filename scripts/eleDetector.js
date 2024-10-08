import Popup from "../components/Popup.jsx";
import { root } from "../main-ext";
import { injectReact, removeReact } from "./ext-qol";
import { find, getElePos, getMousePos } from "./qol.js";

let textbox_list = []
let popup_pos = {x: 300, y: 500}
let overPopup = false
let popup = null
let focused_textbox = null
let cooldown = false

const detectTextboxes = () =>{
    const textboxes = document.querySelectorAll('[contenteditable="true"]');
    textboxes.forEach((textbox)=>{   
        if (!textbox_list.includes(textbox)){
            textbox_list.push(textbox)
            textbox.addEventListener("focus", showPopup)
            textbox.addEventListener("blur", removePopup)
        }
    })
}

const undetectTextboxes = () =>{
    textbox_list.forEach((textbox)=>{   
            textbox.removeEventListener("focus", showPopup)
            textbox.removeEventListener("blur", removePopup)
    })
    textbox_list = []
    focused_textbox = null
}

const onPopup = () =>{
    overPopup = true
}

const offPopup = () =>{
    overPopup = false
}

const showPopup = (e) => {
    if (cooldown === false) {
        focused_textbox = e.target
        popup_pos = getElePos(e.target)
        if (popup_pos.x < 150){
            popup_pos.x = 150
        }
        popup_pos.y -= 20
        injectReact(Popup, root,{startx:popup_pos.x,starty:popup_pos.y})
        setTimeout( () => {
            popup = find(".popup")
            popup.addEventListener("mouseover", onPopup)
            popup.addEventListener("mouseout", offPopup)
        }, 100)
    }
}

const removePopup = (e) => {
    if (overPopup){

    }
    else{
        removeReact()
        popup = null
    }
}

const startCooldown = (ms) =>{
    cooldown = true
    setTimeout( () => {
        cooldown = false
    }, ms)
}

window.addEventListener('click', function(e){  
    if(popup){
        if (!overPopup){
            removeReact()
            popup = null
        }
    } 
  });

export {focused_textbox, detectTextboxes, popup_pos, undetectTextboxes, startCooldown}