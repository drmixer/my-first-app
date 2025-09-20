// DOM Elements
const helloText = document.querySelector('.hello-text');
const cat = document.querySelector('.cat');
const catHead = document.querySelector('.cat-head');
const catEars = document.querySelectorAll('.cat-ear');
const catTail = document.querySelector('.cat-tail');
const catPaws = document.querySelectorAll('.cat-paw');
const colorButton = document.getElementById('colorButton');
const animateButton = document.getElementById('animateButton');
const particleButton = document.getElementById('particleButton');
const meowButton = document.getElementById('meowButton');
const treatButton = document.getElementById('treatButton');
const clickCountElement = document.getElementById('clickCount');
const particleContainer = document.getElementById('particleContainer');
const treatContainer = document.getElementById('treatContainer');
const meowSound = document.getElementById('meowSound');
const treatSound = document.getElementById('treatSound');
const galleryItems = document.querySelectorAll('.gallery-item');

// State variables
let clickCount = 0;
let isAnimating = false;
let particlesEnabled = false;
let catAnimationEnabled = false;
let treatsGiven = 0;

// Color arrays for randomization
const backgroundColors = [
    '#6e8efb', '#a777e3', '#ff6b6b', '#4ecdc4', '#45b7d1', 
    '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd',
    '#f368e0', '#ff9f43', '#10ac84', '#ee5a24', '#0abde3'
];

const textColors = [
    '#ffffff', '#ff3838', '#32ff7e', '#f9ca24', '#6c5ce7',
    '#a29bfe', '#fd79a8', '#fdcb6e', '#e17055', '#00b894',
    '#fd79a8', '#fdcb6e', '#e17055', '#00b894', '#fd79a8'
];

const catColors = [
    '#f5d142', '#ff9ff3', '#54a0ff', '#5f27cd', '#1dd1a1',
    '#ff6b6b', '#feca57', '#4ecdc4', '#6e8efb', '#a777e3',
    '#d4a5a5', '#8d6b4a', '#b89b6d'
];

// Function to generate random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to change background and text colors
function changeColors() {
    // Change background gradient
    const color1 = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    const color2 = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
    
    // Change text color
    helloText.style.color = textColors[Math.floor(Math.random() * textColors.length)];
    
    // Change cat color
    const catColor = catColors[Math.floor(Math.random() * catColors.length)];
    catHead.style.background = catColor;
    catEars.forEach(ear => ear.style.borderBottomColor = catColor);
    document.querySelectorAll('.cat-body, .cat-tail, .cat-paw').forEach(part => {
        part.style.background = catColor;
    });
    
    // Add ear wiggle animation
    catEars.forEach(ear => ear.classList.add('cat-ear-wiggle'));
    
    setTimeout(() => {
        catEars.forEach(ear => ear.classList.remove('cat-ear-wiggle'));
    }, 500);
    
    // Update click count
    clickCount++;
    clickCountElement.textContent = clickCount;
}

// Function to toggle text animation
function toggleAnimation() {
    isAnimating = !isAnimating;
    
    if (isAnimating) {
        helloText.classList.add('animate');
        animateButton.textContent = '🐾 Stop Animation';
        // Start cat animation
        cat.classList.add('cat-animate');
        catTail.classList.add('cat-tail-wag');
        catAnimationEnabled = true;
    } else {
        helloText.classList.remove('animate');
        animateButton.textContent = '🐾 Animate Cat';
        // Stop cat animation
        cat.classList.remove('cat-animate');
        catTail.classList.remove('cat-tail-wag');
        catAnimationEnabled = false;
    }
    
    // Update click count
    clickCount++;
    clickCountElement.textContent = clickCount;
}

// Function to create particles
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size
    const size = Math.random() * 20 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random color (cat-themed)
    const colors = ['#f5d142', '#ff9ff3', '#54a0ff', '#ff6b6b', '#feca57'];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Position
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Random animation
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    particleContainer.appendChild(particle);
    
    // Animate particle
    let posX = x;
    let posY = y;
    let opacity = 1;
    let sizeValue = size;
    
    const animate = () => {
        posX += vx;
        posY += vy;
        opacity -= 0.02;
        sizeValue -= 0.1;
        
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;
        particle.style.width = `${sizeValue}px`;
        particle.style.height = `${sizeValue}px`;
        
        if (opacity > 0 && sizeValue > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };
    
    animate();
}

// Function to toggle particles
function toggleParticles() {
    particlesEnabled = !particlesEnabled;
    
    if (particlesEnabled) {
        particleButton.textContent = '✨ Remove Particles';
        document.body.addEventListener('mousemove', mouseMoveHandler);
    } else {
        particleButton.textContent = '✨ Add Particles';
        document.body.removeEventListener('mousemove', mouseMoveHandler);
        // Remove existing particles
        particleContainer.innerHTML = '';
    }
    
    // Update click count
    clickCount++;
    clickCountElement.textContent = clickCount;
}

