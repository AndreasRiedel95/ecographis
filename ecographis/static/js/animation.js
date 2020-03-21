const observers = document.querySelectorAll(".observer");
function menuAnimation() {
	let checkbox = document.querySelector("#change-hamburger");
	let navEles = document.querySelectorAll(".nav-ele");
	let menu = document.querySelector(".menu");
	let contactEeles = document.querySelectorAll(".menu-contact_context");
	if (checkbox.checked) {
		menu.style.transform = "translateY(0)";
		for (let i = 0; i < navEles.length; i++) {
			navEles[i].classList.add("doAnim");
		}
		for (let i = 0; i < contactEeles.length; i++) {
			contactEeles[i].classList.add("doAnim");
		}
	} else {
		menu.style.transform = "translateY(-150%)";
		for (let i = 0; i < navEles.length; i++) {
			navEles[i].classList.remove("doAnim");
		}
		for (let i = 0; i < contactEeles.length; i++) {
			contactEeles[i].classList.remove("doAnim");
		}
	}
}

function translateInnerContainer() {
	document.getElementById("nachhaltige-kommunikation").scrollIntoView();
	let containers = document.querySelectorAll(".inner-container");
	containers.forEach(container => {
		if (container.classList.contains("m--hidden")) {
			container.classList.remove("m--hidden");
			document.querySelector(".page-1").innerHTML = container.dataset.page;
		} else {
			container.classList.add("m--hidden");
			let header = container.querySelector(".header-3").innerHTML;
			document.querySelector(".next-headline").innerHTML = header;
		}
	});
}

window.onload = function() {
	document.querySelector(".menu").style.transform = "translate3d(0, -150%, 0)";
	document.querySelector("#change-hamburger").checked = false;

}

document.addEventListener("DOMContentLoaded", function(event) {
	console.log('IN')
	document.querySelector(".menu").style.transform = "translate3d(0, -150%, 0)";
	document.querySelector("#change-hamburger").checked = false;
});
