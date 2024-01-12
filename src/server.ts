import "dotenv/config";
import express from "express";
import cors from "cors";
import https from "https";
import http from "http";
import { requestIntercepter } from "./utils/requestIntercepter";
import siteRoutes from "./routes/site";
import adminRoutes from "./routes/admin";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.all("*", requestIntercepter);

app.use("/admin", adminRoutes);
app.use("/", siteRoutes);

// const runServer = (port: number, server: http.Server) => {
//     server.listen(port, () => {
//         console.log("🚀 Running at PORT", port);
//     });
// };
// const regularServer = http.createServer(app);
// if (process.env.NODE_ENV === "production") {
// } else {
//     const serverPort = process.env.PORT ? parseInt(process.env.PORT) : 9000;
//     runServer(serverPort, regularServer);
// }
// const serverPort = process.env.PORT ? parseInt(process.env.PORT) : 9000;
// runServer(serverPort, regularServer);
app.listen(process.env.PORT);
