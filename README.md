# Project Milestone 3
## Michael C Fralish


## Install Requirements
1. `sudo apt-get update` <-- Update your installer so the pip installation works
2. `sudo apt install python3-pip` <-- Python package manager (use this to install remaining tech)
3. `pip3 install flask` <-- The framework used in this app
4. `pip3 install python-dotenv` <-- Allows system to access .env file in order to hide certain things such as API keys.
5. `pip3 install requests` <-- Allows your API to interact with foreign API's (Used in this app to query the tmdb and mediawiki action API)
6. `sudo apt intall postgresql` <-- installs the language postgresql on your machine
7. `sudo service postgresql start` <-- starts postgresql
8. `pip3 install psycopg2-binary` <-- needed to utilize and create a database
9. `pip3 install Flask-SQLAlchemy==2.1` <-- The library used to assist with SQL/DB management and keep everything in one language as much as possible
10. `pip3 install flask_login` <-- Required library for login functionality.
11. `sudo apt install npm` <-- React framework for JS
12. If you get an error about node version being out of date, run `sudo npm install -g n` followed by `sudo n latest`.


## Setup
1. Create a free Heroku account at https://signup.heroku.com/login in order to use thier databases.
2. Make a free tmdb.com account at `https://www.themoviedb.org/signup`.
3. On the website, go to your account settings and click the tab API to find your tmdb API KEY.
4. Open terminal and run the above commands to install required libraries used in this app
5. Use the command`sudo curl https://cli-assets.heroku.com/install.sh | sh` to install heroku assets on your local machine
6. Use the command `heroku login -i`. Follow the prompts and login to heroku from your terminal.
7. Use the command `heroku addons:create heroku-postgres:hobby-dev` to attach a DB to your app. This will generate a Config Var on heroku named DATABASE_URL.
8. Create `.env` file in your main directory
9. In this file add your TMDB API key. It MUST be named TMDB_API_KEY in order for this to run correctly. Use the line: `TMDB_API_KEY = <YOUR_KEY>`
10. Generate a random and secure string; may use `python3 -c 'import secrets; print(secrets.token_hex())'`
11. Add secret key as a global variable in `.env` file as `SECRET_KEY = <YOUR KEY>`. Your website will use this for session logging and user verification.
12. Use the command `heroku config` in the terminal to show your `DATABASE_URL` from the stored Config Vars on Heroku.
   You will then create another global variable in the .env tile and label it NEW_DATABASE_URL. Use the line `NEW_DATABASE_URL = <YOUR_DAYABASE_URL>`.
   Now, you must ammend the part where is says `postgres://` in the data part of the variable to `postgresql://`. This will ensure that it runs with the app.
13. Run `npm ci` to install continuous integration files and sync your app.
14. Run `npm run build` to build the React component of your app.
13. Run the app with the command `python3 app.py`.


## Go here to find the deployed app from mileston 2. The React page is not deployed
`https://mf-se-milestone2.herokuapp.com/`


## Technical issues and problem solving
1. Navigating a new language. Learning to code in Javascript was a huge learning curve for this milestone. It took me many hours of reading, experimenting, and learning about the flow of data, hooks, state variables and other Javascript coding tools and practices. I feel much more comfortable using this language at this point, especially with React framework. JS is dissimalr to the other scripting languages I have previously used becuase it is loosely typed and has several notations that I have been previously unexposed to.

2. Getting the state to update at the current times. One issue I kept having while working on my app was that when I would make a change, such as to trash a review, it would say that the state variable had been updated when I would print it out in the console, yet it was not depicted on my page. After speaking to Rachel and some other classmates, I was able to determine that I was improperly using property spread notation. Rather than using `newState = [...state]`, I was doing, `newState = state`, which caused the issue.

3. Utilizing props correctly in the CommentBlock component. My original idea was to use this CommentBlock component for each comment being viewed. I hit a block when it came to implementing the buttons to change the rating and to delete the review, however. I had a hard time figuring out how to link them to each specific comment and to make them perform logic after being pressed. After gaining a further understanding of how props worked, I realized that the functions that each button in the component could be passed as props. This helped me solve the issue I was having with modularity.

## Hardest part amongst all three milestones
Having to work with so much unfamiliar tools and technology was definetely the hardest part of the project overall. It is like being given a riddle to solve and then when you go to read it, it's in Arabic. I don't know any Arabic, so in order for me to figure out the riddle, I must first learn to be familiar enough to read the riddle and then to formulate a response. The oppurtunity to work with and interact with other students on this project has surely enhanced my understanding of the logic and tech stack used. 

The Hacky Hour for each milestone was such a great idea. It alleviates the burden of explaining each concept in great detail to each student because the TA's are readily available, and we are all able to help each other comprehend topics that would otherwise have left us stuck. It is a commonly held truth that teaching others is the best way to master any material, and I found myself with the oppurtunity to explain to my peers several concepts or examples within my own code. This helped me overcome other obstacles that I was having as I gained a deeper and more full understanding of the language and technology. Likewise, I was fortunate enough to have been the beneficiary of some helpful insight from some of my peers. I worked with Meya C and Michelle Serrano through several of the obstacles that I was stumped on.
