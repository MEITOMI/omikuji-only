const omikujiList = [
  { text: '大吉', emoji: '🎉' },
  { text: '中吉', emoji: '😊' },
  { text: '小吉', emoji: '🙂' },
  { text: '吉', emoji: '😄' },
  { text: '末吉', emoji: '🤞' },
  { text: '凶', emoji: '😢' },
  { text: '大凶', emoji: '😱' }
];

const count = {
  大吉: 0,
  中吉: 0,
  小吉: 0,
  吉: 0,
  末吉: 0,
  凶: 0,
  大凶: 0,
  うんち: 0
};

const history = [];

function getColor(text) {
  if (text === '大吉') return 'red';
  if (['中吉', '吉', '小吉', '末吉'].includes(text)) return 'orange';
  if (['凶', '大凶'].includes(text)) return 'blue';
  if (text === 'うんち') return 'brown';
  return 'black';
}

function drawOmikuji() {
  const name = document.getElementById("nameInput").value;
  const random = Math.random();
  const result = random < 0.01
    ? { text: 'うんち', emoji: '💩' }
    : omikujiList[Math.floor(Math.random() * omikujiList.length)];

  count[result.text]++;
  history.push({ name, ...result });

  const displayText = name ? `${name}さんの運勢は → ${result.text} ${result.emoji}` : `${result.text} ${result.emoji}`;
  const resultDisplay = document.getElementById("resultDisplay");
  resultDisplay.textContent = displayText;
  resultDisplay.style.color = getColor(result.text);

  renderHistory();
  renderCount();
}

function renderHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name
      ? `${item.name}さんの運勢 → ${item.text} ${item.emoji}`
      : `${item.text} ${item.emoji}`;
    historyList.appendChild(li);
  });
}

function renderCount() {
  const countList = document.getElementById("countList");
  countList.innerHTML = "";
  for (const key in count) {
    const li = document.createElement("li");
    li.textContent = `${key}：${count[key]}回`;
    countList.appendChild(li);
  }
}

document.getElementById("drawBtn").addEventListener("click", drawOmikuji);
document.getElementById("resetBtn").addEventListener("click", () => {
  history.length = 0;
  for (const key in count) count[key] = 0;
  document.getElementById("resultDisplay").textContent = "今日の運勢を占ってみよう！";
  renderHistory();
  renderCount();
});
