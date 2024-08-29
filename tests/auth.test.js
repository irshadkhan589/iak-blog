const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../src/app');
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

describe('Auth Routes', () => {
    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'password123'
                });

            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('token');
            expect(res.body.user).to.have.property('username').eql('testuser');
        });
    });

    describe('POST /api/auth/login', () => {
        before(async () => {
            // Ensure there's a user to log in
            await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'password123'
                });
        });

        it('should log in a user and return a token', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'testuser@example.com',
                    password: 'password123'
                });

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('token');
            expect(res.body.user).to.have.property('username').eql('testuser');
        });
    });
});
