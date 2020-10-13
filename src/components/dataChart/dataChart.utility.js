export const mapData = data => (
  data.map(entry => ({
    time: formatHours(entry.time),
    windSpeed: entry.data.instant.details.wind_speed
  }))
)

export const formatHours = time => (
  time.substring(11, 13) + 'h'
)
