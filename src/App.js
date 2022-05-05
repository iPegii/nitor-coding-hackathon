import './App.css';
import ShowStuff from "./components/ShowStuff"
import UserManager from "./components/UserManager"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ShowStuff></ShowStuff>
        <UserManager></UserManager>
      </header>
    </div>
  );
}

export default App;
