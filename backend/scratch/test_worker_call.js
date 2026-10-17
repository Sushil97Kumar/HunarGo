const io = require('socket.io-client');
const http = require('http');

async function testCall() {
  const serverUrl = 'http://127.0.0.1:5000';

  console.log('1. Connecting Worker (+911212121212)...');
  const workerSocket = io(serverUrl, {
    transports: ['websocket', 'polling'],
    auth: {
      phoneNumber: '+911212121212',
    },
    extraHeaders: {
      'x-user-phone': '+911212121212',
    },
  });

  await new Promise((resolve) => {
    workerSocket.on('connect', () => {
      console.log('✅ Worker connected. Socket ID:', workerSocket.id);
      resolve();
    });
    workerSocket.on('connect_error', (err) => {
      console.error('❌ Worker connect error:', err.message);
      resolve();
    });
  });

  workerSocket.emit('ping_check', (res) => {
    console.log('📡 Worker ping_check response:', res);
  });

  let incomingCallReceived = null;
  workerSocket.on('incoming_call', (data) => {
    console.log('🔔 [Worker Received incoming_call]:', data);
    incomingCallReceived = data;
  });

  console.log('2. Placing call via HTTP API from customer (+912121212121) to worker (6accef6b0801f4a13edbd0d3)...');
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
        console.log('📥 HTTP Response from call-worker:', body);
      });
    }
  );

  req.on('error', (e) => console.error('HTTP Request error:', e));
  req.write(postData);
  req.end();

  await new Promise((r) => setTimeout(r, 3000));

  console.log('\n--- Result ---');
  if (incomingCallReceived) {
    console.log('🎉 SUCCESS: Worker received incoming_call event with callId:', incomingCallReceived.callId);
  } else {
    console.log('❌ FAILURE: Worker did NOT receive incoming_call event!');
  }

  workerSocket.disconnect();
}

testCall().catch(console.error);
