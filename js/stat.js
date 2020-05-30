'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var GISTO_X = CLOUD_X + 30;
var GISTO_Y = CLOUD_Y + 80;
var GISTO_HEIGHT = 150;
var FONT = '16px PT Mono';
var BAR_LABEL_GAP = 13;
var BAR_GAP = 50;
var BAR_WIGHT = 40;
var BAR_LABEL_HEIGHT = 25;
var maxBarHeight = GISTO_HEIGHT - BAR_LABEL_HEIGHT * 2;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var randomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура Вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

  var maxTime = getMaxElement(times);
  var barHeight = maxBarHeight;

  for (var i = 0; i < players.length; i++) {
    barHeight = maxBarHeight * times[i] / maxTime;
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + randomInteger(0, 100) + '%, 50%)';
    }
    ctx.fillRect(GISTO_X + (BAR_GAP + BAR_WIGHT) * i, GISTO_Y + GISTO_HEIGHT - BAR_LABEL_HEIGHT - barHeight, BAR_WIGHT, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], GISTO_X + (BAR_GAP + BAR_WIGHT) * i, GISTO_Y + GISTO_HEIGHT - BAR_LABEL_HEIGHT + BAR_LABEL_GAP);
    ctx.fillText(Math.floor(times[i]), GISTO_X + (BAR_GAP + BAR_WIGHT) * i, GISTO_Y + GISTO_HEIGHT - BAR_LABEL_HEIGHT - BAR_LABEL_HEIGHT - barHeight);
  }
};
