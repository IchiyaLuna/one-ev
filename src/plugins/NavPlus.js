function initNavs() {
  var total = document.querySelectorAll(".nav-pills");

  total.forEach(function (l) {
    var s = document.createElement("div"),
      t = l.querySelector("li:first-child .nav-link").cloneNode();
    (t.innerHTML = "-"), s.classList.add("moving-tab", "position-absolute", "nav-link"), s.appendChild(t), l.appendChild(s);
    l.getElementsByTagName("li").length;
    (s.style.padding = "0px"),
      (s.style.width = l.querySelector("li:nth-child(1)").offsetWidth + "px"),
      (s.style.transform = "translate3d(0px, 0px, 0px)"),
      (s.style.transition = ".5s ease"),
      (l.onmouseover = function (e) {
        let t = getEventTarget(e),
          i = t.closest("li");
        if (i) {
          let a = Array.from(i.closest("ul").children),
            n = a.indexOf(i) + 1;
          l.querySelector("li:nth-child(" + n + ") .nav-link").onclick = function () {
            s = l.querySelector(".moving-tab");
            let e = 0;
            if (l.classList.contains("flex-column")) {
              for (var t = 1; t <= a.indexOf(i); t++) e += l.querySelector("li:nth-child(" + t + ")").offsetHeight;
              (s.style.transform = "translate3d(0px," + e + "px, 0px)"),
                (s.style.height = l.querySelector("li:nth-child(" + t + ")").offsetHeight);
            } else {
              for (t = 1; t <= a.indexOf(i); t++) e += l.querySelector("li:nth-child(" + t + ")").offsetWidth;
              (s.style.transform = "translate3d(" + e + "px, 0px, 0px)"),
                (s.style.width = l.querySelector("li:nth-child(" + n + ")").offsetWidth + "px");
            }
          };
        }
      });
  });
}
function getEventTarget(e) {
  return (e = e || window.event).target || e.srcElement;
}

export { initNavs };
