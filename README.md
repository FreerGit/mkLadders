# Mario Kart Ladder

A simple CRUD website to keep track over our Mario Kart games with a common ladder!

It's live at: mkladders.se!

You may add matches and players as you wish, my own ladder is on a different server.

## How and Why 
Backend: Typescript, Express JS

Frontend: React, Server-side-rendering with Next JS, Material UI

Why: Mostly just for fun but i also wanted to actually deploy a website with docker containers. The website is hosted on a EC2 in AWS.

## Install and run
once you've cloned the reposity run `npm i` root, frontend and backend directories. 
Then run `docker-compose build` in the root directory and lastly `docker-compose up`.

The website should then be reachable at [localhost:3000](http://localhost:3000).

## Future work
I would like to have my ladder on the live website, however this would require multiple ladder instances and some sort of authentication.

A ladder would be accessible with a common password/hash that all players within that ladder agrees on. Because of this all players (group of friends) can access the ladder they have the password for, this would atleast give simple security.

The UI is still scrappy.

The ability to revert a match incase the match was incorrectly made by the users.
