// Chat Window Simulation in Processing (Java) - Fully Corrected Code

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

// Arrays to hold screen names
ArrayList<String> screenNames = new ArrayList<String>();

// Sayings categorized by topic with frequencies
HashMap<String, ArrayList<Saying>> topicSayings = new HashMap<String, ArrayList<Saying>>();

ArrayList<String> winSayings = new ArrayList<String>();

ArrayList<Message> messages = new ArrayList<Message>();
int maxMessages = 50;       // Maximum messages to display
int lastMessageTime = 0;
int messageInterval = 2000; // Default interval in milliseconds

HashMap<String, color> nameColors = new HashMap<String, color>();

PFont fontRegular;
PFont fontBold;

float sliderValue = 3; // Default speed value
float sliderMin = 1;
float sliderMax = 5;

float textSizeValue = 14; // Default text size
float textSizeMin = 10;
float textSizeMax = 24;

// Topic checkboxes
boolean petChecked = true;
boolean gamingChecked = false;
boolean artChecked = false;
boolean philosophyChecked = false;
boolean codingChecked = false;
boolean weatherChecked = false; // Weather topic checkbox

boolean winMode = false;
int winModeStartTime = 0;

// Dimensions for the buttons
float buttonWidth;
float buttonHeight = 30;
float buttonY;

void setup() {
  size(600, 620);
  textSize(textSizeValue);
  fontRegular = createFont("Arial", 14);
  fontBold = createFont("Arial Bold", 14);

  // Set color mode to HSB for vibrant colors
  colorMode(HSB, 360, 100, 100);

  // Initialize screen names
  String[] names = {
    "Chill Dog", "Lazy Dog", "Internet Dog", "Happy Dog", "Sleepy Dog",
    "Silly Cat", "Grumpy Cat", "Whiskers", "Purrfect Cat", "Curious Cat"
  };
  screenNames.addAll(Arrays.asList(names));

  // Assign a unique random color to each screen name
  for (String name : screenNames) {
    nameColors.put(name, color(random(0, 360), 100, 100)); // Full saturation and brightness
  }

  // Initialize sayings with frequencies
  // Pets topic
  topicSayings.put("Pets", new ArrayList<Saying>(Arrays.asList(
    new Saying("Woof woof!", 10),
    new Saying("Meow meow!", 10),
    new Saying("Just chilling...", 15),
    new Saying("Nap time!", 15),
    new Saying("Anyone up for a walk?", 5),
    new Saying("Found a comfy spot!", 10),
    new Saying("Chasing lasers!", 5),
    new Saying("Looking for treats!", 10),
    new Saying("Time to play!", 15),
    new Saying("Purring loudly!", 5)
  )));

  // Gaming topic
  topicSayings.put("Gaming", new ArrayList<Saying>(Arrays.asList(
    new Saying("GG!", 15),
    new Saying("Victory Royale!", 10),
    new Saying("Anyone up for Fortnite?", 15),
    new Saying("I love Fortnite!", 10),
    new Saying("Just got number 2!", 10),
    new Saying("Let's squad up!", 5),
    new Saying("Building ramps!", 5),
    new Saying("Watch out for snipers!", 5),
    new Saying("Battle bus is leaving!", 5),
    new Saying("Drop at Tilted Towers?", 10)
  )));

  // Art topic
  topicSayings.put("Art", new ArrayList<Saying>(Arrays.asList(
    new Saying("The juxtaposition of colors is fascinating.", 10),
    new Saying("This piece evokes deep emotions.", 10),
    new Saying("The brushwork is impeccable.", 15),
    new Saying("Analyzing fine art design.", 15),
    new Saying("The composition is well-balanced.", 10),
    new Saying("Exploring abstract forms.", 5),
    new Saying("The chiaroscuro adds depth.", 5),
    new Saying("Admiring the texture.", 10),
    new Saying("The use of space is intriguing.", 5),
    new Saying("Art is a universal language.", 5)
  )));

  // Philosophy topic
  topicSayings.put("Philosophy", new ArrayList<Saying>(Arrays.asList(
    new Saying("The unexamined life is not worth living.", 10),
    new Saying("Knowledge begins in wonder.", 10),
    new Saying("Man is by nature a political animal.", 10),
    new Saying("Happiness depends upon ourselves.", 10),
    new Saying("I know that I know nothing.", 10),
    new Saying("The only true wisdom is in knowing you know nothing.", 10),
    new Saying("Virtue is knowledge.", 10),
    new Saying("We are what we repeatedly do.", 10),
    new Saying("To perceive is to suffer.", 10),
    new Saying("Pleasure in the job puts perfection in the work.", 10)
  )));

  // Coding topic
  topicSayings.put("Coding", new ArrayList<Saying>(Arrays.asList(
    new Saying("Wow, nice!", 10),
    new Saying("Is this the matrix?", 10),
    new Saying("Hello World!", 15),
    new Saying("Just debugging...", 15),
    new Saying("Found a bug!", 10),
    new Saying("Compiling code...", 10),
    new Saying("Syntax error unexpected token", 5),
    new Saying("Code is poetry", 5),
    new Saying("I love programming!", 10),
    new Saying("Stack overflowed!", 10)
  )));

  // Weather topic
  topicSayings.put("Weather", new ArrayList<Saying>(Arrays.asList(
    new Saying("What's the weather?", 10),
    new Saying("It's nice and sunny here.", 15),
    new Saying("Internet weather here.", 5),
    new Saying("78 in Washington.", 10),
    new Saying("Expecting rain later.", 8),
    new Saying("Perfect day for a walk.", 12),
    new Saying("Stormy skies ahead.", 6),
    new Saying("Feeling the heat today.", 9),
    new Saying("Cold fronts moving in.", 7),
    new Saying("Checking the forecast.", 8)
  )));

  // Win sayings
  winSayings.addAll(Arrays.asList(
    "GG",
    "Victory",
    "Wow",
    "🌠🌠🌠",
    "⋆͛*͛ ͙͛⁑͛⋆͛*͛ ͙͛ ଘ(੭*ˊᵕˋ)੭*"
  ));

  // Calculate button dimensions
  buttonWidth = (width - 20) / 4; // Divide the controls area width by 4
  buttonY = height - 110; // Position of the buttons
}

