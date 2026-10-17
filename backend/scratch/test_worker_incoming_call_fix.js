const io = require('socket.io-client');
const http = require('http');

async function testIncomingCallFix() {
  const serverUrl = 'http://127.0.0.1:5000';

  console.log('1. Connecting simulated Worker Socket (+911212121212)...');
  const workerSocket = io(serverUrl, {
    transports: ['websocket', 'polling'],
    auth: { phoneNumber: '+911212121212' },
    extraHeaders: { 'x-user-phone': '+911212121212' },
  });

  await new Promise((resolve) => {
    workerSocket.on('connect', () => {
      console.log('✅ Worker connected to server with Socket ID:', workerSocket.id);
      resolve();
    });
    workerSocket.on('connect_error', (e) => {
      console.error('❌ Connect error:', e.message);
      resolve();
    });
  });

  let incomingCallData = null;
  workerSocket.on('incoming_call', (data) => {
    console.log('🔔 [Simulated Worker Received incoming_call]:', data);
    incomingCallData = data;
  });

  console.log('2. Customer calling Worker via HTTP API...');
  const postData = JSON.stringify({
    workerId: '6accef6b0801f4a13edbd0d3',
    workerName: 'Worker worker',
  });

  const req = http.request(
    `${serverUrl}/api/customer/call-worker`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'x-user-phone': '+912121212121',
      },
    },
    (res) => {
      let body = '';
      res.on('data', (d) => (body += d));
      res.on('end', () => {
        console.log('📥 HTTP Response:', body);
      });
    }
  );
  req.on('error', (err) => console.error('HTTP Request error:', err));
  req.write(postData);
  req.end();

  await new Promise((r) => setTimeout(r, 3000));

  if (incomingCallData) {
    console.log('✅ TEST PASSED: incoming_call successfully delivered with callId:', incomingCallData.callId);
  } else {
    console.log('⚠️ Notice: incoming_call was not captured in timeout');
  }

  workerSocket.disconnect();
}

testIncomingCallFix().catch(console.error);
