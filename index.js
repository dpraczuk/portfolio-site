

const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 20,
    initialSlide: 1,
});

const body = document.querySelector("body");
const themeBtn = document.querySelector('.theme-switch');
const stackIcons = document.querySelectorAll('.stack__icon');

const changeTheme = () => {
    body.classList.toggle('dark');
    stackIcons.forEach(icon => {
        icon.style.opacity = "0"
})
}
//Nav buttons

const contactBtn = document.querySelector('.menu__item--contact');
const aboutBtn = document.querySelector('.menu__item--about');
const projectsBtn = document.querySelector('.menu__item--projects');
const workBtn = document.querySelector('.menu__item--work')

//sections buttons

const projectsSection = document.querySelector('.projects-wrapper');
const contactSection = document.querySelector('.contact-wrapper');
const aboutSection = document.querySelector('.about-wrapper');
const workSection = document.querySelector('.stack-wrapper');

const scrollTo = (element) => {
    element.scrollIntoView({block: "start", behavior: "smooth"})
}

//Theme toggler

themeBtn.addEventListener("click", changeTheme);

//Scroll to section on click

projectsBtn.addEventListener("click", () => (scrollTo(projectsSection)))
workBtn.addEventListener("click", () => (scrollTo(workSection)))
aboutBtn.addEventListener("click", () => (scrollTo(aboutSection)))
contactBtn.addEventListener("click", () => (scrollTo(contactSection)))

const projectsItems = document.querySelectorAll('.projects__item-wrapper .item');

//project items mouseover event
projectsItems.forEach((item) => {
    item.addEventListener('mouseenter', function() {
        item.firstElementChild.style.opacity = '0.95'
    })
    item.addEventListener('mouseleave', function() {
        item.firstElementChild.style.opacity = '0'
    })
})

const techStackItems = document.querySelectorAll('.item__techStack')

//toggle projects techStack div
window.addEventListener("resize", () => {
    if(window.innerWidth <= 1060) {
        projectsItems.forEach(item => {
            item.classList.add('mobile')
        })
    } else {
        projectsItems.forEach(item => {
            item.classList.remove('mobile')
        })
    }
})

const sideNav = document.querySelector('.side-nav');

//side navigation onscroll opacity

window.addEventListener("scroll", () => {
    if(workSection.getBoundingClientRect().y < 0) {
        sideNav.style.opacity = "0";
        setTimeout(() => {
            sideNav.classList.add("side-nav--hidden")
        }, 500)
    } else {
        sideNav.style.opacity = "1";
        setTimeout(() => {
            sideNav.classList.remove("side-nav--hidden")
        }, 500)
    }
})

//tech stack icons onscroll 

window.addEventListener("scroll", () => {

    if(workSection.getBoundingClientRect().y < 400) {
        stackIcons.forEach(icon => {
            icon.classList.add("stack__icon--active")
        })
    }
})