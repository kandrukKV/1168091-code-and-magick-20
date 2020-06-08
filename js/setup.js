'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_HEROES = 4;
var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var showSetup = function () {
  setup.classList.remove('hidden');
};

var showSetupSimilar = function () {
  setupSimilar.classList.remove('hidden');
};

var getRandomElementOfArray = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getDataOfHeroes = function () {
  var heroes = [];
  for (var i = 0; i < NUMBER_OF_HEROES; i++) {
    heroes.push({
      name: getRandomElementOfArray(NAMES) + ' ' + getRandomElementOfArray(SURNAMES),
      coatColor: getRandomElementOfArray(COAT_COLORS),
      eyesColor: getRandomElementOfArray(EYES_COLORS)
    });
  }
  return heroes;
};

var createHero = function (data) {
  var hero = similarWizardTemplate.cloneNode(true);
  hero.querySelector('.setup-similar-label').textContent = data.name;
  hero.querySelector('.wizard-coat').style.fill = data.coatColor;
  hero.querySelector('.wizard-eyes').style.fill = data.eyesColor;
  return hero;
};

var createHeroes = function (dataOfHeroes) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataOfHeroes.length; i++) {
    fragment.appendChild(createHero(dataOfHeroes[i]));
  }
  return fragment;
};

var renderHeroes = function (heroes) {
  similarListElement.appendChild(heroes);
};


var dataOfHeroes = getDataOfHeroes();
var heroes = createHeroes(dataOfHeroes);
renderHeroes(heroes);
showSetup();
showSetupSimilar();
