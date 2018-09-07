import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Promise from 'bluebird';

import Uploader from './Uploader';
import Movies from './Movies';
import parseIMDBMovieList from '../movies/parseIMDBMovieList';
import getMovieMetadataYidio from '../movies/getMovieMetadataYidio';

const Upload = (props) => {
  return (
    <div>
      <p>
        File uploaded: {props.file.name}
      </p>
      <button onClick={props.onClick} className="mb-3">
        Upload new file
      </button>
      <Movies />
    </div>
  )
}

const GET_FILE = gql`
  {
    file @client {
      name
    }
  }
`;

const handleIMDBMovie = (cache) => {
  return (inputMovie) => {
    const id = `Movie:${inputMovie.id}`;

    // Get existing movie, and add sources
    const fragment = gql`
      fragment movie on Movie {
        id
        name 
        year
      }
    `;

    const movie = cache.readFragment({ fragment, id });
    getMovieMetadataYidio(`${movie.name} (${movie.year})`)
    .catch((err) => {
      // Ignore errors, we'll just pretend no sources
      return { sources: [
        {
          name: 'Not found -- search!',
          url: `https://www.google.com/search?q=${movie.name} rent`,
          isPay: null
        }
      ] };
    })
    .then((metadata) => {
      console.warn({ movie, metadata }, 'huzzah');
      const data = { ...movie, sources: metadata.sources.map((thisSource) => {
        thisSource.__typename = 'Source';
        return thisSource;
      })};
      cache.writeData({ id, data });
    });
    return null;

  };
}

const UploaderContainer = () => {
  return (
    <Query query={GET_FILE}>
      {({ data, client }) => {
        const handler = handleIMDBMovie(client);
        if (!data.file) {
          return ( 
            <Uploader 
              onFile={(file) => {
                return client.writeData({ 
                  data: { 
                    file: {
                      __typename: 'File',
                      lastModified: file.lastModified,
                      name: file.name,
                      size: file.size,
                      type: file.type
                    }
                  }
                });
              }}
              onFileData={(data) => {
                const movies = parseIMDBMovieList(data)
                const adaptedMovies = movies.map((thisMovie) => {
                  return { 
                    __typename: 'Movie',
                    id: thisMovie.Const,
                    name: thisMovie.Title,
                    year: thisMovie.Year,
                    sources: null
                  }
                });
                client.writeData({
                  data: {
                    movies: adaptedMovies
                  }
                })
                Promise.map(adaptedMovies, handler, { concurrency: 5 })
              }}
            />
          );
        }
        return (
          <Upload 
            file={data.file} 
            onClick={() => client.writeData({ data: { file: null }})}
          /> 
        );
      }} 
    </Query>
  )
}

export default UploaderContainer;
