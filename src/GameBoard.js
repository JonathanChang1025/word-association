import './GameBoard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WordPair from './WordPair';
import PlayerInput from './PlayerInput';

const GameBoard = ({ gameState, dispatchGameState}) => {
  return (
    <div className='d-flex flex-column gameboard-margins'>
      {
        gameState.wordPairs.map((wordPair, index, wordPairs) => {
          const isLastElement = index === wordPairs.length - 1;

          return (
            <WordPair
              key={index}
              wordPair={wordPair}
              isLastElement={isLastElement}
              gameEnded={gameState.gameEnded}
            />
          )
        })
      }
      <div className='mt-auto'>
        <PlayerInput gameState={gameState} dispatchGameState={dispatchGameState}/>
      </div>
    </div>
  );
}

export default GameBoard;
