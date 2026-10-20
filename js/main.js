// Add a class immediately so animation styles only apply when JavaScript works.
document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");
const menuLinks = document.querySelectorAll(".nav__menu a");
const revealItems = document.querySelectorAll(".reveal");

// Give the fixed navigation a solid background after the page starts scrolling.
function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Open and close the mobile navigation while keeping its accessibility state current.
menuButton?.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
});
menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

// Reveal content as it enters the viewport. CSS includes a reduced-motion fallback.
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: .12 });
revealItems.forEach((item) => revealObserver.observe(item));

// Keep the copyright year current without requiring a yearly HTML edit.
document.querySelector("#current-year").textContent = new Date().getFullYear();

// Expand technical figures without introducing a gallery dependency.
const lightbox = document.querySelector(".lightbox");
if (lightbox) {
    const lightboxImage = lightbox.querySelector("img");
    const lightboxCaption = lightbox.querySelector("p");
    document.querySelectorAll("[data-lightbox]").forEach((button) => {
        button.addEventListener("click", () => {
            lightboxImage.src = button.dataset.lightbox;
            lightboxImage.alt = button.querySelector("img")?.alt || "Expanded CFD result";
            lightboxCaption.textContent = button.dataset.caption || "";
            lightbox.showModal();
        });
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });
}