void draw() {
  background(30); // Background color of the canvas

  // Update text size from slider
  textSize(textSizeValue);

  // Calculate message interval
  if (winMode) {
    messageInterval = (int)map(sliderValue, sliderMin, sliderMax, 5000, 1000) / 2;
  } else {
    messageInterval = (int)map(sliderValue, sliderMin, sliderMax, 5000, 1000);
  }

  // Draw the chat window and messages
  drawChatWindow();

  // Add a new message if the interval has passed
  if (millis() - lastMessageTime > messageInterval) {
    addNewMessage();
    lastMessageTime = millis();
  }

  // Draw sliders, checkboxes, and Win button
  drawTextSizeSlider();
  drawSlider();
  drawCheckboxes();
  drawWinButton();
}

void addNewMessage() {
  // Randomly select a screen name
  String name = screenNames.get((int)random(screenNames.size()));

  String saying;

  if (winMode) {
    // During Win mode, use winSayings
    saying = winSayings.get((int)random(winSayings.size()));

    // Check if 10 seconds have passed
    if (millis() - winModeStartTime > 10000) {
      winMode = false;
    }
  } else {
    // Get a saying based on selected topics
    saying = getRandomSaying();

    // If no topics are selected, do nothing
    if (saying == null) return;
  }

  // Add the new message to the messages array
  messages.add(new Message(name, saying));

  // Keep the messages array within the maximum limit
  if (messages.size() > maxMessages) {
    messages.remove(0);
  }
}

String getRandomSaying() {
  ArrayList<Saying> availableSayings = new ArrayList<Saying>();

  // Collect sayings based on selected topics
  if (petChecked && topicSayings.containsKey("Pets")) {
    availableSayings.addAll(topicSayings.get("Pets"));
  }
  if (gamingChecked && topicSayings.containsKey("Gaming")) {
    availableSayings.addAll(topicSayings.get("Gaming"));
  }
  if (artChecked && topicSayings.containsKey("Art")) {
    availableSayings.addAll(topicSayings.get("Art"));
  }
  if (philosophyChecked && topicSayings.containsKey("Philosophy")) {
    availableSayings.addAll(topicSayings.get("Philosophy"));
  }
  if (codingChecked && topicSayings.containsKey("Coding")) {
    availableSayings.addAll(topicSayings.get("Coding"));
  }
  if (weatherChecked && topicSayings.containsKey("Weather")) {
    availableSayings.addAll(topicSayings.get("Weather"));
  }

  // If no topics are selected, return null
  if (availableSayings.size() == 0) {
    return null;
  }

  // Calculate total frequency
  int totalFrequency = 0;
  for (Saying s : availableSayings) {
    totalFrequency += s.frequency;
  }

  float rnd = random(totalFrequency);
  int accum = 0;

  // Select a saying based on its frequency
  for (Saying s : availableSayings) {
    accum += s.frequency;
    if (rnd < accum) {
      return s.text;
    }
  }

  // Fallback in case of error
  return availableSayings.get((int)random(availableSayings.size())).text;
}

void drawChatWindow() {
  // Draw the chat window background
  fill(10); // Darker chat window
  stroke(255);
  rect(10, 10, width - 20, height - 230);

  // Begin drawing messages
  pushMatrix();
  translate(15, height - 230);
  float y = 0;
  float lineHeight = textSizeValue + 6;

  // Loop through messages in reverse
  for (int i = messages.size() - 1; i >= 0; i--) {
    Message msg = messages.get(i);

    // Set text color to the screen name's color
    fill(nameColors.get(msg.name));
    textFont(fontBold, textSizeValue);
    text(msg.name + ": ", 0, -y);

    // Set text color for the message text
    fill(200);
    textFont(fontRegular, textSizeValue);
    text(msg.text, textWidth(msg.name + ": "), -y);

    y += lineHeight;
    if (y > height - 250) {
      break;
    }
  }
  popMatrix();
}

