# Turn-based game - OpenClassrooms - Project 6
## Build a turn-based board game in JavaScript

This repo contains OpenClassrooms Project 6 - Turn-based game. The goal of this project was to create an online game written in JavaScript in which 2 players play each turn to compete. My version of the game is non-violent, the objective is to scare away the enemy.

### Requirements: 

##### Generate the map
* Randomly generating the game map, where each tile can be either: Empty/Unavailable(obstacle)
* On the map the weapons and the two players will be placed randomly 
* The default weapon inflicts 10 points of damage
* Each weapon has a name and associated visual

##### Movement
* For each turn, a player can move from one to three tiles (horizontally or vertically). They can't pass through obstacles
* If a player passes over a weapon, they leave their current weapon on site and replace it with the new one

##### Battle
* If players stand on adjacent squares a battle begins
* The damage depends on the player's weapon
* The player can choose to attack or defend against the next shot
* When defending, they sustain 50% less damage than normal
* When the life points falls to 0, they lose and the game is over

### Extra features
* Changing the character image depending on which weapon they have
* Black hole replacing the character to a random tile
* Hover effect on available tiles, which changes based on the direction
* Changed UI in battle mode
* Play Again feature - resetting the game


Technologies:
* Object-oriented JavaScript application created with **jQuery**, interface created with **HTML** and **CSS**
---

## Play the Game: https://tebracb.github.io/Turn-based-game/
