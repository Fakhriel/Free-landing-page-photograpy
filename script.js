// ==================== INITIALIZE LENIS SMOOTH SCROLL ====================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate with GSAP
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

// ==================== MOBILE MENU (SLIDE-IN) ====================
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
    mobileMenu.classList.add('active');
    lenis.stop();
    // Stagger animation for menu items
    gsap.fromTo('.mobile-link', 
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
    gsap.fromTo('.mobile-social a', 
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, delay: 0.3 }
    );
}

function closeMenuFunc() {
    mobileMenu.classList.remove('active');
    lenis.start();
}

mobileToggle.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFunc);

mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenuFunc();
        const target = link.getAttribute('href');
        const section = document.querySelector(target);
        if (section) {
            lenis.scrollTo(section);
        }
    });
});

// ==================== HERO COLOR TOGGLE ====================
const toggleBtn = document.getElementById('colorToggle');
const heroBg = document.getElementById('heroBg');

toggleBtn.addEventListener('click', () => {
    heroBg.classList.toggle('color');
});

// ==================== DESKTOP NAVIGATION HOVER ANIMATION (GSAP) ====================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    // Buat elemen underline (jika belum ada) atau gunakan pseudo-element
    // Kita akan animasi width pseudo-element dengan GSAP
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            duration: 0.3,
            ease: 'power2.out',
            onUpdate: function() {
                // Tidak perlu, kita akan animasi pseudo langsung? Tapi GSAP tidak bisa animasi pseudo langsung.
                // Alternatif: buat span di dalam link untuk underline
            }
        });
        // Lebih mudah: animasi properti custom? Kita bisa animasi scaleX dari pseudo dengan menambahkan elemen tambahan.
        // Untuk simplicity, kita gunakan CSS transition yang sudah ada. Tapi requirement minta GSAP.
        // Maka kita buat elemen span di dalam setiap link untuk underline, lalu animasi width-nya.
        // Namun di HTML kita tidak punya span. Kita bisa tambahkan via JS? Tapi akan merusak struktur.
        // Solusi: gunakan GSAP untuk mengubah scaleX dari pseudo-element dengan properti --width? Tidak bisa.
        // Alternatif: kita buat div underline absolut di setiap link, lalu animasi dengan GSAP.
        // Kita lakukan sekali saat inisialisasi.
    });
});

// Implementasi GSAP hover: buat underline element untuk setiap link
navLinks.forEach(link => {
    // Buat elemen underline
    const underline = document.createElement('span');
    underline.style.position = 'absolute';
    underline.style.bottom = '0';
    underline.style.left = '0';
    underline.style.width = '0%';
    underline.style.height = '2px';
    underline.style.backgroundColor = 'white';
    underline.style.transition = 'none'; // kita pakai GSAP
    underline.style.pointerEvents = 'none';
    link.style.position = 'relative';
    link.appendChild(underline);

    link.addEventListener('mouseenter', () => {
        gsap.to(underline, { width: '100%', duration: 0.3, ease: 'power2.out' });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(underline, { width: '0%', duration: 0.3, ease: 'power2.out' });
    });
});

// ==================== CARD STACK SHUFFLE (GSAP) ====================
const stackContainer = document.getElementById('stackContainer');
const cards = gsap.utils.toArray('.stack-card');
const prevBtn = document.getElementById('prevCard');
const nextBtn = document.getElementById('nextCard');
let currentIndex = 0; // index of top card

function updateStack() {
    const total = cards.length;
    cards.forEach((card, index) => {
        let position = (index - currentIndex + total) % total;
        let zIndex = total - position;
        let scale = position === 0 ? 1 : 1 - (position * 0.02);
        let y = position * 10;
        let rotation = position % 2 === 0 ? position * 1 : -position * 1;
        let opacity = 1 - (position * 0.1);

        gsap.to(card, {
            zIndex: zIndex,
            scale: scale,
            y: y,
            rotation: rotation,
            opacity: opacity,
            duration: 0.6,
            ease: 'power2.out'
        });
    });
}

function nextCard() {
    const total = cards.length;
    currentIndex = (currentIndex + 1) % total;
    updateStack();
    // Animasi tambahan untuk kartu yang berpindah
    const movingCard = cards[(currentIndex - 1 + total) % total];
    gsap.fromTo(movingCard,
        { scale: 1, y: 0, rotation: 0 },
        { scale: 0.8, y: 100, rotation: 15, duration: 0.3, ease: 'power2.in' }
    );
}

