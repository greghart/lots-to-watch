const parse = require('csv-parse/lib/sync');

function parseIMDBMovieList(inputCSV) {
  return parse(inputCSV, {
    columns: true
  });
}

export default parseIMDBMovieList;
