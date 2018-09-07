import searchYidio from "./searchYidio";

const scrapeIt = require("scrape-it");

function getMovieMetadataYidio(movieName) {
  return searchYidio(movieName)
  .then((movieData) => {
    if (!movieData) {
      throw new Error(`getMovieMetadataYidio -- movie ${movieName} not found`);
    }
    // Scrape Yidio for data
    return scrapeIt(movieData.url, {
      sources: {
        listItem: 'div.sources > a',
        data: {
          name: {
            attr: 'data-name'
          },
          url: {
            attr: 'href'
          },
          isPay: {
            attr: 'data-type',
            convert: (type) => type === 'pay'
          }
        }
      }
    })
    .then((response) => {
      return Object.assign(movieData, {
        sources: response.data.sources
      });
    });
  });
}

if (typeof(window) === 'undefined' && !module.parent) {
  getMovieMetadataYidio('L�on')
  .then((movie) => {
    console.log(movie.sources);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    console.error(err.stack);
    process.exit(1);
  })
}

export default getMovieMetadataYidio;
