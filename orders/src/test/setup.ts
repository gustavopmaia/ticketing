import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import request from 'supertest'
import jwt from 'jsonwebtoken'

let mongo: any

declare global {
  var signin: () => string[]
}

jest.mock('../nats-wrapper')

beforeAll(async () => {
  process.env.JWT_KEY = 'ticketing-test'

  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
  if (mongoose.connection.db) {
    jest.clearAllMocks()
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
      await collection.deleteMany({})
    }
  }
})

afterAll(async () => {
  if (mongo) {
    await mongo.stop()
  }
  await mongoose.connection.close()
})

global.signin = () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  const payload = { id, email: 'test@test.com' }

  const session = { jwt: jwt.sign(payload, process.env.JWT_KEY!) }

  const base64 = Buffer.from(JSON.stringify(session)).toString('base64')

  return [`session=${base64}`]
}
