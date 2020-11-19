/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';

const getDefault = async (req: Request, res: Response) => {
    return res.json({ message: 'express lambda serverless application working fine.' })
};

export default {
    getDefault
}