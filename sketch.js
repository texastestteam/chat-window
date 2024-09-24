// Chat Window Simulation in Processing (Java) - Dark Mode with Coding Topic

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

// Arrays to hold screen names, sayings, and frequencies
ArrayList<String> screenNames = new ArrayList<String>();

// Sayings categorized by topic
ArrayList<String> petSayings = new ArrayList<String>();
ArrayList<Integer> petFrequencies = new ArrayList<Integer>();

ArrayList<String> gamingSayings = new ArrayList<String>();
ArrayList<Integer> gamingFrequencies = new ArrayList<Integer>();

ArrayList<String> artSayings = new ArrayList<String>();
ArrayList<Integer> artFrequencies = new ArrayList<Integer>();

ArrayList<String> philosophySayings = new ArrayList<String>();
ArrayList<Integer> philosophyFrequencies = new ArrayList<Integer>();

ArrayList<String> codingSayings = new ArrayList<String>();
ArrayList<Integer> codingFrequencies = new ArrayList<Integer>();

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

boolean petChecked = true;
boolean gamingChecked = false;
boolean artChecked = false;
boolean philosophyChecked = false;
boolean codingChecked = false;

void setup() {
  size(600, 620);
  textSize(textSizeValue);
  fontRegular = createFont("Arial", 14);
  fontBold = createFont("Arial Bold", 14);
  
  // Initialize screen names (funny dog and cat code names)
  String[] names = {
    "Chill Dog", "Lazy Dog", "Internet Dog", "Happy Dog", "Sleepy Dog",
    "Silly Cat", "Grumpy Cat", "Whiskers", "Purrfect Cat", "Curious Cat"
  };
  screenNames.addAll(Arrays.asList(names));
  
  // Initialize pet sayings
  String[] petPhrases = {
    "Woof woof!", "Meow meow!", "Just chilling...", "Nap time!", "Anyone up for a walk?",
    "Found a comfy spot!", "Chasing lasers!", "Looking for treats!", "Time to play!", "Purring loudly!"
  };
  int[] petFreq = {10, 10, 15, 15, 5, 10, 5, 10, 15, 5};
  petSayings.addAll(Arrays.asList(petPhrases));
  for (int f : petFreq) {
    petFrequencies.add(f);
  }
  
  // Initialize gaming sayings
  String[] gamingPhrases = {
    "GG!", "Victory Royale!", "Anyone up for Fortnite?", "I love Fortnite!", "Just got number 2!",
    "Let's squad up!", "Building ramps!", "Watch out for snipers!", "Battle bus is leaving!", "Drop at Tilted Towers?"
  };
  int[] gamingFreq = {15, 10, 15, 10, 10, 5, 5, 5, 5, 10};
  gamingSayings.addAll(Arrays.asList(gamingPhrases));
  for (int f : gamingFreq) {
    gamingFrequencies.add(f);
  }
  
  // Initialize art sayings
  String[] artPhrases = {
    "The juxtaposition of colors is fascinating.", "This piece evokes deep emotions.", "The brushwork is impeccable.",
    "Analyzing fine art design.", "The composition is well-balanced.", "Exploring abstract forms.",
    "The chiaroscuro adds depth.", "Admiring the texture.", "The use of space is intriguing.", "Art is a universal language."
  };
  int[] artFreq = {10, 10, 15, 15, 10, 5, 5, 10, 5, 5};
  artSayings.addAll(Arrays.asList(artPhrases));
  for (int f : artFreq) {
    artFrequencies.add(f);
  }
  
  // Initialize philosophy sayings
  String[] philosophyPhrases = {
    "The unexamined life is not worth living.", "Knowledge begins in wonder.", "Man is by nature a political animal.",
    "Happiness depends upon ourselves.", "I know that I know nothing.", "The only true wisdom is in knowing you know nothing.",
    "Virtue is knowledge.", "We are what we repeatedly do.", "To perceive is to suffer.", "Pleasure in the job puts perfection in the work."
  };
  int[] philosophyFreq = {10, 10, 10, 10, 10, 10, 10, 10, 10, 10};
  philosophySayings.addAll(Arrays.asList(philosophyPhrases));
  for (int f : philosophyFreq) {
    philosophyFrequencies.add(f);
  }
  
  // Initialize coding sayings
  String[] codingPhrases = {
    "Wow, nice!", "Is this the matrix?", "Hello World!", "Just debugging...", "Found a bug!",
    "Compiling code...", "Syntax error unexpected token", "Code is poetry", "I love programming!", "Stack overflowed!"
  };
  int[] codingFreq = {10, 10, 15, 15, 10, 10, 5, 5, 10, 10};
  codingSayings.addAll(Arrays.asList(codingPhrases));
  for (int f : codingFreq) {
    codingFrequencies.add(f);
  }
  
  // Assign a unique random color to each screen name
  for (String name : screenNames) {
    nameColors.put(name, color(random(100, 255), random(100, 255), random(100, 255)));
  }
}

void draw() {
  background(30); // Dark mode background
  
  // Update text size from slider
  textSize(textSizeValue);
  
  // Draw the chat window and messages
  drawChatWindow();
  
  // Update message interval based on slider value (from 5s to 1s)
  messageInterval = (int)map(sliderValue, sliderMin, sliderMax, 5000, 1000);
  
  // Add a new message if the interval has passed
  if (millis() - lastMessageTime > messageInterval) {
    addNewMessage();
    lastMessageTime = millis();
  }
  
  // Draw the text size slider
  drawTextSizeSlider();
  
  // Draw the speed slider
  drawSlider();
  
  // Draw checkboxes
  drawCheckboxes();
}

