// =============== CUSTOM CURSOR — WINE GLOW DOT (GLOBAL) ===============
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    function attachCursorHover() {
        document.querySelectorAll('a, button, .skill-tag, .glass-card, .skill-flip-card, .dr-metric-card, .project-card, input, textarea').forEach(el => {
            el.removeEventListener('mouseenter', cursorEnter);
            el.removeEventListener('mouseleave', cursorLeave);
            el.addEventListener('mouseenter', cursorEnter);
            el.addEventListener('mouseleave', cursorLeave);
        });
    }

    function cursorEnter() { cursorGlow.classList.add('hover'); }
    function cursorLeave() { cursorGlow.classList.remove('hover'); }

    attachCursorHover();
}

// =============== LANDING PAGE — TYPEWRITER ===============
const landingHello = document.getElementById('landingHello');
const landingSubtitle = document.getElementById('landingSubtitle');
const landingBtnWrapper = document.getElementById('landingBtnWrapper');
const helloText = "Finally, You're Here.";
let helloIndex = 0;

document.body.style.overflow = 'hidden';

function typeLandingHello() {
    if (helloIndex < helloText.length) {
        landingHello.textContent = helloText.substring(0, helloIndex + 1);
        helloIndex++;
        setTimeout(typeLandingHello, 100);
    } else {
        setTimeout(() => {
            landingSubtitle.classList.add('show');
        }, 400);
        setTimeout(() => {
            landingBtnWrapper.classList.add('show');
        }, 1000);
    }
}

setTimeout(typeLandingHello, 600);

// =============== LANDING BUTTON — ENTER PORTFOLIO ===============
document.getElementById('landing-btn').addEventListener('click', () => {
    const landing = document.getElementById('landing-page');
    const portfolio = document.getElementById('portfolio-main');
    
    landing.classList.add('exit');
    
    setTimeout(() => {
        landing.classList.add('gone');
        portfolio.classList.remove('portfolio-hidden');
        portfolio.classList.add('portfolio-visible');
        document.body.style.overflow = 'auto';
        startTypewriter();
        initParticles();
        if (cursorGlow) setTimeout(attachCursorHover, 100);
    }, 1000);
});

// =============== TYPEWRITER EFFECT (PORTFOLIO HERO) ===============
function startTypewriter() {
    const text = 'Pocharam Nitheesh Reddy';
    const element = document.getElementById('typewriter');
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 80);
        }
    }
    type();
}

// =============== PARTICLE CANVAS (WINE RED) ===============
let particles = [];
let canvas, ctx;

function initParticles() {
    canvas = document.getElementById('particles-canvas');
    ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.25 + 0.05;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 0, 0, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(139, 0, 0, ${0.04 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// =============== NAVBAR ===============
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// =============== ACTIVE NAV LINK ON SCROLL ===============
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// =============== SCROLL ANIMATIONS ===============
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.classList.contains('about-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// =============== COUNTER ANIMATION ===============
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1500;
        const start = performance.now();
        
        function updateCounter(timestamp) {
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * target);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        requestAnimationFrame(updateCounter);
    });
}

// =============== TILT EFFECT ===============
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// =============== BACK TO TOP ===============
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
