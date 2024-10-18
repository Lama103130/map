function inView(opt) {
  if (!opt.selector) {
      console.log('Valid selector required for inView');
      return false;
  }

  var elems = Array.from(document.querySelectorAll(opt.selector)),
      once = opt.once ?? true,
      offsetTop = opt.offsetTop ?? 0,
      offsetBot = opt.offsetBot ?? 0,
      winHeight = window.innerHeight,
      ticking = false;

  function update() {
      for (let i = elems.length - 1; i >= 0; i--) {
          let elem = elems[i],
              rect = elem.getBoundingClientRect();

          if (rect.bottom >= offsetTop && rect.top <= winHeight - offsetBot) {
              elem.classList.add('in-view');
              if (once) {
                  elems.splice(i, 1); // Fjerner elementet hvis det kun skal vises én gang
              }
          } else {
              elem.classList.remove('in-view');
          }
      }
      ticking = false;
  }

  function onResize() {
      winHeight = window.innerHeight;
      requestTick();
  }

  function onScroll() {
      requestTick();
  }

  function requestTick() {
      if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
      }
  }

  window.addEventListener('resize', onResize);
  document.addEventListener('scroll', onScroll);
 

  onResize(); 
}


inView({
  selector: '.view-poll',
  once: false,
  offsetTop: 0,
  offsetBot: 50
});
