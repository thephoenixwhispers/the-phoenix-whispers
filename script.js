// ===============================
// THE PHOENIX WHISPERS
// Global JavaScript
// ===============================

// Loader
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 800);
    }

    revealOnScroll();
    startCounters();
});

// --------------------
// Reveal Animation
// --------------------

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach(section => {
        const top = section.getBoundingClientRect().top;

        if (top < window.innerHeight - 80) {
            section.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

// --------------------
// Progress Bar
// --------------------

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

    if (progressBar) {

        const scrollTop =
            document.documentElement.scrollTop ||
            document.body.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        progressBar.style.width =
            (scrollTop / scrollHeight) * 100 + "%";
    }
});

// --------------------
// Back To Top
// --------------------

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 400) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

// --------------------
// Quote Carousel
// --------------------

const quotes = [

"Some stories do not ask to be perfect. They only ask to be heard.",

"Some journeys are not about reaching somewhere. They are about surviving the road.",

"Not every voice is loud. Some survive as whispers.",

"The phoenix remembers the fire but still chooses to fly.",

"Every scar carries a story worth telling."

];

const quoteText = document.getElementById("quoteText");

let quoteIndex = 0;

if (quoteText) {

    setInterval(() => {

        quoteIndex++;

        if (quoteIndex >= quotes.length)
            quoteIndex = 0;

        quoteText.style.opacity = 0;

        setTimeout(() => {

            quoteText.innerText = quotes[quoteIndex];

            quoteText.style.opacity = 1;

        }, 350);

    }, 5000);

}

// --------------------
// Animated Counters
// --------------------

const counters = document.querySelectorAll("[data-count]");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const stats = document.querySelector(".stats");

    if (!stats) return;

    if (stats.getBoundingClientRect().top < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const target = Number(counter.dataset.count);

            let current = 0;

            const speed = Math.max(1, Math.ceil(target / 60));

            const timer = setInterval(() => {

                current += speed;

                if (current >= target) {

                    counter.innerText = target;

                    clearInterval(timer);

                } else {

                    counter.innerText = current;

                }

            }, 30);

        });

    }

}

window.addEventListener("scroll", startCounters);

// --------------------
// Navigation Dropdown
// --------------------

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {

    const button = item.querySelector(".nav-button");

    if (!button) return;

    button.addEventListener("click", e => {

        e.stopPropagation();

        navItems.forEach(other => {

            if (other !== item)

                other.classList.remove("active");

        });

        item.classList.toggle("active");

    });

});

document.addEventListener("click", () => {

    navItems.forEach(item =>

        item.classList.remove("active")

    );

});
