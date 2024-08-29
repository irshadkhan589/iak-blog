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
