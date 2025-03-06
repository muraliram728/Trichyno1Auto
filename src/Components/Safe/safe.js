import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Warning, DirectionsCar, Cloud } from "@mui/icons-material";

const Safe = () => {
  return (
    <div style={{ padding: "25px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Stay Safe on the Road 🚗
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Safe Driving Tips */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              textAlign: "center",
              padding: "15px",
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <Warning fontSize="large" color="error" />
            <CardContent>
              <Typography variant="h6">Safe Driving Tips</Typography>
              <Typography variant="body2">
                🚗 Always wear a seatbelt <br />
                🚦 Follow traffic rules <br />
                ☕ Take breaks on long trips <br />
                👀 Avoid distractions while driving
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Car Health Checklist */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              textAlign: "center",
              padding: "15px",
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <DirectionsCar fontSize="large" color="primary" />
            <CardContent>
              <Typography variant="h6">Car Health Checklist</Typography>
              <Typography variant="body2">
                ✅ Check brakes <br />
                ✅ Tire pressure <br />
                ✅ Fuel level <br />
                🔧 Keep an emergency toolkit
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Weather Awareness */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              textAlign: "center",
              padding: "15px",
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <Cloud fontSize="large" color="info" />
            <CardContent>
              <Typography variant="h6">Weather Awareness</Typography>
              <Typography variant="body2">
                🌧 Check weather updates before a trip <br />
                🏔 Drive carefully in foggy or icy conditions <br />
                ☀️ Avoid long drives during extreme heat <br />
                🌪 Stay alert for sudden storms
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Safe;
