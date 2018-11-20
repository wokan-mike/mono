/* HTM2Canvas */
(function (a, b, c, d, e, f) {
  function k(a, b, c, d, e) {
    return t(a, a, c, d, b, a.defaultView.pageXOffset, a.defaultView.pageYOffset).then(function (f) {
      R("Document cloned");
      var h = g + e,
        i = "[" + h + "='" + e + "']";
      a.querySelector(i).removeAttribute(h);
      var j = f.contentWindow,
        k = j.document.querySelector(i),
        m = "function" == typeof b.onclone ? Promise.resolve(b.onclone(j.document)) : Promise.resolve(!0);
      return m.then(function () {
        return l(k, f, b, c, d)
      })
    })
  }

  function l(a, c, d, e, f) {
    var g = c.contentWindow,
      h = new Ya(g.document),
      i = new P(d, h),
      j = Z(a),
      k = "view" === d.type ? e : o(g.document),
      l = "view" === d.type ? f : p(g.document),
      q = new d.renderer(k, l, i, d, b),
      r = new _(a, q, h, i, d);
    return r.ready.then(function () {
      R("Finished rendering");
      var b;
      return b = "view" === d.type ? n(q.canvas, {
        width: q.canvas.width,
        height: q.canvas.height,
        top: 0,
        left: 0,
        x: 0,
        y: 0
      }) : a === g.document.body || a === g.document.documentElement || null != d.canvas ? q.canvas : n(q.canvas, {
        width: null != d.width ? d.width : j.width,
        height: null != d.height ? d.height : j.height,
        top: j.top,
        left: j.left,
        x: g.pageXOffset,
        y: g.pageYOffset
      }), m(c, d), b
    })
  }

  function m(a, b) {
    b.removeContainer && (a.parentNode.removeChild(a), R("Cleaned up container"))
  }

  function n(a, c) {
    var d = b.createElement("canvas"),
      e = Math.min(a.width - 1, Math.max(0, c.left)),
      f = Math.min(a.width, Math.max(1, c.left + c.width)),
      g = Math.min(a.height - 1, Math.max(0, c.top)),
      h = Math.min(a.height, Math.max(1, c.top + c.height));
    return d.width = c.width, d.height = c.height, R("Cropping canvas at:", "left:", c.left, "top:", c.top, "width:", f - e, "height:", h - g), R("Resulting crop with width", c.width, "and height", c.height, " with x", e, "and y", g), d.getContext("2d").drawImage(a, e, g, f - e, h - g, c.x, c.y, f - e, h - g), d
  }

  function o(a) {
    return Math.max(Math.max(a.body.scrollWidth, a.documentElement.scrollWidth), Math.max(a.body.offsetWidth, a.documentElement.offsetWidth), Math.max(a.body.clientWidth, a.documentElement.clientWidth))
  }

  function p(a) {
    return Math.max(Math.max(a.body.scrollHeight, a.documentElement.scrollHeight), Math.max(a.body.offsetHeight, a.documentElement.offsetHeight), Math.max(a.body.clientHeight, a.documentElement.clientHeight))
  }

  function q() {
    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  }

  function r() {
    return b.documentMode && b.documentMode <= 9
  }

  function s(a, c) {
    for (var d = 3 === a.nodeType ? b.createTextNode(a.nodeValue) : a.cloneNode(!1), e = a.firstChild; e;) c !== !0 && 1 === e.nodeType && "SCRIPT" === e.nodeName || d.appendChild(s(e, c)), e = e.nextSibling;
    return d
  }

  function t(a, b, c, d, e, f, g) {
    y(a);
    var h = r() ? s(a.documentElement, e.javascriptEnabled) : a.documentElement.cloneNode(!0),
      i = b.createElement("iframe");
    return i.className = "html2canvas-container", i.style.visibility = "hidden", i.style.position = "fixed", i.style.left = "-10000px", i.style.top = "0px", i.style.border = "0", i.width = c, i.height = d, i.scrolling = "no", b.body.appendChild(i), new Promise(function (b) {
      var c = i.contentWindow.document;
      u(a.documentElement, h, "textarea"), u(a.documentElement, h, "select"), i.contentWindow.onload = i.onload = function () {
        var d = setInterval(function () {
          c.body.childNodes.length > 0 && (z(a, c), clearInterval(d), "view" === e.type && i.contentWindow.scrollTo(f, g), b(i))
        }, 50)
      }, c.open(), c.write("<!DOCTYPE html><html></html>"), v(a, f, g), c.replaceChild(e.javascriptEnabled === !0 ? c.adoptNode(h) : A(c.adoptNode(h)), c.documentElement), c.close()
    })
  }

  function u(a, b, c) {
    for (var d = a.getElementsByTagName(c), e = b.getElementsByTagName(c), f = d.length, g = 0; g < f; g++) e[g].value = d[g].value
  }

  function v(a, b, c) {
    !a.defaultView || b === a.defaultView.pageXOffset && c === a.defaultView.pageYOffset || a.defaultView.scrollTo(b, c)
  }

  function w(b, c, d, e, f, g) {
    return new Ma(b, c, a.document).then(x(b)).then(function (a) {
      return t(a, d, e, f, g, 0, 0)
    })
  }

  function x(a) {
    return function (c) {
      var e, d = new DOMParser;
      try {
        e = d.parseFromString(c, "text/html")
      } catch (a) {
        R("DOMParser not supported, falling back to createHTMLDocument"), e = b.implementation.createHTMLDocument("");
        try {
          e.open(), e.write(c), e.close()
        } catch (a) {
          R("createHTMLDocument write not supported, falling back to document.body.innerHTML"), e.body.innerHTML = c
        }
      }
      var f = e.querySelector("base");
      if (!f || !f.href.host) {
        var g = e.createElement("base");
        g.href = a, e.head.insertBefore(g, e.head.firstChild)
      }
      return e
    }
  }

  function y(a) {
    [].slice.call(a.querySelectorAll("canvas"), 0).forEach(function (a) {
      a.setAttribute(h, "canvas-" + i++)
    })
  }

  function z(a, b) {
    [].slice.call(a.querySelectorAll("[" + h + "]"), 0).forEach(function (a) {
      try {
        var c = b.querySelector("[" + h + '="' + a.getAttribute(h) + '"]');
        c && (c.width = a.width, c.height = a.height, c.getContext("2d").putImageData(a.getContext("2d").getImageData(0, 0, a.width, a.height), 0, 0))
      } catch (b) {
        R("Unable to copy canvas content from", a, b)
      }
      a.removeAttribute(h)
    })
  }

  function A(a) {
    return [].slice.call(a.childNodes, 0).filter(B).forEach(function (b) {
      "SCRIPT" === b.tagName ? a.removeChild(b) : A(b)
    }), a
  }

  function B(a) {
    return a.nodeType === Node.ELEMENT_NODE
  }

  function C(a) {
    var c = b.createElement("a");
    return c.href = a, c.href = c.href, c
  }

  function D(a) {
    this.r = 0, this.g = 0, this.b = 0, this.a = null;
    this.fromArray(a) || this.namedColor(a) || this.rgb(a) || this.rgba(a) || this.hex6(a) || this.hex3(a)
  }

  function J(a) {
    if (this.src = a, R("DummyImageContainer for", a), !this.promise || !this.image) {
      R("Initiating DummyImageContainer"), J.prototype.image = new Image;
      var b = this.image;
      J.prototype.promise = new Promise(function (a, c) {
        b.onload = a, b.onerror = c, b.src = q(), b.complete === !0 && a(b)
      })
    }
  }

  function K(a, c) {
    var h, i, d = b.createElement("div"),
      e = b.createElement("img"),
      f = b.createElement("span"),
      g = "Hidden Text";
    d.style.visibility = "hidden", d.style.fontFamily = a, d.style.fontSize = c, d.style.margin = 0, d.style.padding = 0, b.body.appendChild(d), e.src = q(), e.width = 1, e.height = 1, e.style.margin = 0, e.style.padding = 0, e.style.verticalAlign = "baseline", f.style.fontFamily = a, f.style.fontSize = c, f.style.margin = 0, f.style.padding = 0, f.appendChild(b.createTextNode(g)), d.appendChild(f), d.appendChild(e), h = e.offsetTop - f.offsetTop + 1, d.removeChild(f), d.appendChild(b.createTextNode(g)), d.style.lineHeight = "normal", e.style.verticalAlign = "super", i = e.offsetTop - d.offsetTop + 1, b.body.removeChild(d), this.baseline = h, this.lineWidth = 1, this.middle = i
  }

  function L() {
    this.data = {}
  }

  function M(a, b, c) {
    this.image = null, this.src = a;
    var d = this,
      e = Z(a);
    this.promise = (b ? new Promise(function (b) {
      "about:blank" === a.contentWindow.document.URL || null == a.contentWindow.document.documentElement ? a.contentWindow.onload = a.onload = function () {
        b(a)
      } : b(a)
    }) : this.proxyLoad(c.proxy, e, c)).then(function (a) {
      return html2canvas(a.contentWindow.document.documentElement, {
        type: "view",
        width: a.width,
        height: a.height,
        proxy: c.proxy,
        javascriptEnabled: c.javascriptEnabled,
        removeContainer: c.removeContainer,
        allowTaint: c.allowTaint,
        imageTimeout: c.imageTimeout / 2
      })
    }).then(function (a) {
      return d.image = a
    })
  }

  function N(a) {
    this.src = a.value, this.colorStops = [], this.type = null, this.x0 = .5, this.y0 = .5, this.x1 = .5, this.y1 = .5, this.promise = Promise.resolve(!0)
  }

  function O(a, b) {
    this.src = a, this.image = new Image;
    var c = this;
    this.tainted = null, this.promise = new Promise(function (d, e) {
      c.image.onload = d, c.image.onerror = e, b && (c.image.crossOrigin = "anonymous"), c.image.src = a, c.image.complete === !0 && d(c.image)
    })
  }

  function P(b, c) {
    this.link = null, this.options = b, this.support = c, this.origin = this.getOrigin(a.location.href)
  }

  function Q(a) {
    N.apply(this, arguments), this.type = this.TYPES.LINEAR;
    var b = null === a.args[0].match(this.stepRegExp);
    b ? a.args[0].split(" ").reverse().forEach(function (a) {
      switch (a) {
        case "left":
          this.x0 = 0, this.x1 = 1;
          break;
        case "top":
          this.y0 = 0, this.y1 = 1;
          break;
        case "right":
          this.x0 = 1, this.x1 = 0;
          break;
        case "bottom":
          this.y0 = 1, this.y1 = 0;
          break;
        case "to":
          var b = this.y0,
            c = this.x0;
          this.y0 = this.y1, this.x0 = this.x1, this.x1 = c, this.y1 = b
      }
    }, this) : (this.y0 = 0, this.y1 = 1), this.colorStops = a.args.slice(b ? 1 : 0).map(function (a) {
      var b = a.match(this.stepRegExp);
      return {
        color: new D(b[1]),
        stop: "%" === b[3] ? b[2] / 100 : null
      }
    }, this), null === this.colorStops[0].stop && (this.colorStops[0].stop = 0), null === this.colorStops[this.colorStops.length - 1].stop && (this.colorStops[this.colorStops.length - 1].stop = 1), this.colorStops.forEach(function (a, b) {
      null === a.stop && this.colorStops.slice(b).some(function (c, d) {
        return null !== c.stop && (a.stop = (c.stop - this.colorStops[b - 1].stop) / (d + 1) + this.colorStops[b - 1].stop, !0)
      }, this)
    }, this)
  }

  function R() {
    a.html2canvas.logging && a.console && a.console.log && Function.prototype.bind.call(a.console.log, a.console).apply(a.console, [Date.now() - a.html2canvas.start + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)))
  }

  function S(a, b) {
    this.node = a, this.parent = b, this.stack = null, this.bounds = null, this.borders = null, this.clip = [], this.backgroundClip = [], this.offsetBounds = null, this.visible = null, this.computedStyles = null, this.colors = {}, this.styles = {}, this.backgroundImages = null, this.transformData = null, this.transformMatrix = null, this.isPseudoElement = !1, this.opacity = null
  }

  function T(a) {
    var b = a.options[a.selectedIndex || 0];
    return b ? b.text || "" : ""
  }

  function U(a) {
    if (a && "matrix" === a[1]) return a[2].split(",").map(function (a) {
      return parseFloat(a.trim())
    })
  }

  function V(a) {
    return a.toString().indexOf("%") !== -1
  }

  function W(a) {
    var c, d, e, f, g, k, l, b = " \r\n\t",
      h = [],
      i = 0,
      j = 0,
      m = function () {
        c && ('"' === d.substr(0, 1) && (d = d.substr(1, d.length - 2)), d && l.push(d), "-" === c.substr(0, 1) && (f = c.indexOf("-", 1) + 1) > 0 && (e = c.substr(0, f), c = c.substr(f)), h.push({
          prefix: e,
          method: c.toLowerCase(),
          value: g,
          args: l,
          image: null
        })), l = [], c = e = d = g = ""
      };
    return l = [], c = e = d = g = "", a.split("").forEach(function (a) {
      if (!(0 === i && b.indexOf(a) > -1)) {
        switch (a) {
          case '"':
            k ? k === a && (k = null) : k = a;
            break;
          case "(":
            if (k) break;
            if (0 === i) return i = 1, void(g += a);
            j++;
            break;
          case ")":
            if (k) break;
            if (1 === i) {
              if (0 === j) return i = 0, g += a, void m();
              j--
            }
            break;
          case ",":
            if (k) break;
            if (0 === i) return void m();
            if (1 === i && 0 === j && !c.match(/^url$/i)) return l.push(d), d = "", void(g += a)
        }
        g += a, 0 === i ? c += a : d += a
      }
    }), m(), h
  }

  function X(a) {
    return a.replace("px", "")
  }

  function Y(a) {
    return parseFloat(a)
  }

  function Z(a) {
    if (a.getBoundingClientRect) {
      var b = a.getBoundingClientRect(),
        c = null == a.offsetWidth ? b.width : a.offsetWidth;
      return {
        top: b.top,
        bottom: b.bottom || b.top + b.height,
        right: b.left + c,
        left: b.left,
        width: c,
        height: null == a.offsetHeight ? b.height : a.offsetHeight
      }
    }
    return {}
  }

  function $(a) {
    var b = a.offsetParent ? $(a.offsetParent) : {
      top: 0,
      left: 0
    };
    return {
      top: a.offsetTop + b.top,
      bottom: a.offsetTop + a.offsetHeight + b.top,
      right: a.offsetLeft + b.left + a.offsetWidth,
      left: a.offsetLeft + b.left,
      width: a.offsetWidth,
      height: a.offsetHeight
    }
  }

  function _(a, b, c, d, e) {
    R("Starting NodeParser"), this.renderer = b, this.options = e, this.range = null, this.support = c, this.renderQueue = [], this.stack = new Xa(!0, 1, a.ownerDocument, null);
    var f = new S(a, null);
    if (e.background && b.rectangle(0, 0, b.width, b.height, new D(e.background)), a === a.ownerDocument.documentElement) {
      var g = new S(f.color("backgroundColor").isTransparent() ? a.ownerDocument.body : a.ownerDocument.documentElement, null);
      b.rectangle(0, 0, b.width, b.height, g.color("backgroundColor"))
    }
    f.visibile = f.isElementVisible(), this.createPseudoHideStyles(a.ownerDocument), this.disableAnimations(a.ownerDocument), this.nodes = Ha([f].concat(this.getChildren(f)).filter(function (a) {
      return a.visible = a.isElementVisible()
    }).map(this.getPseudoElements, this)), this.fontMetrics = new L, R("Fetched nodes, total:", this.nodes.length), R("Calculate overflow clips"), this.calculateOverflowClips(), R("Start fetching images"), this.images = d.fetch(this.nodes.filter(ya)), this.ready = this.images.ready.then(Da(function () {
      return R("Images loaded, starting parsing"), R("Creating stacking contexts"), this.createStackingContexts(), R("Sorting stacking contexts"), this.sortStackingContexts(this.stack), this.parse(this.stack), R("Render queue created with " + this.renderQueue.length + " items"), new Promise(Da(function (a) {
        e.async ? "function" == typeof e.async ? e.async.call(this, this.renderQueue, a) : this.renderQueue.length > 0 ? (this.renderIndex = 0, this.asyncRenderer(this.renderQueue, a)) : a() : (this.renderQueue.forEach(this.paint, this), a())
      }, this))
    }, this))
  }

  function aa(a) {
    return a.parent && a.parent.clip.length
  }

  function ba(a) {
    return a.replace(/(\-[a-z])/g, function (a) {
      return a.toUpperCase().replace("-", "")
    })
  }

  function ca() {}

  function ea(a, b, c, d) {
    return a.map(function (e, f) {
      if (e.width > 0) {
        var g = b.left,
          h = b.top,
          i = b.width,
          j = b.height - a[2].width;
        switch (f) {
          case 0:
            j = a[0].width, e.args = ia({
              c1: [g, h],
              c2: [g + i, h],
              c3: [g + i - a[1].width, h + j],
              c4: [g + a[3].width, h + j]
            }, d[0], d[1], c.topLeftOuter, c.topLeftInner, c.topRightOuter, c.topRightInner);
            break;
          case 1:
            g = b.left + b.width - a[1].width, i = a[1].width, e.args = ia({
              c1: [g + i, h],
              c2: [g + i, h + j + a[2].width],
              c3: [g, h + j],
              c4: [g, h + a[0].width]
            }, d[1], d[2], c.topRightOuter, c.topRightInner, c.bottomRightOuter, c.bottomRightInner);
            break;
          case 2:
            h = h + b.height - a[2].width, j = a[2].width, e.args = ia({
              c1: [g + i, h + j],
              c2: [g, h + j],
              c3: [g + a[3].width, h],
              c4: [g + i - a[3].width, h]
            }, d[2], d[3], c.bottomRightOuter, c.bottomRightInner, c.bottomLeftOuter, c.bottomLeftInner);
            break;
          case 3:
            i = a[3].width, e.args = ia({
              c1: [g, h + j + a[2].width],
              c2: [g, h],
              c3: [g + i, h + a[0].width],
              c4: [g + i, h + j]
            }, d[3], d[0], c.bottomLeftOuter, c.bottomLeftInner, c.topLeftOuter, c.topLeftInner)
        }
      }
      return e
    })
  }

  function fa(a, b, c, d) {
    var e = 4 * ((Math.sqrt(2) - 1) / 3),
      f = c * e,
      g = d * e,
      h = a + c,
      i = b + d;
    return {
      topLeft: ha({
        x: a,
        y: i
      }, {
        x: a,
        y: i - g
      }, {
        x: h - f,
        y: b
      }, {
        x: h,
        y: b
      }),
      topRight: ha({
        x: a,
        y: b
      }, {
        x: a + f,
        y: b
      }, {
        x: h,
        y: i - g
      }, {
        x: h,
        y: i
      }),
      bottomRight: ha({
        x: h,
        y: b
      }, {
        x: h,
        y: b + g
      }, {
        x: a + f,
        y: i
      }, {
        x: a,
        y: i
      }),
      bottomLeft: ha({
        x: h,
        y: i
      }, {
        x: h - f,
        y: i
      }, {
        x: a,
        y: b + g
      }, {
        x: a,
        y: b
      })
    }
  }

  function ga(a, b, c) {
    var d = a.left,
      e = a.top,
      f = a.width,
      g = a.height,
      h = b[0][0],
      i = b[0][1],
      j = b[1][0],
      k = b[1][1],
      l = b[2][0],
      m = b[2][1],
      n = b[3][0],
      o = b[3][1],
      p = f - j,
      q = g - m,
      r = f - l,
      s = g - o;
    return {
      topLeftOuter: fa(d, e, h, i).topLeft.subdivide(.5),
      topLeftInner: fa(d + c[3].width, e + c[0].width, Math.max(0, h - c[3].width), Math.max(0, i - c[0].width)).topLeft.subdivide(.5),
      topRightOuter: fa(d + p, e, j, k).topRight.subdivide(.5),
      topRightInner: fa(d + Math.min(p, f + c[3].width), e + c[0].width, p > f + c[3].width ? 0 : j - c[3].width, k - c[0].width).topRight.subdivide(.5),
      bottomRightOuter: fa(d + r, e + q, l, m).bottomRight.subdivide(.5),
      bottomRightInner: fa(d + Math.min(r, f - c[3].width), e + Math.min(q, g + c[0].width), Math.max(0, l - c[1].width), m - c[2].width).bottomRight.subdivide(.5),
      bottomLeftOuter: fa(d, e + s, n, o).bottomLeft.subdivide(.5),
      bottomLeftInner: fa(d + c[3].width, e + s, Math.max(0, n - c[3].width), o - c[2].width).bottomLeft.subdivide(.5)
    }
  }

  function ha(a, b, c, d) {
    var e = function (a, b, c) {
      return {
        x: a.x + (b.x - a.x) * c,
        y: a.y + (b.y - a.y) * c
      }
    };
    return {
      start: a,
      startControl: b,
      endControl: c,
      end: d,
      subdivide: function (f) {
        var g = e(a, b, f),
          h = e(b, c, f),
          i = e(c, d, f),
          j = e(g, h, f),
          k = e(h, i, f),
          l = e(j, k, f);
        return [ha(a, g, j, l), ha(l, k, i, d)]
      },
      curveTo: function (a) {
        a.push(["bezierCurve", b.x, b.y, c.x, c.y, d.x, d.y])
      },
      curveToReversed: function (d) {
        d.push(["bezierCurve", c.x, c.y, b.x, b.y, a.x, a.y])
      }
    }
  }

  function ia(a, b, c, d, e, f, g) {
    var h = [];
    return b[0] > 0 || b[1] > 0 ? (h.push(["line", d[1].start.x, d[1].start.y]), d[1].curveTo(h)) : h.push(["line", a.c1[0], a.c1[1]]), c[0] > 0 || c[1] > 0 ? (h.push(["line", f[0].start.x, f[0].start.y]), f[0].curveTo(h), h.push(["line", g[0].end.x, g[0].end.y]), g[0].curveToReversed(h)) : (h.push(["line", a.c2[0], a.c2[1]]), h.push(["line", a.c3[0], a.c3[1]])), b[0] > 0 || b[1] > 0 ? (h.push(["line", e[1].end.x, e[1].end.y]), e[1].curveToReversed(h)) : h.push(["line", a.c4[0], a.c4[1]]), h
  }

  function ja(a, b, c, d, e, f, g) {
    b[0] > 0 || b[1] > 0 ? (a.push(["line", d[0].start.x, d[0].start.y]), d[0].curveTo(a), d[1].curveTo(a)) : a.push(["line", f, g]), (c[0] > 0 || c[1] > 0) && a.push(["line", e[0].start.x, e[0].start.y])
  }

  function ka(a) {
    return a.cssInt("zIndex") < 0
  }

  function la(a) {
    return a.cssInt("zIndex") > 0
  }

  function ma(a) {
    return 0 === a.cssInt("zIndex")
  }

  function na(a) {
    return ["inline", "inline-block", "inline-table"].indexOf(a.css("display")) !== -1
  }

  function oa(a) {
    return a instanceof Xa
  }

  function pa(a) {
    return a.node.data.trim().length > 0
  }

  function qa(a) {
    return /^(normal|none|0px)$/.test(a.parent.css("letterSpacing"))
  }

  function ra(a) {
    return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function (b) {
      var c = a.css("border" + b + "Radius"),
        d = c.split(" ");
      return d.length <= 1 && (d[1] = d[0]), d.map(Ea)
    })
  }

  function sa(a) {
    return a.nodeType === Node.TEXT_NODE || a.nodeType === Node.ELEMENT_NODE
  }

  function ta(a) {
    var b = a.css("position"),
      c = ["absolute", "relative", "fixed"].indexOf(b) !== -1 ? a.css("zIndex") : "auto";
    return "auto" !== c
  }

  function ua(a) {
    return "static" !== a.css("position")
  }

  function va(a) {
    return "none" !== a.css("float")
  }

  function wa(a) {
    return ["inline-block", "inline-table"].indexOf(a.css("display")) !== -1
  }

  function xa(a) {
    var b = this;
    return function () {
      return !a.apply(b, arguments)
    }
  }

  function ya(a) {
    return a.node.nodeType === Node.ELEMENT_NODE
  }

  function za(a) {
    return a.isPseudoElement === !0
  }

  function Aa(a) {
    return a.node.nodeType === Node.TEXT_NODE
  }

  function Ba(a) {
    return function (b, c) {
      return b.cssInt("zIndex") + a.indexOf(b) / a.length - (c.cssInt("zIndex") + a.indexOf(c) / a.length)
    }
  }

  function Ca(a) {
    return a.getOpacity() < 1
  }

  function Da(a, b) {
    return function () {
      return a.apply(b, arguments)
    }
  }

  function Ea(a) {
    return parseInt(a, 10)
  }

  function Fa(a) {
    return a.width
  }

  function Ga(a) {
    return a.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(a.node.nodeName) === -1
  }

  function Ha(a) {
    return [].concat.apply([], a)
  }

  function Ia(a) {
    var b = a.substr(0, 1);
    return b === a.substr(a.length - 1) && b.match(/'|"/) ? a.substr(1, a.length - 2) : a
  }

  function Ja(b) {
    for (var f, c = [], d = 0, e = !1; b.length;) Ka(b[d]) === e ? (f = b.splice(0, d), f.length && c.push(a.html2canvas.punycode.ucs2.encode(f)), e = !e, d = 0) : d++, d >= b.length && (f = b.splice(0, d), f.length && c.push(a.html2canvas.punycode.ucs2.encode(f)));
    return c
  }

  function Ka(a) {
    return [32, 13, 10, 9, 45].indexOf(a) !== -1
  }

  function La(a) {
    return /[^\u0000-\u00ff]/.test(a)
  }

  function Ma(a, b, c) {
    if (!b) return Promise.reject("No proxy configured");
    var d = Sa(Oa),
      e = Ta(b, a, d);
    return Oa ? db(e) : Ra(c, e, d).then(function (a) {
      return $a(a.content)
    })
  }

  function Qa(a, b, c) {
    var d = Sa(Pa),
      e = Ta(b, a, d);
    return Pa ? Promise.resolve(e) : Ra(c, e, d).then(function (a) {
      return "data:" + a.type + ";base64," + a.content
    })
  }

  function Ra(b, c, d) {
    return new Promise(function (e, f) {
      var g = b.createElement("script"),
        h = function () {
          delete a.html2canvas.proxy[d], b.body.removeChild(g)
        };
      a.html2canvas.proxy[d] = function (a) {
        h(), e(a)
      }, g.src = c, g.onerror = function (a) {
        h(), f(a)
      }, b.body.appendChild(g)
    })
  }

  function Sa(a) {
    return a ? "" : "html2canvas_" + Date.now() + "_" + ++Na + "_" + Math.round(1e5 * Math.random())
  }

  function Ta(a, b, c) {
    return a + "?url=" + encodeURIComponent(b) + (c.length ? "&callback=html2canvas.proxy." + c : "")
  }

  function Ua(a, c) {
    var e = (b.createElement("script"), b.createElement("a"));
    e.href = a, a = e.href, this.src = a, this.image = new Image;
    var f = this;
    this.promise = new Promise(function (d, e) {
      f.image.crossOrigin = "Anonymous", f.image.onload = d, f.image.onerror = e, new Qa(a, c, b).then(function (a) {
        f.image.src = a
      }).catch(e)
    })
  }

  function Va(a, b, c) {
    S.call(this, a, b), this.isPseudoElement = !0, this.before = ":before" === c
  }

  function Wa(a, b, c, d, e) {
    this.width = a, this.height = b, this.images = c, this.options = d, this.document = e
  }

  function Xa(a, b, c, d) {
    S.call(this, c, d), this.ownStacking = a, this.contexts = [], this.children = [], this.opacity = (this.parent ? this.parent.stack.opacity : 1) * b
  }

  function Ya(a) {
    this.rangeBounds = this.testRangeBounds(a), this.cors = this.testCORS(), this.svg = this.testSVG()
  }

  function Za(a) {
    this.src = a, this.image = null;
    var b = this;
    this.promise = this.hasFabric().then(function () {
      return b.isInline(a) ? Promise.resolve(b.inlineFormatting(a)) : db(a)
    }).then(function (a) {
      return new Promise(function (c) {
        html2canvas.fabric.loadSVGFromString(a, b.createCanvas.call(b, c))
      })
    })
  }

  function $a(a) {
    var d, e, f, g, h, i, j, k, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      c = a.length,
      l = "";
    for (d = 0; d < c; d += 4) e = b.indexOf(a[d]), f = b.indexOf(a[d + 1]), g = b.indexOf(a[d + 2]), h = b.indexOf(a[d + 3]), i = e << 2 | f >> 4, j = (15 & f) << 4 | g >> 2, k = (3 & g) << 6 | h, l += 64 === g ? String.fromCharCode(i) : 64 === h || h === -1 ? String.fromCharCode(i, j) : String.fromCharCode(i, j, k);
    return l
  }

  function _a(a, b) {
    this.src = a, this.image = null;
    var c = this;
    this.promise = b ? new Promise(function (b, d) {
      c.image = new Image, c.image.onload = b, c.image.onerror = d, c.image.src = "data:image/svg+xml," + (new XMLSerializer).serializeToString(a), c.image.complete === !0 && b(c.image)
    }) : this.hasFabric().then(function () {
      return new Promise(function (b) {
        html2canvas.fabric.parseSVGDocument(a, c.createCanvas.call(c, b))
      })
    })
  }

  function ab(a, b) {
    S.call(this, a, b)
  }

  function bb(a, b, c) {
    if (a.length > 0) return b + c.toUpperCase()
  }

  function cb(a) {
    N.apply(this, arguments), this.type = "linear" === a.args[0] ? this.TYPES.LINEAR : this.TYPES.RADIAL
  }

  function db(a) {
    return new Promise(function (b, c) {
      var d = new XMLHttpRequest;
      d.open("GET", a), d.onload = function () {
        200 === d.status ? b(d.responseText) : c(new Error(d.statusText))
      }, d.onerror = function () {
        c(new Error("Network Error"))
      }, d.send()
    })
  }

  function eb(a, b) {
    Wa.apply(this, arguments), this.canvas = this.options.canvas || this.document.createElement("canvas"), this.options.canvas || (this.canvas.width = a, this.canvas.height = b), this.ctx = this.canvas.getContext("2d"), this.taintCtx = this.document.createElement("canvas").getContext("2d"), this.ctx.textBaseline = "bottom", this.variables = {}, R("Initialized CanvasRenderer with size", a, "x", b)
  }

  function fb(a) {
    return a.length > 0
  }
  if (function () {
      function c(a, b) {
        E[B] = a, E[B + 1] = b, B += 2, 2 === B && F()
      }

      function f(a) {
        return "function" == typeof a
      }

      function g() {
        return function () {
          process.nextTick(k)
        }
      }

      function h() {
        var a = 0,
          c = new D(k),
          d = b.createTextNode("");
        return c.observe(d, {
            characterData: !0
          }),
          function () {
            d.data = a = ++a % 2
          }
      }

      function i() {
        var a = new MessageChannel;
        return a.port1.onmessage = k,
          function () {
            a.port2.postMessage(0)
          }
      }

      function j() {
        return function () {
          setTimeout(k, 1)
        }
      }

      function k() {
        for (var a = 0; a < B; a += 2)(0, E[a])(E[a + 1]), E[a] = void 0, E[a + 1] = void 0;
        B = 0
      }

      function l() {}

      function m(a, b, c, d) {
        try {
          a.call(b, c, d)
        } catch (a) {
          return a
        }
      }

      function n(a, b, d) {
        c(function (a) {
          var c = !1,
            e = m(d, b, function (d) {
              c || (c = !0, b !== d ? p(a, d) : r(a, d))
            }, function (b) {
              c || (c = !0, s(a, b))
            });
          !c && e && (c = !0, s(a, e))
        }, a)
      }

      function o(a, b) {
        1 === b.a ? r(a, b.b) : 2 === a.a ? s(a, b.b) : t(b, void 0, function (b) {
          p(a, b)
        }, function (b) {
          s(a, b)
        })
      }

      function p(a, b) {
        if (a === b) s(a, new TypeError("You cannot resolve a promise with itself"));
        else if ("function" == typeof b || "object" == typeof b && null !== b)
          if (b.constructor === a.constructor) o(a, b);
          else {
            var c;
            try {
              c = b.then
            } catch (a) {
              G.error = a, c = G
            }
            c === G ? s(a, G.error) : void 0 === c ? r(a, b) : f(c) ? n(a, b, c) : r(a, b)
          }
        else r(a, b)
      }

      function q(a) {
        a.f && a.f(a.b), u(a)
      }

      function r(a, b) {
        void 0 === a.a && (a.b = b, a.a = 1, 0 !== a.e.length && c(u, a))
      }

      function s(a, b) {
        void 0 === a.a && (a.a = 2, a.b = b, c(q, a))
      }

      function t(a, b, d, e) {
        var f = a.e,
          g = f.length;
        a.f = null, f[g] = b, f[g + 1] = d, f[g + 2] = e, 0 === g && a.a && c(u, a)
      }

      function u(a) {
        var b = a.e,
          c = a.a;
        if (0 !== b.length) {
          for (var d, e, f = a.b, g = 0; g < b.length; g += 3) d = b[g], e = b[g + c], d ? w(c, d, e, f) : e(f);
          a.e.length = 0
        }
      }

      function v() {
        this.error = null
      }

      function w(a, b, c, d) {
        var g, h, i, j, e = f(c);
        if (e) {
          try {
            g = c(d)
          } catch (a) {
            H.error = a, g = H
          }
          if (g === H ? (j = !0, h = g.error, g = null) : i = !0, b === g) return void s(b, new TypeError("A promises callback cannot return that same promise."))
        } else g = d, i = !0;
        void 0 === b.a && (e && i ? p(b, g) : j ? s(b, h) : 1 === a ? r(b, g) : 2 === a && s(b, g))
      }

      function x(a, b) {
        try {
          b(function (b) {
            p(a, b)
          }, function (b) {
            s(a, b)
          })
        } catch (b) {
          s(a, b)
        }
      }

      function y(a, b, c, d) {
        this.n = a, this.c = new a(l, d), this.i = c, this.o(b) ? (this.m = b, this.d = this.length = b.length, this.l(), 0 === this.length ? r(this.c, this.b) : (this.length = this.length || 0, this.k(), 0 === this.d && r(this.c, this.b))) : s(this.c, this.p())
      }

      function z(a) {
        if (I++, this.b = this.a = void 0, this.e = [], l !== a) {
          if (!f(a)) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
          if (!(this instanceof z)) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
          x(this, a)
        }
      }
      var F, A = Array.isArray ? Array.isArray : function (a) {
          return "[object Array]" === Object.prototype.toString.call(a)
        },
        B = 0,
        C = "undefined" != typeof a ? a : {},
        D = C.MutationObserver || C.WebKitMutationObserver,
        C = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
        E = Array(1e3);
      F = "undefined" != typeof process && "[object process]" === {}.toString.call(process) ? g() : D ? h() : C ? i() : j();
      var G = new v,
        H = new v;
      y.prototype.o = function (a) {
        return A(a)
      }, y.prototype.p = function () {
        return Error("Array Methods must be provided an Array")
      }, y.prototype.l = function () {
        this.b = Array(this.length)
      }, y.prototype.k = function () {
        for (var a = this.length, b = this.c, c = this.m, d = 0; void 0 === b.a && d < a; d++) this.j(c[d], d)
      }, y.prototype.j = function (a, b) {
        var c = this.n;
        "object" == typeof a && null !== a ? a.constructor === c && void 0 !== a.a ? (a.f = null, this.g(a.a, b, a.b)) : this.q(c.resolve(a), b) : (this.d--, this.b[b] = this.h(a))
      }, y.prototype.g = function (a, b, c) {
        var d = this.c;
        void 0 === d.a && (this.d--, this.i && 2 === a ? s(d, c) : this.b[b] = this.h(c)), 0 === this.d && r(d, this.b)
      }, y.prototype.h = function (a) {
        return a
      }, y.prototype.q = function (a, b) {
        var c = this;
        t(a, void 0, function (a) {
          c.g(1, b, a)
        }, function (a) {
          c.g(2, b, a)
        })
      };
      var I = 0;
      z.all = function (a, b) {
        return new y(this, a, !0, b).c
      }, z.race = function (a, b) {
        function c(a) {
          p(e, a)
        }

        function d(a) {
          s(e, a)
        }
        var e = new this(l, b);
        if (!A(a)) return s(e, new TypeError("You must pass an array to race.")), e;
        for (var f = a.length, g = 0; void 0 === e.a && g < f; g++) t(this.resolve(a[g]), void 0, c, d);
        return e
      }, z.resolve = function (a, b) {
        if (a && "object" == typeof a && a.constructor === this) return a;
        var c = new this(l, b);
        return p(c, a), c
      }, z.reject = function (a, b) {
        var c = new this(l, b);
        return s(c, a), c
      }, z.prototype = {
        constructor: z,
        then: function (a, b) {
          var d = this.a;
          if (1 === d && !a || 2 === d && !b) return this;
          var e = new this.constructor(l),
            f = this.b;
          if (d) {
            var g = arguments[d - 1];
            c(function () {
              w(d, e, g, f)
            })
          } else t(this, e, a, b);
          return e
        },
        catch: function (a) {
          return this.then(null, a)
        }
      };
      var J = {
        Promise: z,
        polyfill: function () {
          var b;
          b = "undefined" != typeof d ? d : "undefined" != typeof a && a.document ? a : self, "Promise" in b && "resolve" in b.Promise && "reject" in b.Promise && "all" in b.Promise && "race" in b.Promise && function () {
            var a;
            return new b.Promise(function (b) {
              a = b
            }), f(a)
          }() || (b.Promise = z)
        }
      };
      "function" == typeof e && e.amd ? e(function () {
        return J
      }) : "undefined" != typeof module && module.exports ? module.exports = J : "undefined" != typeof this && (this.ES6Promise = J)
    }.call(a), a && a.ES6Promise.polyfill(), "undefined" == typeof b || "function" != typeof Object.create || "function" != typeof b.createElement("canvas").getContext) return void((a || module.exports).html2canvas = function () {
    return Promise.reject("No canvas support")
  });
  ! function (a) {
    function z(a) {
      throw RangeError(u[a])
    }

    function A(a, b) {
      for (var c = a.length, d = []; c--;) d[c] = b(a[c]);
      return d
    }

    function B(a, b) {
      var c = a.split("@"),
        d = "";
      c.length > 1 && (d = c[0] + "@", a = c[1]);
      var e = a.split(t),
        f = A(e, b).join(".");
      return d + f
    }

    function C(a) {
      for (var e, f, b = [], c = 0, d = a.length; c < d;) e = a.charCodeAt(c++), e >= 55296 && e <= 56319 && c < d ? (f = a.charCodeAt(c++), 56320 == (64512 & f) ? b.push(((1023 & e) << 10) + (1023 & f) + 65536) : (b.push(e), c--)) : b.push(e);
      return b
    }

    function D(a) {
      return A(a, function (a) {
        var b = "";
        return a > 65535 && (a -= 65536, b += x(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), b += x(a)
      }).join("")
    }

    function E(a) {
      return a - 48 < 10 ? a - 22 : a - 65 < 26 ? a - 65 : a - 97 < 26 ? a - 97 : j
    }

    function F(a, b) {
      return a + 22 + 75 * (a < 26) - ((0 != b) << 5)
    }

    function G(a, b, c) {
      var d = 0;
      for (a = c ? w(a / n) : a >> 1, a += w(a / b); a > v * l >> 1; d += j) a = w(a / v);
      return w(d + (v + 1) * a / (a + m))
    }

    function H(a) {
      var d, h, m, n, r, s, t, u, v, x, b = [],
        c = a.length,
        e = 0,
        f = p,
        g = o;
      for (h = a.lastIndexOf(q), h < 0 && (h = 0), m = 0; m < h; ++m) a.charCodeAt(m) >= 128 && z("not-basic"), b.push(a.charCodeAt(m));
      for (n = h > 0 ? h + 1 : 0; n < c;) {
        for (r = e, s = 1, t = j; n >= c && z("invalid-input"), u = E(a.charCodeAt(n++)), (u >= j || u > w((i - e) / s)) && z("overflow"), e += u * s, v = t <= g ? k : t >= g + l ? l : t - g, !(u < v); t += j) x = j - v, s > w(i / x) && z("overflow"), s *= x;
        d = b.length + 1, g = G(e - r, d, 0 == r), w(e / d) > i - f && z("overflow"), f += w(e / d), e %= d, b.splice(e++, 0, f)
      }
      return D(b)
    }

    function I(a) {
      var b, c, d, e, f, g, h, m, n, r, s, u, v, y, A, t = [];
      for (a = C(a), u = a.length, b = p, c = 0, f = o, g = 0; g < u; ++g) s = a[g], s < 128 && t.push(x(s));
      for (d = e = t.length, e && t.push(q); d < u;) {
        for (h = i, g = 0; g < u; ++g) s = a[g], s >= b && s < h && (h = s);
        for (v = d + 1, h - b > w((i - c) / v) && z("overflow"), c += (h - b) * v, b = h, g = 0; g < u; ++g)
          if (s = a[g], s < b && ++c > i && z("overflow"), s == b) {
            for (m = c, n = j; r = n <= f ? k : n >= f + l ? l : n - f, !(m < r); n += j) A = m - r, y = j - r, t.push(x(F(r + A % y, 0))), m = w(A / y);
            t.push(x(F(m, 0))), f = G(c, v, d == e), c = 0, ++d
          }++ c, ++b
      }
      return t.join("")
    }

    function J(a) {
      return B(a, function (a) {
        return r.test(a) ? H(a.slice(4).toLowerCase()) : a
      })
    }

    function K(a) {
      return B(a, function (a) {
        return s.test(a) ? "xn--" + I(a) : a
      })
    }
    var b = "object" == typeof c && c && !c.nodeType && c,
      f = "object" == typeof module && module && !module.nodeType && module,
      g = "object" == typeof d && d;
    g.global !== g && g.window !== g && g.self !== g || (a = g);
    var h, y, i = 2147483647,
      j = 36,
      k = 1,
      l = 26,
      m = 38,
      n = 700,
      o = 72,
      p = 128,
      q = "-",
      r = /^xn--/,
      s = /[^\x20-\x7E]/,
      t = /[\x2E\u3002\uFF0E\uFF61]/g,
      u = {
        overflow: "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      },
      v = j - k,
      w = Math.floor,
      x = String.fromCharCode;
    if (h = {
        version: "1.3.1",
        ucs2: {
          decode: C,
          encode: D
        },
        decode: H,
        encode: I,
        toASCII: K,
        toUnicode: J
      }, "function" == typeof e && "object" == typeof e.amd && e.amd) e("punycode", function () {
      return h
    });
    else if (b && f)
      if (module.exports == b) f.exports = h;
      else
        for (y in h) h.hasOwnProperty(y) && (b[y] = h[y]);
    else a.punycode = h
  }(this);
  var g = "data-html2canvas-node",
    h = "data-html2canvas-canvas-clone",
    i = 0,
    j = 0;
  a.html2canvas = function (c, d) {
    var e = j++;
    if (d = d || {}, d.logging && (a.html2canvas.logging = !0, a.html2canvas.start = Date.now()), d.async = "undefined" == typeof d.async || d.async, d.allowTaint = "undefined" != typeof d.allowTaint && d.allowTaint, d.removeContainer = "undefined" == typeof d.removeContainer || d.removeContainer, d.javascriptEnabled = "undefined" != typeof d.javascriptEnabled && d.javascriptEnabled, d.imageTimeout = "undefined" == typeof d.imageTimeout ? 1e4 : d.imageTimeout, d.renderer = "function" == typeof d.renderer ? d.renderer : eb, d.strict = !!d.strict, "string" == typeof c) {
      if ("string" != typeof d.proxy) return Promise.reject("Proxy must be used when rendering url");
      var h = null != d.width ? d.width : a.innerWidth,
        i = null != d.height ? d.height : a.innerHeight;
      return w(C(c), d.proxy, b, h, i, d).then(function (a) {
        return l(a.contentWindow.document.documentElement, a, d, h, i)
      })
    }
    var m = (c === f ? [b.documentElement] : c.length ? c : [c])[0];
    return m.setAttribute(g + e, e), k(m.ownerDocument, d, m.ownerDocument.defaultView.innerWidth, m.ownerDocument.defaultView.innerHeight, e).then(function (a) {
      return "function" == typeof d.onrendered && (R("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"), d.onrendered(a)), a
    })
  }, a.html2canvas.punycode = this.punycode, a.html2canvas.proxy = {}, D.prototype.darken = function (a) {
    var b = 1 - a;
    return new D([Math.round(this.r * b), Math.round(this.g * b), Math.round(this.b * b), this.a])
  }, D.prototype.isTransparent = function () {
    return 0 === this.a
  }, D.prototype.isBlack = function () {
    return 0 === this.r && 0 === this.g && 0 === this.b
  }, D.prototype.fromArray = function (a) {
    return Array.isArray(a) && (this.r = Math.min(a[0], 255), this.g = Math.min(a[1], 255), this.b = Math.min(a[2], 255), a.length > 3 && (this.a = a[3])), Array.isArray(a)
  };
  var E = /^#([a-f0-9]{3})$/i;
  D.prototype.hex3 = function (a) {
    var b = null;
    return null !== (b = a.match(E)) && (this.r = parseInt(b[1][0] + b[1][0], 16), this.g = parseInt(b[1][1] + b[1][1], 16), this.b = parseInt(b[1][2] + b[1][2], 16)), null !== b
  };
  var F = /^#([a-f0-9]{6})$/i;
  D.prototype.hex6 = function (a) {
    var b = null;
    return null !== (b = a.match(F)) && (this.r = parseInt(b[1].substring(0, 2), 16), this.g = parseInt(b[1].substring(2, 4), 16), this.b = parseInt(b[1].substring(4, 6), 16)), null !== b
  };
  var G = /^rgb\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})\)$/;
  D.prototype.rgb = function (a) {
    var b = null;
    return null !== (b = a.match(G)) && (this.r = Number(b[1]), this.g = Number(b[2]), this.b = Number(b[3])), null !== b
  };
  var H = /^rgba\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *, *(\d+\.?\d*)\)$/;
  D.prototype.rgba = function (a) {
    var b = null;
    return null !== (b = a.match(H)) && (this.r = Number(b[1]), this.g = Number(b[2]), this.b = Number(b[3]), this.a = Number(b[4])), null !== b
  }, D.prototype.toString = function () {
    return null !== this.a && 1 !== this.a ? "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" : "rgb(" + [this.r, this.g, this.b].join(",") + ")"
  }, D.prototype.namedColor = function (a) {
    var b = I[a.toLowerCase()];
    if (b) this.r = b[0], this.g = b[1], this.b = b[2];
    else if ("transparent" === a.toLowerCase()) return this.r = this.g = this.b = this.a = 0, !0;
    return !!b
  }, D.prototype.isColor = !0;
  var I = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };
  L.prototype.getMetrics = function (a, b) {
    return this.data[a + "-" + b] === f && (this.data[a + "-" + b] = new K(a, b)), this.data[a + "-" + b]
  }, M.prototype.proxyLoad = function (a, b, c) {
    var d = this.src;
    return w(d.src, a, d.ownerDocument, b.width, b.height, c)
  }, N.prototype.TYPES = {
    LINEAR: 1,
    RADIAL: 2
  }, P.prototype.findImages = function (a) {
    var b = [];
    return a.reduce(function (a, b) {
      switch (b.node.nodeName) {
        case "IMG":
          return a.concat([{
            args: [b.node.src],
            method: "url"
          }]);
        case "svg":
        case "IFRAME":
          return a.concat([{
            args: [b.node],
            method: b.node.nodeName
          }])
      }
      return a
    }, []).forEach(this.addImage(b, this.loadImage), this), b
  }, P.prototype.findBackgroundImage = function (a, b) {
    return b.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(a, this.loadImage), this), a
  }, P.prototype.addImage = function (a, b) {
    return function (c) {
      c.args.forEach(function (d) {
        this.imageExists(a, d) || (a.splice(0, 0, b.call(this, c)), R("Added image #" + a.length, "string" == typeof d ? d.substring(0, 100) : d))
      }, this)
    }
  }, P.prototype.hasImageBackground = function (a) {
    return "none" !== a.method
  }, P.prototype.loadImage = function (a) {
    if ("url" === a.method) {
      var b = a.args[0];
      return !this.isSVG(b) || this.support.svg || this.options.allowTaint ? b.match(/data:image\/.*;base64,/i) ? new O(b.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, ""), !1) : this.isSameOrigin(b) || this.options.allowTaint === !0 || this.isSVG(b) ? new O(b, !1) : this.support.cors && !this.options.allowTaint && this.options.useCORS ? new O(b, !0) : this.options.proxy ? new Ua(b, this.options.proxy) : new J(b) : new Za(b)
    }
    return "linear-gradient" === a.method ? new Q(a) : "gradient" === a.method ? new cb(a) : "svg" === a.method ? new _a(a.args[0], this.support.svg) : "IFRAME" === a.method ? new M(a.args[0], this.isSameOrigin(a.args[0].src), this.options) : new J(a)
  }, P.prototype.isSVG = function (a) {
    return "svg" === a.substring(a.length - 3).toLowerCase() || Za.prototype.isInline(a)
  }, P.prototype.imageExists = function (a, b) {
    return a.some(function (a) {
      return a.src === b
    })
  }, P.prototype.isSameOrigin = function (a) {
    return this.getOrigin(a) === this.origin
  }, P.prototype.getOrigin = function (a) {
    var c = this.link || (this.link = b.createElement("a"));
    return c.href = a, c.href = c.href, c.protocol + c.hostname + c.port
  }, P.prototype.getPromise = function (a) {
    return this.timeout(a, this.options.imageTimeout).catch(function () {
      var b = new J(a.src);
      return b.promise.then(function (b) {
        a.image = b
      })
    })
  }, P.prototype.get = function (a) {
    var b = null;
    return this.images.some(function (c) {
      return (b = c).src === a
    }) ? b : null
  }, P.prototype.fetch = function (a) {
    return this.images = a.reduce(Da(this.findBackgroundImage, this), this.findImages(a)), this.images.forEach(function (a, b) {
      a.promise.then(function () {
        R("Succesfully loaded image #" + (b + 1), a)
      }, function (c) {
        R("Failed loading image #" + (b + 1), a, c)
      })
    }), this.ready = Promise.all(this.images.map(this.getPromise, this)), R("Finished searching images"), this
  }, P.prototype.timeout = function (a, b) {
    var c, d = Promise.race([a.promise, new Promise(function (d, e) {
      c = setTimeout(function () {
        R("Timed out loading image", a), e(a)
      }, b)
    })]).then(function (a) {
      return clearTimeout(c), a
    });
    return d.catch(function () {
      clearTimeout(c)
    }), d
  }, Q.prototype = Object.create(N.prototype), Q.prototype.stepRegExp = /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/, S.prototype.cloneTo = function (a) {
    a.visible = this.visible, a.borders = this.borders, a.bounds = this.bounds, a.clip = this.clip, a.backgroundClip = this.backgroundClip, a.computedStyles = this.computedStyles, a.styles = this.styles, a.backgroundImages = this.backgroundImages, a.opacity = this.opacity
  }, S.prototype.getOpacity = function () {
    return null === this.opacity ? this.opacity = this.cssFloat("opacity") : this.opacity
  }, S.prototype.assignStack = function (a) {
    this.stack = a, a.children.push(this)
  }, S.prototype.isElementVisible = function () {
    return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : "none" !== this.css("display") && "hidden" !== this.css("visibility") && !this.node.hasAttribute("data-html2canvas-ignore") && ("INPUT" !== this.node.nodeName || "hidden" !== this.node.getAttribute("type"))
  }, S.prototype.css = function (a) {
    return this.computedStyles || (this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null)), this.styles[a] || (this.styles[a] = this.computedStyles[a])
  }, S.prototype.prefixedCss = function (a) {
    var b = ["webkit", "moz", "ms", "o"],
      c = this.css(a);
    return c === f && b.some(function (b) {
      return c = this.css(b + a.substr(0, 1).toUpperCase() + a.substr(1)), c !== f
    }, this), c === f ? null : c
  }, S.prototype.computedStyle = function (a) {
    return this.node.ownerDocument.defaultView.getComputedStyle(this.node, a)
  }, S.prototype.cssInt = function (a) {
    var b = parseInt(this.css(a), 10);
    return isNaN(b) ? 0 : b
  }, S.prototype.color = function (a) {
    return this.colors[a] || (this.colors[a] = new D(this.css(a)))
  }, S.prototype.cssFloat = function (a) {
    var b = parseFloat(this.css(a));
    return isNaN(b) ? 0 : b
  }, S.prototype.fontWeight = function () {
    var a = this.css("fontWeight");
    switch (parseInt(a, 10)) {
      case 401:
        a = "bold";
        break;
      case 400:
        a = "normal"
    }
    return a
  }, S.prototype.parseClip = function () {
    var a = this.css("clip").match(this.CLIP);
    return a ? {
      top: parseInt(a[1], 10),
      right: parseInt(a[2], 10),
      bottom: parseInt(a[3], 10),
      left: parseInt(a[4], 10)
    } : null
  }, S.prototype.parseBackgroundImages = function () {
    return this.backgroundImages || (this.backgroundImages = W(this.css("backgroundImage")))
  }, S.prototype.cssList = function (a, b) {
    var c = (this.css(a) || "").split(",");
    return c = c[b || 0] || c[0] || "auto", c = c.trim().split(" "), 1 === c.length && (c = [c[0], c[0]]), c
  }, S.prototype.parseBackgroundSize = function (a, b, c) {
    var e, f, d = this.cssList("backgroundSize", c);
    if (V(d[0])) e = a.width * parseFloat(d[0]) / 100;
    else {
      if (/contain|cover/.test(d[0])) {
        var g = a.width / a.height,
          h = b.width / b.height;
        return g < h ^ "contain" === d[0] ? {
          width: a.height * h,
          height: a.height
        } : {
          width: a.width,
          height: a.width / h
        }
      }
      e = parseInt(d[0], 10)
    }
    return f = "auto" === d[0] && "auto" === d[1] ? b.height : "auto" === d[1] ? e / b.width * b.height : V(d[1]) ? a.height * parseFloat(d[1]) / 100 : parseInt(d[1], 10), "auto" === d[0] && (e = f / b.height * b.width), {
      width: e,
      height: f
    }
  }, S.prototype.parseBackgroundPosition = function (a, b, c, d) {
    var f, g, e = this.cssList("backgroundPosition", c);
    return f = V(e[0]) ? (a.width - (d || b).width) * (parseFloat(e[0]) / 100) : parseInt(e[0], 10), g = "auto" === e[1] ? f / b.width * b.height : V(e[1]) ? (a.height - (d || b).height) * parseFloat(e[1]) / 100 : parseInt(e[1], 10), "auto" === e[0] && (f = g / b.height * b.width), {
      left: f,
      top: g
    }
  }, S.prototype.parseBackgroundRepeat = function (a) {
    return this.cssList("backgroundRepeat", a)[0]
  }, S.prototype.parseTextShadows = function () {
    var a = this.css("textShadow"),
      b = [];
    if (a && "none" !== a)
      for (var c = a.match(this.TEXT_SHADOW_PROPERTY), d = 0; c && d < c.length; d++) {
        var e = c[d].match(this.TEXT_SHADOW_VALUES);
        b.push({
          color: new D(e[0]),
          offsetX: e[1] ? parseFloat(e[1].replace("px", "")) : 0,
          offsetY: e[2] ? parseFloat(e[2].replace("px", "")) : 0,
          blur: e[3] ? e[3].replace("px", "") : 0
        })
      }
    return b
  }, S.prototype.parseTransform = function () {
    if (!this.transformData)
      if (this.hasTransform()) {
        var a = this.parseBounds(),
          b = this.prefixedCss("transformOrigin").split(" ").map(X).map(Y);
        b[0] += a.left, b[1] += a.top, this.transformData = {
          origin: b,
          matrix: this.parseTransformMatrix()
        }
      } else this.transformData = {
        origin: [0, 0],
        matrix: [1, 0, 0, 1, 0, 0]
      };
    return this.transformData
  }, S.prototype.parseTransformMatrix = function () {
    if (!this.transformMatrix) {
      var a = this.prefixedCss("transform"),
        b = a ? U(a.match(this.MATRIX_PROPERTY)) : null;
      this.transformMatrix = b ? b : [1, 0, 0, 1, 0, 0]
    }
    return this.transformMatrix
  }, S.prototype.parseBounds = function () {
    return this.bounds || (this.bounds = this.hasTransform() ? $(this.node) : Z(this.node))
  }, S.prototype.hasTransform = function () {
    return "1,0,0,1,0,0" !== this.parseTransformMatrix().join(",") || this.parent && this.parent.hasTransform()
  }, S.prototype.getValue = function () {
    var a = this.node.value || "";
    return "SELECT" === this.node.tagName ? a = T(this.node) : "password" === this.node.type && (a = Array(a.length + 1).join("â€¢")), 0 === a.length ? this.node.placeholder || "" : a
  }, S.prototype.MATRIX_PROPERTY = /(matrix)\((.+)\)/, S.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g, S.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g, S.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/, _.prototype.calculateOverflowClips = function () {
    this.nodes.forEach(function (a) {
      if (ya(a)) {
        za(a) && a.appendToDOM(), a.borders = this.parseBorders(a);
        var b = "hidden" === a.css("overflow") ? [a.borders.clip] : [],
          c = a.parseClip();
        c && ["absolute", "fixed"].indexOf(a.css("position")) !== -1 && b.push([
          ["rect", a.bounds.left + c.left, a.bounds.top + c.top, c.right - c.left, c.bottom - c.top]
        ]), a.clip = aa(a) ? a.parent.clip.concat(b) : b, a.backgroundClip = "hidden" !== a.css("overflow") ? a.clip.concat([a.borders.clip]) : a.clip, za(a) && a.cleanDOM()
      } else Aa(a) && (a.clip = aa(a) ? a.parent.clip : []);
      za(a) || (a.bounds = null)
    }, this)
  }, _.prototype.asyncRenderer = function (a, b, c) {
    c = c || Date.now(), this.paint(a[this.renderIndex++]), a.length === this.renderIndex ? b() : c + 20 > Date.now() ? this.asyncRenderer(a, b, c) : setTimeout(Da(function () {
      this.asyncRenderer(a, b)
    }, this), 0)
  }, _.prototype.createPseudoHideStyles = function (a) {
    this.createStyles(a, "." + Va.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }.' + Va.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }')
  }, _.prototype.disableAnimations = function (a) {
    this.createStyles(a, "* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}")
  }, _.prototype.createStyles = function (a, b) {
    var c = a.createElement("style");
    c.innerHTML = b, a.body.appendChild(c)
  }, _.prototype.getPseudoElements = function (a) {
    var b = [
      [a]
    ];
    if (a.node.nodeType === Node.ELEMENT_NODE) {
      var c = this.getPseudoElement(a, ":before"),
        d = this.getPseudoElement(a, ":after");
      c && b.push(c), d && b.push(d)
    }
    return Ha(b)
  }, _.prototype.getPseudoElement = function (a, c) {
    var d = a.computedStyle(c);
    if (!d || !d.content || "none" === d.content || "-moz-alt-content" === d.content || "none" === d.display) return null;
    for (var e = Ia(d.content), f = "url" === e.substr(0, 3), g = b.createElement(f ? "img" : "html2canvaspseudoelement"), h = new Va(g, a, c), i = d.length - 1; i >= 0; i--) {
      var j = ba(d.item(i));
      g.style[j] = d[j]
    }
    if (g.className = Va.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + Va.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER, f) return g.src = W(e)[0].args[0], [h];
    var k = b.createTextNode(e);
    return g.appendChild(k), [h, new ab(k, h)]
  }, _.prototype.getChildren = function (a) {
    return Ha([].filter.call(a.node.childNodes, sa).map(function (b) {
      var c = [b.nodeType === Node.TEXT_NODE ? new ab(b, a) : new S(b, a)].filter(Ga);
      return b.nodeType === Node.ELEMENT_NODE && c.length && "TEXTAREA" !== b.tagName ? c[0].isElementVisible() ? c.concat(this.getChildren(c[0])) : [] : c
    }, this))
  }, _.prototype.newStackingContext = function (a, b) {
    var c = new Xa(b, a.getOpacity(), a.node, a.parent);
    a.cloneTo(c);
    var d = b ? c.getParentStack(this) : c.parent.stack;
    d.contexts.push(c), a.stack = c
  }, _.prototype.createStackingContexts = function () {
    this.nodes.forEach(function (a) {
      ya(a) && (this.isRootElement(a) || Ca(a) || ta(a) || this.isBodyWithTransparentRoot(a) || a.hasTransform()) ? this.newStackingContext(a, !0) : ya(a) && (ua(a) && ma(a) || wa(a) || va(a)) ? this.newStackingContext(a, !1) : a.assignStack(a.parent.stack)
    }, this)
  }, _.prototype.isBodyWithTransparentRoot = function (a) {
    return "BODY" === a.node.nodeName && a.parent.color("backgroundColor").isTransparent()
  }, _.prototype.isRootElement = function (a) {
    return null === a.parent
  }, _.prototype.sortStackingContexts = function (a) {
    a.contexts.sort(Ba(a.contexts.slice(0))), a.contexts.forEach(this.sortStackingContexts, this)
  }, _.prototype.parseTextBounds = function (a) {
    return function (b, c, d) {
      if ("none" !== a.parent.css("textDecoration").substr(0, 4) || 0 !== b.trim().length) {
        if (this.support.rangeBounds && !a.parent.hasTransform()) {
          var e = d.slice(0, c).join("").length;
          return this.getRangeBounds(a.node, e, b.length)
        }
        if (a.node && "string" == typeof a.node.data) {
          var f = a.node.splitText(b.length),
            g = this.getWrapperBounds(a.node, a.parent.hasTransform());
          return a.node = f, g
        }
      } else this.support.rangeBounds && !a.parent.hasTransform() || (a.node = a.node.splitText(b.length));
      return {}
    }
  }, _.prototype.getWrapperBounds = function (a, b) {
    var c = a.ownerDocument.createElement("html2canvaswrapper"),
      d = a.parentNode,
      e = a.cloneNode(!0);
    c.appendChild(a.cloneNode(!0)), d.replaceChild(c, a);
    var f = b ? $(c) : Z(c);
    return d.replaceChild(e, c), f
  }, _.prototype.getRangeBounds = function (a, b, c) {
    var d = this.range || (this.range = a.ownerDocument.createRange());
    return d.setStart(a, b), d.setEnd(a, b + c), d.getBoundingClientRect()
  }, _.prototype.parse = function (a) {
    var b = a.contexts.filter(ka),
      c = a.children.filter(ya),
      d = c.filter(xa(va)),
      e = d.filter(xa(ua)).filter(xa(na)),
      f = c.filter(xa(ua)).filter(va),
      g = d.filter(xa(ua)).filter(na),
      h = a.contexts.concat(d.filter(ua)).filter(ma),
      i = a.children.filter(Aa).filter(pa),
      j = a.contexts.filter(la);
    b.concat(e).concat(f).concat(g).concat(h).concat(i).concat(j).forEach(function (a) {
      this.renderQueue.push(a), oa(a) && (this.parse(a), this.renderQueue.push(new ca))
    }, this)
  }, _.prototype.paint = function (a) {
    try {
      a instanceof ca ? this.renderer.ctx.restore() : Aa(a) ? (za(a.parent) && a.parent.appendToDOM(), this.paintText(a), za(a.parent) && a.parent.cleanDOM()) : this.paintNode(a)
    } catch (a) {
      if (R(a), this.options.strict) throw a
    }
  }, _.prototype.paintNode = function (a) {
    oa(a) && (this.renderer.setOpacity(a.opacity), this.renderer.ctx.save(), a.hasTransform() && this.renderer.setTransform(a.parseTransform())), "INPUT" === a.node.nodeName && "checkbox" === a.node.type ? this.paintCheckbox(a) : "INPUT" === a.node.nodeName && "radio" === a.node.type ? this.paintRadio(a) : this.paintElement(a)
  }, _.prototype.paintElement = function (a) {
    var b = a.parseBounds();
    this.renderer.clip(a.backgroundClip, function () {
      this.renderer.renderBackground(a, b, a.borders.borders.map(Fa))
    }, this), this.renderer.clip(a.clip, function () {
      this.renderer.renderBorders(a.borders.borders)
    }, this), this.renderer.clip(a.backgroundClip, function () {
      switch (a.node.nodeName) {
        case "svg":
        case "IFRAME":
          var c = this.images.get(a.node);
          c ? this.renderer.renderImage(a, b, a.borders, c) : R("Error loading <" + a.node.nodeName + ">", a.node);
          break;
        case "IMG":
          var d = this.images.get(a.node.src);
          d ? this.renderer.renderImage(a, b, a.borders, d) : R("Error loading <img>", a.node.src);
          break;
        case "CANVAS":
          this.renderer.renderImage(a, b, a.borders, {
            image: a.node
          });
          break;
        case "SELECT":
        case "INPUT":
        case "TEXTAREA":
          this.paintFormValue(a)
      }
    }, this)
  }, _.prototype.paintCheckbox = function (a) {
    var b = a.parseBounds(),
      c = Math.min(b.width, b.height),
      d = {
        width: c - 1,
        height: c - 1,
        top: b.top,
        left: b.left
      },
      e = [3, 3],
      f = [e, e, e, e],
      g = [1, 1, 1, 1].map(function (a) {
        return {
          color: new D("#A5A5A5"),
          width: a
        }
      }),
      h = ga(d, f, g);
    this.renderer.clip(a.backgroundClip, function () {
      this.renderer.rectangle(d.left + 1, d.top + 1, d.width - 2, d.height - 2, new D("#DEDEDE")), this.renderer.renderBorders(ea(g, d, h, f)), a.node.checked && (this.renderer.font(new D("#424242"), "normal", "normal", "bold", c - 3 + "px", "arial"), this.renderer.text("âœ”", d.left + c / 6, d.top + c - 1))
    }, this)
  }, _.prototype.paintRadio = function (a) {
    var b = a.parseBounds(),
      c = Math.min(b.width, b.height) - 2;
    this.renderer.clip(a.backgroundClip, function () {
      this.renderer.circleStroke(b.left + 1, b.top + 1, c, new D("#DEDEDE"), 1, new D("#A5A5A5")), a.node.checked && this.renderer.circle(Math.ceil(b.left + c / 4) + 1, Math.ceil(b.top + c / 4) + 1, Math.floor(c / 2), new D("#424242"))
    }, this)
  }, _.prototype.paintFormValue = function (a) {
    var b = a.getValue();
    if (b.length > 0) {
      var c = a.node.ownerDocument,
        d = c.createElement("html2canvaswrapper"),
        e = ["lineHeight", "textAlign", "fontFamily", "fontWeight", "fontSize", "color", "paddingLeft", "paddingTop", "paddingRight", "paddingBottom", "width", "height", "borderLeftStyle", "borderTopStyle", "borderLeftWidth", "borderTopWidth", "boxSizing", "whiteSpace", "wordWrap"];
      e.forEach(function (b) {
        try {
          d.style[b] = a.css(b)
        } catch (a) {
          R("html2canvas: Parse: Exception caught in renderFormValue: " + a.message)
        }
      });
      var f = a.parseBounds();
      d.style.position = "fixed", d.style.left = f.left + "px", d.style.top = f.top + "px", d.textContent = b, c.body.appendChild(d), this.paintText(new ab(d.firstChild, a)), c.body.removeChild(d)
    }
  }, _.prototype.paintText = function (b) {
    b.applyTextTransform();
    var c = a.html2canvas.punycode.ucs2.decode(b.node.data),
      d = this.options.letterRendering && !qa(b) || La(b.node.data) ? c.map(function (b) {
        return a.html2canvas.punycode.ucs2.encode([b])
      }) : Ja(c),
      e = b.parent.fontWeight(),
      f = b.parent.css("fontSize"),
      g = b.parent.css("fontFamily"),
      h = b.parent.parseTextShadows();
    this.renderer.font(b.parent.color("color"), b.parent.css("fontStyle"), b.parent.css("fontVariant"), e, f, g), h.length ? this.renderer.fontShadow(h[0].color, h[0].offsetX, h[0].offsetY, h[0].blur) : this.renderer.clearShadow(), this.renderer.clip(b.parent.clip, function () {
      d.map(this.parseTextBounds(b), this).forEach(function (a, c) {
        a && (this.renderer.text(d[c], a.left, a.bottom), this.renderTextDecoration(b.parent, a, this.fontMetrics.getMetrics(g, f)))
      }, this)
    }, this)
  }, _.prototype.renderTextDecoration = function (a, b, c) {
    switch (a.css("textDecoration").split(" ")[0]) {
      case "underline":
        this.renderer.rectangle(b.left, Math.round(b.top + c.baseline + c.lineWidth), b.width, 1, a.color("color"));
        break;
      case "overline":
        this.renderer.rectangle(b.left, Math.round(b.top), b.width, 1, a.color("color"));
        break;
      case "line-through":
        this.renderer.rectangle(b.left, Math.ceil(b.top + c.middle + c.lineWidth), b.width, 1, a.color("color"))
    }
  };
  var da = {
    inset: [
      ["darken", .6],
      ["darken", .1],
      ["darken", .1],
      ["darken", .6]
    ]
  };
  _.prototype.parseBorders = function (a) {
    var b = a.parseBounds(),
      c = ra(a),
      d = ["Top", "Right", "Bottom", "Left"].map(function (b, c) {
        var d = a.css("border" + b + "Style"),
          e = a.color("border" + b + "Color");
        "inset" === d && e.isBlack() && (e = new D([255, 255, 255, e.a]));
        var f = da[d] ? da[d][c] : null;
        return {
          width: a.cssInt("border" + b + "Width"),
          color: f ? e[f[0]](f[1]) : e,
          args: null
        }
      }),
      e = ga(b, c, d);
    return {
      clip: this.parseBackgroundClip(a, e, d, c, b),
      borders: ea(d, b, e, c)
    }
  }, _.prototype.parseBackgroundClip = function (a, b, c, d, e) {
    var f = a.css("backgroundClip"),
      g = [];
    switch (f) {
      case "content-box":
      case "padding-box":
        ja(g, d[0], d[1], b.topLeftInner, b.topRightInner, e.left + c[3].width, e.top + c[0].width), ja(g, d[1], d[2], b.topRightInner, b.bottomRightInner, e.left + e.width - c[1].width, e.top + c[0].width), ja(g, d[2], d[3], b.bottomRightInner, b.bottomLeftInner, e.left + e.width - c[1].width, e.top + e.height - c[2].width), ja(g, d[3], d[0], b.bottomLeftInner, b.topLeftInner, e.left + c[3].width, e.top + e.height - c[2].width);
        break;
      default:
        ja(g, d[0], d[1], b.topLeftOuter, b.topRightOuter, e.left, e.top), ja(g, d[1], d[2], b.topRightOuter, b.bottomRightOuter, e.left + e.width, e.top), ja(g, d[2], d[3], b.bottomRightOuter, b.bottomLeftOuter, e.left + e.width, e.top + e.height), ja(g, d[3], d[0], b.bottomLeftOuter, b.topLeftOuter, e.left, e.top + e.height)
    }
    return g
  };
  var Na = 0,
    Oa = "withCredentials" in new XMLHttpRequest,
    Pa = "crossOrigin" in new Image;
  Va.prototype.cloneTo = function (a) {
    Va.prototype.cloneTo.call(this, a), a.isPseudoElement = !0, a.before = this.before
  }, Va.prototype = Object.create(S.prototype), Va.prototype.appendToDOM = function () {
    this.before ? this.parent.node.insertBefore(this.node, this.parent.node.firstChild) : this.parent.node.appendChild(this.node), this.parent.node.className += " " + this.getHideClass()
  }, Va.prototype.cleanDOM = function () {
    this.node.parentNode.removeChild(this.node), this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "")
  }, Va.prototype.getHideClass = function () {
    return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")]
  }, Va.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before", Va.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after", Wa.prototype.renderImage = function (a, b, c, d) {
    var e = a.cssInt("paddingLeft"),
      f = a.cssInt("paddingTop"),
      g = a.cssInt("paddingRight"),
      h = a.cssInt("paddingBottom"),
      i = c.borders,
      j = b.width - (i[1].width + i[3].width + e + g),
      k = b.height - (i[0].width + i[2].width + f + h);
    this.drawImage(d, 0, 0, d.image.width || j, d.image.height || k, b.left + e + i[3].width, b.top + f + i[0].width, j, k)
  }, Wa.prototype.renderBackground = function (a, b, c) {
    b.height > 0 && b.width > 0 && (this.renderBackgroundColor(a, b), this.renderBackgroundImage(a, b, c))
  }, Wa.prototype.renderBackgroundColor = function (a, b) {
    var c = a.color("backgroundColor");
    c.isTransparent() || this.rectangle(b.left, b.top, b.width, b.height, c)
  }, Wa.prototype.renderBorders = function (a) {
    a.forEach(this.renderBorder, this)
  }, Wa.prototype.renderBorder = function (a) {
    a.color.isTransparent() || null === a.args || this.drawShape(a.args, a.color)
  }, Wa.prototype.renderBackgroundImage = function (a, b, c) {
    var d = a.parseBackgroundImages();
    d.reverse().forEach(function (d, e, f) {
      switch (d.method) {
        case "url":
          var g = this.images.get(d.args[0]);
          g ? this.renderBackgroundRepeating(a, b, g, f.length - (e + 1), c) : R("Error loading background-image", d.args[0]);
          break;
        case "linear-gradient":
        case "gradient":
          var h = this.images.get(d.value);
          h ? this.renderBackgroundGradient(h, b, c) : R("Error loading background-image", d.args[0]);
          break;
        case "none":
          break;
        default:
          R("Unknown background-image type", d.args[0])
      }
    }, this)
  }, Wa.prototype.renderBackgroundRepeating = function (a, b, c, d, e) {
    var f = a.parseBackgroundSize(b, c.image, d),
      g = a.parseBackgroundPosition(b, c.image, d, f),
      h = a.parseBackgroundRepeat(d);
    switch (h) {
      case "repeat-x":
      case "repeat no-repeat":
        this.backgroundRepeatShape(c, g, f, b, b.left + e[3], b.top + g.top + e[0], 99999, f.height, e);
        break;
      case "repeat-y":
      case "no-repeat repeat":
        this.backgroundRepeatShape(c, g, f, b, b.left + g.left + e[3], b.top + e[0], f.width, 99999, e);
        break;
      case "no-repeat":
        this.backgroundRepeatShape(c, g, f, b, b.left + g.left + e[3], b.top + g.top + e[0], f.width, f.height, e);
        break;
      default:
        this.renderBackgroundRepeat(c, g, f, {
          top: b.top,
          left: b.left
        }, e[3], e[0])
    }
  }, Xa.prototype = Object.create(S.prototype), Xa.prototype.getParentStack = function (a) {
    var b = this.parent ? this.parent.stack : null;
    return b ? b.ownStacking ? b : b.getParentStack(a) : a.stack
  }, Ya.prototype.testRangeBounds = function (a) {
    var b, c, d, e, f = !1;
    return a.createRange && (b = a.createRange(), b.getBoundingClientRect && (c = a.createElement("boundtest"), c.style.height = "123px", c.style.display = "block", a.body.appendChild(c), b.selectNode(c), d = b.getBoundingClientRect(), e = d.height, 123 === e && (f = !0), a.body.removeChild(c))), f
  }, Ya.prototype.testCORS = function () {
    return "undefined" != typeof (new Image).crossOrigin
  }, Ya.prototype.testSVG = function () {
    var a = new Image,
      c = b.createElement("canvas"),
      d = c.getContext("2d");
    a.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
    try {
      d.drawImage(a, 0, 0), c.toDataURL()
    } catch (a) {
      return !1
    }
    return !0
  }, Za.prototype.hasFabric = function () {
    return html2canvas.fabric ? Promise.resolve() : Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))
  }, Za.prototype.inlineFormatting = function (a) {
    return /^data:image\/svg\+xml;base64,/.test(a) ? this.decode64(this.removeContentType(a)) : this.removeContentType(a)
  }, Za.prototype.removeContentType = function (a) {
    return a.replace(/^data:image\/svg\+xml(;base64)?,/, "")
  }, Za.prototype.isInline = function (a) {
    return /^data:image\/svg\+xml/i.test(a)
  }, Za.prototype.createCanvas = function (a) {
    var b = this;
    return function (c, d) {
      var e = new html2canvas.fabric.StaticCanvas("c");
      b.image = e.lowerCanvasEl, e.setWidth(d.width).setHeight(d.height).add(html2canvas.fabric.util.groupSVGElements(c, d)).renderAll(), a(e.lowerCanvasEl)
    }
  }, Za.prototype.decode64 = function (b) {
    return "function" == typeof a.atob ? a.atob(b) : $a(b)
  }, _a.prototype = Object.create(Za.prototype), ab.prototype = Object.create(S.prototype), ab.prototype.applyTextTransform = function () {
    this.node.data = this.transform(this.parent.css("textTransform"))
  }, ab.prototype.transform = function (a) {
    var b = this.node.data;
    switch (a) {
      case "lowercase":
        return b.toLowerCase();
      case "capitalize":
        return b.replace(/(^|\s|:|-|\(|\))([a-z])/g, bb);
      case "uppercase":
        return b.toUpperCase();
      default:
        return b
    }
  }, cb.prototype = Object.create(N.prototype), eb.prototype = Object.create(Wa.prototype), eb.prototype.setFillStyle = function (a) {
    return this.ctx.fillStyle = "object" == typeof a && a.isColor ? a.toString() : a, this.ctx
  }, eb.prototype.rectangle = function (a, b, c, d, e) {
    this.setFillStyle(e).fillRect(a, b, c, d)
  }, eb.prototype.circle = function (a, b, c, d) {
    this.setFillStyle(d), this.ctx.beginPath(), this.ctx.arc(a + c / 2, b + c / 2, c / 2, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.fill()
  }, eb.prototype.circleStroke = function (a, b, c, d, e, f) {
    this.circle(a, b, c, d), this.ctx.strokeStyle = f.toString(), this.ctx.stroke()
  }, eb.prototype.drawShape = function (a, b) {
    this.shape(a), this.setFillStyle(b).fill()
  }, eb.prototype.taints = function (a) {
    if (null === a.tainted) {
      this.taintCtx.drawImage(a.image, 0, 0);
      try {
        this.taintCtx.getImageData(0, 0, 1, 1), a.tainted = !1
      } catch (c) {
        this.taintCtx = b.createElement("canvas").getContext("2d"), a.tainted = !0
      }
    }
    return a.tainted
  }, eb.prototype.drawImage = function (a, b, c, d, e, f, g, h, i) {
    this.taints(a) && !this.options.allowTaint || this.ctx.drawImage(a.image, b, c, d, e, f, g, h, i)
  }, eb.prototype.clip = function (a, b, c) {
    this.ctx.save(), a.filter(fb).forEach(function (a) {
      this.shape(a).clip()
    }, this), b.call(c), this.ctx.restore()
  }, eb.prototype.shape = function (a) {
    return this.ctx.beginPath(), a.forEach(function (a, b) {
      "rect" === a[0] ? this.ctx.rect.apply(this.ctx, a.slice(1)) : this.ctx[0 === b ? "moveTo" : a[0] + "To"].apply(this.ctx, a.slice(1))
    }, this), this.ctx.closePath(), this.ctx
  }, eb.prototype.font = function (a, b, c, d, e, f) {
    this.setFillStyle(a).font = [b, c, d, e, f].join(" ").split(",")[0]
  }, eb.prototype.fontShadow = function (a, b, c, d) {
    this.setVariable("shadowColor", a.toString()).setVariable("shadowOffsetY", b).setVariable("shadowOffsetX", c).setVariable("shadowBlur", d)
  }, eb.prototype.clearShadow = function () {
    this.setVariable("shadowColor", "rgba(0,0,0,0)")
  }, eb.prototype.setOpacity = function (a) {
    this.ctx.globalAlpha = a
  }, eb.prototype.setTransform = function (a) {
    this.ctx.translate(a.origin[0], a.origin[1]), this.ctx.transform.apply(this.ctx, a.matrix), this.ctx.translate(-a.origin[0], -a.origin[1])
  }, eb.prototype.setVariable = function (a, b) {
    return this.variables[a] !== b && (this.variables[a] = this.ctx[a] = b), this
  }, eb.prototype.text = function (a, b, c) {
    this.ctx.fillText(a, b, c)
  }, eb.prototype.backgroundRepeatShape = function (a, b, c, d, e, f, g, h, i) {
    var j = [
      ["line", Math.round(e), Math.round(f)],
      ["line", Math.round(e + g), Math.round(f)],
      ["line", Math.round(e + g), Math.round(h + f)],
      ["line", Math.round(e), Math.round(h + f)]
    ];
    this.clip([j], function () {
      this.renderBackgroundRepeat(a, b, c, d, i[3], i[0])
    }, this)
  }, eb.prototype.renderBackgroundRepeat = function (a, b, c, d, e, f) {
    var g = Math.round(d.left + b.left + e),
      h = Math.round(d.top + b.top + f);
    this.setFillStyle(this.ctx.createPattern(this.resizeImage(a, c), "repeat")), this.ctx.translate(g, h), this.ctx.fill(), this.ctx.translate(-g, -h)
  }, eb.prototype.renderBackgroundGradient = function (a, b) {
    if (a instanceof Q) {
      var c = this.ctx.createLinearGradient(b.left + b.width * a.x0, b.top + b.height * a.y0, b.left + b.width * a.x1, b.top + b.height * a.y1);
      a.colorStops.forEach(function (a) {
        c.addColorStop(a.stop, a.color.toString())
      }), this.rectangle(b.left, b.top, b.width, b.height, c)
    }
  }, eb.prototype.resizeImage = function (a, c) {
    var d = a.image;
    if (d.width === c.width && d.height === c.height) return d;
    var e, f = b.createElement("canvas");
    return f.width = c.width, f.height = c.height, e = f.getContext("2d"), e.drawImage(d, 0, 0, d.width, d.height, 0, 0, c.width, c.height), f
  }
}).call({}, "undefined" != typeof window ? window : void 0, "undefined" != typeof document ? document : void 0);

