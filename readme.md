# Chat Window 🐶🐱💬

Welcome to the **Chat Window** project! This interactive application simulates a chat room with various virtual participants discussing different topics. It's a fun way to visualize how conversations flow in a group chat.

## Features ✨

- **Dynamic Chat Simulation**: Watch as virtual participants send messages in real-time.
- **Customizable Topics**: Select from multiple topics to influence the conversation:
  - Pets 🐶🐱
  - Gaming 🎮
  - Art 🎨
  - Philosophy 🧠
  - Coding 💻
- **Adjustable Settings**:
  - **Chat Speed**: Control how quickly messages appear.
  - **Text Size**: Adjust the size of the chat text for better readability.
- **Unique Participants**: Virtual chatters with fun dog and cat code names.
- **Dark Mode Interface**: A sleek, modern look that's easy on the eyes.


## Usage 🛠️

- **Adjust Chat Speed**:
  - Use the **Speed Slider** to control how fast new messages appear.
  - Slide to the left for slower chat, slide to the right for faster chat.

- **Adjust Text Size**:
  - Use the **Text Size Slider** to increase or decrease the size of the chat text.

- **Select Topics**:
  - Check or uncheck the boxes to include or exclude topics from the conversation.
  - Topics include:
    - **Pets** 🐾
    - **Gaming** 🎮
    - **Art** 🎨
    - **Philosophy** 🧠
    - **Coding** 💻

- **Watch the Conversation**:
  - Messages will appear in the chat window based on your selected topics.
  - Each participant has a unique color for their username.

## Code Overview 📝

### Main Components 🧩

- **Screen Names**: An array of fun dog and cat code names.
- **Sayings**: Arrays of phrases categorized by topics.
- **Frequencies**: Determines how often each saying appears.
- **Messages**: Stores the chat messages displayed in the window.
- **Sliders**: Controls for chat speed and text size.
- **Checkboxes**: Toggles for each topic to customize the conversation.

### Functions ⚙️

- **setup()**: Initializes the canvas, fonts, participants, sayings, and UI elements.
- **draw()**: The main loop that updates the chat window, handles message timing, and renders UI components.
- **addNewMessage()**: Adds a new message to the chat based on selected topics.
- **getRandomSaying()**: Selects a saying from the available topics using weighted randomness.
- **drawChatWindow()**: Renders the chat messages inside the chat window.
- **drawSlider()**: Draws the speed slider and handles user interaction.
- **drawTextSizeSlider()**: Draws the text size slider and handles user interaction.
- **drawCheckboxes()**: Renders the topic checkboxes and handles toggling.
- **mousePressed()**: Captures mouse input to interact with sliders and checkboxes.

## Customization 🎨

- **Add Your Own Sayings**:
  - You can add more sayings to each topic by editing the sayings arrays.
- **Change Participant Names**:
  - Modify the screen names array to include your own fun names.
- **Adjust Frequencies**:
  - Tweak the frequencies arrays to control how often certain phrases appear.
- **UI Enhancements**:
  - Customize colors, fonts, and layout by modifying the code.
