"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = require("./routes/userRoutes");
dotenv_1.default.config();
const MONGO_URL = process.env.MONGODB_URL;
if (!MONGO_URL) {
    throw new Error("Mongo URL could no be found");
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/user', userRoutes_1.userRouter);
app.listen(3000, async () => {
    await mongoose_1.default.connect(MONGO_URL);
});
