
## Introduction

Spaced Repetition is a flashcard review web app based on the technique of [Spaced Repetition](https://en.wikipedia.org/wiki/Spaced_repetition), a scientifically proven method to memorize information. Use it to memorize everything from vocabulary to equations to historical dates!

All the flashcard information is stored in the cloud, so you can review your flashcards wherever and whenever you have internet. It's a web app: just go to [the website](https://spaced-repetition-online.herokuapp.com) to review, no installation required!

## Usage
First things first, sign in with Google.

To create your first "deck" of flashcards, click on "New Deck", type in the deck name, and hit enter. The deck starts with a single placeholder card: press "View Deck" to create more (you can edit flashcards by clicking on them). 

Once you have created the flashcards you want, click "Study" to start studying them. I recommend trying to study each deck once per day: ideally, make it a routine!

## For Developers <hr>
## Available Commands

Note: You cannot run the server without a database URL and OAuth2 client secret, which I'm obviously not giving away. You will need to obtain those yourself, or you could instead simply redirect HTTP requests by changing ```proxy``` in package.json to the Heroku server I have running at ```https://spaced-repetition-online.herokuapp.com```

In the project directory, you can run:

### `npm start`

Builds the app for production to the `build` folder, then starts a server for it if possible.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.<br>
Used by Heroku.
### `npm test`

Launches the test runner (jest) in the interactive watch mode.<br>

### `npm run dev`

Runs the app in the development mode.<br> 
Requires a server to be currently running (you can use mine as described above).<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
### `npm run build`

Builds the clientside of the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**<br>
**You shouldn't ever use eject: the scripts already in this project should be sufficient.**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

## Database Schema

The MySQL database being used contains a single table: ```cards```. This table was created with 
 ~~~~
 CREATE TABLE cards (
	id INT UNSIGNED AUTO_INCREMENT,
    user VARCHAR(255),
    deck VARCHAR(255),
    front TEXT,
    back TEXT,
    confidence SMALLINT, 
    time INT UNSIGNED,
    PRIMARY KEY (id)
  );
  ~~~~

Confidence is how confident the spaced repetition algorithm is that this card is memorized.<br>
Time is a timestamp of when this card should be reviewed next, measured in seconds since the UNIX epoch.
## This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find a guide for performing common tasks in Create React App [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md), although some of that does not apply or has already been set up in this project.