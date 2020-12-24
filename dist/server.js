"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
app.get('/', function (req, res) {
    return res.json({ message: 'Foi!' });
});
app.listen(3335, function () {
    console.log(' Subiu! 💥');
});
