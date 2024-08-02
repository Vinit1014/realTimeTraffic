const TrafficUpdate = require('../models/trafficUpdate');

exports.updateTrafficCondition = async (req, res) => {
  const { road_id, timestamp, traffic_condition } = req.body;
  try {
    const trafficUpdate = new TrafficUpdate({ road_id, timestamp, traffic_condition });
    await trafficUpdate.save();
    res.status(201).json(trafficUpdate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