void drawTextSizeSlider() {
  // Draw the text size slider
  fill(80);
  rect(10, height - 220, width - 20, 30);
  stroke(150);
  line(20, height - 205, width - 30, height - 205);

  float sliderX = map(textSizeValue, textSizeMin, textSizeMax, 20, width - 30);
  fill(180);
  ellipse(sliderX, height - 205, 15, 15);

  // Handle mouse interaction
  if (mousePressed && mouseY > height - 220 && mouseY < height - 190 && mouseX > 20 && mouseX < width - 30) {
    textSizeValue = map(mouseX, 20, width - 30, textSizeMin, textSizeMax);
    textSizeValue = constrain(textSizeValue, textSizeMin, textSizeMax);
  }
}

void drawSlider() {
  // Draw the speed slider
  fill(80);
  rect(10, height - 180, width - 20, 30);
  stroke(150);
  line(20, height - 165, width - 30, height - 165);

  float sliderX = map(sliderValue, sliderMin, sliderMax, 20, width - 30);
  fill(180);
  ellipse(sliderX, height - 165, 15, 15);

  // Handle mouse interaction
  if (mousePressed && mouseY > height - 180 && mouseY < height - 150 && mouseX > 20 && mouseX < width - 30) {
    sliderValue = map(mouseX, 20, width - 30, sliderMin, sliderMax);
    sliderValue = constrain(sliderValue, sliderMin, sliderMax);
  }
}

void drawCheckboxes() {
  // Draw checkboxes for topics
  drawCheckbox("Pets", petChecked, 20, 60);
  drawCheckbox("Gaming", gamingChecked, 100, 150);
  drawCheckbox("Art", artChecked, 190, 220);
  drawCheckbox("Philosophy", philosophyChecked, 260, 340);
  drawCheckbox("Coding", codingChecked, 380, 430);
  drawCheckbox("Weather", weatherChecked, 470, 530);
}

void drawCheckbox(String label, boolean checked, float textX, float boxX) {
  fill(200);
  textFont(fontRegular, 14);
  text(label, textX, height - 140);
  fill(checked ? 180 : 80);
  rect(boxX, height - 155, 15, 15);
}

void drawWinButton() {
  // Draw the Win button
  fill(80);
  rect(10, buttonY, buttonWidth, buttonHeight);

  // Handle Win button click
  if (mousePressed && mouseX > 10 && mouseX < 10 + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
    winMode = true;
    winModeStartTime = millis();
  }

  // Draw Win mode indicator
  if (winMode) {
    int elapsedTime = millis() - winModeStartTime;
    int remainingTime = 10000 - elapsedTime;
    float barWidth = map(remainingTime, 0, 10000, 0, buttonWidth);
    fill(0, 0, 255, 100); // Semi-transparent blue
    noStroke();
    rect(10, buttonY, barWidth, buttonHeight);

    if (remainingTime <= 0) {
      winMode = false;
    }
  }

  // Draw the Win button text
  fill(200);
  textAlign(CENTER, CENTER);
  textFont(fontBold, 16);
  text("Win", 10 + buttonWidth / 2, buttonY + buttonHeight / 2);
}

void mousePressed() {
  // Handle text size slider interaction
  if (mouseY > height - 220 && mouseY < height - 190 && mouseX > 20 && mouseX < width - 30) {
    textSizeValue = map(mouseX, 20, width - 30, textSizeMin, textSizeMax);
    textSizeValue = constrain(textSizeValue, textSizeMin, textSizeMax);
  }
  // Handle speed slider interaction
  if (mouseY > height - 180 && mouseY < height - 150 && mouseX > 20 && mouseX < width - 30) {
    sliderValue = map(mouseX, 20, width - 30, sliderMin, sliderMax);
    sliderValue = constrain(sliderValue, sliderMin, sliderMax);
  }
  // Handle topic checkboxes
  if (mouseY > height - 155 && mouseY < height - 140) {
    if (mouseX > 60 && mouseX < 75) petChecked = !petChecked;
    if (mouseX > 150 && mouseX < 165) gamingChecked = !gamingChecked;
    if (mouseX > 220 && mouseX < 235) artChecked = !artChecked;
    if (mouseX > 340 && mouseX < 355) philosophyChecked = !philosophyChecked;
    if (mouseX > 430 && mouseX < 445) codingChecked = !codingChecked;
    if (mouseX > 530 && mouseX < 545) weatherChecked = !weatherChecked;
  }
}

class Message {
  String name;
  String text;

  Message(String name, String text) {
    this.name = name;
    this.text = text;
  }
}

class Saying {
  String text;
  int frequency;

  Saying(String text, int frequency) {
    this.text = text;
    this.frequency = frequency;
  }
}
