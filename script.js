
alert(
  "Welcome to The Game !\n" +
  "This is Level 1. Your goal is to maintain Planet's Good Health for a while, then you'll progress to Level 2, where unexpected events will challenge your ability to sustain balance.\n\n" +
  "Good luck!"
);

const planetName = prompt("Enter the name of your planet:");

if (planetName) {
  document.querySelector(".planet-name").textContent = planetName;
} else {
  document.querySelector(".planet-name").textContent = "Unnamed Planet";
}


let water = 0;
let oxygen = 0;
let temperature = 0;
let population = 0;
let vegetation = 0;

document.querySelector(".add1").addEventListener("click", () => {
  water += 5;
  document.querySelector(".butt1").textContent = `Water: ${water}%`;
  calculatePlanetColor()
  calculatePlanetHealth()
});

document.querySelector(".add2").addEventListener("click", () => {
  oxygen += 5;
  document.querySelector(".butt2").textContent = `Oxygen: ${oxygen}%`;
  calculatePlanetColor()
  calculatePlanetHealth()
});

document.querySelector(".add3").addEventListener("click", () => {
  temperature += 5;
  document.querySelector(".butt3").textContent = `Temperature: ${temperature}%`;
  calculatePlanetColor()
  calculatePlanetHealth()
});

document.querySelector(".add4").addEventListener("click", () => {
  population += 5;
  document.querySelector(".butt4").textContent = `Population: ${population}%`;
  calculatePlanetColor()
  calculatePlanetHealth()
});

document.querySelector(".add5").addEventListener("click", () => {
  vegetation += 5;
  document.querySelector(".butt5").textContent = `Vegetation: ${vegetation}%`;
  calculatePlanetColor()
  calculatePlanetHealth()
});

document.querySelector(".sub1").addEventListener("click", () => {
  water -= 5;
  water = (water - 5 < 0) ? 0 : water - 5;
  document.querySelector(".butt1").textContent = `Water: ${water}%`;
  calculatePlanetColor()
  calculatePlanetHealth()
});

document.querySelector(".sub2").addEventListener("click", () => {
  oxygen -= 5;
  oxygen = (oxygen - 5 < 0) ? 0 : oxygen - 5;
  document.querySelector(".butt2").textContent = `Oxygen: ${oxygen}%`;
  calculatePlanetColor()
  calculatePlanetHealth()
});

document.querySelector(".sub3").addEventListener("click", () => {
  temperature -= 5;
  temperature = (temperature - 5 < 0) ? 0 : temperature - 5;
  document.querySelector(".butt3").textContent = `Temperature: ${temperature}%`;
  calculatePlanetColor()
  calculatePlanetHealth()
});

document.querySelector(".sub4").addEventListener("click", () => {
  population -= 5;
  population = (population - 5 < 0) ? 0 : population - 5;
  document.querySelector(".butt4").textContent = `Population: ${population}%`;
  calculatePlanetColor()
  calculatePlanetHealth()
});

document.querySelector(".sub5").addEventListener("click", () => {
  vegetation -= 5;
  vegetation = (vegetation - 5 < 0) ? 0 : vegetation - 5;
  document.querySelector(".butt5").textContent = `Vegetation: ${vegetation}%`;
  calculatePlanetColor()
  calculatePlanetHealth()
});

