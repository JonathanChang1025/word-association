import './WordPair.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const WordPair = ({wordPair, isLastElement, gameEnded}) => {
  return (
    <div className='container d-flex justify-content-between bg-white'>
      {wordPair.map((word, index) => {
        return (
          <div
            key={index}
            className={`
              mr-auto
              ${(isLastElement || gameEnded) ? 'highlight-font' : 'default-font'}
              ${(isLastElement && !gameEnded) && 'text-warning'}
              ${(isLastElement && gameEnded) && 'text-success'}
            `}
          >
            {word}
          </div>
        );
      })}
    </div>
  );
}

export default WordPair;
