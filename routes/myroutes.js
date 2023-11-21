import express from "express";
import subscribeController from "../controller/SubscribeController.js";
import billetController from "../controller/BilletController.js";
import { singleImage } from "../Midlleware/multer-config.js";
const router = express.Router();

// Subscribe
router.post('/subscribe/add', singleImage,subscribeController.createSubscribe);
router.get("/subscribe/:id", subscribeController.fetchSubscribe);
router.get("/subscribes", subscribeController.fetchAllSubscribes);
router.delete("/subscribe/:id", subscribeController.deleteSubscribe);

// Billet
router.post('/billet/add', billetController.createBillet);
router.get("/billet/:id", billetController.fetchBillet);
router.get("/billets", billetController.fetchAllBillets);
router.delete("/billet/:id", billetController.deleteBillet);

export default router;
