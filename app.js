require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./utils/db');

const locationRoutes = require('./routes/locationRoutes');
const roadRoutes = require('./routes/roadRoutes');
const trafficUpdateRoutes = require('./routes/trafficUpdateRoutes');
const pathfindingRoutes = require('./routes/pathfindingRoutes');
const trafficReportRoutes = require('./routes/trafficReportRoutes');

const app = express();

connectDB();
app.use(bodyParser.json());

app.use('/locations', locationRoutes);
app.use('/roads', roadRoutes);
app.use('/traffic-updates', trafficUpdateRoutes);
app.use('/shortest-path', pathfindingRoutes);
app.use('/traffic-report', trafficReportRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


