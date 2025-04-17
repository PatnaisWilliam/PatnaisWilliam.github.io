document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active")
      })
    }
  
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          })
  
          if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active")
          }
        }
      })
    })
  
    const skillBars = document.querySelectorAll(".skill-progress-bar")
  
    function animateSkillBars() {
      skillBars.forEach((bar) => {
        const width = bar.getAttribute("data-width")
        bar.style.width = width + "%"
      })
    }
  
    function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
    }
  
    function checkSkillBars() {
      const skillsSection = document.querySelector(".skills")
      if (skillsSection && isInViewport(skillsSection)) {
        animateSkillBars()
        window.removeEventListener("scroll", checkSkillBars)
      }
    }
  
    window.addEventListener("scroll", checkSkillBars)
    checkSkillBars() 
  
    const contactForm = document.getElementById("contact-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const submitButton = contactForm.querySelector('button[type="submit"]')
        const originalButtonText = submitButton.innerHTML
  
        submitButton.innerHTML = '<span class="loading-spinner"></span> Envoi en cours...'
        submitButton.disabled = true
  
        setTimeout(() => {
          submitButton.innerHTML = originalButtonText
          submitButton.disabled = false
  
          alert("Message envoyé avec succès! Je vous répondrai dans les plus brefs délais.")
  
          contactForm.reset()
        }, 2000)
      })
    }
  
    const terminalCursor = document.querySelector(".terminal-cursor")
    if (terminalCursor) {
      setInterval(() => {
        terminalCursor.style.opacity = terminalCursor.style.opacity === "0" ? "1" : "0"
      }, 500)
    }
  
    function updateActiveNavLink() {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add("active")
        } else {
          document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove("active")
        }
      })
    }
  
    window.addEventListener("scroll", updateActiveNavLink)
    updateActiveNavLink()
  })
  