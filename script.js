const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentindex: 0, // Corrected 'curentindex' to 'currentindex'
    maxindex: 107
};

const Images = [];
let imageLoaded = 0;

function preloadImage() {
    for (var i = 1; i <= frames.maxindex; i++) { // Corrected loop range
        const imageUrl = `./assests/1000104726_0001(${i}).png`;
        const img = new Image();
        img.src = imageUrl;z
        // console.log(imageUrl)
        img.onload = () => {
            imageLoaded++;
            if (imageLoaded === frames.maxindex) {
                loadImage(frames.currentindex); // Corrected 'frame.curentindex' to 'frames.currentindex'
                startAnimation();
            }
        };
        Images.push(img);
    }
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
var tl1=gsap.timeline({scrollTrigger:{
    trigger:"#page1",
    start:"top,top",
    end:"50%,50%",
    scrub:true,
    // markers:true
}})

tl1.to("#canvas",{
    left:"50%"
})
var tl2=gsap.timeline({scrollTrigger:{
    trigger:"#page2",
    start:"top,top",
    end:"50%,50%",
    scrub:true,
    // markers:true
}})

tl2.to("#canvas",{
    left:"10%"
})
var tl3=gsap.timeline({scrollTrigger:{
    trigger:"#page3",
    start:"0%,50%",
    end:"40%,50%",
    scrub:true,
    // markers:true
}})

tl3.to("#canvas",{
    left:"50%"
})
var tl4=gsap.timeline({scrollTrigger:{
    trigger:"#page4",
    start:"0%,50%",
    end:"40%,50%",
    scrub:true,
    // markers:true
}})

tl4.to("#canvas",{
    right:"15%"
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
banner.addEventListener('mousemove',(event)=>{
    ctx.clearRect(0,0,canvas_2.width,canvas_2.height)
    drawDots();
    let mouse ={
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top
    }
    dots.forEach(dot =>{
        let distance= Math.sqrt((mouse.x - dot.x)**2 +(mouse.y - dot.y)**2)
        if(distance<300){
            ctx.strokeStyle =dot.color;
            ctx.lineWidth =1;
            ctx.beginPath()
            ctx.moveTo(dot.x,dot.y);
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
    })
})
banner.addEventListener('mouseout',()=>{
    ctx.clearRect(0,0,canvas_2.width,canvas_2.height)
    drawDots()
})

// loader
var loader = document.getElementById("tree")
window.addEventListener("load",()=>{
    loader.style.display ="none";
})

feather.replace();
