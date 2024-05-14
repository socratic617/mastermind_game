# 🕹 Mastermind Game 🎮

## 👋 Introduction
Welcome to the Mastermind Game, a user-friendly application that challenges Codebreakers (you) to decrypt the code set by the Codemaker in order to win. This is a full-stack application utilizing the Model-View-Controller (MVC) design pattern, implemented with Node.js for the server-side logic and EJS (Embedded JavaScript) for templating to generate dynamic HTML views. JavaScript, along with OOP principles, is employed to create an engaging and interactive game experience.

## ⭐ Features
- 🎮 **Custom Game Creation**: Customize the game by choosing the number of guesses allowed and the range of numbers to make it more challenging.
- 🔄 **Multi-Round Gameplay**: Select how many rounds to play against the Codemaker for extended gameplay.
- 🎯 **Feedback for Each Guess**: Receive immediate feedback from the Codemaker after each guess to guide your strategy.
- 📜 **Live History of Attempts**: View a live history of your previous guesses to track your progress and adjust your approach.
- 🏆 **Score Display**: Keep track of scores for both the Codemaker and the Codebreaker to enhance competition and engagement.
- 🔐 **User Authentication**: Register for an account, log in, and log out to access and save your game progress securely.

## 🚀 Tech Stack
- MongoDB
- Node
- Javascript
- EJS
- FlowBite

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/socratic617/mastermind_game.git
2. Navigate to the project directory:
   ```bash
   cd mastermind_game

3. Install dependencies:
   ```bash
   npm install
4. Run the application:
   ```bash
   npm start
5. Access the app in your web browser at http://localhost:2000.

This guide will help you get started with the Mastermind Game application. Follow these steps to clone the repository, install dependencies, and run the app locally on your machine. Once the app is running, you can access it at http://localhost:2000 to start playing Mastermind!

## 🗂️ (Relevant) File Structure
```bash
┣ 📂config
 ┃ ┣ 📜.env
 ┃ ┣ 📜database.js
 ┃ ┗ 📜passport.js
 ┣ 📂controllers
 ┃ ┣ 📜auth.js
 ┃ ┗ 📜game.js
 ┣ 📂middleware
 ┃ ┗ 📜auth.js
 ┣ 📂models
 ┃ ┣ 📜Game.js
 ┃ ┗ 📜User.js
 ┣ 📂public
 ┃ ┣ 📂css
 ┃ ┣ 📂imgs
 ┃ ┃ ┣ 📜jigsaw.gif
 ┃ ┃ ┣ 📜login-background-mastermind.gif
 ┃ ┃ ┣ 📜playerOne.gif
 ┃ ┃ ┗ 📜playerTwo.gif
 ┃ ┣ 📜board.js
 ┃ ┣ 📜codebreaker.js
 ┃ ┣ 📜codemaker.js
 ┃ ┣ 📜game.js
 ┃ ┗ 📜main.js
 ┣ 📂routes
 ┃ ┣ 📜game.js
 ┃ ┗ 📜main.js
 ┣ 📂views
 ┃ ┣ 📜game.ejs
 ┃ ┣ 📜index.ejs
 ┃ ┣ 📜login.ejs
 ┃ ┗ 📜signup.ejs
 ┣ 📜.gitignore
 ┣ 📜directory_structure.txt
 ┣ 📜LICENSE
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜server.js
```
## 🔄 Process Flow Diagram

![ProcessFlowDiagram drawio](https://github.com/socratic617/mastermind_game/assets/144078314/913d8692-59db-4993-bc46-dd39e87d51fa)

## 🎮 Game Design

![GAMEDESIGN drawio](https://github.com/socratic617/mastermind_game/assets/144078314/8d91a8b1-42fb-4b47-9d89-04aa70a6eabf)

## 🧠 Thought Process and Creative Extensions
My approach to building the Mastermind game began with immersing myself in the physical version, playing it, and understanding its rules. This initial experience helped me map out the game design, identifying key components like the Codemaker, Codebreaker, color pegs (adapted to numbers in my version), and the decoder board.

Once I had a clear understanding of the game's mechanics, I delved into creating a process flow diagram to visualize the game's flow—from generating the secret code to receiving and providing feedback on guesses. This diagram informed my approach to game logic development.

To organize my tasks effectively, I utilized a Trello board, breaking down the project into manageable weekly milestones. I started by building a basic UI and implementing core game logic, rigorously testing each component before proceeding.

Given the complexity of the game logic, I focused heavily on object-oriented programming (OOP) principles, ensuring that the code was modular, reusable, and maintainable. This approach allowed me to create a robust foundation for the game's backend and logic before refining the user interface.

For the UI design, I used Flowbite CSS, integrating it with my game logic and backend functionalities. The most challenging aspect was implementing dynamic feedback to users and making the game configuration adaptable.

As creative extensions, I attempted to incorporate multiplayer functionality and a leaderboard. Although these features were not fully implemented, they represent ongoing efforts to enhance the game's scope and engagement.