// Mouse move handler for particles
function mouseMoveHandler(e) {
    if (particlesEnabled && Math.random() > 0.7) {
        createParticle(e.clientX, e.clientY);
    }
}

// Click handler for the hello text
function textClickHandler() {
    // Create a ripple effect
    const ripple = document.createElement('div');
    ripple.classList.add('particle');
    const colors = ['#f5d142', '#ff9ff3', '#54a0ff', '#ff6b6b', '#feca57'];
    ripple.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.borderRadius = '50%';
    
    document.body.appendChild(ripple);
    
    // Animate ripple
    let size = 10;
    const maxSize = 100;
    const animate = () => {
        size += 5;
        const opacity = 1 - (size / maxSize);
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.opacity = opacity;
        ripple.style.left = `${event.clientX - size/2}px`;
        ripple.style.top = `${event.clientY - size/2}px`;
        
        if (size < maxSize) {
            requestAnimationFrame(animate);
        } else {
            ripple.remove();
        }
    };
    
    animate();
    
    // Add ear wiggle animation
    catEars.forEach(ear => ear.classList.add('cat-ear-wiggle'));
    
    setTimeout(() => {
        catEars.forEach(ear => ear.classList.remove('cat-ear-wiggle'));
    }, 500);
    
    // Update click count
    clickCount++;
    clickCountElement.textContent = clickCount;
}

// Function to play meow sound
function playMeow() {
    meowSound.currentTime = 0;
    meowSound.play().catch(e => console.log("Audio play failed:", e));
    
    // Add ear wiggle animation
    catEars.forEach(ear => ear.classList.add('cat-ear-wiggle'));
    
    setTimeout(() => {
        catEars.forEach(ear => ear.classList.remove('cat-ear-wiggle'));
    }, 500);
    
    // Update click count
    clickCount++;
    clickCountElement.textContent = clickCount;
}

// Function to throw a treat
function throwTreat() {
    treatSound.currentTime = 0;
    treatSound.play().catch(e => console.log("Audio play failed:", e));
    
    // Create a treat
    const treat = document.createElement('div');
    treat.classList.add('treat');
    
    // Position at the top center
    treat.style.left = '50%';
    treat.style.top = '-50px';
    
    treatContainer.appendChild(treat);
    
    // Add paw tap animation to front paws
    document.querySelector('.front-left-paw').classList.add('cat-paw-tap');
    document.querySelector('.front-right-paw').classList.add('cat-paw-tap');
    
    setTimeout(() => {
        document.querySelector('.front-left-paw').classList.remove('cat-paw-tap');
        document.querySelector('.front-right-paw').classList.remove('cat-paw-tap');
    }, 300);
    
    // Update treats given and click count
    treatsGiven++;
    clickCount++;
    clickCountElement.textContent = clickCount;
}

// Gallery item click handler
function galleryItemClickHandler(e) {
    const item = e.target.closest('.gallery-item');
    const breed = item.getAttribute('data-breed');
    
    // Change background based on breed
    const gradients = {
        'persian': 'linear-gradient(135deg, #d4a5a5, #f8c4b4)',
        'siamese': 'linear-gradient(135deg, #8d6b4a, #c5a27d)',
        'mainecoon': 'linear-gradient(135deg, #b89b6d, #e0c9a6)'
    };
    
    document.body.style.background = gradients[breed];
    
    // Add a special particle effect
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const rect = item.getBoundingClientRect();
            createParticle(
                rect.left + Math.random() * rect.width,
                rect.top + Math.random() * rect.height
            );
        }, i * 30);
    }
    
    // Update click count
    clickCount++;
    clickCountElement.textContent = clickCount;
}

// Event Listeners
colorButton.addEventListener('click', changeColors);
animateButton.addEventListener('click', toggleAnimation);
particleButton.addEventListener('click', toggleParticles);
meowButton.addEventListener('click', playMeow);
treatButton.addEventListener('click', throwTreat);
helloText.addEventListener('click', textClickHandler);

// Add event listeners to gallery items
galleryItems.forEach(item => {
    item.addEventListener('click', galleryItemClickHandler);
});

// Add click handler to cat
cat.addEventListener('click', () => {
    playMeow();
    
    // Add cat dance animation if not already animating
    if (!catAnimationEnabled) {
        cat.classList.add('cat-animate');
        catTail.classList.add('cat-tail-wag');
        setTimeout(() => {
            cat.classList.remove('cat-animate');
            catTail.classList.remove('cat-tail-wag');
        }, 2000);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial background
    const color1 = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    const color2 = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
});
