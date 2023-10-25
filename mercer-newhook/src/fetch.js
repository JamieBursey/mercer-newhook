const NHL_API_BASE = "https://statsapi.web.nhl.com/api/v1";

export const fetchPlayerStatsById = async (playerId) => {
  const statsUrl = `${NHL_API_BASE}/people/${playerId}/stats?stats=yearByYear`;
  const response = await fetch(statsUrl);
  const data = await response.json();

  if (data && data.stats && data.stats.length > 0) {
    return data.stats[0].splits;
  }
  return null;
};
