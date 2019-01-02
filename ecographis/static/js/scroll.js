 function setScrollPosition(element, direction) {
	let scrollLeft = 0
	if(direction === 1){
		scrollLeft = 500
	} else {
		scrollLeft = -500
	}
	if(element.classList.contains('arrow')) {
		element = element.parentNode.previousElementSibling;	
	}
	element.scrollBy({ 
		top: 0,
		left: scrollLeft, 
		behavior: 'smooth' 
	});
}

let scrollBoxes = document.querySelectorAll('.scroll-box-wrapper');
let isDown = false;
let scrollLeftCustom = 0;
scrollBoxes.forEach((scrollBox) => {
	scrollBox.addEventListener('scroll', onScroll, false);
	scrollBox.addEventListener('mousedown', mouseDown, false);
})


function mouseDown(event) {
	let scrollBox = findAncestor(event.target, 'scroll-box-wrapper');
	isDown = true;
	scrollBox.classList.add('--active');
	scrollBox.dataset.dragstart = event.pageX - scrollBox.offsetLeft;
	// scrollLeftCustom = scrollBox.scrollLeft;
	document.addEventListener('mouseup', mouseUp , false);
	document.addEventListener('mouseleave', mouseUp , false);
	document.addEventListener('mousemove', mouseMove, false);
}


function mouseMove(event) {
	if(!isDown) return;
	let scrollBox = findAncestor(event.target, 'scroll-box-wrapper');
	event.preventDefault();
	const x = event.pageX - scrollBox.offsetLeft;
	const walk = (x - scrollBox.dataset.dragstart) * 5; //scroll-fast
	// scrollBox.scrollLeft = scrollLeftCustom - walk;
	scrollBox.scrollBy({
		top: 0,
		left: scrollLeftCustom - walk,
		behavior: 'smooth'
	})
}

function mouseUp(event) {
	let scrollBox = findAncestor(event.target, 'scroll-box-wrapper');
	isDown = false;
	scrollBox.classList.remove('--active');

	document.removeEventListener('mousemove', mouseMove, false);
	document.removeEventListener('mouseup', mouseUp , false);
	document.removeEventListener('mouseleave', mouseUp , false);
	scrollBox.dataset.dragstart = 0;

}

function onScroll(event){
	let scrollBox = event.target;
	let scrollBoxWidth = scrollBox.clientWidth;
	let scrollBoxWidthContent = scrollBox.scrollWidth - 200;
	let rightArrow = scrollBox.nextElementSibling.querySelector('.arrow.--right');
	let leftArrow = scrollBox.nextElementSibling.querySelector('.arrow.--left');
	let scrollLength = scrollBoxWidthContent - scrollBox.dataset.scrollstart;
	if(scrollLength < scrollBoxWidth) {
		rightArrow.classList.add('--arrow-non-active');
	} else {
		rightArrow.classList.remove('--arrow-non-active');
	}

	if(scrollBox.dataset.scrollstart < 150 ) {
		leftArrow.classList.add('--arrow-non-active');
	} else {
		leftArrow.classList.remove('--arrow-non-active');
	}

	scrollBox.dataset.scrollstart = scrollBox.scrollLeft
}


function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

//fade scrollbox in

let numSteps = 1
let observerObjects = document.querySelectorAll('.observer')
let options = {
	root: null,
	rootMargin: "0% 0% -10% 0%",
	threshold: buildThresholdList()
}

function buildThresholdList() {
	let thresholds = [];
	for (var i=.1; i<=numSteps; i++) {
		var ratio = i/numSteps;
		thresholds.push(ratio);
	}
	thresholds.push(0);
	return thresholds;
}

let observer = new IntersectionObserver((entries, self) => {
	entries.forEach(entry => {
		let target = entry.target
		if (entry.intersectionRatio > 0) {
			target.classList.add('scroll-wrapper-active');	
			self.unobserve(entry.target)
		}
	});

}, options);


observerObjects.forEach(observerObject => {
	observer.observe(observerObject);
});