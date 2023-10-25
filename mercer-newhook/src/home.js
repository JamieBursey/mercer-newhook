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

    // Fetching stats for both players
    fetchAndSetStats("8482110", setMercerStats); // Dawson Mercer
    fetchAndSetStats("8481618", setNewhookStats); // Alex Newhook
  }, []);

  const renderPlayerStats = (stats) => (
    <>
      {stats.length === 0 && <p>No stats available</p>}
      {stats.map((season, index) => (
        <div key={index}>
          <h5>{season.season}</h5>
          <p>Goals: {season.stat.goals}</p>
          <p>Assists: {season.stat.assists}</p>
          <p>points: {season.stat.points}</p>
          {/* Add more later*/}
        </div>
      ))}
    </>
  );

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>Dawson Mercer</Card.Header>
            <Card.Body>{renderPlayerStats(mercerStats)}</Card.Body>
          </Card>
        </Col>
        <Col>
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
