import request from 'superagent';
import get from 'lodash/get';

const SEARCH_URL = 'https://www.yidio.com/redesign/json/search.php';

function searchYidio(movieName) {
  return request
  .post(SEARCH_URL)
  .type('form')
  .send({ 
    limit: 1, 
    keyword: movieName 
  })
  .accept('json')
  .then((response) => {
    const body = JSON.parse(response.text);
    return get(body, 'response[0]');
  })
}

// if (!module.parent) {
//   searchYidio('the shawshank redemption')
//   .then((movie) => {
//     console.log(movie);
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error(err.message);
//     console.error(err.stack);
//     process.exit(1);
//   })
// }

export default searchYidio;
