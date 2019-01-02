const observers = document.querySelectorAll('.observer')
var onBeforeUnLoadEvent = false;
function menuAnimation(){
	let checkbox = document.querySelector('#change-hamburger');
	let navEles = document.querySelectorAll('.nav-ele');
	let menu = document.querySelector('.menu');
	let contactEeles = document.querySelectorAll('.menu-contact_context')
	if(checkbox.checked){
		menu.style.transform = 'translateY(0)';
		for(let i = 0; i<navEles.length; i++){
			navEles[i].classList.add('doAnim')
		}
		for(let i = 0; i<contactEeles.length; i++){
			contactEeles[i].classList.add('doAnim')
		}
	}else{
		menu.style.transform = 'translateY(-150%)';
		for(let i = 0; i<navEles.length; i++){
			navEles[i].classList.remove('doAnim')
		}
		for(let i = 0; i<contactEeles.length; i++){
			contactEeles[i].classList.remove('doAnim')
		}
	}
}

window.onunload = window.onbeforeunload= function(){
	if(!onBeforeUnLoadEvent){
		onBeforeUnLoadEvent = true;
		let checkbox = document.querySelector('#change-hamburger');
		checkbox.checked = false
		menuAnimation();
		
	}
};