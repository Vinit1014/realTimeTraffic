const Road = require('../models/road');
const TrafficUpdate = require('../models/trafficUpdate');
const { calculateShortestPath } = require('../utils/graph');

exports.getShortestPath = async (start_location_id, end_location_id) => {
  const roads = await Road.find();
  const trafficUpdates = await TrafficUpdate.find();

  const trafficWeights = { clear: 1, moderate: 5, heavy: 10 };

  const graph = roads.reduce((acc, road) => {
    const startId = road.start_location_id.toString();
    const endId = road.end_location_id.toString();
    const weight = road.distance * trafficWeights[road.traffic_condition];
    
    if (!acc[startId]) acc[startId] = [];
    if (!acc[endId]) acc[endId] = [];

    acc[startId].push({ node: endId, weight });
    acc[endId].push({ node: startId, weight });

    return acc;
  }, {});

  const { path, distance } = calculateShortestPath(graph, start_location_id, end_location_id);

  const speed = 40; // km/h
  const estimatedTime = distance / speed * 60; // in minutes

  return { path, total_distance: distance, estimated_time: estimatedTime };
};
