const io = require('socket.io-client');

async function testWebRtcSignaling() {
  const serverUrl = 'http://127.0.0.1:5000';
  const callId = 'test-call-123';
  const customerId = '6acceff70801f4a13edbd0e7';
  const workerId = '6accef6b0801f4a13edbd0d3';

  console.log('1. Connecting Customer & Worker sockets...');
  const customerSocket = io(serverUrl, {
    transports: ['websocket'],
    auth: { phoneNumber: '+912121212121' },
    extraHeaders: { 'x-user-phone': '+912121212121' },
  });

  const workerSocket = io(serverUrl, {
    transports: ['websocket'],
    auth: { phoneNumber: '+911212121212' },
    extraHeaders: { 'x-user-phone': '+911212121212' },
  });

  await Promise.all([
    new Promise((res) => customerSocket.on('connect', res)),
    new Promise((res) => workerSocket.on('connect', res)),
  ]);

  console.log('✅ Both sockets connected: Customer =', customerSocket.id, ', Worker =', workerSocket.id);

  // Both join the call room
  customerSocket.emit('join_call', { callId });
  workerSocket.emit('join_call', { callId });

  let offerReceivedByWorker = false;
  let answerReceivedByCustomer = false;
  let iceReceivedByWorker = false;

  workerSocket.on('webrtc_offer', (data) => {
    console.log('📥 Worker received webrtc_offer:', data.callId);
    offerReceivedByWorker = true;
    // Worker sends answer back
    workerSocket.emit('webrtc_answer', {
      callId: data.callId,
      targetUserId: customerId,
      sdp: { type: 'answer', sdp: 'dummy-answer-sdp' },
    });
  });

  customerSocket.on('webrtc_answer', (data) => {
    console.log('📥 Customer received webrtc_answer:', data.callId);
    answerReceivedByCustomer = true;
  });

  workerSocket.on('webrtc_ice_candidate', (data) => {
    console.log('📥 Worker received webrtc_ice_candidate:', data.candidate);
    iceReceivedByWorker = true;
  });

  // Small delay to ensure rooms joined
  await new Promise((r) => setTimeout(r, 500));

  console.log('2. Customer sending webrtc_offer...');
  customerSocket.emit('webrtc_offer', {
    callId,
    targetUserId: workerId,
    sdp: { type: 'offer', sdp: 'dummy-offer-sdp' },
  });

  customerSocket.emit('webrtc_ice_candidate', {
    callId,
    targetUserId: workerId,
    candidate: { candidate: 'candidate:1 1 UDP ...' },
  });

  await new Promise((r) => setTimeout(r, 1500));

  console.log('\n--- WebRTC Signaling Results ---');
  console.log('Offer received by worker  :', offerReceivedByWorker ? '✅ PASS' : '❌ FAIL');
  console.log('Answer received by customer:', answerReceivedByCustomer ? '✅ PASS' : '❌ FAIL');
  console.log('ICE candidate received     :', iceReceivedByWorker ? '✅ PASS' : '❌ FAIL');

  customerSocket.disconnect();
  workerSocket.disconnect();

  if (offerReceivedByWorker && answerReceivedByCustomer && iceReceivedByWorker) {
    console.log('\n🎉 ALL WEBRTC SIGNALING TESTS PASSED!');
    process.exit(0);
  } else {
    console.log('\n❌ WebRTC signaling failed!');
    process.exit(1);
  }
}

testWebRtcSignaling().catch(console.error);
