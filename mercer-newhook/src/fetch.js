export const fetchPlayerStatsById = async (playerId) => {
  const url = `https://flashlive-sports.p.rapidapi.com/v1/players/career?player_id=${playerId}&locale=en_INT&sport_id=4`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3cea9650ecmsha8caf84f2e33d18p1172f9jsn26df222da8e2",
      "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result.DATA[0].ROWS;
  } catch (error) {
    console.error(error);
    return [];
  }
};
