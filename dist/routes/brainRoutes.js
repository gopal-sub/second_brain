"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brainRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router;
exports.brainRoutes = Router();
exports.brainRoutes.get('/brains', (req, res) => {
});
exports.brainRoutes.post('/brain', (req, res) => {
});
exports.brainRoutes.put('/brain', (req, res) => {
});
exports.brainRoutes.delete('/brain', (req, res) => {
});
