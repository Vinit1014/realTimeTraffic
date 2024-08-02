
const {
    getRoadTrafficConditionService,
    generateTrafficReportService,
    analyzeTrafficUpdatesService,
  } = require('../services/trafficReportService');
  
  exports.getRoadTrafficCondition = async (req, res) => {
    const { id } = req.params;
    
    try {
      const { road, trafficUpdates } = await getRoadTrafficConditionService(id);
      if (!road) {
        return res.status(404).json({ error: 'Road not found' });
      }
      res.status(200).json({ road, trafficUpdates });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.generateTrafficReport = async (req, res) => {
    try {
      const csvData = await generateTrafficReportService();
      res.header('Content-Type', 'text/csv');
      res.attachment('traffic_report.csv');
      return res.send(csvData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.analyzeTrafficUpdates = async (req, res) => {
    const { period } = req.query;
  
    try {
      const trafficUpdates = await analyzeTrafficUpdatesService(period);
      res.status(200).json(trafficUpdates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  