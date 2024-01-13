import { getToday } from "../utils/getToday";

export const validatePassword = (password: string): boolean => {
    const currentPassword = getToday().split("/").join("");
    console.log("🚀 ~ validatePassword ~ password:", password);
    console.log("🚀 ~ validatePassword ~ currentPassword:", currentPassword);
    return currentPassword === password;
};

export const createToken = () => {
    const currentPassword = getToday().split("/").join("");
    return `${process.env.DEFAULT_TOKEN}${currentPassword}`;
};

export const validateToken = (token: string): boolean => {
    const currentToken = createToken();
    return currentToken === token;
};
