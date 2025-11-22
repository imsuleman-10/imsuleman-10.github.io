document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Mobile Hamburger Menu ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- 2. Sticky Header on Scroll ---
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- 3. Hero Text Cycling Animation ---
    const textCycleSpan = document.querySelector(".text-cycle");
    // Updated roles for variety
    const roles = ["Computer Science Student", "Aspiring Software Engineer", "Programming Enthusiast", "Frontend Developer"]; 
    let roleIndex = 0;

    // Set initial text to prevent a blank span on load
    if (textCycleSpan) {
        textCycleSpan.textContent = roles[roleIndex];
    }

    function cycleText() {
        if (!textCycleSpan) return;

        textCycleSpan.classList.add('fading-out');
        
        setTimeout(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            textCycleSpan.textContent = roles[roleIndex];
            textCycleSpan.classList.remove('fading-out');
        }, 500); // Matches CSS transition duration
    }
    // Start text cycling after the initial load
    setTimeout(() => {
        setInterval(cycleText, 3000); // Change text every 3 seconds
    }, 1000); 

    // -------------------------------------------------------------
    // --- 4. Vanilla JS Scroll Reveal Animations (Modified) ---
    // This now covers the new Achievements, Certificates, Interests, etc.
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll(
        ".reveal-fade, .reveal-up, .reveal-left, .reveal-right, .reveal-pop"
    );
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Check if element is visible
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Optional: Stop observing once revealed
                // revealObserver.unobserve(entry.target); 
            } else {
                 // Remove 'visible' class if element moves out of view (for repeat effect)
                 entry.target.classList.remove("visible"); 
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 5. Project Card 3D Tilt Effect (Renumbered from 6) ---
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            const { width, height } = rect;
            // Map mouse position to rotation angle (Max 20 degrees total movement)
            const rotateX = (y / height - 0.5) * -20; 
            const rotateY = (x / width - 0.5) * 20; 

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            card.style.zIndex = "10";
            card.style.boxShadow = `0 10px 40px rgba(0, 229, 255, 0.4)`; // Add extra shadow on tilt
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
            card.style.zIndex = "1";
            card.style.boxShadow = `0 4px 30px rgba(0, 0, 0, 0.1)`; // Reset to default glass-card shadow
        });
    });

});