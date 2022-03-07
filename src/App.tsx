import './App.scss';

function App() {
  return (
    <div className="App">
      <h1 className='question'>An animal cell contains:</h1>
      <ul className="answers-list">
        <li>Cell Wall Ribosomes</li>
        <li>Cytoplasm Chloroplast</li>
        <li>Partially permeable membrane Impermeable membrane</li>
        <li>Cellulose Mitochondria</li>
      </ul>
      <h2 className='answers-status'>The answer is incorrect</h2>
    </div>
  );
}

export default App;
