export const mapData = data => (
  data.map(entry => ({
    time: formatHours(entry.time),
    windSpeed: entry.data.instant.details.wind_speed,
    windDirection: Math.round(entry.data.instant.details.wind_from_direction)
  }))
)

export const formatHours = time => (
  time.substring(11, 13) + 'h'
)