/* Avenger Booth */
$('canvas').attr('height', '240').attr('width', '320');

function cameraButton() {
  if ($('.image_camera').hasClass('is-visible')) {

    capture();

    $('.button-download').addClass('is-visible');
    $('.image_button-center, .image_camera').removeClass('is-visible');
    $('.canvas-wrapper').removeClass('is-hidden');
    $('.bar canvas, .image_canvas').show();
    $('.canvas-wrapper, .filter').children('img').remove();
    return false;
  } else {
    $('.image_button-center, .image_camera').addClass('is-visible');
    $('.canvas-wrapper').addClass('is-hidden');
  }
}

$('.button-left').on('click', function () {
  $('.image_button-center, .image_camera').removeClass('is-visible');
  $('.popup').addClass('is-visible');
});

$('.popup').on('click', function () {
  $('.popup').removeClass('is-visible');
});

$('.popup_input, .popup_button').click(function (e) {
  e.stopPropagation();
});

$('.popup_button').click(function (e) {

  $('.popup').removeClass('is-visible');

  if ($('.popup_input').val()) {

    var img = '/ajax/image?path=' + $('.popup_input').val();

    $('.popup_input').val('');

    $('.canvas-wrapper').append('<img src="' + img + '" id="image">');

  }

  setTimeout(function () {
    capture(document.getElementById('image'));
    $('#image').remove();
  }, 500);

  $('.popup_input').val();
  $('.button-download').addClass('is-visible');

});

