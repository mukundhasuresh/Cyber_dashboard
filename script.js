// Real-Time IDS Alerts
const alertsData = [
  { srcIP: "192.168.1.5", dstIP: "10.0.0.4", type: "Port Scan", level: "Warning" },
  { srcIP: "203.0.113.7", dstIP: "10.0.0.1", type: "DDoS", level: "Critical" },
  { srcIP: "172.16.0.3", dstIP: "10.0.0.8", type: "Brute Force", level: "Critical" }
];

function updateAlerts() {
  const alertBox = document.getElementById('alerts');
  const alert = alertsData[Math.floor(Math.random() * alertsData.length)];
  const div = document.createElement('div');
  div.className = `alert ${alert.level.toLowerCase()}`;
  div.innerHTML = `🚨 <strong>${alert.type}</strong> from ${alert.srcIP} to ${alert.dstIP} - Level: ${alert.level}`;
  alertBox.prepend(div);
}
setInterval(updateAlerts, 4000);

// SHA-256 Hash Function
async function generateHash() {
  const input = document.getElementById('inputText').value;
  const msgBuffer = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  document.getElementById('hashOutput').textContent = hashHex;
}

// Traffic Chart using Chart.js
const ctx = document.getElementById('trafficChart').getContext('2d');
const trafficChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: Array.from({length: 10}, (_, i) => `T-${10-i}`),
    datasets: [{
      label: 'Packets/sec',
      data: Array(10).fill().map(() => Math.floor(Math.random()*100)),
      borderColor: 'lime',
      fill: false
    }]
  },
  options: { responsive: true }
});

function updateTraffic() {
  trafficChart.data.datasets[0].data.shift();
  trafficChart.data.datasets[0].data.push(Math.floor(Math.random()*100));
  trafficChart.update();
}
setInterval(updateTraffic, 2000);

// Blockchain Alert Log
const blockchain = [];
async function addBlock(alertText) {
  const prevHash = blockchain.length ? blockchain[blockchain.length - 1].hash : '0';
  const data = alertText + prevHash;
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  blockchain.push({ alertText, prevHash, hash: hashHex });
  renderBlockchain();
}

function renderBlockchain() {
  const bcDiv = document.getElementById('blockchain');
  bcDiv.innerHTML = '';
  blockchain.forEach(block => {
    const div = document.createElement('div');
    div.className = 'block';
    div.innerHTML = `<p>${block.alertText}</p><p>Hash: ${block.hash.slice(0,20)}...</p>`;
    bcDiv.appendChild(div);
  });
}

setInterval(() => {
  const randomAlert = alertsData[Math.floor(Math.random() * alertsData.length)];
  addBlock(`Alert: ${randomAlert.type} from ${randomAlert.srcIP}`);
}, 7000);

// Sync Time
function updateSyncTime() {
  const now = new Date();
  document.getElementById('syncTime').textContent = now.toLocaleTimeString();
}
setInterval(updateSyncTime, 1000);
