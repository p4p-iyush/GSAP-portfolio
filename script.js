const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentindex: 0, // Corrected 'curentindex' to 'currentindex'
    maxindex: 107
};

const Images = [];
let imageLoaded = 0;

function preloadImage() {
    const TOTAL_FRAMES = 107;
    const CHUNK_SIZE = 120;
    let currentChunk = 0;
    let loadedCount = 0;

    function loadNextChunk() {
        const start = currentChunk * CHUNK_SIZE + 1;
        const end = Math.min(start + CHUNK_SIZE - 1, TOTAL_FRAMES);

        let inChunkLoaded = 0;
        const totalInChunk = end - start + 1;

        // Load all images in this chunk
        for (let i = start; i <= end; i++) {
            const img = new Image();
            img.src = `./assests/1000104726_0001(${i}).png`;

            img.onload = () => {
                inChunkLoaded++;
                loadedCount++;
                Images[i] = img;

                // Show first frame immediately
                if (loadedCount === 1) {
                    loadImage(1);
                }

                // Check if chunk is complete
                if (inChunkLoaded === totalInChunk) {
                    currentChunk++;

                    // If more chunks, load next
                    if (start + CHUNK_SIZE <= TOTAL_FRAMES) {
                        loadNextChunk();
                    } else {
                        // All done!
                        console.log("All frames loaded!");
                        startAnimation();
                    }
                }
            };

            img.onerror = () => {
                inChunkLoaded++;
                Images[i] = null;
                if (inChunkLoaded === totalInChunk) {
                    currentChunk++;
                    if (start + CHUNK_SIZE <= TOTAL_FRAMES) {
                        loadNextChunk();
                    } else {
                        startAnimation();
                    }
                }
            };

            Images[i] = img; // Store even if not loaded yet
        }
    }

    // Start with first chunk
    loadNextChunk();
}

function loadImage(index) {
    if (index >= 1 && index <= frames.maxindex) {
        const img = Images[index];

        // Calculate the scale for width and height
        const scaleX = window.innerWidth / img.width;
        const scaleY = window.innerHeight / img.height;
        const scale = Math.max(scaleX, scaleY);

        // Determine the new dimensions of the image after scaling
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        // Calculate the canvas dimensions based on the scaled image
        canvas.width = window.innerWidth;
        canvas.height = Math.max(window.innerHeight, newHeight);

        // Calculate the offsets to center the image on the canvas
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        // Clear the canvas and draw the scaled image
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        // Update the current index of frames
        frames.currentindex = index;
    }
}


preloadImage();


// the real shit start ......... 
function startAnimation() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".main",
            start: "top top",
            // end: "50% 50%",
            scrub: true,
            // markers: true
        }
    });

    tl.to(frames, {
        currentindex: frames.maxindex,
        onUpdate: function () {
            loadImage(Math.floor(frames.currentindex));
        }
    });

}
var tl1 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page1",
        start: "top,top",
        end: "50%,50%",
        scrub: true,
        // markers:true
    }
})

tl1.to("#canvas", {
    left: "50%"
})
var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page2",
        start: "top,top",
        end: "50%,50%",
        scrub: true,
        // markers:true
    }
})

tl2.to("#canvas", {
    left: "10%"
})
var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page3",
        start: "0%,50%",
        end: "40%,50%",
        scrub: true,
        // markers:true
    }
})

tl3.to("#canvas", {
    left: "50%"
})
var tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page4",
        start: "0%,50%",
        end: "40%,50%",
        scrub: true,
        // markers:true
    }
})

tl4.to("#canvas", {
    right: "15%"
})



// text change auto

const textArray = ["Frontend Developer", "JavaScript Enthusiast", "React.js Expert", "Creative Coder", "3D Interaction Lover"];
let index = 0;

function changeText() {
    const textElement = document.getElementById("auto_change");
    textElement.textContent = textArray[index];
    index = (index + 1) % textArray.length; // Loop back to the start
}

setInterval(changeText, 2000); // Change text every 2 seconds


let banner = document.querySelector('#page1');
let canvas_2 = document.getElementById('dotsCanvas');
canvas_2.width = canvas_2.offsetWidth;
canvas_2.height = canvas_2.offsetHeight;
let ctx = canvas_2.getContext('2d');

let dots = [];
let arraycolor = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFAA33"];

// Generate random dots
for (let index = 0; index < 60; index++) {
    dots.push({
        x: Math.floor(Math.random() * canvas_2.width),
        y: Math.floor(Math.random() * canvas_2.height),
        size: Math.random() * 3 + 5,
        color: arraycolor[Math.floor(Math.random() * arraycolor.length)]
    });
}

// Function to draw the dots
const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Draw the dots on the canvas
drawDots();
banner.addEventListener('mousemove', (event) => {
    ctx.clearRect(0, 0, canvas_2.width, canvas_2.height)
    drawDots();
    let mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top
    }
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2)
        if (distance < 300) {
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath()
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    })
})
banner.addEventListener('mouseout', () => {
    ctx.clearRect(0, 0, canvas_2.width, canvas_2.height)
    drawDots()
})

// loader
var loader = document.getElementById("tree")
window.addEventListener("load", () => {
    loader.style.display = "none";
})

// Load and render projects dynamically
document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".project_gallery");

    // Show skeleton loader while loading
    gallery.innerHTML = `
    <div class="project_card skeleton">
      <div class="card_inner">
        <div class="card_front">Loading...</div>
      </div>
    </div>
    <div class="project_card skeleton">
      <div class="card_inner">
        <div class="card_front">Loading...</div>
      </div>
    </div>
    <div class="project_card skeleton">
      <div class="card_inner">
        <div class="card_front">Loading...</div>
      </div>
    </div>
  `;

    fetch('projects.json')
        .then(res => res.json())
        .then(projects => {
            gallery.innerHTML = ''; // Clear skeleton

            projects.forEach(project => {
                const card = document.createElement('div');
                card.classList.add('project_card');
                card.innerHTML = `
          <div class="card_inner">
            <div class="card_front">
              <img src="${project.image}" loading="lazy" alt="${project.title}">
            </div>
            <div class="card_back">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <a href="${project.url}" target="_blank" class="view_button">View Project</a>
            </div>
          </div>
        `;
                gallery.appendChild(card);
            });

            // Optional: Animate in with GSAP
            gsap.from(".project_card", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out"
            });
        })
        .catch(err => {
            console.error("Failed to load projects:", err);
            gallery.innerHTML = "<p>Could not load projects.</p>";
        });
});
feather.replace();
