# Match That Genre (name pending)

## About

This is a game all about testing the player to see if he or she can identify the genre of the music being played. The game will consist of a number of "rounds" where music will be played and a number of genre options given. Choosing the correct genre advances the player to the next round. Each round will become harder by offering less distinct genre choices.

## Rules

The player first begins by selecting, from a predefined list, a broad genre that he or she enjoys. For instance "Rock", "Pop", "Hip Hop", "Classical", etc. The game will consist of an unbounded series of rounds. In each round a music track of the chosen genre will be played and the player must choose which genre he or she believes it is.

Each round becomes harder by two methods. First, the choice of genres will be made less distinct from each other. Second, the music being played is off an increasingly specific (and most likely unfamiliar) genre.

The player is given a number of lives. Each correct choice progresses to the next round without loosing a life, while each incorrect choice progresses to the next round and deducts a single life.

## Win / Lose Conditions
The number of rounds will be unbounded, so the only winning condition will be advancing the largest number of rounds. Upon loosing all lives, the player's name, score, broad genre, and date of play are recorded.

## Implementation
A genre graph will need to be created to identify musical genres and their "closeness". For reference see:
 * [Map of Musical Styles](http://musicmachinery.com/2012/04/22/map-of-music-styles/)
 * [Genre Maze](http://static.echonest.com/LabyrinthOfGenre/GenreMaze.html)

Each round will have a single correct genre and multiple genre choices (one of which being the correct genre). The music will be based on popularity within the genre (with some randomness to promote replayability). The genre choices will be a selection of random genres within a specific distance from the correct genre. The distance will narrow as the rounds progress.