function calculatePlanetColor() {
  const stats = [water, oxygen, temperature, population, vegetation];
  const colors = {
    water: [0, 0, 255],       
    oxygen: [0, 255, 0],       
    temperature: [255, 0, 0],
    population: [255, 255, 0], 
    vegetation: [0, 255, 128]  
  };

  const total = stats.reduce((sum, stat) => sum + stat, 0);

  if (total === 0) {
    document.querySelector('.planet').style.backgroundColor = 'rgb(201, 175, 139)';
    return;
  }

  let dominantStatIndex = stats.indexOf(Math.max(...stats));
  let dominantStatValue = stats[dominantStatIndex];
  let secondLargestStatValue = Math.max(...stats.filter((_, i) => i !== dominantStatIndex));

  if (dominantStatValue - secondLargestStatValue >= 40 || secondLargestStatValue === 0) {
    const [r, g, b] = Object.values(colors)[dominantStatIndex];
    document.querySelector('.planet').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    return;
  }

  let [r, g, b] = [0, 0, 0];
  stats.forEach((stat, index) => {
    const proportion = stat / total;
    r += colors[Object.keys(colors)[index]][0] * proportion;
    g += colors[Object.keys(colors)[index]][1] * proportion;
    b += colors[Object.keys(colors)[index]][2] * proportion;
  });

  document.querySelector('.planet').style.backgroundColor = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}


// break
function calculatePlanetHealth() {
  let health = 100;

  const stats = { water, oxygen, temperature, population, vegetation };
  const healthyRanges = {
    water: [40, 60],
    oxygen: [40, 60],
    vegetation: [30, 70],
    temperature: [45, 65],
    population: [30, 70]
  };

  // Calculate health based on stats
  for (let stat in stats) {
    const value = stats[stat];
    const [min, max] = healthyRanges[stat];
    
    if (value < min) {
      health -= getDeviationPenalty(value, min, 'low');
    } else if (value > max) {
      health -= getDeviationPenalty(value, max, 'high');
    }
  }

  // Update Health Bar Color (not width)
  updateHealthBarColor(health);
  
  // Update Health Percentage and Message
  updateHealthMessage(health);
}

// Update the Health Bar color based on health value
function updateHealthBarColor(health) {
  const healthBar = document.querySelector('.health-bar');
  
  // Calculate the color based on health value
  const red = Math.min(255, Math.max(0, 255 - health * 2.55)); // Red decreases as health increases
  const green = Math.min(255, Math.max(0, health * 2.55)); // Green increases as health increases
  const color = `rgb(${red}, ${green}, 0)`; // From red to green

  healthBar.style.backgroundColor = color;
}

// Update the Health Message and Percentage
function updateHealthMessage(health) {
  const healthMessage = document.querySelector('.health-message');
  const healthPercentage = document.querySelector('.health-percentage');
  
  // Set health percentage
  healthPercentage.textContent = `Health: ${health}%`;

  // Set health status message
  if (health >= 80) {
    healthMessage.textContent = "Planet is in great condition!";
    healthMessage.style.color = "green";
  } else if (health >= 50) {
    healthMessage.textContent = "Planet is stable.";
    healthMessage.style.color = "yellow";
  } else if (health >= 20) {
    healthMessage.textContent = "Planet's health fragile.";
    healthMessage.style.color = "orange";
  } else {
    healthMessage.textContent = "Planet is in critical condition!";
    healthMessage.style.color = "red";
  }
}



// Function to calculate deviation penalties
function getDeviationPenalty(value, limit, type) {
  let penalty = 0;
  const deviation = Math.abs(value - limit);

  if (type === 'low') {
    if (deviation < 5) penalty = 3;
    else if (deviation < 10) penalty = 6;
    else if (deviation < 20) penalty = 15;
    else penalty = 25;
  } else {
    if (deviation < 5) penalty = 3;
    else if (deviation < 10) penalty = 6;
    else if (deviation < 20) penalty = 15;
    else penalty = 25;
  }

  return penalty;
}

// Update the Health Bar based on health value
function updateHealthBar(health) {
  const healthBar = document.querySelector('.health-bar');
  
  // Calculate width and color based on health
  const width = Math.min(100, Math.max(0, health)); // Clamp between 0 and 100
  const color = `rgb(${255 - width * 2.55}, ${width * 2.55}, 0)`; // Green to Red

  healthBar.style.width = `${width}%`;
  healthBar.style.backgroundColor = color;
}
