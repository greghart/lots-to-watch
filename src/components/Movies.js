import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import getBestSource from '../movies/getBestSource';


const SourceLink = (props) => {
  return (
    <a href={props.source.url}>
      {props.source.name} 
      {props.source.isPay !== null &&
        <span> ({props.source.isPay ? 'Pay' : 'Free!'})</span>
      }
    </a>
  );
}

const BestSourceLink = (props) => {
  const bestSource = getBestSource(props.sources);
  if (!bestSource) {
    return "No source found :(";
  }
  return <SourceLink source={getBestSource(props.sources)} />;
}

const Movie = (props) => {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-8"> 
          {props.movie.name}
        </div>
        <div className="col-4"> 
          {props.movie.sources ?
            <div>
              <BestSourceLink sources={props.movie.sources} />
              {props.movie.sources.length > 0 &&
                [
                  <span> </span>,
                  <button 
                    className="btn btn-link"
                    role="button"
                    onClick={props.onToggleOpen}
                  >
                    {props.isOpen ? '^^^' : '>>>'}
                  </button>
                ]
              }
            </div>
            : 
            <span>Loading...</span>
          }
        </div>
      </div>
      {props.movie.sources && props.isOpen && (
        <div className="row">
          <div className="col-4 offset-8">
            <ul className="list-group">
              {props.movie.sources.map((thisSource) => (
                <li className="list-group-item">
                  <SourceLink key={thisSource.name} source={thisSource} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  )

};

class MovieContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Movie 
      {...this.props} 
      isOpen={this.state.isOpen} 
      onToggleOpen={this.toggleOpen}
    />;
  }

}

const GET_MOVIES = gql`
  {
    movies @client {
      id
      name
      sources {
        name
        isPay 
        url
      }
    }
  }
`;

const Movies = () => {
  return (
    <Query query={GET_MOVIES}>
      {({ data, client }) => {
        console.warn(data, 'MOvies');
        return (
          <ul className="list-group list-group-flush">
            {data.movies.map((thisMovie) => <MovieContainer key={thisMovie.name} movie={thisMovie} />)}
          </ul>
        );
      }}
    </Query>
  );
};

export default Movies;
