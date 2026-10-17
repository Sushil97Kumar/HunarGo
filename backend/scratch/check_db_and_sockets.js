const mongoose = require('mongoose');

async function check() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hunargo-local');
  console.log('Connected to DB');

  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
  const Call = mongoose.model('Call', new mongoose.Schema({}, { strict: false }));

  const workers = await User.find({ role: 'worker' }).sort({ updatedAt: -1 }).limit(10);
  console.log(`\n=== RECENT WORKERS (${workers.length}) ===`);
  workers.forEach(w => {
    console.log(`- Worker ID: ${w._id}, Phone: ${w.phoneNumber}, Name: ${w.fullName}, Professions: ${JSON.stringify(w.professions)}, isAvailable: ${w.isAvailable}`);
  });

  const customers = await User.find({ role: 'customer' }).sort({ updatedAt: -1 }).limit(5);
  console.log(`\n=== RECENT CUSTOMERS (${customers.length}) ===`);
  customers.forEach(c => {
    console.log(`- Customer ID: ${c._id}, Phone: ${c.phoneNumber}, Name: ${c.fullName}`);
  });

  const calls = await Call.find().sort({ createdAt: -1 }).limit(5);
  console.log(`\n=== RECENT CALLS (${calls.length}) ===`);
  calls.forEach(c => {
    console.log(`- Call ID: ${c.callId || c._id}, Customer: ${c.customerId}, Worker: ${c.workerId}, Status: ${c.status}, CreatedAt: ${c.createdAt}`);
  });

  await mongoose.disconnect();
}

check().catch(console.error);
