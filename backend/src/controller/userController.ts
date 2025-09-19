import UserModel from '@/models/userModel';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UserController extends UserModel {
  async getAll(req: Request, res: Response) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ message: 'Login first' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Login first' });
    }

    const myjwt = jwt.verify(token, 'jwt');
    console.log('myjwt =>', myjwt);

    try {
      const users = await UserModel.findAll();

      return res.status(201).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getOne(req: Request, res: Response) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ message: 'Login first' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Login first' });
    }

    const { id } = req.params;

    try {
      const user = await UserModel.findByPk(+id);

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async insert(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const hash = await bcrypt.hash(password, 12);

      const newUser = await UserModel.create({ username, password: hash });

      return res.status(201).json({ ...newUser, password: undefined });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async updated(req: Request, res: Response) {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
      let hash: string | undefined = undefined;
      if (password) {
        hash = await bcrypt.hash(password, 12);
      }

      const [affectedRows] = await UserModel.update(
        { username, ...(hash && { password: hash }) },
        { where: { id: +id } }
      );

      if (affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const updatedUser = await UserModel.scope('withPassword').findByPk(+id);

      return res.status(200).json({ ...updatedUser?.toJSON(), password: undefined });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async removed(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedRows = await UserModel.destroy({
        where: { id: +id },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new UserController();
