"use strict";document.addEventListener("DOMContentLoaded",function(event){!function includeHTML(){var z,i,elmnt,file,xhttp;for(z=document.getElementsByTagName("*"),i=0;i<z.length;i++)if(file=(elmnt=z[i]).getAttribute("w3-include-html"))return(xhttp=new XMLHttpRequest).onreadystatechange=function(){4==this.readyState&&(200==this.status&&(elmnt.innerHTML=this.responseText),404==this.status&&(elmnt.innerHTML="Page not found."),elmnt.removeAttribute("w3-include-html"),includeHTML())},xhttp.open("GET",file,!0),void xhttp.send()}()});