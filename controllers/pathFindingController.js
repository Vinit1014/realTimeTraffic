
const Location = require('../models/location');
const Road = require('../models/road');
const { dijkstra } = require('../services/pathFindingService');
const trafficWeights = require('../config/trafficWeights');

exports.getShortestPath = async (req, res) => {
  const { start_location_id, end_location_id } = req.query;

  try {
    const locations = await Location.find();
    const roads = await Road.find();

    const graph = buildGraph(locations, roads);

    const { path, totalDistance, estimatedTime } = dijkstra(
      graph,
      start_location_id,
      end_location_id
    );

    res.status(200).json({
      path,
      totalDistance,
      estimatedTime,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buildGraph = (locations, roads) => {
  const graph = {};

  locations.forEach(location => {
    graph[location._id] = [];
  });

  roads.forEach(road => {
    const weight = trafficWeights[road.traffic_condition] * road.distance;
    graph[road.start_location_id].push({ node: road.end_location_id, weight });
    graph[road.end_location_id].push({ node: road.start_location_id, weight });
  });

  return graph;
};
