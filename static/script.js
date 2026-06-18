/* MAIN ORCHESTRATOR v2.6.0 — Anatomically Correct Neural Brain */
(function () {
    'use strict';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const landingHello = document.getElementById('landingHello');
    const landingSubtitle = document.getElementById('landingSubtitle');
    const landingBtnWrapper = document.getElementById('landingBtnWrapper');
    const helloText = "Finally, You're Here.";
    document.body.style.overflow = 'hidden';

    function typeLandingHello() {
        if (!landingHello) return;
        if (reduced) {
            landingHello.textContent = helloText;
            if (landingSubtitle) landingSubtitle.classList.add('show');
            if (landingBtnWrapper) landingBtnWrapper.classList.add('show');
            return;
        }
        let i = 0;
        function tick() {
            if (i < helloText.length) {
                landingHello.textContent = helloText.substring(0, i + 1);
                i++;
                setTimeout(tick, 90);
            } else {
                setTimeout(() => landingSubtitle && landingSubtitle.classList.add('show'), 400);
                setTimeout(() => landingBtnWrapper && landingBtnWrapper.classList.add('show'), 1000);
            }
        }
        tick();
    }
    setTimeout(typeLandingHello, 2200);

    function spawnBurst() {
        const btn = document.getElementById('landing-btn');
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        for (let i = 0; i < 16; i++) {
            const spark = document.createElement('div');
            spark.className = 'burst-spark';
            spark.style.left = cx + 'px';
            spark.style.top = cy + 'px';
            const angle = (Math.PI * 2 * i) / 16 + Math.random() * 0.2;
            const dist = 140 + Math.random() * 100;
            spark.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
            spark.style.setProperty('--by', Math.sin(angle) * dist + 'px');
            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 1300);
        }
    }

    const landingBtn = document.getElementById('landing-btn');
    if (landingBtn) {
        landingBtn.addEventListener('click', () => {
            if (!reduced) spawnBurst();
            const landing = document.getElementById('landing-page');
            const portfolio = document.getElementById('portfolio-main');
            setTimeout(() => {
                landing.classList.add('exit');
                setTimeout(() => {
                    landing.classList.add('gone');
                    portfolio.classList.remove('portfolio-hidden');
                    portfolio.classList.add('portfolio-visible');
                    document.body.style.overflow = 'auto';
                    revealHeroName();
                    loadGlobe();
                    initHeroSpotlight();
                    setTimeout(() => {
                        if (window.__rebindCursor) window.__rebindCursor();
                        if (window.__rebindMagnetic) window.__rebindMagnetic();
                        if (window.__rebindTilt) window.__rebindTilt();
                    }, 100);
                }, 1000);
            }, reduced ? 0 : 200);
        });
    }

    function revealHeroName() {
        const el = document.getElementById('heroName');
        if (!el) return;
        const name = el.getAttribute('data-name') || 'Pocharam Nitheesh Reddy';
        if (reduced) { el.textContent = name; return; }
        el.innerHTML = '';
        const letters = [...name];
        const frag = document.createDocumentFragment();
        letters.forEach((ch) => {
            const span = document.createElement('span');
            span.className = 'name-letter';
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            frag.appendChild(span);
        });
        el.appendChild(frag);
        el.querySelectorAll('.name-letter').forEach((s, i) => {
            setTimeout(() => s.classList.add('visible'), 200 + i * 50);
        });
    }

    function initHeroSpotlight() {
        const hero = document.getElementById('hero');
        const spot = document.getElementById('heroSpotlight');
        if (!hero || !spot) return;
        hero.addEventListener('mousemove', (e) => {
            const r = hero.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            spot.style.setProperty('--sx', x + '%');
            spot.style.setProperty('--sy', y + '%');
        });
    }
    
    function loadGlobe() {
    if (reduced) return;
    if (window.innerWidth < 968) return;
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    if (navigator.deviceMemory && navigator.deviceMemory < 4) return;

    const canvas = document.getElementById('brain-canvas'); // or 'globe-canvas'
    if (!canvas) return;

    const src = 'https://unpkg.com/three@0.160.0/build/three.module.js';
    import(/* @vite-ignore */ src).then((THREE) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 5.5;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        scene.add(new THREE.AmbientLight(0x8b0000, 0.3));
        const dir = new THREE.DirectionalLight(0xa52a2a, 0.6);
        dir.position.set(5, 3, 5);
        scene.add(dir);

        const globe = new THREE.Group();
        scene.add(globe);

        // Main wireframe
        const wireGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2, 4));
        const wireMat = new THREE.LineBasicMaterial({ color: 0x8b0000, transparent: true, opacity: 0.35 });
        globe.add(new THREE.LineSegments(wireGeo, wireMat));

        // Lat/long lines
        const llGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(1.99, 24, 18));
        const llMat = new THREE.LineBasicMaterial({ color: 0x5a0000, transparent: true, opacity: 0.15 });
        globe.add(new THREE.LineSegments(llGeo, llMat));

        // 600 surface particles (fibonacci sphere)
        const N = 600, positions = new Float32Array(N * 3);
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < N; i++) {
            const y = 1 - (i / (N - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = golden * i;
            positions[i*3] = Math.cos(theta) * r * 2.01;
            positions[i*3+1] = y * 2.01;
            positions[i*3+2] = Math.sin(theta) * r * 2.01;
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        globe.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
            color: 0xa52a2a, size: 0.025, sizeAttenuation: true, transparent: true, opacity: 0.7
        })));

        // AWS regions
        const regions = [
            { name: 'Mumbai', lat: 19.07, lng: 72.87 },
            { name: 'Virginia', lat: 38.99, lng: -77.41 },
            { name: 'Ireland', lat: 53.41, lng: -8.24 },
            { name: 'Singapore', lat: 1.35, lng: 103.81 },
            { name: 'Tokyo', lat: 35.41, lng: 139.42 },
            { name: 'Frankfurt', lat: 50.11, lng: 8.68 },
            { name: 'São Paulo', lat: -23.55, lng: -46.63 }
        ];

        function latLngToVec3(lat, lng, radius) {
            const phi = (90 - lat) * Math.PI / 180;
            const theta = (lng + 180) * Math.PI / 180;
            return new THREE.Vector3(
                -radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.cos(phi),
                radius * Math.sin(phi) * Math.sin(theta)
            );
        }

        const regionMeshes = [];
        regions.forEach(r => {
            const pos = latLngToVec3(r.lat, r.lng, 2.05);
            const dot = new THREE.Mesh(
                new THREE.SphereGeometry(0.045, 12, 12),
                new THREE.MeshBasicMaterial({ color: 0xf4e4c1 })
            );
            dot.position.copy(pos);
            globe.add(dot);

            const glow = new THREE.Mesh(
                new THREE.SphereGeometry(0.12, 12, 12),
                new THREE.MeshBasicMaterial({ color: 0xf4e4c1, transparent: true, opacity: 0.25 })
            );
            glow.position.copy(pos);
            globe.add(glow);
            regionMeshes.push({ pos, dot, glow });
        });

        // Arcs
        const arcs = [];
        function createArc(fromIdx, toIdx) {
            const from = regionMeshes[fromIdx].pos.clone();
            const to = regionMeshes[toIdx].pos.clone();
            const mid = from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(2.9);
            const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
            const points = curve.getPoints(50);
            const geo = new THREE.BufferGeometry().setFromPoints(points);
            const mat = new THREE.LineBasicMaterial({ color: 0xf4e4c1, transparent: true, opacity: 0.9 });
            const line = new THREE.Line(geo, mat);
            globe.add(line);
            return { line, geo, mat, progress: 0, points, life: 0, maxLife: 2.5 };
        }

        function spawnArc() {
            if (arcs.length > 3) return;
            const a = Math.floor(Math.random() * regions.length);
            let b = Math.floor(Math.random() * regions.length);
            while (b === a) b = Math.floor(Math.random() * regions.length);
            arcs.push(createArc(a, b));
        }
        setInterval(spawnArc, 1500);

        // Mouse parallax
        let mx = 0, my = 0, cmx = 0, cmy = 0;
        window.addEventListener('mousemove', (e) => {
            mx = (e.clientX / window.innerWidth - 0.5) * 0.4;
            my = (e.clientY / window.innerHeight - 0.5) * 0.4;
        });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        const clock = new THREE.Clock();
        function animate() {
            const dt = clock.getDelta();
            globe.rotation.y += 0.0008;
            cmx += (mx - cmx) * 0.05;
            cmy += (my - cmy) * 0.05;
            globe.rotation.y += cmx * 0.01;
            globe.rotation.x = cmy * 0.5;

            for (let i = arcs.length - 1; i >= 0; i--) {
                const a = arcs[i];
                a.life += dt;
                const t = a.life / a.maxLife;
                if (t >= 1) {
                    globe.remove(a.line);
                    a.geo.dispose();
                    a.mat.dispose();
                    arcs.splice(i, 1);
                    continue;
                }
                a.mat.opacity = t < 0.6 ? 0.9 : 0.9 * (1 - (t - 0.6) / 0.4);
            }

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        canvas.classList.add('active');
        animate();
    }).catch(err => console.warn('Globe failed:', err));
}
    

    // ===== NAVIGATION =====
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar && navbar.classList.add('scrolled');
        else navbar && navbar.classList.remove('scrolled');
    });
    if (navToggle && navLinks) {
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
    }
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            const top = s.offsetTop - 160;
            if (window.scrollY >= top) current = s.getAttribute('id');
        });
        allNavLinks.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href') === '#' + current) l.classList.add('active');
        });
    });

    const progressBar = document.getElementById('scrollProgress');
    function updateProgress() {
        if (!progressBar) return;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const p = docH > 0 ? window.scrollY / docH : 0;
        progressBar.style.transform = `scaleX(${p})`;
    }
    window.addEventListener('scroll', updateProgress);
    updateProgress();

    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
        document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));
        const footer = document.querySelector('.footer');
        if (footer) {
            const fobs = new IntersectionObserver((entries) => {
                entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fobs.disconnect(); } });
            }, { threshold: 0.3 });
            fobs.observe(footer);
        }
    } else {
        document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('visible'));
        const footer = document.querySelector('.footer');
        if (footer) footer.classList.add('visible');
    }

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) backToTop.classList.add('visible');
            else backToTop.classList.remove('visible');
        });
        backToTop.addEventListener('click', () => {
            if (window.lenis) window.lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
