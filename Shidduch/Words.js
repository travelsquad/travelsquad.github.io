/*
	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
*/

const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
	"",
	"Your",
	"Shidduch",
	"search",
	"ends",
	"here.",
	"",
	"Scroll Down"
];

let textIndex = 0;

function resetAnimation() {
    textIndex = 0;  // Reset text index

    // Ensure words are visible
    elts.text1.style.display = "inline";
    elts.text2.style.display = "inline";

    // Ensure the page is not scrollable until the animation completes
    document.body.style.overflow = "hidden";
}

// Call the resetAnimation function
resetAnimation();

// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 0.25;

//let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
	morph -= cooldown;
	cooldown = 0;
	
	let fraction = morph / morphTime;
	
	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}
	
	setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
	// fraction = Math.cos(fraction * Math.PI) / -2 + .5;
	
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
	morph = 0;
	
	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";
	
	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function hideWords() {
    elts.text1.style.display = "none";
    elts.text2.style.display = "none";
    document.body.style.overflow = "auto";  // Make the page scrollable
}

function animate() {
    if (textIndex >= texts.length - 1) {
        setTimeout(hideWords, 1000);  // Delay hiding the words by 1 seconds
        return;  // Stop the animation
    }

    requestAnimationFrame(animate);

	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;
	
	cooldown -= dt;
	
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}
		
		doMorph();
	} else {
		doCooldown();
	}
}

// Start the animation.
animate();


//Google formssssss

document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the default form submission
    
    var formData = new FormData(this);  // Get form data

    // Send the form data to the Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbxUo10EHB569V14aF7gqw5nE7qJUhN3c9kWh29A6MJ2HengSDlL_x0Mcki-rxd9eI9fyQ/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            window.location.href = 'confirmation.html';
        } else {
            alert('There was an error submitting the form.');
        }
    })
    .catch(error => {
        alert('There was an error submitting the form.');
    });
});