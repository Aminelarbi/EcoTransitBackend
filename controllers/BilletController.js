import { Billet } from "../models/Billet.js";

export default {
  createBillet: async (req, res) => {
    try {
      const {
        distance,
        estimatedPrice,
        estimatedTime,
        imageName,
      } = req.body;

      const billet = await Billet.create({
        distance: distance,
        estimatedPrice: estimatedPrice,
        estimatedTime: estimatedTime,
        imageName: `${req.protocol}://${req.get("host")}${process.env.IMGURL}/${req.file.filename}`
      });

      await billet.save();

      return res.status(201).json({
        statusCode: 201,
        message: "Billet created",
        billet: billet,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  fetchBillet: async (req, res) => {
    try {
      const billetId = req.params.id;
      const billet = await Billet.findById(billetId);

      if (!billet) {
        return res.status(404).json({
          statusCode: 404,
          message: "Billet not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Billet fetched successfully",
        billet: billet,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  fetchAllBillets: async (req, res) => {
    try {
      const billets = await Billet.find();

      return res.status(200).json({
        statusCode: 200,
        message: "All billets fetched successfully",
        billets: billets,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  deleteBillet: async (req, res) => {
    try {
      const billetId = req.params.id;
      const billet = await Billet.findById(billetId);

      if (!billet) {
        return res.status(404).json({
          statusCode: 404,
          message: "Billet not found",
        });
      }

      await billet.remove();

      return res.status(200).json({
        statusCode: 200,
        message: "Billet deleted successfully",
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
