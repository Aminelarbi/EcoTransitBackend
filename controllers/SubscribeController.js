import { Subscribe } from "../models/Subscribe.js";

export default {
  createSubscribe: async (req, res) => {
    console.log(req.body.imageName)
    try {
      const {
        name,
        price,
        startDate,
        endDate,
        imageName,
      } = req.body;
      console.log(endDate)
      const subscribe = new Subscribe({
        name: name,
        price: Number(price),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        imageName: `${req.protocol}://${req.get("host")}${process.env.IMGURL}/${req.file.filename}`
      });

      await subscribe.save();

      return res.status(201).json({
        statusCode: 201,
        message: "Subscribe created",
        subscribe: subscribe,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  fetchSubscribe: async (req, res) => {
    try {
      const subscribeId = req.params.id;
      const subscribe = await Subscribe.findById(subscribeId);

      if (!subscribe) {
        return res.status(404).json({
          statusCode: 404,
          message: "Subscribe not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Subscribe fetched successfully",
        subscribe: subscribe,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  fetchAllSubscribes: async (req, res) => {
    try {
      const subscribes = await Subscribe.find();

      return res.status(200).json({
        statusCode: 200,
        message: "All subscribes fetched successfully",
        subscribes: subscribes,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  deleteSubscribe: async (req, res) => {
    try {
      const subscribeId = req.params.id;
      const subscribe = await Subscribe.findById(subscribeId);

      if (!subscribe) {
        return res.status(404).json({
          statusCode: 404,
          message: "Subscribe not found",
        });
      }

      await subscribe.remove();

      return res.status(200).json({
        statusCode: 200,
        message: "Subscribe deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },
};
