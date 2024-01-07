import { RequestHandler } from "express";
import z from "zod";
import * as auth from "../services/auth";

export const login: RequestHandler = async (req, res) => {
    const passwordSchema = z.object({
        password: z.string(),
    });
    const body = passwordSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: "Dados inválidos!" });

    if (!auth.validatePassword(body.data.password)) {
        return res.status(403).json({ error: "Acesso negado!" });
    }

    res.json({ token: auth.createToken() });
};

export const validate: RequestHandler = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: "Acesso negado!" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!auth.validateToken(token)) {
        return res.status(403).json({ error: "Acesso negado!" });
    }

    next();
};
