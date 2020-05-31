'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_CHART_HEIGHT = 150;
var FONT = '16px PT Mono';
var BAR_LABEL_GAP = 13;
var BAR_GAP = 50;
var BAR_WIGHT = 40;
var BAR_LABEL_HEIGHT = 25;
var BAR_CHART_TITLE = 'Ура вы победили!\nСписок результатов:';
var PLAYER_NAME = 'Вы';
var barChartX = CLOUD_X + 30;
var barChartY = CLOUD_Y + 80;
var maxBarHeight = BAR_CHART_HEIGHT - BAR_LABEL_HEIGHT * 2;

var renderCloud = function (ctx, x, y) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(x + GAP, y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var renderTitle = function (ctx, title, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = FONT;
  ctx.textBaseline = 'hanging';
  var titleStrings = title.split('\n');

  for (var i = 0; i < titleStrings.length; i++) {
    ctx.fillText(titleStrings[i], x, y + FONT_GAP * i);
  }
};

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandomColor = function () {
  return 'hsl(240, ' + getRandomInteger(0, 100) + '%, 50%)';
};

var renderBar = function (ctx, x, y, player, time, barHeight) {
  if (player === PLAYER_NAME) {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = getRandomColor();
  }
  ctx.fillRect(x, y - barHeight, BAR_WIGHT, barHeight);
  ctx.fillStyle = '#000';
  ctx.fillText(player, x, y + BAR_LABEL_GAP);
  ctx.fillText(Math.floor(time), x, y - BAR_LABEL_HEIGHT - barHeight);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y);
  renderTitle(ctx, BAR_CHART_TITLE, CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);

  var maxTime = getMaxElement(times);
  var barHeight = maxBarHeight;
  var x = barChartX;
  var y = barChartY + BAR_CHART_HEIGHT - BAR_LABEL_HEIGHT;

  for (var i = 0; i < players.length; i++) {
    barHeight = maxBarHeight * times[i] / maxTime;
    x = barChartX + (BAR_GAP + BAR_WIGHT) * i;
    renderBar(ctx, x, y, players[i], times[i], barHeight);
  }
};