$('.button-download').click(function () {

  $('[class^="button"]').addClass('is-hidden');

  html2canvas($('.image'), {
    onrendered: function (image) {

      //create saved image canvas
      document.body.appendChild(image);

      //create temporary download link and download image
      var link = document.createElement('a');
      link.href = image.toDataURL();
      link.download = 'avengers-booth.jpg';
      document.body.appendChild(link);
      link.click();

      //remove saved image canvas
      $('canvas:last').remove();

    },
    width: 320,
    height: 380
  });

  $('[class^="button"]').removeClass('is-hidden');

});

//all the camera stuff
var FILTER_COUNT = 4;
var pos = 0,
  ctx = null,
  ftx = [],
  saveCB, image = [];

$('body').append('<canvas id="original" width="320" height="240">');

var canvas = document.getElementById('canvas');
var original = document.getElementById('original');
var context = canvas.getContext('2d');
var originalContext = original.getContext('2d');
var video = document.getElementById('camera');
var mediaConfig = {
  video: true
};
var errBack = function (e) {
  console.log('An error has occurred!', e)
};

if (typeof canvas.getContext('2d').filter == 'string') {
  $('body').addClass('canvas-filters');
}

$(document).ready(function () {
  var canvas = document.getElementById('canvas');
  canvas.setAttribute('width', 320);
  canvas.setAttribute('height', 240);

  // Get access to the camera!
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(function (stream) {
      video.src = window.URL.createObjectURL(stream);
      video.play();
    });
  } else if (navigator.getUserMedia) { // Standard
    navigator.getUserMedia({
      video: true
    }, function (stream) {
      video.src = stream;
      video.play();
    }, errBack);
  } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({
      video: true
    }, function (stream) {
      video.src = window.webkitURL.createObjectURL(stream);
      video.play();
    }, errBack);
  } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({
      video: true
    }, function (stream) {
      video.src = window.URL.createObjectURL(stream);
      video.play();
    }, errBack);
  }

  if (canvas.getContext) {
    ctx = document.getElementById('canvas').getContext('2d');
    ctx.clearRect(0, 0, 320, 240);
    image = ctx.getImageData(0, 0, 320, 240);

    if ($('.bar').length) {
      updateFilters(function (i) {
        ftx[i] = this.getContext('2d');
        ftx[i].clearRect(0, 0, 320, 240);
        image = ftx[i].getImageData(0, 0, 320, 240);
      });
    }
  }

  if (localStorage.getItem('imgCanvas')) {
    loadSavedCanvas();
    $('.button-download').addClass('is-visible');
  }

  if (localStorage.getItem('stickers')) {

    var stickers = JSON.parse(localStorage.getItem('stickers'));

    for (var i = 0; i < stickers.length; i++) {
      $('.image.ui-droppable').append('<img src="' + stickers[i].url + '" id="sticker-' + i + '" class="ui-draggable ui-draggable-handle dropped">');
      $('#sticker-' + i).css({
        top: stickers[i].top,
        left: stickers[i].left
      }).draggable();
    }

  }

});

