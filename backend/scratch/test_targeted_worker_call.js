const io = require('socket.io-client');

async function runTargetedTest() {
  const serverUrl = 'http://127.0.0.1:5000';
  const workerA_Phone = '+917983170605'; // Worker A (Sushil Kumar, 6ab746eef122ef6d624c241c)
  const workerB_Phone = '+917977263625'; // Worker B (sfhff, 6ab751e084d706b9502c8003)
  const customerPhone = '+912121212121';

  console.log('1. Connecting Worker A, Worker B, and Customer sockets...');
  const workerASocket = io(serverUrl, {
    transports: ['websocket'],
    auth: { phone: workerA_Phone },
    extraHeaders: { 'x-user-phone': workerA_Phone },
  });

  const workerBSocket = io(serverUrl, {
    transports: ['websocket'],
    auth: { phone: workerB_Phone },
    extraHeaders: { 'x-user-phone': workerB_Phone },
  });

  const customerSocket = io(serverUrl, {
    transports: ['websocket'],
    auth: { phone: customerPhone },
    extraHeaders: { 'x-user-phone': customerPhone },
  });

  await Promise.all([
    new Promise((res) => workerASocket.on('connect', res)),
    new Promise((res) => workerBSocket.on('connect', res)),
    new Promise((res) => customerSocket.on('connect', res)),
  ]);

  console.log('✅ All 3 sockets connected.');

  let workerAReceivedCall = 0;
  let workerBReceivedCall = 0;
  let customerReceivedCall = 0;

  workerASocket.on('incoming_call', (data) => {
    console.log('🔔 Worker A received incoming_call:', data.callId, 'Target:', data.targetWorkerId);
    workerAReceivedCall++;
  });

  workerBSocket.on('incoming_call', (data) => {
    console.log('🚨 Worker B received incoming_call:', data.callId, 'Target:', data.targetWorkerId);
    workerBReceivedCall++;
  });

  customerSocket.on('incoming_call', (data) => {
    console.log('🚨 Customer received incoming_call:', data.callId);
    customerReceivedCall++;
  });

  // Small delay to ensure registration in rooms
  await new Promise((r) => setTimeout(r, 600));

  console.log('2. Customer placing call specifically to Worker A (6ab746eef122ef6d624c241c)...');
  const callRes = await fetch(`${serverUrl}/api/customer/call-worker`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-phone': customerPhone,
    },
    body: JSON.stringify({
      workerId: '6ab746eef122ef6d624c241c',
      workerName: 'Sushil Kumar',
      phone: workerA_Phone,
    }),
  });

  const callData = await callRes.json();
  console.log('📞 Call Worker Response:', callData);

  await new Promise((r) => setTimeout(r, 1200));

  console.log('\n--- VERIFICATION RESULTS ---');
  console.log('Worker A calls received:', workerAReceivedCall, workerAReceivedCall === 1 ? '✅ PASS' : '❌ FAIL');
  console.log('Worker B calls received:', workerBReceivedCall, workerBReceivedCall === 0 ? '✅ PASS (Correctly silent)' : '❌ FAIL (Wrongly rang)');
  console.log('Customer calls received:', customerReceivedCall, customerReceivedCall === 0 ? '✅ PASS' : '❌ FAIL');

  workerASocket.disconnect();
  workerBSocket.disconnect();
  customerSocket.disconnect();

  if (workerAReceivedCall === 1 && workerBReceivedCall === 0 && customerReceivedCall === 0) {
    console.log('\n🎉 TEST PASSED: Call rang ONLY on Worker A, and NOT on Worker B!');
    process.exit(0);
  } else {
    console.log('\n❌ TEST FAILED: Call isolation failed!');
    process.exit(1);
  }
}

runTargetedTest().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
