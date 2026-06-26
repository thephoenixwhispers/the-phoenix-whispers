// =======================================
// THE PHOENIX WHISPERS — GLOBAL SCRIPT
// Part 1: Core, Loader, Progress, BackTop
// =======================================

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initProgressBar();
  initBackToTop();
  initRevealAnimation();
  initDropdownNavigation();
  initQuoteCarousel();
  initCounters();
  initEmbers();
  initMouseGlow();
  initBookHover3D();
  initReaderTools();
});

/* ---------- Loader ---------- */

function initLoader(){
  const loader = document.getElementById("loader");
  if(!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 800);
  });
}

/* ---------- Scroll Progress Bar ---------- */

function initProgressBar(){
  const progressBar = document.getElementById("progress-bar");
  if(!progressBar) return;

  window.addEventListener("scroll", () => {
    const scrollTop =
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if(scrollHeight <= 0) return;

    progressBar.style.width =
      (scrollTop / scrollHeight) * 100 + "%";
  });
}

/* ---------- Back To Top ---------- */

function initBackToTop(){
  const backToTop = document.getElementById("backToTop");
  if(!backToTop) return;

  window.addEventListener("scroll", () => {
    backToTop.style.display =
      window.scrollY > 400 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  });
}

/* ---------- Reveal Animation ---------- */

