import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchPlayerStatsById } from "./fetch";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  const [mercerStats, setMercerStats] = useState([]);
  const [newhookStats, setNewhookStats] = useState([]);

  useEffect(() => {
    const fetchAndSetStats = async (playerId, setStatsFunc) => {
      const stats = await fetchPlayerStatsById(playerId);
      setStatsFunc(stats);
    };

    fetchAndSetStats("0MhvxaYE", setMercerStats); // Dawson Mercer
    fetchAndSetStats("AJWeyyJ2", setNewhookStats); // Alex Newhook (Assuming AJWeyyJ2 is the correct ID for Alex Newhook)
  }, []);

  const renderPlayerStats = (playerStats) => (
    <>
      {playerStats.length === 0 && <p>No stats available</p>}
      {playerStats.map((playerStat, index) => (
        <Card
          key={index}
          style={{
            marginBottom: "10px",
            backgroundColor: index % 2 === 0 ? "#D3D3D3" : "beige",
          }}
        >
          <Card.Body>
            <h5 className="text-danger">{playerStat.SEASON_LABEL}</h5>
            <p>Team: {playerStat.TEAM_NAME}</p>
            <p>Goals: {playerStat.STATS["1"]}</p>
            <p>Assists: {playerStat.STATS["2"]}</p>
            <p>Games Played:{playerStat.STATS["4"]}</p>
            <p>Points: {playerStat.STATS["9"]}</p>
            {/* ... more stats fields */}
          </Card.Body>
        </Card>
      ))}
    </>
  );

  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>Dawson Mercer</Card.Header>
            <Card.Body>{renderPlayerStats(mercerStats)}</Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>Alex Newhook</Card.Header>
            <Card.Body>{renderPlayerStats(newhookStats)}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
