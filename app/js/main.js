document.addEventListener("DOMContentLoaded", () => {
  const isParent = (parent, child) => {
    let currentParent = child.parentElement;
    let isParent = false;
    while (currentParent) {
      isParent = parent === currentParent;
      if (isParent) {
        currentParent = null;
      } else {
        currentParent = currentParent.parentElement;
      }
    }
    return isParent;
  };

  //--мобильное меню--
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const bodyLock = document.body;
  burger.addEventListener("click", (e) => {
    let burgerTarget = e.target === burger;
    if (burgerTarget || isParent(burger, e.target)) {
      mobileMenu.classList.toggle("mobile-menu--active");
      if (mobileMenu.classList.contains("mobile-menu--active")) {
        burger.classList.add("burger--active");
        bodyLock.classList.add("lock");
      } else {
        burger.classList.remove("burger--active");
        bodyLock.classList.remove("lock");
      }
    }
  });
  document.addEventListener("click", function (e) {
    if (e.target !== burger && e.target !== mobileMenu) {
      burger.classList.remove("burger--active");
      mobileMenu.classList.remove("mobile-menu--active");
      bodyLock.classList.remove("lock");
    }
  });

  const specialistSlider = document.querySelector(".our-specialists-slider");
  const specialistSliderImg = document.querySelector(".specialist-img-slider");
  const promotionSlider = document.querySelector(".promotions-slider");
  if ((specialistSlider, specialistSliderImg)) {
    let sliderText = new Swiper(".our-specialists-slider", {
      slidesPerView: 1,
      loop: true,
      loopedSlides: 3,
      spaceBetween: 50,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      allowTouchMove: false,
      speed: 250,
    });

    let sliderImg = new Swiper(".specialist-img-slider", {
      slidesPerView: 1,
      grabCursor: true,
      loop: true,
      loopedSlides: 3,
      speed: 500,
      navigation: {
        nextEl: ".our-specialist__btn-next",
        prevEl: ".our-specialist__btn-prev",
      },
      thumbs: {
        swiper: sliderText,
      },
      effect: "creative",
      creativeEffect: {
        prev: {
          opacity: 0,
          translate: ["0%", 0, -1],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      },
    });
  }
  if (promotionSlider) {
    const promotionSwiper = new Swiper(".promotions-slider", {
      loop: true,
      loopedSlides: 3,
      spaceBetween: 25,
      navigation: {
        nextEl: ".our-promotions__btn-next",
        prevEl: ".our-promotions__btn-prev",
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
        },
        578: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
      },
    });
  }

  const reviewsSlider = document.querySelector(".reviews-slider");
  if (reviewsSlider) {
    const reviewsSwiper = new Swiper(".reviews-slider", {
      direction: "vertical",
      slidesPerView: 3,
      spaceBetween: 10,
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
        dragSize: 159,
      },
      mousewheel: true,
    });
  }

  const gallerySlider = document.querySelector(".gallery-slider");
  if (gallerySlider) {
    const gallerySwiper = new Swiper(".gallery-slider", {
      spaceBetween: 20,
      slidesPerView: 2,
      navigation: {
        nextEl: ".our-gallery__btn-next",
        prevEl: ".our-gallery__btn-prev",
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
        },
        578: {
          slidesPerView: 2,
        },
      },
    });
  }

  //? Модальное окно отзывов
  // Elements UI
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal__content");
  const showModalBtn = document.querySelector(".hero__btn");
  const showModalBtns = document.querySelectorAll(".promotions-card__btn");
  const closeBtn = document.querySelector(".modal__close-btn");

  //Events
  if (showModalBtns) {
    showModalBtns.forEach((elem) => elem.addEventListener("click", showModal));
    closeBtn.addEventListener("click", closeModal);
  }

  if (showModalBtn) {
    showModalBtn.addEventListener("click", showModal);
    closeBtn.addEventListener("click", closeModal);
  }

  function showModal(e) {
    modal.classList.add("modal--active");
    modal.addEventListener("click", closeModal);
    const currentWorkName = getCurrentWorkName(e);
    if (currentWorkName) {
      const input = document.querySelector(".modal-form").elements["workName"];
      input.value = String(currentWorkName).trim();
      console.log(input.value);
    }
  }

  function getCurrentWorkName(e) {
    if (!e.target.classList.contains("promotions-card__btn")) {
      return;
    }
    const parent = e.target.closest(".promotions-card");
    const currentValue = parent.querySelector(
      ".promotions-card__name"
    ).textContent;
    return currentValue;
  }

  function closeModal({ target }) {
    if (
      (target !== modalContent && !isParent(modalContent, target)) ||
      target === closeBtn
    ) {
      modal.classList.remove("modal--active");
      modal.removeEventListener("click", closeModal);
    }
  }
});

$(document).ready(function () {
  //--маска для поля телефон---
  $(".contact-form__input").mask("8 (799) 999-99-99");
});