function initRevealAnimation(){
  const reveals = document.querySelectorAll(".reveal");
  if(!reveals.length) return;

  function revealOnScroll(){
    reveals.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if(top < window.innerHeight - 80){
        section.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
  revealOnScroll();
}
/* =======================================
   Part 2 : Dropdown + Quote + Counters
=======================================*/

/* ---------- Navigation Dropdown ---------- */

function initDropdownNavigation(){

  const navItems = document.querySelectorAll(".nav-item");

  if(!navItems.length) return;

  navItems.forEach(item=>{

    const button=item.querySelector(".nav-button");

    if(!button) return;

    button.addEventListener("click",e=>{

      e.stopPropagation();

      navItems.forEach(other=>{

        if(other!==item)
          other.classList.remove("active");

      });

      item.classList.toggle("active");

    });

  });

  document.addEventListener("click",()=>{

    navItems.forEach(item=>{

      item.classList.remove("active");

    });

  });

}


/* ---------- Quote Carousel ---------- */

function initQuoteCarousel(){

  const quote=document.getElementById("quoteText");

  if(!quote) return;

  const quotes=[

"Some stories do not ask to be perfect. They only ask to be heard.",

"Some journeys are not about reaching somewhere. They are about surviving the road.",

"Not every voice is loud. Some survive as whispers.",

"The phoenix remembers the fire but still chooses to fly.",

"Stories heal people long after they are written.",

"Every scar deserves to become a story."

  ];

  let current=0;

  setInterval(()=>{

    quote.style.opacity=0;

    setTimeout(()=>{

      current++;

      if(current>=quotes.length)
        current=0;

      quote.innerText=quotes[current];

      quote.style.opacity=1;

    },350);

  },5000);

}


/* ---------- Animated Counters ---------- */

function initCounters(){

  const counters=document.querySelectorAll("[data-count]");

  if(!counters.length) return;

  let started=false;

  function animate(){

    if(started) return;

    const stats=document.querySelector(".stats");

    if(!stats) return;

    if(stats.getBoundingClientRect().top<window.innerHeight-120){

      started=true;

      counters.forEach(counter=>{

        const target=parseInt(counter.dataset.count);

        let current=0;

        const increment=Math.max(1,Math.ceil(target/60));

        const timer=setInterval(()=>{

          current+=increment;

          if(current>=target){

            current=target;

            clearInterval(timer);

          }

          counter.innerText=current;

        },30);

      });

    }

  }

  window.addEventListener("scroll",animate);

  animate();

}
/* =======================================
   Part 3 : Embers + Mouse Glow + 3D Hover
=======================================*/

/* ---------- Floating Embers ---------- */

function initEmbers(){

  const emberBox = document.getElementById("embers");

  if(!emberBox) return;

  if(emberBox.dataset.ready === "true") return;

  emberBox.dataset.ready = "true";

  const count = window.innerWidth < 800 ? 18 : 38;

  for(let i=0;i<count;i++){

    const ember = document.createElement("span");

    ember.className = "ember";

    ember.style.left = Math.random() * 100 + "%";

    ember.style.animationDuration = 5 + Math.random() * 6 + "s";

    ember.style.animationDelay = Math.random() * 5 + "s";

    ember.style.opacity = .25 + Math.random() * .65;

    ember.style.width = 3 + Math.random() * 4 + "px";

    ember.style.height = ember.style.width;

    emberBox.appendChild(ember);

  }

}


/* ---------- Mouse Glow ---------- */

function initMouseGlow(){

  if(window.innerWidth < 800) return;

  if(document.getElementById("cursor-glow")) return;

  const glow = document.createElement("div");

  glow.id = "cursor-glow";

  document.body.appendChild(glow);

  document.addEventListener("mousemove", e => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

  });

  document.addEventListener("mouseleave", () => {

    glow.style.opacity = "0";

  });

  document.addEventListener("mouseenter", () => {

    glow.style.opacity = ".75";

  });

}


/* ---------- 3D Book Hover ---------- */

function initBookHover3D(){

  const books = document.querySelectorAll(".book-cover, .cover");

  if(!books.length) return;

  books.forEach(book => {

    book.addEventListener("mousemove", e => {

      const rect = book.getBoundingClientRect();

      const x = e.clientX - rect.left;

      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 14;

      const rotateX = ((y / rect.height) - 0.5) * -14;

      book.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

    });

    book.addEventListener("mouseleave", () => {

      book.style.transform = "";

    });

  });

}


/* ---------- Button Ripple Effect ---------- */

document.addEventListener("click", e => {

  const button = e.target.closest(".btn");

  if(!button) return;

  const ripple = document.createElement("span");

  ripple.style.position = "absolute";

  ripple.style.borderRadius = "50%";

  ripple.style.transform = "scale(0)";

  ripple.style.animation = "ripple .6s linear";

  ripple.style.background = "rgba(255,255,255,.35)";

  ripple.style.pointerEvents = "none";

  const rect = button.getBoundingClientRect();

  const size = Math.max(rect.width, rect.height);

  ripple.style.width = ripple.style.height = size + "px";

  ripple.style.left = e.clientX - rect.left - size / 2 + "px";

  ripple.style.top = e.clientY - rect.top - size / 2 + "px";

  button.style.position = "relative";

  button.style.overflow = "hidden";

  button.appendChild(ripple);

  setTimeout(() => {

    ripple.remove();

  }, 650);

});
/* =======================================
   Part 4 : Reader Tools + Utilities
=======================================*/

/* ---------- Reader Mode ---------- */

function initReaderTools(){

  const article = document.getElementById("article");

  if(article){

    calculateReadingTime(article);

  }

}


/* ---------- Reading Time ---------- */

function calculateReadingTime(article){

  const readingTime = document.getElementById("readingTime");

  if(!readingTime) return;

  const words = article.innerText.trim().split(/\s+/).length;

  const minutes = Math.max(1, Math.ceil(words / 200));

  readingTime.innerText = minutes + " min read";

}


/* ---------- Font Controls ---------- */

let currentFontSize = 21;

window.increaseFont = function(){

  const article = document.getElementById("article");

  if(!article) return;

  currentFontSize += 2;

  article.style.fontSize = currentFontSize + "px";

}

window.decreaseFont = function(){

  const article = document.getElementById("article");

  if(!article) return;

  if(currentFontSize > 15){

    currentFontSize -= 2;

    article.style.fontSize = currentFontSize + "px";

  }

}


/* ---------- Dark / Light Mode ---------- */

window.toggleTheme = function(){

  document.body.classList.toggle("light-mode");

}


/* ---------- Copy Link ---------- */

window.copyLink = function(){

  navigator.clipboard.writeText(window.location.href);

  alert("Story link copied!");

}


/* ---------- Lazy Images ---------- */

const lazyImages = document.querySelectorAll("img[data-src]");

if(lazyImages.length){

  const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

      if(entry.isIntersecting){

        const img = entry.target;

        img.src = img.dataset.src;

        img.removeAttribute("data-src");

        observer.unobserve(img);

      }

    });

  });

  lazyImages.forEach(img=>observer.observe(img));

}


/* ---------- Ripple Animation CSS ---------- */

const rippleStyle=document.createElement("style");

rippleStyle.innerHTML=`

@keyframes ripple{

0%{

transform:scale(0);

opacity:.6;

}

100%{

transform:scale(4);

opacity:0;

}

}

`;

document.head.appendChild(rippleStyle);


/* ---------- Console ---------- */

console.log(

"%cThe Phoenix Whispers",

"font-size:18px;color:#ffcc33;font-weight:bold"

);

console.log(

"Website Loaded Successfully."

);
