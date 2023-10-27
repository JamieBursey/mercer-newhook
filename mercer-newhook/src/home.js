import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchPlayerStatsById } from "./fetch";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  const [mercerStats, setMercerStats] = useState([]);
  const [newhookStats, setNewhookStats] = useState([]);
  const seasonDates = (seasonStr) => {
    return `${seasonStr.substring(0, 4)}-${seasonStr.substring(4)}`;
  };

  useEffect(() => {
    const fetchAndSetStats = async (playerId, setStatsFunc) => {
      const stats = await fetchPlayerStatsById(playerId);
      setStatsFunc(stats);
    };

    fetchAndSetStats("8482110", setMercerStats); // Dawson Mercer
    fetchAndSetStats("8481618", setNewhookStats); // Alex Newhook
  }, []);

  const renderPlayerStats = (stats) => (
    <>
      {stats.length === 0 && <p>No stats available</p>}
      {stats.map((season, index) => (
        <Card
          key={index}
          style={{
            marginBottom: "10px",
            backgroundColor: index % 2 === 0 ? "#D3D3D3" : "beige",
          }}
        >
          <Card.Body>
            <h5 className="text-danger">{seasonDates(season.season)}</h5>
            {season.team && <p>Team: {season.team.name}</p>}
            {season.league && <p>League: {season.league.name}</p>}
            <p>Goals: {season.stat.goals}</p>
            <p>Assists: {season.stat.assists}</p>
            <p>PIM:{season.stat.pim}</p>
            <p>Points: {season.stat.points}</p>
          </Card.Body>
        </Card>
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
