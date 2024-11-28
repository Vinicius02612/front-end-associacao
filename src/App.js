import Login from './routes/Login/Login';
import Cadastro from './routes/Cadastro/Cadastro';
import Home from './routes/Home/Home';
import './App.css';




function App() {
  return (
    <div className="App">
      {/* Criando front da tela home */}
      <Login />
      <Cadastro />
      <Home/>
    </div>
  );
}

export default App;
