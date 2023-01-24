import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import './App.css';

import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  let complementExist = cep.complemento;
  let neighborhoodExit = cep.bairro;

  async function handleSearch() {
    if (input === '') {
      alert('Preecha o campo abaixo');
      return
    }

    try {
      const res = await api.get(`${input}/json`)
      setCep(res.data);
      setInput('')
    } catch {
      alert("Erro ao buscar")
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP" value={input} onChange={(event) => { setInput(event.target.value) }}></input>
        <button className="buttonSearch" onClick={handleSearch}><FiSearch size={25} color="#FFF"></FiSearch></button>
      </div>
      {Object.keys(cep).length > 0 && (
              <main className="main">
              <h2>CEP: {cep.cep}</h2>
              <span>Rua: {cep.logradouro}</span>
              {complementExist ? <span>Complemento: {cep.complemento}</span>:<span>-</span>}
              {neighborhoodExit ? <span>Bairro: {cep.bairro}</span> : <span>-</span>}
              <span>Cidade: {cep.localidade} - {cep.uf}</span>
            </main>
      )}
    </div>
  );
}

export default App;
