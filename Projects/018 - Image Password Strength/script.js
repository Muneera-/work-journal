const password = document.getElementById('password');
const imgSrc = 'city.jpg';
const maxPixels = 50;
let img;
let quality = [];
let done = false;

password.addEventListener('keyup', (e) => {
    // Change this to improve the strength check
    const strength = e.target.value.length;
    const mappedStrength = Math.floor(mapRange(strength, 0, 10, maxPixels, 1));
    drawImageFromPoints(mappedStrength);
});

function mapRange(num, in_min, in_max, out_min, out_max) {
    if(num > in_max) {
        num = in_max;
    }
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function preload() {
    img = loadImage(imgSrc);
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    pixelDensity(1);
    
    img.resize(width, 0);
    image(img, 0, 0);
    loadPixels();
    drawImageFromPoints(maxPixels);
}

function getPoints(step) {
    let points = [];

    // Save all points
    for(let x = 0; x < width; x+= step) {
        for(let y = 0; y < height; y+= step) {
            let index = (x + y * width) * 4;

            points.push({
                x,
                y,
                c: [
                    pixels[index],
                    pixels[index+1],
                    pixels[index+2]
                ],
                s: step
            });
        }
    }

    return points;
}

function drawImageFromPoints(step) {
    const points = getPoints(step);

    if(step < 10) {
        // A small check to prevent drawing the image multiple times when the password is already strength enough
        if(!done) {
            image(img, 0, 0);
            done = true;
        }
    } else {
        points.forEach(p => {
            let color = p.c;
            noStroke();
            fill(...color);
            rect(p.x, p.y, p.s, p.s);
        });
        done = false;
    }
}