function addFilter(filter) {

  $('#canvas').removeAttr('style');

  $('#canvas, #image').attr('data-filter', filter);

  var filter = $('#canvas').css('filter');
  if (filter == 'none') {
    filter = $('#canvas').css('-webkit-filter');
  }

  context.filter = filter;
  context.drawImage(original, 0, 0, 320, 240);

  if ($('body').hasClass('canvas-filters')) {
    $('#canvas').css({
      'filter': 'none',
      '-webkit-filter': 'none'
    })
  }

}

/*stickers*/
$('.button-right').on('click', slideSticker);

function updateFilters(callback) {
  $('.filter canvas').each(callback);
}

function capture(uploaded) {

  var img = video;

  if (uploaded) {
    img = uploaded;
  }

  context.drawImage(img, 0, 0, 320, 240);
  originalContext.drawImage(img, 0, 0, 320, 240);

  updateFilters(function (i) {
    ftx[i].drawImage(img, 0, 0, 320, 240);
  });

  localStorage.setItem('imgCanvas', canvas.toDataURL());

}

function loadSavedCanvas() {

  var dataURL = localStorage.getItem('imgCanvas');

  var img = new Image;
  img.src = dataURL;

  setTimeout(function () {
    capture(img);
  }, 100);

}

function slideSticker() {

  var direction = '+';
  if ($('.stickers').hasClass('is-visible')) {
    direction = '-';
    $('.stickers').removeClass('is-visible');
  } else {
    $('.stickers').addClass('is-visible');
  }

  $('.stickers').animate({
    right: direction + '=85',
  }, 150, function () {});

}

