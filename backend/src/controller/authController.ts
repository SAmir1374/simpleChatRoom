import UserModel from '@/models/userModel';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController extends UserModel {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const user = await UserModel.scope('withPassword').findOne({ where: { username } });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      if (!user.password) {
        return res.status(500).json({ message: 'Password not set for this user' });
      }

      const compare = await bcrypt.compare(password, user.password);

      if (!compare) {
        return res.status(401).json({ message: 'Invalid credentials!' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, 'jwt', {
        expiresIn: '5h',
      });

      return res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      if (!req.session) {
        return res.status(400).json({ message: 'No session found!' });
      }

      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to destroy session', error: err });
        }

        res.clearCookie('connect.sid');
        return res.status(200).json({ message: 'Logged out successfully' });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }
}

export default new AuthController();
