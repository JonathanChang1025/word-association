import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import capitalizedWord from './utilities/CapitalizeWord';

const invalidCharacters = (word) => {
  const regex = /^[A-Za-z\s]{2,}$/;
  return !regex.test(word);
};

const repeatedWord = (word, wordList) => {
  return wordList.includes(word);
};

const checkWinCondition = (playerInputs) => {
  if (playerInputs.length === 0) return true;

  const firstElement = playerInputs[0];

  for (let i = 1; i < playerInputs.length; i++) {
    if (playerInputs[i] !== firstElement) {
      return false;
    }
  }

  return true;
};

const handleSubmit = (event, gameState, dispatchGameState) => {
  event.preventDefault();

  const playerInputs = gameState.playerInputs

  if (gameState.turn === 2) {
    if (gameState.gameEnded) {
      dispatchGameState({
        type: 'GAME_RESET',
      });
        
      return;
    }

    dispatchGameState({
      type: 'SUBMIT_PLAYER_INPUTS',
    });

    if (checkWinCondition(playerInputs)) {
      dispatchGameState({
        type: 'GAME_VICTORY',
      });
    } else {
      dispatchGameState({
        type: 'NEXT_TURN',
      });
    };

    return
  };

  
  const playerInput = playerInputs[gameState.turn]
  const invalidCharactersError = invalidCharacters(playerInput);
  const repeatedWordError = repeatedWord(playerInput, gameState.wordPairs.flat())

  if (invalidCharactersError || repeatedWordError) {
    var error_mesage = '';

    if (invalidCharactersError) error_mesage = 'Alphabets only and must be at least 2 characters long';
    if (repeatedWordError) error_mesage = 'Cannot repeat words';

    dispatchGameState({
      type: 'SET_INPUT_ERROR',
      payload: {
        error: error_mesage,
      },
    });
  } else {
    dispatchGameState({
      type: 'SET_INPUT_ERROR',
      payload: {
        error: ''
      },
    });

    dispatchGameState({
      type: 'NEXT_TURN',
    });
  };
};

const FormLabel = (gameState) => {
  switch(gameState.turn) {
    case 0:
      return ("Player One's Input");
    case 1:
      return ("Player Two's Input");
    case 2:
      return ("idk yet");
    default:
      throw new Error();
  }
};

const handleInputChange = (event, gameState, dispatchGameState) => {
  if (gameState.turn !== 0 && gameState.turn !== 1) {
    return
  }

  var input_value = event.target.value;
  input_value = capitalizedWord(input_value);

  dispatchGameState({
    type: 'UPDATE_PLAYER_INPUT',
    payload: {
      player_id: gameState.turn,
      input: input_value
    },
  });
};

const displayPlayerInput = (gameState) => {
  if (gameState.turn !== 0 && gameState.turn !== 1) {
    return ('');
  }

  return (gameState.playerInputs[gameState.turn]);
};

const PlayerInput = ({ gameState, dispatchGameState }) => {
  return (
    <>
      <form onSubmit={(event) => handleSubmit(event, gameState, dispatchGameState)}>

        <div className='text-danger'>{gameState.input_error}</div>
        <div className='input-group mb-5' >
          { gameState.turn !== 2
          ? <>
              <div className='input-group-prepend'>
                <span className='input-group-text'>{FormLabel(gameState)}</span>
              </div>
              <input
                type='password'
                className={`form-control ${gameState.input_error ? 'is-invalid' : ''}`}
                value={displayPlayerInput(gameState)}
                onChange={(event) => handleInputChange(event, gameState, dispatchGameState)}
                required
              />
              <div className='input-group-append'>
                <Button type='submit'>Submit</Button>
              </div>
            </>
          : <div className='input-group-append w-100'>
              <Button
                type='submit'
                className='w-100'
              >
                {gameState.gameEnded ? 'Restart game' : 'Click to see result'}
              </Button>
            </div>
          }
        </div>
      </form>
    </>
  );
}

export default PlayerInput;
