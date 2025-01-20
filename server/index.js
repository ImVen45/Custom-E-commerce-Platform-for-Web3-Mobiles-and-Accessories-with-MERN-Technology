import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { ChatMessage } from './models/ChatMessage.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', async (data) => {
    try {
      // Save user message to MongoDB
      const userMessage = new ChatMessage({
        userId: data.userId,
        content: data.message,
        role: 'user'
      });
      await userMessage.save();

      // Get AI response
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: data.message }],
        model: "gpt-3.5-turbo",
      });

      const aiResponse = completion.choices[0].message.content;

      // Save AI response to MongoDB
      const aiMessage = new ChatMessage({
        userId: data.userId,
        content: aiResponse,
        role: 'assistant'
      });
      await aiMessage.save();

      // Send response back to client
      socket.emit('message', { message: aiResponse, role: 'assistant' });
    } catch (error) {
      console.error('Error processing message:', error);
      socket.emit('error', { message: 'Error processing your message' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});