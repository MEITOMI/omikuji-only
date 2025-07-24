import React, { useState } from 'react';
import './omikuji.css';

function App() {
  const omikujiList = [
    { text: '大吉', emoji: '🎉' },
    { text: '中吉', emoji: '😊' },
    { text: '小吉', emoji: '🙂' },
    { text: '吉', emoji: '😄' },
    { text: '末吉', emoji: '🤞' },
    { text: '凶', emoji: '😢' },
    { text: '大凶', emoji: '😱' },
  ];

  const [name, setName] = useState('');
  const [result, setResult] = useState({ text: '今日の運勢を占ってみよう！', emoji: '' });
  const [history, setHistory] = useState([]);

  const[count,setCount]=useState({
    大吉:0,
    中吉:0,
    小吉:0,
    吉:0,
    末吉:0,
    凶:0,
    大凶:0,
    うんち:0,
  });

  const getColor = (text) => {
    if (text === '大吉') return 'red';
    if (['中吉', '吉', '小吉', '末吉'].includes(text)) return 'orange';
    if (['凶', '大凶'].includes(text)) return 'blue';
    if (text === 'うんち') return 'brown';
    return 'black';
  };

  const drawOmikuji = () => {
    const random = Math.random();
    const newResult =
      random < 0.01
        ? { text: 'うんち', emoji: '💩' }
        : omikujiList[Math.floor(Math.random() * omikujiList.length)];

    setResult(newResult);
    setHistory((prevHistory) => [...prevHistory, { name, ...newResult }]);
    setCount((prev) => ({
    ...prev,
    [newResult.text]: (prev[newResult.text] || 0) + 1,
    }));
  };

  return (
  <div className="App">
    <h2>あなたの名前を入力してね：</h2>
    <input
      type="text"
      placeholder="例：めい"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <br /><br />
    <button onClick={drawOmikuji}>おみくじを引く</button>
    <button style={{ marginLeft: '10px' }} onClick={() => setHistory([])}>
      履歴をリセット
    </button>

    <h1 style={{ color: getColor(result.text), marginTop: '30px' }}>
      {name
        ? `${name}さんの運勢は → ${result.text} ${result.emoji}`
        : `${result.text} ${result.emoji}`}
    </h1>

    <h2 style={{ marginTop: '40px' }}>🔁 過去の結果</h2>
    <ul>
      {history.map((item, index) => (
        <li key={index}>
          {item.name
            ? `${item.name}さんの運勢 → ${item.text} ${item.emoji}`
            : `${item.text} ${item.emoji}`}
        </li>
      ))}
    </ul>

    <div style={{ marginTop: '40px' }}>
      <h2>🔢 出た回数</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Object.entries(count).map(([key, value]) => {
          return (
            <li key={key} style={{ marginBottom: '4px' }}>
              {key}：{value}回
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);
}

export default App;
