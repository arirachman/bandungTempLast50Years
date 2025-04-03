var terraclimate = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE");
var geometry = ee.Geometry.Point([107.60775003551345, -6.914576842770382]);

print(terraclimate);

var tMax = terraclimate
  .filter(ee.Filter.date('1975-01-01', '2025-02-01'))
  .filter(ee.Filter.calendarRange(1, 1, 'month'))
  .select('tmmx');

print(tMax);

var scaleImage = function(image) {
  return image.multiply(0.1)
    .copyProperties(image,['system:time_start']);
};
var tmaxScaled = tMax.map(scaleImage);
print(tmaxScaled);

var image = ee.Image(terraclimate.first())
print(image.projection().nominalScale())

Map.centerObject(geometry);

var timeseriesChart = ui.Chart.image.series({
  imageCollection: tmaxScaled.select('tmmx'),
  region: geometry,
  scale: 10
  }).setOptions({
      lineWidth: 1,
      pointSize: 2,
      title: 'Temp Time Series',
      interpolateNulls: true,
      vAxis: {title: 'Max Temperature'},
      hAxis: {title: '', format: 'YYYY-MMM'}
    });
print(timeseriesChart)