var currentMousePos = {
  x: -1,
  y: -1
};

$(document).mousemove(function (event) {
  currentMousePos.x = event.pageX;
  currentMousePos.y = event.pageY;
});

$('.sticker img').draggable({
  containment: '.image',
  cursor: 'move',
  helper: 'clone'
});

$('.image').droppable({
  accept: '.sticker img',
  drop: function (event, ui) {

    if ($('.stickers').hasClass('is-visible')) {
      $('.stickers').removeClass('is-visible');
      $('.stickers').animate({
        right: '-=85',
      }, 150, function () {});
    }

    if (!ui.draggable.hasClass('dropped')) {
      var position = $('.ui-droppable').position();
      var $clone = $(ui.helper).clone()
      $clone.css('position', 'absolute')
        .removeClass('ui-draggable-dragging')
        .addClass('dropped').draggable();
      $(this).append($clone);

      $clone.position({
        my: 'top left',
        at: 'top left',
        of: $(ui.helper)
      });
    }

    saveStickers();

  }
});

$('.image').on('dblclick', '.dropped', function () {
  $(this).remove();
  saveStickers();
})

function saveStickers() {

  var stickers = [];

  localStorage.removeItem('stickers');

  $('.dropped').each(function () {

    var sticker = {};

    var position = $(this).position();

    sticker.url = $(this).attr('src');
    sticker.top = position.top;
    sticker.left = position.left;

    stickers.push(sticker)

  });

  localStorage.setItem('stickers', JSON.stringify(stickers));

}