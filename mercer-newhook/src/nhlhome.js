import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeNhl = () => {
  const [mercerStats, setMercerStats] = useState(null);
  const [newhookStats, setNewhookStats] = useState(null);
  const formatSeason = (seasonCode) => {
    const seasonStr = seasonCode.toString();
    const startYear = seasonStr.substring(0, 4);
    const endYear = seasonStr.substring(4);
    return `${startYear}-${endYear}`;
  };
  useEffect(() => {
    const fetchAndSetStats = async (playerId, setStatsFunc) => {
      try {
        const response = await fetch(
          `https://newmerc-backend.vercel.app/api/player?id=${playerId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setStatsFunc(result);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };
    fetchAndSetStats("8481618", setMercerStats);
    fetchAndSetStats("8482110", setNewhookStats);
  }, []);

  const renderSeasonCard = (season, index) => {
    const formattedSeason = formatSeason(season.season);
    return (
      <div key={index} className="row mb-3">
        <div className="col">
          <div className="card shadow rounded border border-primary">
            <div className="card-body">
              <h5 className="card-title">{season.leagueAbbrev}</h5>
              <h6 className="card-subtitle mb-2 text-danger">
                {season.teamName.default}
              </h6>
              <div className="row">
                <div className="col-sm-12 mb-2">
                  <p className="card-text fw-bold text-success">
                    {formattedSeason}
                  </p>
                </div>
                <div className="col-sm-12">
                  <p className="card-text">
                    Games Played: {season.gamesPlayed}
                  </p>
                </div>
                <div className="col-sm-12">
                  <p className="card-text">Goals: {season.goals}</p>
                </div>
                <div className="col-sm-12">
                  <p className="card-text">Assists: {season.assists}</p>
                </div>
                <div className="col-sm-12">
                  <p className="card-text">PP Goals: {season.powerPlayGoals}</p>
                </div>
                <div className="col-sm-12">
                  <p className="card-text">
                    PP Points: {season.powerPlayPoints}
                  </p>
                </div>
                <div className="col-sm-12">
                  <p className="card-text">
                    SH Goals: {season.shorthandedGoals}
                  </p>
                </div>
                <div className="col-sm-12">
                  <p className="card-text">
                    Faceoff%: {season.faceoffWinningPctg}
                  </p>
                </div>
                <div className="col-sm-12">
                  <p className="card-text">Points: {season.points}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPlayerCard = (playerStats) => {
    if (!playerStats) {
      return <div>Loading...</div>;
    }

    const { firstName, lastName, seasonTotals, headshot } = playerStats;
    const reversedSeasonTotals = [...seasonTotals].reverse();
    return (
      <div>
        <h4>{`${firstName.default} ${lastName.default}`}</h4>
        <img
          src={headshot}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
          alt={`${firstName.default} ${lastName.default}`}
        />
        {reversedSeasonTotals.map(renderSeasonCard)}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">{renderPlayerCard(newhookStats)}</div>
        <div className="col">{renderPlayerCard(mercerStats)}</div>
      </div>
    </div>
  );
};

export default HomeNhl;
