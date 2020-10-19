import gsap from "gsap"

export const toSignUpAnimation = () => {
    const item = document.querySelectorAll(".login_container")
    gsap.fromTo(item, { x: 0, autoAlpha: 1 }, { x: 330, autoAlpha: 1, duration: 0, ease: "none" })
}

export const toLogInAnimation = () => {
    const item = document.querySelectorAll(".login_container")
    gsap.fromTo(item, { x: 330, autoAlpha: 1 }, { x: 0, autoAlpha: 1, duration: 0, ease: "none" })
}


