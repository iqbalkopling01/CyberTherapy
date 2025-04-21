// nav background
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow-md", window.scrollY > 0); // Use Tailwind's shadow-md
});

//Filter
$(document).ready(function () {
    $(".filter-item").click(function () {
        const value = $(this).attr("data-filter");
        if (value == "all") {
            $(".post-box").show("1000");
        } else {
            $(".post-box")
                .not("." + value)
                .hide(1000);
            $(".post-box")
                .filter("." + value)
                .show("1000");
        }
    });
    $(".filter-item").click(function () {
        $(this).addClass("font-bold text-blue-500").siblings().removeClass("font-bold text-blue-500"); // Replace active-filter with Tailwind classes
    });
});

/////menu==================

const menuToggle = document.getElementById("menu-toggle");
const headerNav = document.getElementById("header-nav");

menuToggle.addEventListener("click", () => {
    headerNav.classList.toggle("block"); // Use Tailwind's block class
    headerNav.classList.toggle("hidden"); // Use Tailwind's hidden class
});

// Ensure the following Tailwind classes are present in the HTML:
// - `shadow-md` for the header shadow effect on scroll
// - `font-bold` and `text-blue-500` for the active filter styling
// - `block` and `hidden` for toggling the menu visibility

