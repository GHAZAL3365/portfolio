const revealToSpan = () => {
  const revealEls = document.querySelectorAll(".reveal");

  revealEls.forEach((elem) => {
    elem.innerHTML = `
  <span class="parent">
  <span class="child">${elem.textContent}</span>
  </span>
  `;
  });
};

// // function for setting new values at other position to animate later on
const setValue = () => {
  const svgElm = document.querySelectorAll("#Visual > g");
  svgElm.forEach((e) => {
    // getting a character to animate
    let char = e.childNodes[1].childNodes[1];
    char.style.strokeDasharray = char.getTotalLength() + "px";
    char.style.strokeDashoffset = char.getTotalLength() + "px";
  });

  gsap.set("#nav a", {
    opacity: 0,
  });

  gsap.set("#home .row-container .row img", {
    opacity: 0,
  });
  gsap.set("#home .reveal .child", {
    y: "100%",
  });
};

const loaderAnim = () => {
  let tl = gsap.timeline();
  tl.to("#loader .reveal .child", {
    y: "-100%",
    duration: 1.5,
    delay: 1,
    ease: Expo.easeInOut,
  })
    .to("#loader", {
      height: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    })
    .to("#green", {
      height: "100%",
      duration: 1,
      delay: -1.5,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: 0,
      duration: 1,
      top: 0,
      ease: Circ.easeInOut,
      onComplete: function () {
        animateHomePage();
      },
    });
};

const animateHomePage = () => {
  let tl = gsap.timeline();
  tl.to("#nav a", {
    opacity: 1,
    ease: Expo.easeInOut,
    duration: 2,
    delay: -2,
    stagger: 0.05,
  })
    .to("#home .reveal .child", {
      duration: 2,
      y: 0,
      stagger: 0.1,
      ease: Expo.easeInOut,
    })
    .to("#home .row img", {
      opacity: 1,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
      onComplete: function () {
        animateSvg();
      },
    });
};

const animateSvg = () => {
  let tl = gsap.timeline();

  tl.to("#Visual > g> g> path,#Visual > g> g> polyline", {
    strokeDashoffset: 0,
    delay: -1,
    duration: 2,
    ease: Expo.easeInOut,
    stagger: 0.5,
  });
};

const locoInitialize = () => {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
};

revealToSpan();
setValue();
loaderAnim();
locoInitialize();
