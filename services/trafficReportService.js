const Road = require('../models/road');
const TrafficUpdate = require('../models/trafficUpdate');
const { Parser } = require('json2csv');

exports.getRoadTrafficConditionService = async (roadId) => {
  const road = await Road.findById(roadId);
  const trafficUpdates = await TrafficUpdate.find({ road_id: roadId });
  return { road, trafficUpdates };
};

exports.generateTrafficReportService = async () => {
  const roads = await Road.find();
  const trafficUpdates = await TrafficUpdate.find();
  const data = roads.map(road => {
    const updates = trafficUpdates.filter(update => update.road_id.equals(road._id));
    return {
      roadId: road._id,
      startLocation: road.start_location_id,
      endLocation: road.end_location_id,
      distance: road.distance,
      trafficCondition: road.traffic_condition,
      trafficUpdates: updates.map(update => ({
        timestamp: update.timestamp,
        condition: update.traffic_condition,
      })),
    };
  });
  const json2csvParser = new Parser();
  return json2csvParser.parse(data);
};

exports.analyzeTrafficUpdatesService = async (period) => {
  const endDate = new Date();
  let startDate;

  switch (period) {
    case 'hour':
      startDate = new Date(endDate.getTime() - (60 * 60 * 1000));
      break;
    case 'day':
      startDate = new Date(endDate.getTime() - (24 * 60 * 60 * 1000));
      break;
    default:
      throw new Error('Invalid period');
  }

  const trafficUpdates = await TrafficUpdate.find({
    timestamp: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  return trafficUpdates;
};
