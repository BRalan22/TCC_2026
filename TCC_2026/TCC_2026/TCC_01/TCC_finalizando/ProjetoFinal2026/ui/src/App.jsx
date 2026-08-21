import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const api = axios.create({ baseURL: 'http://localhost:3000/api' });

export default function App() {
  const [jogos, setJogos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);

  const [jogo, setJogo] = useState('Free Fire');
  const [nickname, setNickname] = useState('');
  const [emailAntigo, setEmailAntigo] = useState('');
  const [descricao, setDescricao] = useState('');

  const usuarioId = "65d000000000000000000001";

  useEffect(() => {
    carregarJogos();
    carregarSolicitacoes();
  }, []);

  const carregarJogos = () => {
    api.get('/jogos')
      .then(res => setJogos(res.data))
      .catch(err => console.error(err));
  };

  const carregarSolicitacoes = () => {
    api.get(`/cart/usuario/${usuarioId}`)
      .then(res => setSolicitacoes(res.data))
      .catch(err => console.error(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jogos', {
        usuario: usuarioId,
        jogo,
        nickname,
        emailAntigo,
        descricao
      });
      alert('Solicitação enviada com sucesso!');
      setNickname('');
      setEmailAntigo('');
      setDescricao('');
      carregarSolicitacoes();
    } catch (error) {
      alert('Erro ao enviar solicitação.');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Deseja cancelar esta solicitação?')) {
      try {
        await api.delete(`/cart/${id}`);
        carregarSolicitacoes();
      } catch (error) {
        alert('Erro ao cancelar.');
      }
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>RecuperContaizi 🎮</h1>
        <p>Plataforma de Recuperação e Suporte para Contas de Jogos</p>
      </header>

      <div className="card-form">
        <h3>Abrir Solicitação de Resgate</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Selecione o Jogo</label>
            <select className="form-control" value={jogo} onChange={e => setJogo(e.target.value)}>
              {jogos.map((item, idx) => (
                <option key={idx} value={item.nome}>{item.nome} ({item.desenvolvedora})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Nickname / ID no Jogo</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Ex: ProGamer#1234" 
              value={nickname} 
              onChange={e => setNickname(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>E-mail Antigo Vinculado</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="seuemail@antigo.com" 
              value={emailAntigo} 
              onChange={e => setEmailAntigo(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Descrição das Provas de Titularidade</label>
            <textarea 
              className="form-control" 
              placeholder="Informe comprovantes de compras, data de criação da conta, etc." 
              value={descricao} 
              onChange={e => setDescricao(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn-submit">Enviar Chamado de Recuperação</button>
        </form>
      </div>

      <h3 className="section-title">Minhas Solicitações</h3>
      {solicitacoes.length === 0 ? (
        <div className="empty-state">Nenhum chamado aberto até o momento.</div>
      ) : (
        <ul className="tickets-list">
          {solicitacoes.map(item => (
            <li key={item._id} className="ticket-card">
              <div className="ticket-info">
                <h4>{item.jogo} — <span style={{ color: '#a855f7' }}>{item.nickname}</span></h4>
                <p>E-mail: {item.emailAntigo}</p>
                <div>
                  <span className={`badge badge-${item.status ? item.status.toLowerCase() : 'pendente'}`}>
                    {item.status || 'PENDENTE'}
                  </span>
                  <small style={{ color: '#64748b', marginLeft: '12px' }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
              <button onClick={() => handleDelete(item._id)} className="btn-cancel">
                Cancelar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}