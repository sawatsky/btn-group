(function(document) {
	document.querySelectorAll(".btn-group[data-orientation=\"horizontal\"]").forEach(updateWidths);

	function updateWidths(btnGroup) {
		iterateChildren(btnGroup.offsetWidth, btnGroup.children, 0, 0);
	}

	function iterateChildren(parentWidth, children, start, end) {
		if (children.length <= 1 || start >= children.length) {
			return;
		}

		if (isBtnGroupHeader(children[start])) {
			// current child is btn-group-header

			iterateChildren(parentWidth, children, start+1, end+1);
		} else {
			// current child isn't btn-group-header

			end = getEnd(children, start+1);
			if (parentWidth > getChildrenWidth(children, start, end)) {
				setWidths(children, start, end, calculateWidth(end-start+1));
			}
			iterateChildren(parentWidth, children, end+1, end+1);
		}
	}

	function isBtnGroupHeader(element) {
		if (element.classList) {
			return element.classList.contains("btn-group-header");
		}
		return hasClass(element.className.split(' '), "btn-group-header");
	}

	function hasClass(classList, cls) {
		for (var i = 0; i < classList.length; i++) {
			if (classList[i] == cls) {
				return true;
			}
		}
		return false;
	}

	function getEnd(elements, start) {
		for (var i = start; i < elements.length; i++) {
			if (isBtnGroupHeader(elements[i])) {
				return i-1;
			}
		}
		return elements.length-1;
	}

	function calculateWidth(numChildren) {
		return (1 / numChildren)*100 + "%";
	}

	function getChildrenWidth(elements, start, end) {
		var width = 0;
		for (var i = start; i <= end; i++) {
			width += elements[i].offsetWidth;
		}
		return width;
	}

	function setWidths(elements, start, end, width) {
		for (var i = start; i <= end; i++) {
			elements[i].style.width = width;
		}
	}
})(document);