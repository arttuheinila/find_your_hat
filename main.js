const prompt = require('prompt-sync')({sigint: true});
//console.log(require('prompt-sync')()('tell me something about yourself: '))

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
    }    
    //Print the field
    print(){
        for (let i=0; i<this.field.length; i++){
            console.log(this.field[i].join(""));
        }
    }    
}

//Generate new field
generateField = (height, width, holePercentage) => {
        const field = [];
        //set locations for hole and field characters
        for (let i = 0; i < height; i++) {
          const line = [];
          for (let i = 0; i < width; i++) {
            let randomNumber = Math.floor(Math.random() * 100) + 1;
            if (randomNumber > holePercentage) {
              line.push(fieldCharacter);
            } else {
              line.push(hole);
            }
          }
          field.push(line);
        }
        //set random location for hat
        let hatRowNum = Math.floor(Math.random() * height);
        let hatColumnNum = Math.floor(Math.random() * width);
        //make sure hat location is different from path location
        while (hatRowNum === 0 && hatColumnNum === 0) {
          hatRowNum = Math.floor(Math.random() * height);
          hatColumnNum = Math.floor(Math.random() * width);
        }
        //add hat characters to field
        field[hatRowNum].splice(hatColumnNum, 1, hat);
        field[0].splice(0, 1, pathCharacter) 
        return field;
      }

play = () => {
//Display field

    myField.print()
    //const name = prompt('What is your name?');
    console.log('MOVING: u for up, d for down, l for left, r for right')
    // Initial setup of the board
    let gameState = ''
    var i = 0, j = 0
    while (gameState != 'loss!' || gameState != 'win!') {
        //Current position
        let currentPosition = myField.field[i][j]
        //Move
        let move = prompt('Choose a move : ')
        myField.field[i][j] = pathCharacter 
        
        //Move the character and test for valid moves
        if (move === 'u') {
            i --
            newPosition = myField.field[i][j]
        } else if (move === 'd') {
            i ++
            newPosition = myField.field[i][j]
        } else if (move === 'l') {
            j --
            newPosition = myField.field[i][j] 
        } else if (move === 'r') {
            j ++
            newPosition = myField.field[i][j]
        } else {
            console.log('Incorrect input. You need to type "u", "d" "l" or "r"')
            break
        }     
        //Losing moves
        if (i < 0 || j < 0 || newPosition == hole || newPosition == pathCharacter) {
            gameState == 'loss!'
            console.log('You LOST! Loser!. Maybe play again? Please...')
            break
        }
        //Winning moves
        else if (newPosition == hat) {
            gameState == 'win!'
            console.log('You win. You found the HAT!');
            break
        }
        //moving
        else {
        currentPosition = pathCharacter
        myField.field[i][j] = pathCharacter
        console.clear()
        myField.print()
        }
    }
}

//Ask dimensions for the board
height = prompt('How high do you want the field to be? Default is 10. Input number : ')
if (height === '') {
    height = 10
}
width = prompt('How wide do you want the field to be? Default is 10. Input number : ')
if (width === '') {
    width = 10
}

//Set up new board
let myField = new Field(generateField(height, width, 30))
play(