function prevCard() {
    const total = cards.length;
    currentIndex = (currentIndex - 1 + total) % total;
    updateStack();
    const movingCard = cards[currentIndex];
    gsap.fromTo(movingCard,
        { scale: 0.8, y: 100, rotation: -15 },
        { scale: 1, y: 0, rotation: 0, duration: 0.6, ease: 'power2.out' }
    );
}

nextBtn.addEventListener('click', nextCard);
prevBtn.addEventListener('click', prevCard);

// Auto shuffle setiap 5 detik
let autoShuffle = setInterval(nextCard, 5000);
stackContainer.addEventListener('mouseenter', () => clearInterval(autoShuffle));
stackContainer.addEventListener('mouseleave', () => {
    autoShuffle = setInterval(nextCard, 5000);
});

updateStack();

// ==================== PROJECT DETAIL MODAL ====================
const modal = document.getElementById('projectModal');
const modalContent = modal.querySelector('.modal-content');
const modalClose = modal.querySelector('.modal-close');
const modalOverlay = modal.querySelector('.modal-overlay');

// Data proyek (bisa diperluas)
const projectData = {
    1: {
        title: 'Silence',
        description: 'A series capturing the quiet moments in Iceland’s vast landscapes. Shot on medium format film.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
        location: 'Iceland',
        year: '2025'
    },
    2: {
        title: 'Shadow Play',
        description: 'Urban portraits exploring the interplay of light and shadow in New York City streets.',
        image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&auto=format&fit=crop&q=80',
        location: 'New York',
        year: '2024'
    },
    3: {
        title: 'Ethereal',
        description: 'Misty landscapes of Norway, where reality blurs into dreams.',
        image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80',
        location: 'Norway',
        year: '2024'
    },
    4: {
        title: 'Faces',
        description: 'Intimate portraits of Parisian artists in their natural habitats.',
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=80',
        location: 'Paris',
        year: '2023'
    },
    5: {
        title: 'Horizon',
        description: 'Minimalist seascapes from the coast of Japan, where sky meets water.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80',
        location: 'Japan',
        year: '2023'
    }
};

document.querySelectorAll('.view-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.getAttribute('data-project');
        const data = projectData[projectId];
        if (data) {
            modalContent.innerHTML = `
                <img src="${data.image}" alt="${data.title}">
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                <p><strong>Location:</strong> ${data.location} · ${data.year}</p>
            `;
            modal.classList.add('active');
            lenis.stop();
        }
    });
});

function closeModal() {
    modal.classList.remove('active');
    lenis.start();
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// ==================== TWO-SCROLL ANIMATION (DUAL DIRECTION) ====================
// Section dengan dua kolom: kiri bergerak ke atas, kanan ke bawah saat scroll
const dualSection = document.querySelector('.dual-scroll');
const leftCol = document.querySelector('.left-col');
const rightCol = document.querySelector('.right-col');

if (dualSection && leftCol && rightCol) {
    // Animasi untuk kolom kiri: bergerak ke atas
    gsap.to(leftCol, {
        y: '-20%', // naik 20% dari posisi awal
        ease: 'none',
        scrollTrigger: {
            trigger: dualSection,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true
        }
    });

    // Animasi untuk kolom kanan: bergerak ke bawah
    gsap.to(rightCol, {
        y: '20%', // turun 20%
        ease: 'none',
        scrollTrigger: {
            trigger: dualSection,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true
        }
    });
}

// ==================== EXPERIENCE COUNTER ANIMATION ====================
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(num => {
    const target = parseInt(num.getAttribute('data-target'));
    const obj = { value: 0 };
    ScrollTrigger.create({
        trigger: num,
        start: 'top 80%',
        onEnter: () => {
            gsap.to(obj, {
                value: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => num.innerText = Math.floor(obj.value),
                onComplete: () => num.innerText = target
            });
        },
        once: true
    });
});

// ==================== FORM SUBMIT ====================
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! (Demo)');
    form.reset();
});

// ==================== REFRESH SCROLLTRIGGER ====================
ScrollTrigger.addEventListener('refresh', () => lenis.resize());
ScrollTrigger.refresh();