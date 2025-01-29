"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const actor_controller_1 = require("../controllers/actor.controller");
const router = express_1.default.Router();
router.route("/actors/:id")
    .get(actor_controller_1.ActorController.getById)
    .delete(actor_controller_1.ActorController.delete);
router.route("/actors")
    .get(actor_controller_1.ActorController.getAll)
    .post(actor_controller_1.ActorController.create)
    .put(actor_controller_1.ActorController.update);
/**
 * Images upload for actors
 * not implemented in the frontend
 */
// router.post("/actors/:id/upload", upload.array('images', 12), ActorController.setImages as any);
// router.post("/actors/:id/set-cover", upload.single('principal'), ActorController.setCover as any);
exports.default = router;
