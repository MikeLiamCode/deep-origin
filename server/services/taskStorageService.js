const { MongoClient } = require('mongodb');
const { dbConfig } = require('../config/dbConfig');
const Task = require('../models/task');

class TaskStorageService {
  constructor() {
    this.client = new MongoClient(dbConfig.url);
    this.dbName = dbConfig.dbName;
    this.collectionName = dbConfig.collectionName;
  }

  async saveTask(task) {
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);
    await collection.insertOne(task);
  }

  async updateTask(task) {
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);
    await collection.updateOne({ id: task.id }, { $set: task });
  }

  async getTasks() {
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);
    return await collection.find().toArray();
  }

  async deleteTask(task) {
    const db = this.client.db(dbConfig.dbName);
    const collection = db.collection('tasks');
    await collection.deleteOne({ id: task.id });
  }
}

module.exports = { TaskStorageService };
