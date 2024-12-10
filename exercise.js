// exercise.js

// Function to display a greeting message
function displayGreeting() {
    document.getElementById('greeting').textContent = "Hello! Welcome to my web page!";
}

// Function to fetch a random joke from a public API and display it
function fetchJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            document.getElementById('joke').textContent = data.setup + ' ' + data.punchline;
            document.getElementById('jokeCard').style.animation = 'fadeIn 1s';
        })
        .catch(error => console.error('Error fetching joke:', error));
}

// Function to display a personalized greeting
function displayPersonalGreeting() {
    const name = document.getElementById('name').value;
    document.getElementById('personalGreeting').textContent = `Hello, ${name}! Welcome to my web page!`;
}

// Function to fetch weather data from a public API and display it
function fetchWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '5265bbc1fe89922cd83620a6c0641152'; // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const icon = data.weather[0].icon;
                document.getElementById('weatherInfo').textContent = `The weather in ${city} is currently ${weatherDescription} with a temperature of ${temperature}°C.`;
                const weatherIcon = document.getElementById('weatherIcon');
                weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                weatherIcon.style.display = 'block';
                document.getElementById('weather').style.animation = 'fadeIn 1s';
            } else {
                document.getElementById('weatherInfo').textContent = `Could not fetch weather data for ${city}. Please try again.`;
                document.getElementById('weatherIcon').style.display = 'none';
            }
        })
        .catch(error => console.error('Error fetching weather:', error));
}

// Jumping Dinosaur Game
let dino = document.getElementById("dino");
let obstacle = document.getElementById("obstacle");
let scoreElement = document.getElementById("score");
let score = 0;
let isJumping = false;
let gameInterval = null;
let collisionInterval = null;

function jump() {
    if (!isJumping) {
        isJumping = true;
        dino.classList.add("jump");
        setTimeout(() => {
            dino.classList.remove("jump");
            isJumping = false;
        }, 500);
    }
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

function checkCollision() {
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

    if (obstacleRight > 740 && obstacleRight < 780 && dinoBottom <= 40) {
        clearInterval(gameInterval);
        clearInterval(collisionInterval);
        alert("Game Over! Your score is: " + score);
        score = 0;
        scoreElement.textContent = score;
        obstacle.style.animation = 'none';
        obstacle.style.right = '-40px';
    } else if (obstacleRight === 750) {
        score++;
        scoreElement.textContent = score;
    }
}

function startGame() {
    score = 0;
    scoreElement.textContent = score;
    obstacle.style.animation = 'moveObstacle 3s infinite linear';
    gameInterval = setInterval(checkCollision, 50);
}

document.addEventListener("DOMContentLoaded", () => {
    obstacle.style.animation = 'none';
});
