const dialogCloseBtn = document.querySelector(".modal-close-btn");
const dialog = document.querySelector(".modal");
const formSubmit = document.querySelector(".form-group input[type='submit']");
const burgerMenuBtn = document.querySelector(".burger-menu-container");
const filter = document.getElementById("filter-sort");

const FEATURED = [0, 1, 2, 3, 4];
const NEWEST = [4];
const BEST_SELLING = [3, 4, 1, 0, 2];
const P_L_TO_H = [4, 2, 1, 3, 0];
const ALLPRODUCTS = document.querySelectorAll(".product-container");

const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(
        ".slider-wrapper .slide-button"
    );
    const sliderScrollbar = document.querySelector(
        ".slider-wrapper .slider-scrollbar"
    );
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition =
            sliderScrollbar.getBoundingClientRect().width -
            scrollbarThumb.offsetWidth;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const boundedPosition = Math.max(
                0,
                Math.min(maxThumbPosition, newThumbPosition)
            );
            const scrollPosition =
                (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });
    slideButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
    const handleSlideButtons = () => {
        slideButtons[0].style.display =
            imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display =
            imageList.scrollLeft >= maxScrollLeft - 10 ? "none" : "flex";
    };
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition =
            (scrollPosition / maxScrollLeft) *
            (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
};

const dialogCloseBtnOnClick = () => dialog.close();
window.onload = (e) => {
    if (dialog) {
        dialog.showModal();
    }
};

const submitForm = () => {
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    console.log(firstNameInput.value, lastNameInput.value, emailInput.value);
    window.alert("submitted");

    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
};

if (formSubmit) {
    formSubmit.addEventListener("click", submitForm);
}

if (dialogCloseBtn) {
    dialogCloseBtn.addEventListener("click", dialogCloseBtnOnClick);
}

const toggleBurgerMenu = () => {
    const headerWrapper = document.querySelector(".header-wrapper");
    const navWrapper = document.querySelector(".header-wrapper nav");
    const searchCartWrapper = document.querySelector(".search-cart-wrapper");
    const lines = document.querySelectorAll(".line");
    console.log(navWrapper.style.display);
    if (navWrapper.style.display === "block") {
        headerWrapper.style.gridTemplateRows = "auto";
        navWrapper.style.display = "none";
        searchCartWrapper.style.display = "none";
        lines.forEach(function (line) {
            line.classList.remove("active");
        });
    } else {
        headerWrapper.style.gridTemplateRows = "repeat(3,1fr)";
        headerWrapper.style.rowGap = "10px";
        navWrapper.style.display = "block";
        navWrapper.style.gridColumn = "1 / -1";
        searchCartWrapper.style.display = "flex";
        searchCartWrapper.style.gridColumn = "1 / -1";
        lines.forEach(function (line) {
            line.classList.add("active");
        });
    }
};

const filterSort = (e) => {
    const value = e.target.value;

    const productsWrapper = document.querySelector(".products-wrapper");

    ALLPRODUCTS.forEach((product) => {
        product.remove();
    });

    if (value === "featured") {
        FEATURED.forEach((index) => {
            productsWrapper.appendChild(ALLPRODUCTS[index]);
        });
    }
    if (value === "newest") {
        NEWEST.forEach((index) => {
            productsWrapper.appendChild(ALLPRODUCTS[index]);
        });
    }
    if (value === "best-selling") {
        BEST_SELLING.forEach((index) => {
            productsWrapper.appendChild(ALLPRODUCTS[index]);
        });
    }
    if (value === "l-to-h") {
        P_L_TO_H.forEach((index) => {
            productsWrapper.appendChild(ALLPRODUCTS[index]);
        });
    }
};

burgerMenuBtn.addEventListener("click", toggleBurgerMenu);
if (filter) {
    filter.addEventListener("change", filterSort);
}
window.addEventListener("resize", () => {
    initSlider();
});
window.addEventListener("load", initSlider);
