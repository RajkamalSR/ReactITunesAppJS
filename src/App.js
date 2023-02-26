import HeaderComponent from './components/Header';
import SongListCompnent from './components/songlists/SongList';
import './App.css';


function App() {
  return (
    <div className="App">
      <HeaderComponent/>
      <SongListCompnent />
    </div>
  );
}

export default App;
