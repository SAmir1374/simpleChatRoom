import express, { Application } from 'express';
import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import routers from '@/routers';
import { Server } from 'socket.io';
import path from 'path';
import http from 'http';
import cors from 'cors';

export class App {
  private app: Application;
  private session;

  constructor() {
    this.app = express();

    // اتصال به Redis
    let redisClient = createClient();
    redisClient.connect().catch(console.error);

    // let redisStore = new RedisStore({
    //   client: redisClient,
    //   prefix: 'myapp:',
    // });

    this.session = session({
      // store: redisStore,
      secret: 'my-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 2 * 60 * 60 * 1000 },
    });

    this.app.use(
      cors({
        origin: 'http://localhost:5173', // آدرس فرانت‌اندت
        credentials: true, // ارسال کوکی‌ها
      })
    );

    this.app.use(express.static(path.resolve(__dirname, './public')));
    this.app.use(this.session);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(routers);
  }

  server(port: number = 3030) {
    const connectedUsers: Record<number, string> = [];

    const httpServer = http.createServer(this.app);

    const io = new Server(httpServer, {
      cors: {
        origin: 'http://localhost:5173',
      },
    });

    io.on('connection', (socket) => {
      socket.on('register', (userId: number) => {
        connectedUsers[userId] = socket.id;
      });

      socket.on('message', (msg: { from: number; to: number; text: string }) => {
        const targetSocketId = connectedUsers[msg.to];

        console.log("targetSocketId",targetSocketId , msg,connectedUsers)

        if (targetSocketId) {
          io.to(targetSocketId).emit('chat_message', msg);
        }

        // socket.emit('chat_message', msg);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected ', socket.id);

        for (const [key, value] of Object.entries(connectedUsers)) {
          if (value === socket.id) {
            delete connectedUsers[Number(key)];
          }
        }
      });
    });

    httpServer.listen(port, () => {
      console.log(`server is run on port ${port}`);
    });
  }
}
