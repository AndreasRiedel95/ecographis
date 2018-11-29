!function(t, e) {
	"use strict";
	function n(t) {
		this.time = t.time, this.target = t.target, this.rootBounds = t.rootBounds, this.boundingClientRect = t.boundingClientRect, this.intersectionRect = t.intersectionRect || {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			width: 0,
			height: 0
		}, this.isIntersecting = !!t.intersectionRect;
		var e = this.boundingClientRect,
			n = e.width * e.height,
			o = this.intersectionRect,
			i = o.width * o.height;
		this.intersectionRatio = n ? i / n : this.isIntersecting ? 1 : 0
	}
	function o(t, e) {
		var n = e || {};
		if ("function" != typeof t)
			throw new Error("callback must be a function");
		if (n.root && 1 != n.root.nodeType)
			throw new Error("root must be an Element");
		this._checkForIntersections = function(t, e) {
			var n = null;
			return function() {
				n || (n = setTimeout(function() {
					t(), n = null
				}, e))
			}
		}(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT), this._callback = t, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(n.rootMargin), this.thresholds = this._initThresholds(n.threshold), this.root = n.root || null, this.rootMargin = this._rootMarginValues.map(function(t) {
			return t.value + t.unit
		}).join(" ")
	}
	function i(t, e, n, o) {
		"function" == typeof t.addEventListener ? t.addEventListener(e, n, o || !1) : "function" == typeof t.attachEvent && t.attachEvent("on" + e, n)
	}
	function r(t, e, n, o) {
		"function" == typeof t.removeEventListener ? t.removeEventListener(e, n, o || !1) : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, n)
	}
	function s(t) {
		var e;
		try {
			e = t.getBoundingClientRect()
		} catch (t) {}
		return e ? (e.width && e.height || (e = {
			top: e.top,
			right: e.right,
			bottom: e.bottom,
			left: e.left,
			width: e.right - e.left,
			height: e.bottom - e.top
		}), e) : {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			width: 0,
			height: 0
		}
	}
	function h(t, e) {
		for (var n = e; n;) {
			if (n == t)
				return !0;
			n = c(n)
		}
		return !1
	}
	function c(t) {
		var e = t.parentNode;
		return e && 11 == e.nodeType && e.host ? e.host : e
	}
	if ("IntersectionObserver" in t && "IntersectionObserverEntry" in t && "intersectionRatio" in t.IntersectionObserverEntry.prototype)
		"isIntersecting" in t.IntersectionObserverEntry.prototype || Object.defineProperty(t.IntersectionObserverEntry.prototype, "isIntersecting", {
			get: function() {
				return this.intersectionRatio > 0
			}
		});
	else {
		var a = [];
		o.prototype.THROTTLE_TIMEOUT = 100, o.prototype.POLL_INTERVAL = null, o.prototype.USE_MUTATION_OBSERVER = !0, o.prototype.observe = function(t) {
			if (!this._observationTargets.some(function(e) {
				return e.element == t
			})) {
				if (!t || 1 != t.nodeType)
					throw new Error("target must be an Element");
				this._registerInstance(), this._observationTargets.push({
					element: t,
					entry: null
				}), this._monitorIntersections(), this._checkForIntersections()
			}
		}, o.prototype.unobserve = function(t) {
			this._observationTargets = this._observationTargets.filter(function(e) {
				return e.element != t
			}), this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance())
		}, o.prototype.disconnect = function() {
			this._observationTargets = [], this._unmonitorIntersections(), this._unregisterInstance()
		}, o.prototype.takeRecords = function() {
			var t = this._queuedEntries.slice();
			return this._queuedEntries = [], t
		}, o.prototype._initThresholds = function(t) {
			var e = t || [0];
			return Array.isArray(e) || (e = [e]), e.sort().filter(function(t, e, n) {
				if ("number" != typeof t || isNaN(t) || t < 0 || t > 1)
					throw new Error("threshold must be a number between 0 and 1 inclusively");
				return t !== n[e - 1]
			})
		}, o.prototype._parseRootMargin = function(t) {
			var e = (t || "0px").split(/\s+/).map(function(t) {
				var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
				if (!e)
					throw new Error("rootMargin must be specified in pixels or percent");
				return {
					value: parseFloat(e[1]),
					unit: e[2]
				}
			});
			return e[1] = e[1] || e[0], e[2] = e[2] || e[0], e[3] = e[3] || e[1], e
		}, o.prototype._monitorIntersections = function() {
			this._monitoringIntersections || (this._monitoringIntersections = !0, this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (i(t, "resize", this._checkForIntersections, !0), i(e, "scroll", this._checkForIntersections, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in t && (this._domObserver = new MutationObserver(this._checkForIntersections), this._domObserver.observe(this.root || e, {
				attributes: !0,
				childList: !0,
				characterData: !0,
				subtree: !0
			}))))
		}, o.prototype._unmonitorIntersections = function() {
			this._monitoringIntersections && (this._monitoringIntersections = !1, clearInterval(this._monitoringInterval), this._monitoringInterval = null, r(t, "resize", this._checkForIntersections, !0), r(e, "scroll", this._checkForIntersections, !0), this._domObserver && (this._domObserver.disconnect(), this._domObserver = null))
		}, o.prototype._checkForIntersections = function() {
			var e = this._rootIsInDom(),
				o = e ? this._getRootRect() : {
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					width: 0,
					height: 0
				};
			this._observationTargets.forEach(function(i) {
				var r = i.element,
					h = s(r),
					c = this._rootContainsTarget(r),
					a = i.entry,
					u = e && c && this._computeTargetAndRootIntersection(r, o),
					l = i.entry = new n({
						time: t.performance && performance.now && performance.now(),
						target: r,
						boundingClientRect: h,
						rootBounds: o,
						intersectionRect: u
					});
				a ? e && c ? this._hasCrossedThreshold(a, l) && this._queuedEntries.push(l) : a && a.isIntersecting && this._queuedEntries.push(l) : this._queuedEntries.push(l)
			}, this), this._queuedEntries.length && this._callback(this.takeRecords(), this)
		}, o.prototype._computeTargetAndRootIntersection = function(n, o) {
			if ("none" != t.getComputedStyle(n).display) {
				for (var i = s(n), r = c(n), h = !1; !h;) {
					var a = null,
						u = 1 == r.nodeType ? t.getComputedStyle(r) : {};
					if ("none" == u.display)
						return;
					if (r == this.root || r == e ? (h = !0, a = o) : r != e.body && r != e.documentElement && "visible" != u.overflow && (a = s(r)), a && !(i = function(t, e) {
						var n = Math.max(t.top, e.top),
							o = Math.min(t.bottom, e.bottom),
							i = Math.max(t.left, e.left),
							r = Math.min(t.right, e.right),
							s = r - i,
							h = o - n;
						return s >= 0 && h >= 0 && {
								top: n,
								bottom: o,
								left: i,
								right: r,
								width: s,
								height: h
							}
					}(a, i)))
						break;
					r = c(r)
				}
				return i
			}
		}, o.prototype._getRootRect = function() {
			var t;
			if (this.root)
				t = s(this.root);
			else {
				var n = e.documentElement,
					o = e.body;
				t = {
					top: 0,
					left: 0,
					right: n.clientWidth || o.clientWidth,
					width: n.clientWidth || o.clientWidth,
					bottom: n.clientHeight || o.clientHeight,
					height: n.clientHeight || o.clientHeight
				}
			}
			return this._expandRectByRootMargin(t)
		}, o.prototype._expandRectByRootMargin = function(t) {
			var e = this._rootMarginValues.map(function(e, n) {
					return "px" == e.unit ? e.value : e.value * (n % 2 ? t.width : t.height) / 100
				}),
				n = {
					top: t.top - e[0],
					right: t.right + e[1],
					bottom: t.bottom + e[2],
					left: t.left - e[3]
				};
			return n.width = n.right - n.left, n.height = n.bottom - n.top, n
		}, o.prototype._hasCrossedThreshold = function(t, e) {
			var n = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
				o = e.isIntersecting ? e.intersectionRatio || 0 : -1;
			if (n !== o)
				for (var i = 0; i < this.thresholds.length; i++) {
					var r = this.thresholds[i];
					if (r == n || r == o || r < n != r < o)
						return !0
				}
		}, o.prototype._rootIsInDom = function() {
			return !this.root || h(e, this.root)
		}, o.prototype._rootContainsTarget = function(t) {
			return h(this.root || e, t)
		}, o.prototype._registerInstance = function() {
			a.indexOf(this) < 0 && a.push(this)
		}, o.prototype._unregisterInstance = function() {
			var t = a.indexOf(this);
			-1 != t && a.splice(t, 1)
		}, t.IntersectionObserver = o, t.IntersectionObserverEntry = n
	}
}(window, document);