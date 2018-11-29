function setScrollPosition(arrow, direction) {
	let scrollLeft = 0
	if(direction === 1){
		scrollLeft = 500
	} else {
		scrollLeft = -500
	}
	let scrollBox = arrow.parentNode.previousElementSibling
	scrollBox.scrollBy({ 
		top: 0,
		left: scrollLeft, 
		behavior: 'smooth' 
	});
	scrollBox.dataset.diff = scrollBox.scrollLeft
}

let scrollBoxes = document.querySelectorAll('.scroll-box-wrapper');
scrollBoxes.forEach((scrollBox) => {
	scrollBox.addEventListener('scroll', onScroll, false);
})

function onScroll(event){
	let scrollBox = event.target;
	console.log("box", scrollBox)
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



// let numSteps = 100
// let observerObjects = document.querySelectorAll('.observer')
// let options = {
// 	root: null,
// 	rootMargin: "0% 0% -40% 0%",
// 	threshold: buildThresholdList()
// }

// function buildThresholdList() {
// 	let thresholds = [];
// 	for (var i=1.0; i<=numSteps; i++) {
// 		var ratio = i/numSteps;
// 		thresholds.push(ratio);
// 	}
// 	thresholds.push(0);
// 	return thresholds;
// }

// observer = new IntersectionObserver(entries => {
// 	entries.forEach(entry => {
// 		let target = entry.target
// 		if (entry.intersectionRatio > 0) {
// 			console.log(target)
// 			setTimeout(() => {
// 				console.log(target)
// 				target.classList.add('scroll-wrapper-active');	

// 			},100)
// 			observer.unobserve(target)
// 		} 
// 	});
// }, options);


// observerObjects.forEach(observerObject => {
// 	observer.observe(observerObject);
// });