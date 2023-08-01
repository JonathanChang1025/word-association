import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReducer, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import Confetti from 'react-confetti';
import MainMenu from './MainMenu';
import GameBoard from './GameBoard';
import randomPictionaryWords from 'word-pictionary-list';
import capitalizedWord from './utilities/CapitalizeWord';

const DEFAULT_GAME_STATE = {
  wordPairs: [['Player 1', 'Player 2']],
  gameStarted: false,
  turn: 0,
  playerInputs: ['', ''],
  input_error: '',
  showConfetti: false,
  gameEnded: false,
};

const capitalizedWordPair = (wordPair) => (
  wordPair.map(word => capitalizedWord(word))
);

const generateWordPair = () => {
  const wordPair = randomPictionaryWords(2);

  return capitalizedWordPair(wordPair)
}

const gameStateReducer = (state, action) => {
  switch (action.type) {
    case 'GAME_START_INIT':
      return {
        ...state,
        wordPairs: [...state.wordPairs, generateWordPair()],
        gameStarted: true,
      };
    case 'NEXT_TURN':
      const next_turn = (state.turn + 1) % 3;

      return {
        ...state,
        turn: next_turn
      };
    case 'UPDATE_PLAYER_INPUT':
      const playerInputs = state.playerInputs;
      playerInputs[action.payload.player_id] = action.payload.input;

      return {
        ...state,
        playerInputs: playerInputs,
      };
    case 'SUBMIT_PLAYER_INPUTS':
      return {
        ...state,
        playerInputs: ['', ''],
        wordPairs: [...state.wordPairs, state.playerInputs],
      };
    case 'SET_INPUT_ERROR':
      return {
        ...state,
        input_error: action.payload.error
      };
    case 'GAME_VICTORY':
      return {
        ...state,
        showConfetti: true,
        gameEnded: true,
      };
    case 'STOP_CONFETTI':
      return {
        ...state,
        showConfetti: false,
      };
    case 'GAME_RESET':
      return {...cloneDeep(DEFAULT_GAME_STATE)};
    default:
      throw new Error();
  }
};

const App = () => {
  const [gameState, dispatchGameState] = useReducer(
    gameStateReducer,
    cloneDeep(DEFAULT_GAME_STATE),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchGameState({ type: 'STOP_CONFETTI' });
    }, 5000);

    return () => clearTimeout(timer);
  }, [gameState.showConfetti]);

  const handleGameStarted = () => {
    dispatchGameState({
      type: 'GAME_START_INIT',
    });
  }

  return (
    <div className='bg-light'>
      <div className='d-flex justify-content-center app-margins'>
        {
          gameState.gameStarted
            ? <>
              {gameState.showConfetti && (
                <Confetti
                  numberOfPieces={200}
                  recycle={true}
                />
              )}
                <GameBoard
                  gameState={gameState}
                  dispatchGameState={dispatchGameState}
                />
              </>
            : <MainMenu onGameStarted={handleGameStarted}/>
        }
      </div>
    </div>
  );
}

export default App;
