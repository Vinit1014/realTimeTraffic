const { getShortestPath } = require('../services/pathFindingService');

exports.getShortestPath = async (req, res) => {
  const { start_location_id, end_location_id } = req.query;
  try {
    const pathData = await getShortestPath(start_location_id, end_location_id);
    res.status(200).json(pathData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
