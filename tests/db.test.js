const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Database Connection', () => {
    it('should connect to the database', async () => {
        const db = mongoose.connection;
        const state = db.readyState; // 1 means connected
        expect(state).to.equal(1);
    });
});

// "devDependencies": {
  //   "chai": "^5.1.1",
  //   "mocha": "^10.7.3",
  //   "mongodb-memory-server": "^10.0.0",
  //   "nodemon": "^3.1.4",
  //   "serverless-dotenv-plugin": "^6.0.0",
  //   "supertest": "^7.0.0"
  // }