const swiperWrapper = document.querySelector('.swiper-wrapper');

const projects = await fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        data.map(item => {
            swiperWrapper.innerHTML += `
                        <div class="projects__item-wrapper swiper-slide">
                            <div id=${item.id} class="item">
                                <div class="item__techStack">
                                    <p>${item.techStack}</p>
                                </div>
                                <div class="item__image portfolio">
                                    <img src="${item.sliderImage}" />
                                </div>
                            </div>
                            <div class="item__subtitle">${item.subtitle}</div>
                        </div>
            `
        });
        data.map(item => {
            const btnTemplate = `<a href="${item.innerItem.link}" target="_blank" rel="noopener noreferrer"><button>${item.innerItem.btnInnerTxt}</button></a>`

            document.body.innerHTML += `
                <div id=${item.id} class="outer-modal hidden"></div>
                <div id=${item.id} class="modal hidden">
                    <div class="modal__titles">
                        <h1>${item.innerItem.title}</h1>
                        <h4>Technologies: ${item.innerItem.technologies}</h4>
                    </div>
                    <div class="modal__content-wrapper">
                        <div class="modal__image">
                            <img src="${item.innerItem.image}">
                        </div>
                        <div class="modal__text-content">
                            <p>${item.innerItem.text}</p>
                            <div class="modal__nav">
                                ${item.innerItem.link === '' ? '' : btnTemplate}
                                <button class="closeBtn">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        })
    })
    .catch(error => console.log(error));

const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 20,
    initialSlide: window.innerWidth <= 1060 ? 0 : 1,
    slideToClickedSlide: true,
});

const body = document.querySelector("body");
const themeBtn = document.querySelector('.theme-switch');
const stackIcons = document.querySelectorAll('.stack__icon');
// let theme = localStorage.getItem('data-theme');

let theme = localStorage.getItem('data-theme');


const changeToLightMode = () => {
    console.log('apply lightmode')
    body.classList.remove('dark');
    localStorage.setItem("data-theme", "light");
}

const changeToDarkMode = () => {
    console.log('apply darkmode')
    body.classList.add('dark');
    localStorage.setItem("data-theme", "dark");
}

if(theme === 'dark') {
    changeToDarkMode();
}


themeBtn.addEventListener("click", () => {
    let theme = localStorage.getItem('data-theme');

    if (theme === 'dark'){
        changeToLightMode();
    }else{
        changeToDarkMode();
    }
})
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

// themeBtn.addEventListener("click", changeTheme);

//Scroll to section on click

projectsBtn.addEventListener("click", () => (scrollTo(projectsSection)))
workBtn.addEventListener("click", () => (scrollTo(workSection)))
aboutBtn.addEventListener("click", () => (scrollTo(aboutSection)))
contactBtn.addEventListener("click", () => (scrollTo(contactSection)))

const projectsItems = document.querySelectorAll('.projects__item-wrapper .item');

const modalsBackground = document.querySelector('.outer-modal');
const modals = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.closeBtn');

let currModal = '';
let currBg = '';

const showModal = (id) => {
    const filteredBg = [...document.querySelectorAll('.outer-modal')].filter( background => {
            if(background.id === id) { 
                background.classList.remove('hidden')
                return background
            } else return
        }
    );
    currBg = filteredBg;

    const filteredModal = [...document.querySelectorAll('.modal')].filter( modal => {
        if(modal.id === id) { 
            modal.classList.remove('hidden')
            return modal
        } else return
    });
    currModal = filteredModal;

}

const closeModal = () => {
    currBg.forEach(item => item.classList.add('hidden'))
    currModal.forEach(item => item.classList.add('hidden'))
}

//close modal on button click
document.querySelectorAll('.closeBtn').forEach( btn => btn.addEventListener('click', closeModal))


// close modal on background click
document.querySelectorAll('.outer-modal').forEach(bg => {
    bg.addEventListener('click', () => {
        if(!bg.classList.contains('hidden')) {
            closeModal();
        }
    })
})

//close modal on escape
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        closeModal();
    }
})

//project items mouseover event
projectsItems.forEach((item) => {
    item.addEventListener('mouseenter', function() {
        item.firstElementChild.style.opacity = '0.95'
    })
    item.addEventListener('mouseleave', function() {
        item.firstElementChild.style.opacity = '0'
    })
    //show Modal
    item.addEventListener('click', (e) => {
        // console.log(e.currentTarget.id)
        showModal(e.currentTarget.id)
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