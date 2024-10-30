// Chat Window Simulation in Processing (Java) - Updated with Auto Chat Toggle and Automatic Win Activation

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

// Topic checkboxes (All enabled by default)
boolean petChecked = true;
boolean gamingChecked = true;
boolean artChecked = true;
boolean philosophyChecked = true;
boolean codingChecked = true;
boolean weatherChecked = true;

boolean winMode = false;
int winModeStartTime = 0;

// Dimensions for the buttons
float buttonWidth;
float buttonHeight = 30;
float buttonY;

// For the custom message input
String userInput = "";
boolean inputFocused = false;
float inputBoxX, inputBoxY, inputBoxWidth, inputBoxHeight;
float sendButtonX, sendButtonY, sendButtonWidth, sendButtonHeight;

// Auto Chat Toggle
boolean autoChatEnabled = true;
float autoChatButtonX, autoChatButtonY, autoChatButtonWidth, autoChatButtonHeight;

// Timer for automatic Win mode activation
int lastWinActivationTime = 0;
int winActivationInterval = 60000; // 60,000 milliseconds (1 minute)

void setup() {
  size(600, 720); // Increased height to accommodate additional button
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

  // Initialize sayings with frequencies (same as before)
  // ... [Initialize topicSayings for all topics] ...

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
  buttonY = height - 200; // Adjusted position of the buttons

  // Calculate positions for the input box and send button
  inputBoxX = 10;
  inputBoxY = buttonY + buttonHeight + 10; // Place it under the buttons
  inputBoxWidth = width - 120;
  inputBoxHeight = 30;

  sendButtonWidth = 80;
  sendButtonHeight = inputBoxHeight;
  sendButtonX = inputBoxX + inputBoxWidth + 10;
  sendButtonY = inputBoxY;

  // Auto Chat Toggle Button
  autoChatButtonWidth = buttonWidth;
  autoChatButtonHeight = buttonHeight;
  autoChatButtonX = 20 + buttonWidth; // Position next to the Win button
  autoChatButtonY = buttonY;

  // Initialize lastWinActivationTime
  lastWinActivationTime = millis();
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

  // Handle automatic messages if Auto Chat is enabled
  if (autoChatEnabled) {
    // Add a new message if the interval has passed
    if (millis() - lastMessageTime > messageInterval) {
      addNewMessage();
      lastMessageTime = millis();
    }

    // Automatically activate Win mode every minute
    if (millis() - lastWinActivationTime > winActivationInterval) {
      winMode = true;
      winModeStartTime = millis();
      lastWinActivationTime = millis();
    }
  }

  // Draw sliders, checkboxes, and buttons
  drawTextSizeSlider();
  drawSlider();
  drawCheckboxes();
  drawWinButton();
  drawAutoChatButton();

  // Draw the input box and send button
  drawInputBox();
  drawSendButton();
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
    lastWinActivationTime = millis(); // Reset the timer
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

void drawAutoChatButton() {
  // Draw the Auto Chat toggle button
  fill(80);
  rect(autoChatButtonX, autoChatButtonY, autoChatButtonWidth, autoChatButtonHeight);

  // Handle Auto Chat button click
  if (mousePressed && mouseX > autoChatButtonX && mouseX < autoChatButtonX + autoChatButtonWidth && mouseY > autoChatButtonY && mouseY < autoChatButtonY + autoChatButtonHeight) {
    autoChatEnabled = !autoChatEnabled;
  }

  // Draw the Auto Chat button text
  fill(200);
  textAlign(CENTER, CENTER);
  textFont(fontBold, 16);
  String status = autoChatEnabled ? "ON" : "OFF";
  text("Auto Chat: " + status, autoChatButtonX + autoChatButtonWidth / 2, autoChatButtonY + autoChatButtonHeight / 2);
}

void drawInputBox() {
  // Draw the input box background
  fill(255);
  stroke(0);
  rect(inputBoxX, inputBoxY, inputBoxWidth, inputBoxHeight);

  // Draw the text inside the input box
  fill(0);
  textAlign(LEFT, CENTER);
  textFont(fontRegular, 14);
  text(userInput, inputBoxX + 5, inputBoxY + inputBoxHeight / 2);

  // Draw a cursor if the input box is focused
  if (inputFocused) {
    float cursorX = inputBoxX + 5 + textWidth(userInput);
    stroke(0);
    line(cursorX, inputBoxY + 5, cursorX, inputBoxY + inputBoxHeight - 5);
  }
}

void drawSendButton() {
  // Draw the send button
  fill(80);
  rect(sendButtonX, sendButtonY, sendButtonWidth, sendButtonHeight);

  // Draw the button text
  fill(200);
  textAlign(CENTER, CENTER);
  textFont(fontBold, 16);
  text("Send", sendButtonX + sendButtonWidth / 2, sendButtonY + sendButtonHeight / 2);
}

void mousePressed() {
  // Handle text size slider interaction
  if (mouseY > height - 220 && mouseY < height - 190 && mouseX > 20 && mouseX < width - 30) {
    textSizeValue = map(mouseX, 20, width - 30, textSizeMin, textSizeMax);
    textSizeValue = constrain(textSizeValue, textSizeMin, textSizeMax);
  }
  // Handle speed slider interaction
  else if (mouseY > height - 180 && mouseY < height - 150 && mouseX > 20 && mouseX < width - 30) {
    sliderValue = map(mouseX, 20, width - 30, sliderMin, sliderMax);
    sliderValue = constrain(sliderValue, sliderMin, sliderMax);
  }
  // Handle topic checkboxes
  else if (mouseY > height - 155 && mouseY < height - 140) {
    if (mouseX > 60 && mouseX < 75) petChecked = !petChecked;
    else if (mouseX > 150 && mouseX < 165) gamingChecked = !gamingChecked;
    else if (mouseX > 220 && mouseX < 235) artChecked = !artChecked;
    else if (mouseX > 340 && mouseX < 355) philosophyChecked = !philosophyChecked;
    else if (mouseX > 430 && mouseX < 445) codingChecked = !codingChecked;
    else if (mouseX > 530 && mouseX < 545) weatherChecked = !weatherChecked;
  }
  // Handle input box focus
  else if (mouseX > inputBoxX && mouseX < inputBoxX + inputBoxWidth && mouseY > inputBoxY && mouseY < inputBoxY + inputBoxHeight) {
    inputFocused = true;
  } else {
    inputFocused = false;
  }
  // Handle send button click
  if (mouseX > sendButtonX && mouseX < sendButtonX + sendButtonWidth && mouseY > sendButtonY && mouseY < sendButtonY + sendButtonHeight) {
    if (userInput.length() > 0) {
      messages.add(new Message("cooldog", userInput));
      if (messages.size() > maxMessages) {
        messages.remove(0);
      }
      userInput = "";
    }
  }
  // Handle Auto Chat button click is handled in drawAutoChatButton()
}

void keyPressed() {
  if (inputFocused) {
    if (key == CODED) {
      // Do nothing for coded keys like arrow keys
    } else if (key == BACKSPACE) {
      if (userInput.length() > 0) {
        userInput = userInput.substring(0, userInput.length() - 1);
      }
    } else if (key == ENTER || key == RETURN) {
      // Optionally, send the message on Enter
      if (userInput.length() > 0) {
        messages.add(new Message("cooldog", userInput));
        if (messages.size() > maxMessages) {
          messages.remove(0);
        }
        userInput = "";
      }
    } else {
      // Append the typed character to userInput
      userInput += key;
    }
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
