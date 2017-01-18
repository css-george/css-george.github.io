function openEditor(){var height=window.innerHeight-100;if(editor=window.open(url,"","menubar=no,toolbar=no,location=no,status=no,width=320,height="+height),0===Object.keys(knownVariables).length){var i,inline=document.querySelectorAll("style:not(#"+styleID+")");for(i=0;i<inline.length;i++)parseStylesheet(inline[i].innerHTML);var links=document.querySelectorAll('link[rel="stylesheet"]');for(i=0;i<links.length;i++)fetchStylesheet(links[i].href)}return editor?void editor.addEventListener("beforeunload",function(evt){editor=null}):void console.error("[george] Failed to open editor window")}function fetchStylesheet(cssUrl){var xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){4===xhr.readyState&&parseStylesheet(xhr.responseText)},xhr.open("GET",cssUrl,!0),xhr.send()}function parseStylesheet(sheetText){var matches=sheetText.match(/georgeMappingURL=(\S+)/);matches&&matches[1]&&parseMappingFile(matches[1])}function parseMappingFile(mapUrl){try{var xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){if(4===xhr.readyState){var variables=JSON.parse(xhr.responseText);Object.keys(variables).forEach(function(varname){knownVariables[varname]=variables[varname]}),editor&&!editor.closed&&editor.postMessage(variables,window.location.origin)}},xhr.open("GET",mapUrl,!0),xhr.send()}catch(e){var split=mapUrl.split(",");if(!split[0].match(/^data:/))throw e;var variables=JSON.parse(atob(split[1]));Object.keys(variables).forEach(function(varname){knownVariables[varname]=variables[varname]}),editor&&!editor.closed&&editor.postMessage(variables,window.location.origin)}}function updateVariables(updates){var rule=stylepad.sheet.cssRules[0];Object.keys(updates).map(function(key){knownVariables[key]=updates[key],rule.style.setProperty("--"+key,updates[key])})}var editor=null,styleID="__GEORGE__Stylepad",knownVariables=Object.create(null),stylepad=document.createElement("style");stylepad.setAttribute("id",styleID),stylepad.appendChild(document.createTextNode(":root { }")),document.head.appendChild(stylepad),document.addEventListener("keydown",function(evt){("Backquote"===evt.code&&evt.shiftKey||"IntlBackslash"===evt.code&&evt.shiftKey||126===evt.keyCode&&evt.shiftKey)&&(editor&&!editor.closed?editor.focus():openEditor())}),window.addEventListener("message",function(evt){evt.origin===window.location.origin&&("__INIT__"==evt.data?(editor=evt.source,editor.postMessage(knownVariables,window.location.origin)):updateVariables(evt.data))});var blob=new Blob(['<!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /><title>CSS Variable Editor</title><style>header,header h1{box-sizing:border-box}#menuButton,input{background:0 0;border:0}#menuButton svg,input{vertical-align:middle}input,menuitem{color:#333;font-family:system-ui,-apple-system,\'Segoe UI\',Roboto,sans-serif}body,input,menuitem{font-family:system-ui,-apple-system,\'Segoe UI\',Roboto,sans-serif}body{background:#f2f2f2;padding:0;margin:0}header{display:flex;color:#fff;background:#ff0046;box-shadow:0 2px 5px rgba(0,0,0,.25)}header h1{flex:1 0 auto;line-height:56px;font-size:24px;letter-spacing:.005em;font-weight:500;padding:0 16px;margin:0}#menuButton{display:inline-block;line-height:56px;padding:0;width:48px;text-align:center}#menuButton:active,#menuButton:hover,#menuButton[aria-expanded=true]{background:#ff3d72}#menuButton::after,input:not([value^="#"])+input[type=color],menuitem svg{display:none}#menuButton svg{height:24px;width:24px;fill:#fff}menu{padding:8px 0}menuitem{background:#fff;padding:0 16px;line-height:48px;font-size:16px}menuitem:not([disabled]):active,menuitem:not([disabled]):focus,menuitem:not([disabled]):hover{background:#ffbdcf;color:#000}dl{margin:1em;columns:3 260px;column-gap:2em}dl div{width:260px;display:flex;margin-bottom:8px;height:40px}dt{flex:1 1 auto;font-weight:400;line-height:40px}dd{display:inline-flex;width:150px;border-bottom:2px solid #eee;margin-left:0;flex:0 0 150px;align-items:center}dd:focus-within{border-color:#ff0046}input{font-weight:300;flex:1 1 auto;font-size:1em;text-align:right}input:focus{outline:0;color:#000}input[type=color]{flex:0 0 1.5em;height:1.5em;width:1.5em;margin-left:.5em;padding:0;-webkit-appearance:none}input::-moz-focus-inner{padding:0}input[type=color]::-webkit-color-swatch-wrapper{padding:0}input[type=color]::-moz-color-swatch{border:0;border-radius:5px}input[type=color]::-webkit-color-swatch{border:0;border-radius:5px}@media (min-width:600px){#menuButton,menuitem::after{display:none}menu{display:block!important;transform:none!important;border:0!important}menuitem{display:inline-block;background:0 0;line-height:56px;padding:0;width:48px;text-align:center;color:inherit}menuitem:not([disabled]):focus{background:0 0;color:#fff}menuitem:not([disabled]):active,menuitem:not([disabled]):hover{background:#ff3d72;color:#fff}menuitem svg{display:inline-block;height:24px;width:24px;vertical-align:middle;fill:currentColor}}</style><script>!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.MenuButton=t()}(this,function(){"use strict";function e(e){var t=new n(e);return o&&o.set(e,t),t}var t=function(){function e(){}return Object.defineProperty(e,"open",{get:function(){return this.isOpen},enumerable:!0,configurable:!0}),e.openMenu=function(e,t,n){void 0===n&&(n=!1),null!==this.transitionEndHandler&&this.transitionEndHandler(),this.curButton=e,this.curMenu=t,this.isOpen=!0,this.curButton.setAttribute("aria-expanded","true"),this.curButton.ownerDocument.documentElement.addEventListener("click",this.clickListener),this.curButton.addEventListener("blur",this.handleBlur),this.curButton.parentNode.insertBefore(this.curMenu,this.curButton.nextSibling),this.addMenuStyle(),n&&this.focusMenu(),this.curMenu.addEventListener("keydown",this.menuKeypressListener),this.curMenu.addEventListener("focusout",this.handleBlur),this.curMenu.addEventListener("click",this.menuClickListener)},e.closeMenu=function(){var e=this;if(this.isOpen&&this.curButton&&this.curMenu){this.curButton.ownerDocument.documentElement.removeEventListener("click",this.clickListener),this.curButton.removeEventListener("blur",this.handleBlur),this.curButton.setAttribute("aria-expanded","false"),this.curMenu.removeEventListener("keydown",this.menuKeypressListener),this.curMenu.removeEventListener("focusout",this.handleBlur),this.curMenu.removeEventListener("click",this.menuClickListener);var t=this.curMenu;this.transitionEndHandler=function(){t.removeAttribute("style"),t.removeEventListener("transitionend",e.transitionEndHandler),t.removeEventListener("webkittransitionend",e.transitionEndHandler),e.transitionEndHandler=null},"transitionDuration"in t.style?t.style.transitionDuration="192ms":t.style.webkitTransitionDuration="192ms","transform"in t.style?t.style.transform="scaleY(0)":t.style.webkitTransform="scaleY(0)",t.addEventListener("transitionend",this.transitionEndHandler),t.addEventListener("webkittransitionend",this.transitionEndHandler),this.isOpen=!1,this.curButton=null,this.curMenu=null,this.focusCount=null}},e.toggleMenu=function(e,t){var n=this.curMenu;this.isOpen&&e===this.curButton&&this.closeMenu(),n!==t&&this.openMenu(e,t)},e.focusMenu=function(){if(this.curMenu){null===this.focusCount&&(this.focusCount=0);var e=this.curMenu.children.length;this.focusCount<0&&(this.focusCount+=e);var t=this.curMenu.children[this.focusCount%e];t.focus()}},e.clickMenuItem=function(){if(this.curMenu){var e=this.curMenu.children.length,t=this.curMenu.children[this.focusCount%e];t.hasAttribute("disabled")||t.click()}},e.addMenuStyle=function(){if(this.curMenu&&this.curButton){var e=this.curMenu,t=this.curButton;e.style.display="block",e.style.position="fixed",e.setAttribute("role","menu"),e.setAttribute("data-owner","button"),e.setAttribute("type","");for(var n=0;n<e.children.length;n++)e.children[n].setAttribute("tabindex","-1"),e.children[n].setAttribute("role","menuitem"),e.children[n].setAttribute("aria-disabled",e.children[n].hasAttribute("disabled").toString());requestAnimationFrame(function(){var n=t.getBoundingClientRect(),i=e.getBoundingClientRect(),r=window.innerHeight;n.bottom+i.height>r?e.style.bottom=n.top+"px":e.style.top=n.bottom+"px",i.width>n.right?e.style.left=n.left+"px":e.style.left=n.right-i.width+"px","transform"in e.style?e.style.transform="scaleY(1)":e.style.webkitTransform="scaleY(1)"})}},e.clickListener=function(t){e.curButton&&e.curMenu&&(e.curMenu.contains(t.target)||e.curButton.contains(t.target)||(e.curButton.focus(),e.closeMenu()))},e.menuClickListener=function(t){if(e.curButton&&e.curMenu){var n=t.target;e.curMenu.contains(n)&&(n.hasAttribute("disabled")||(e.curButton.focus(),e.closeMenu()))}},e.handleBlur=function(t){if(e.curButton){var n=t.relatedTarget;n&&e.curButton!==n&&(e.curMenu&&e.curMenu.contains(n)||setTimeout(function(){e.isOpen&&e.closeMenu()},0))}},e.menuKeypressListener=function(t){e.isOpen&&(27===t.keyCode&&(e.curButton&&e.curButton.focus(),e.closeMenu()),38===t.keyCode&&(t.preventDefault(),t.stopPropagation(),e.focusCount--,e.focusMenu()),40===t.keyCode&&(t.preventDefault(),t.stopPropagation(),e.focusCount++,e.focusMenu()),(32===t.keyCode||13===t.keyCode)&&(t.preventDefault(),t.stopPropagation(),e.clickMenuItem()))},e}();t.curMenu=null,t.curButton=null,t.isOpen=!1,t.focusCount=null,t.transitionEndHandler=null;var n=function(){function e(e){var n=this;this.el=e;var i=this.el.getAttribute("menu");if(i){var r=e.ownerDocument.getElementById(i);r&&(this.menu=r,this.el.setAttribute("aria-haspopup","true"),this.el.setAttribute("aria-expanded","false"),this.clickHandler=function(){t.toggleMenu(n.el,n.menu)},this.keyHandler=function(e){n.buttonKeypressListener(e)},this.resizeHandler=function(){t.closeMenu()},this.el.addEventListener("click",this.clickHandler),this.el.addEventListener("keydown",this.keyHandler),window.addEventListener("resize",this.resizeHandler))}}return e.prototype.destroy=function(){this.el&&(this.el.removeEventListener("click",this.clickHandler),this.el.removeEventListener("keydown",this.keyHandler),window.removeEventListener("resize",this.resizeHandler)),this.clickHandler=null,this.keyHandler=null,this.resizeHandler=null,this.menu=null,this.el=null},e.prototype.buttonKeypressListener=function(e){t.open&&27==e.keyCode&&t.closeMenu(),40==e.keyCode&&(t.open?t.focusMenu():t.openMenu(this.el,this.menu,!0))},e}(),i=\'\\nmenu[type="context"],\\nmenu[data-owner="button"] {\\n    display: none;\\n    padding: 0;\\n    margin: 0;\\n    border: 1px solid;\\n    will-change: transform;\\n    transform: scaleY(0);\\n    transform-origin: top center;\\n    transition: transform 225ms cubic-bezier(0.4, 0.0, 0.2, 1);\\n}\\n\\nmenuitem {\\n    display: list-item;\\n    list-style-type: none;\\n    background: Menu;\\n    font: menu;\\n    padding: 0.25em 0.5em;\\n    cursor: default;\\n}\\n\\nmenuitem::after {\\n    content: attr(label);\\n}\\n\\nmenuitem[disabled] {\\n    color: GrayText;\\n}\\n\\nmenuitem:not([disabled]):hover,\\nmenuitem:not([disabled]):focus {\\n    background: Highlight;\\n    color: HighlightText;\\n}\\n\\nbutton[type="menu"]::after,\\nbutton[data-type="menu"]:after { content: \\\' ▾\\\'; }\\n\\nbutton[type="menu"]:empty::after,\\nbutton[data-type="menu"]:empty:after { content: \\\'▾\\\'; } /* No space character */\\n\',r=\'\\nmenu[type="context"],\\nmenu[data-owner="button"] {\\n    -webkit-transform: scaleY(0);\\n    -webkit-transform-origin: top center;\\n    -webkit-transition: -webkit-transform 225ms cubic-bezier(0.4, 0.0, 0.2, 1);\\n    transition: -webkit-transform 225ms cubic-bezier(0.4, 0.0, 0.2, 1);\\n}\\n\',u=document.createElement("style");u.appendChild(document.createTextNode(i)),"transform"in document.createElement("div").style||u.appendChild(document.createTextNode(r));var s;(s=document.querySelector("link"))?s.parentNode.insertBefore(u,s):(s=document.querySelector("style"))?s.parentNode.insertBefore(u,s):(s=document.querySelector("head"))?s.appendChild(u):document.appendChild(u);var o=null;return"WeakMap"in window&&(o=new WeakMap),e})</script><script>function onEdit(e){var t=e.getAttribute("name"),n=document.querySelector(\'input[name="\'+t+\'"]:not([type="\'+e.type+\'"])\');n&&(n.value=e.value),VARIABLES[t]=e.value;var r=Object.create(null);r[t]=e.value,window.opener.postMessage(r,origin||"*")}function defineVariables(){for(var e=Object.keys(VARIABLES).sort(),t=document.getElementById("editor"),n=0;n<e.length;n++){var r={name:e[n],value:VARIABLES[e[n]]},o=t.querySelector(\'div[data-variable="\'+r.name+\'"]\');if(o)Array.prototype.forEach.call(o.querySelectorAll("input"),function(e){e.value=r.value});else if(o=bindTemplate(r),0===n)t.appendChild(o);else{var a=t.querySelector(\'div[data-variable="\'+e[n-1]+\'"]\');a&&a.nextSibling?t.insertBefore(o,a.nextSibling):t.appendChild(o)}}}function bindTemplate(e){function t(e){return e.replace(/^bind([A-Z])/,function(e,t){return t.toLowerCase()}).replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()})}function n(n){Object.getOwnPropertyNames(n.dataset).filter(function(e){return e.match(/^bind/)}).map(function(r){return[t(r),e[n.dataset[r]]]}).forEach(function(e){var t=e[0],r=e[1];"text"===t?n.textContent=r:(n.setAttribute(t,r),"value"===t&&(n.value="#000000",n.value=r))})}var r=document.getElementById("tpl").content.cloneNode(!0),o=r.querySelectorAll("*");return Array.prototype.forEach.call(o,n),r}var origin=window.opener.location.origin;"http"!==origin.substring(0,4)?origin=null:document.title+=" - "+origin;var VARIABLES=Object.create(null);window.opener.addEventListener("beforeunload",function(e){window.close()}),window.addEventListener("load",function(){window.opener.postMessage("__INIT__",origin||"*");var e=document.getElementById("menuButton");e&&MenuButton(e)}),window.addEventListener("message",function(e){""+e.origin==""+origin&&e.data&&(Object.keys(e.data).forEach(function(t){VARIABLES[t]=e.data[t]}),defineVariables())})</script></head><body><header><h1>CSS Variable Editor</h1></header><template id="tpl"><div data-bind-data-variable="name"><dt><label data-bind-for="name" data-bind-text="name"></label></dt><dd><input data-bind-id="name" data-bind-name="name" data-bind-value="value" size="6" onchange="onEdit(this)"><input type="color" data-bind-name="name" data-bind-value="value" oninput="onEdit(this)"></dd></div></template><dl id="editor"></dl></body></html>'],{type:"text/html"}),url=URL.createObjectURL(blob);