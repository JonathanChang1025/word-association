import 'bootstrap/dist/css/bootstrap.min.css';
import './MainMenu.css';
import Button from 'react-bootstrap/Button';

const MainMenu = ({ onGameStarted }) => {
  return (
    <div className='d-flex justify-content-center flex-column'>
      <h1 className='main-menu-font giant-text'>Word Association</h1>
      <div className="spacer"/>
      <Button className='main-menu-font' variant='primary' onClick={onGameStarted}>START</Button>
    </div>
  );
}

export default MainMenu;
