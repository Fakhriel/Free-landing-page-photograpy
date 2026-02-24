# Customization Guide

Welcome to the customization guide for the Fakhriel Yusmana Shiddiq photography portfolio. This document will walk you through every aspect of personalizing the website to match your own brand, content, and style. Whether you're a developer or a designer, you'll find clear instructions below.

---

## 1. Project Structure

Before diving in, familiarize yourself with the file structure:
/portfolio-graph
├── index.html # Main HTML file (content structure)
├── style.css # All styles (layout, colors, responsiveness)
├── script.js # All JavaScript (animations, interactions)
├── README.md # Project overview
└── CUSTOM.md # This guide

All changes are made within these three core files.

---

## 2. Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript is helpful but not mandatory – just follow the steps!

---

## 3. Getting Started

1. Open the project folder in your code editor.
2. Make changes to the files as described below.
3. Save the files and refresh your browser to see the updates instantly (no build step required).

---

## 4. Customizing the Hero Section

### 4.1 Hero Background Image

1. Open `style.css`.
2. Find the `.hero-bg` rule (around line 220).
3. Replace the `url()` value with your own image link.

```css
.hero-bg {
    background-image: url('https://your-image-url.com/your-photo.jpg');
}

### 4.2 Grayscale / Color Toggle

The toggle button is located at the bottom right of the hero. You can modify its appearance or label.
-Label text: In index.html, find:
<span class="toggle-label">B&W / COLOR</span>

Change the text to whatever you prefer (e.g., "BW / COLOR", "MONO / FULL").
-Icon: The SVG icon can be replaced with any SVG of your choice. You can find free icons at Feather Icons or Heroicons.

### 4.3 Hero Title & Subtitle
Edit the text inside index.html:

<h1 class="hero-title">PHOTOGRAPHY</h1>
<p class="hero-subtitle">Dive into the world of emotions, faces, and timeless beauty.</p>

The title uses clamp() for responsive sizing, so it will automatically scale on different devices.

### 5. Marquee Images
The two marquee rows are populated with Unsplash images. To replace them:

1. Locate the .marquee-row divs in index.html (around line 100).
2. Change the src attributes of each <img> tag to your own image URLs.

You can keep the duplicate set for seamless looping, or adjust the number of images.

Note: The marquee animations are controlled by CSS. To change speed, modify the 30s value in style.css:
.marquee-row.left .marquee-track {
    animation: marqueeLeft 30s linear infinite;
}

### 6. Project Cards (Stack Shuffle)
6.1 Adding or Removing a Project
Each project is represented by a .stack-card div inside the #stackContainer.

To add a new project:
Copy an existing .stack-card block and paste it at the end.
Update the following attributes:
data-index: should be unique (increment from the last card).
data-project on the <button>: must match the key in projectData (see step 3).
Image src and alt.
<h3> title.
.stack-location text.
Example:
html
<div class="stack-card" data-index="5">
    <img src="https://your-image-url.com/project6.jpg" alt="Project 6" class="stack-img">
    <div class="stack-content">
        <h3>New Project</h3>
        <p class="stack-location">Tokyo</p>
        <button class="view-detail" data-project="6">View Detail →</button>
    </div>
</div>
Open script.js and add corresponding data to the projectData object:

javascript
const projectData = {
    // ... existing projects
    6: {
        title: 'New Project',
        description: 'Your project description here.',
        image: 'https://your-image-url.com/project6.jpg',
        location: 'Tokyo',
        year: '2026'
    }
};
To remove a project:
Simply delete the entire .stack-card block and remove its entry from projectData.

6.2 Adjusting the Shuffle Animation
Speed of card movement: In updateStack() function (around line 230 in script.js), change the duration parameter (currently 0.6 seconds).

Auto‑shuffle interval: Look for setInterval(nextCard, 5000) and change 5000 (milliseconds) to your preferred delay. Set to 0 to disable auto‑shuffle.

Hover pause: The auto‑shuffle pauses when hovering over the stack container. You can remove this behavior by deleting the mouseenter/mouseleave event listeners.

6.3 Changing the “View Detail” Modal Style
The modal styles are in style.css under /* ---------- MODAL ---------- */. You can adjust:

Background color (.modal-overlay)
Container width, max-height, border-radius
Font sizes, padding, etc.
For mobile responsiveness, the modal already adapts. You can fine‑tune the breakpoint in the @media (max-width: 768px) section.

### 7. Dual‑Scroll Parallax Section
This section appears between Projects and About. It consists of two columns that move in opposite directions when scrolling.

7.1 Changing the Image
In index.html, locate the .dual-image <img> and replace the src attribute.

7.2 Changing the Text
Edit the content inside .dual-text – the heading and paragraphs are fully customizable.

7.3 Adjusting the Parallax Intensity
In script.js, find the Two-Scroll Animation section (around line 360). You’ll see two GSAP tweens:

javascript
gsap.to(leftCol, { y: '-20%', ... });
gsap.to(rightCol, { y: '20%', ... });
Change the percentage values to increase or decrease the movement. For example, y: '-30%' will make the left column move 30% upward, creating a stronger effect.

7.4 Making the Section Responsive
The dual‑scroll section automatically stacks vertically on mobile (under 768px). If you need to adjust the breakpoint, modify the @media (max-width: 768px) rule for .dual-scroll in style.css.

### 8. About Section
8.1 Profile Image
Replace the src of the image with your own photo.

html
<img src="assets/your-photo.png" alt="Your Name" class="profile-img">
8.2 Experience Counter Numbers
The numbers are animated via ScrollTrigger. In index.html, update the data-target attribute for each .stat-number:

html
<span class="stat-number" data-target="15">0</span>  <!-- Will count to 15 -->
<span class="stat-number" data-target="100">0</span> <!-- Counts to 100 -->
The animation triggers when the numbers enter the viewport.

8.3 Biography Text
Simply edit the paragraph inside .bio.

9. Contact Form
9.1 Changing the Email Address
The form uses FormSubmit for demo purposes. Change the action URL in index.html:

html
<form class="contact-form" id="contactForm" action="https://formsubmit.co/your-email@example.com" method="POST">
Replace your-email@example.com with your actual email. You can also configure additional options like redirect URL, etc. – see FormSubmit documentation.

9.2 Customizing Form Fields
You can add, remove, or modify form fields. For example, to add a phone number field:

html
<input type="tel" name="phone" placeholder="Phone Number">
Remember to update the form handling if needed.

9.3 Map Integration
The map is an embedded Google Maps iframe. To change the location:
Go to Google Maps.
Search for your desired location.
Click “Share” → “Embed a map” and copy the iframe code.
Replace the entire <iframe> in index.html with your new code.
The map already has a grayscale filter; you can remove or adjust it by editing .map-container in style.css.

### 10. Social Links (Mobile Menu)
In index.html, find the .mobile-social div and update each <a> tag with your profile URLs:

html
<a href="https://instagram.com/yourusername" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
<a href="https://linkedin.com/in/yourusername" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
<!-- etc. -->
You can also add or remove social icons by copying the pattern and using different Font Awesome classes.

### 11. Navigation Hover Animation
The desktop navigation links now have a smooth underline animation powered by GSAP. If you prefer a different hover effect, you can modify the mouseenter and mouseleave events in script.js (around line 160). For example, you could animate the text color, scale, or add a background.

To disable the effect entirely, comment out or remove the entire block.

### 12. Colors & Typography
All colors and fonts are controlled via CSS custom properties (variables) at the top of style.css.

css
:root {
    --bg: #f5f5f5;
    --text: #000000;
    --text-light: #ffffff;
    --accent: rgb(0, 0, 0);
    --font-serif: 'Cormorant Garamond', serif;
    --font-sans: 'Inter', sans-serif;
    --nav-height: 80px;
}
Change --bg for the overall background color.
Change --text for primary text color.
The --accent variable is used for small details (location text, footer). You can set it to any color.

Font families can be swapped with any Google Fonts or system fonts. Remember to update the <link> in index.html if you change the font.

### 13. Animation Speeds & Timings
13.1 Marquee Speed
Adjust the 30s in the animation property for .marquee-row.left .marquee-track and .marquee-row.right .marquee-track.

13.2 GSAP Animations
Most GSAP animations have a duration parameter (in seconds). Search for duration in script.js and adjust as desired.
Card shuffle transition: duration: 0.6
Auto‑shuffle interval: setInterval(nextCard, 5000)
Experience counter: duration: 2
Navbar hover underline: duration: 0.3

13.3 ScrollTrigger Scrub
For the dual‑scroll section, the scrub: true option links the animation directly to the scroll position. You can change it to scrub: 1 for a slight lag, or remove it entirely.

### 14. Mobile Menu Customization
Width: In style.css, change width: 80%; under .mobile-menu to your desired value (e.g., 70%).
Transition speed: Modify the transition: right 0.5s ... value.
Background color/backdrop: Adjust background and backdrop-filter properties.
The staggered animations for menu items and social icons are in the openMenu() function in script.js. You can change the stagger values or durations.

### 15. Lenis Smooth Scroll Settings
Lenis is initialized at the top of script.js. You can tweak the following parameters:
javascript
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
});
duration: scroll duration (higher = slower).
easing: easing function.
smoothWheel: enable/disable smooth wheel scrolling.
touchMultiplier: sensitivity on touch devices.

### 16. Troubleshooting
Images not loading?
Check the image URLs – they must be publicly accessible.
If using local assets, ensure the file paths are correct (e.g., assets/your-image.jpg).

Animations not working?
Make sure you have an internet connection to load GSAP and Lenis from CDN.
Check the browser console for errors.

Mobile menu not appearing?
Verify that the mobileToggle button exists and that the JavaScript is not throwing errors.
Ensure the mobile-menu element has the correct id and classes.

Form not submitting?
The demo uses preventDefault() and an alert. To enable actual email, replace the action URL with your FormSubmit endpoint and remove the preventDefault() in the event listener.

### 17. Need Further Help?
If you encounter any issues or have questions, feel free to reach out:

Email: fakhrielyusmanashiddiq@gmail.com
GitHub: fakhrielyusmanashiddiq
tiktok: fakhrielyusmanashiddiq

Happy customizing!