void addNewMessage() {
  // Randomly select a screen name
  String name = screenNames.get((int)random(screenNames.size()));
  
  // Get a saying based on selected topics
  String saying = getRandomSaying();
  
  // If no topics are selected, do nothing
  if (saying == null) return;
  
  // Add the new message to the messages array
  messages.add(new Message(name, saying));
  
  // Keep the messages array within the maximum limit
  if (messages.size() > maxMessages) {
    messages.remove(0);
  }
}

String getRandomSaying() {
  ArrayList<String> availableSayings = new ArrayList<String>();
  ArrayList<Integer> availableFrequencies = new ArrayList<Integer>();
  
  // Collect sayings and frequencies based on selected topics
  if (petChecked) {
    availableSayings.addAll(petSayings);
    availableFrequencies.addAll(petFrequencies);
  }
  if (gamingChecked) {
    availableSayings.addAll(gamingSayings);
    availableFrequencies.addAll(gamingFrequencies);
  }
  if (artChecked) {
    availableSayings.addAll(artSayings);
    availableFrequencies.addAll(artFrequencies);
  }
  if (philosophyChecked) {
    availableSayings.addAll(philosophySayings);
    availableFrequencies.addAll(philosophyFrequencies);
  }
  if (codingChecked) {
    availableSayings.addAll(codingSayings);
    availableFrequencies.addAll(codingFrequencies);
  }
  
  // If no topics are selected, return null
  if (availableSayings.size() == 0) {
    return null;
  }
  
  // Calculate total frequency
  int totalFrequency = 0;
  for (int freq : availableFrequencies) {
    totalFrequency += freq;
  }
  
  float rnd = random(totalFrequency);
  int accum = 0;
  // Select a saying based on its frequency
  for (int i = 0; i < availableSayings.size(); i++) {
    accum += availableFrequencies.get(i);
    if (rnd < accum) {
      return availableSayings.get(i);
    }
  }
  // Fallback in case of error
  return availableSayings.get((int)random(availableSayings.size()));
}

void drawChatWindow() {
  // Draw the chat window background
  fill(50);
  stroke(255);
  rect(10, 10, width - 20, height - 230);
  
  // Begin drawing messages
  pushMatrix();
  translate(15, height - 230); // Adjusted position to prevent overlap
  float y = 0;
  float lineHeight = textSizeValue + 6; // Adjust line height based on text size
  
  // Loop through messages in reverse to display the latest ones at the bottom
  for (int i = messages.size() - 1; i >= 0; i--) {
    Message msg = messages.get(i);
    
    // Set text color to the screen name's color
    fill(nameColors.get(msg.name));
    textFont(fontBold, textSizeValue);
    text(msg.name + ": ", 0, -y);
    
    // Set text color to light gray for the message text
    fill(200);
    textFont(fontRegular, textSizeValue);
    text(msg.text, textWidth(msg.name + ": "), -y);
    
    y += lineHeight; // Move up for the next message
    if (y > height - 250) {
      break; // Stop if we've filled the chat window
    }
  }
  popMatrix();
}

void drawTextSizeSlider() {
  // Draw the text size slider background
  fill(80);
  rect(10, height - 220, width - 20, 30);
  
  // Draw the slider line
  stroke(150);
  line(20, height - 205, width - 30, height - 205);
  
  // Draw the slider handle
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
  // Draw the speed slider background
  fill(80);
  rect(10, height - 180, width - 20, 30);
  
  // Draw the slider line
  stroke(150);
  line(20, height - 165, width - 30, height - 165);
  
  // Draw the slider handle
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
  // Draw pet checkbox
  fill(200);
  textFont(fontRegular, 14);
  text("Pets", 20, height - 140);
  if (petChecked) {
    fill(180);
  } else {
    fill(80);
  }
  rect(60, height - 155, 15, 15);
  
  // Draw gaming checkbox
  fill(200);
  text("Gaming", 100, height - 140);
  if (gamingChecked) {
    fill(180);
  } else {
    fill(80);
  }
  rect(150, height - 155, 15, 15);
  
  // Draw art checkbox
  fill(200);
  text("Art", 190, height - 140);
  if (artChecked) {
    fill(180);
  } else {
    fill(80);
  }
  rect(220, height - 155, 15, 15);
  
  // Draw philosophy checkbox
  fill(200);
  text("Philosophy", 260, height - 140);
  if (philosophyChecked) {
    fill(180);
  } else {
    fill(80);
  }
  rect(340, height - 155, 15, 15);
  
  // Draw coding checkbox
  fill(200);
  text("Coding", 380, height - 140);
  if (codingChecked) {
    fill(180);
  } else {
    fill(80);
  }
  rect(430, height - 155, 15, 15);
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
  // Handle pet checkbox
  if (mouseX > 60 && mouseX < 75 && mouseY > height - 155 && mouseY < height - 140) {
    petChecked = !petChecked;
  }
  // Handle gaming checkbox
  if (mouseX > 150 && mouseX < 165 && mouseY > height - 155 && mouseY < height - 140) {
    gamingChecked = !gamingChecked;
  }
  // Handle art checkbox
  if (mouseX > 220 && mouseX < 235 && mouseY > height - 155 && mouseY < height - 140) {
    artChecked = !artChecked;
  }
  // Handle philosophy checkbox
  if (mouseX > 340 && mouseX < 355 && mouseY > height - 155 && mouseY < height - 140) {
    philosophyChecked = !philosophyChecked;
  }
  // Handle coding checkbox
  if (mouseX > 430 && mouseX < 445 && mouseY > height - 155 && mouseY < height - 140) {
    codingChecked = !codingChecked;
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
