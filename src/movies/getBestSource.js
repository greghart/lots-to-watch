const reduce = require('lodash/reduce');

const preferredSources = ['Hulu', 'Netflix', 'Amazon'];

function getScore(source) {
  if (source.isPay === false) {
    if (preferredSources.indexOf(source.name) !== -1) {
      return 2;
    }
    return 1;
  }
  if (preferredSources.indexOf(source.name) !== -1) {
    return 0;
  }
  return -1;
}

function getBestSource(sources) {
  return reduce(
    sources,
    (memo, thisSource) => {
      if (!memo) {
        return thisSource;
      }
      if (getScore(thisSource) > getScore(memo)) {
        return thisSource;
      }
      return memo;
    }
  );
}

export default getBestSource;
