
export const resolvers = {
  Mutation: {
    addMovie: (_, { movie }, { cache }) => {
    },
  },
};

export const typeDefs = `
  type Mutation {}

  type File {
    lastModified: Int
    name: String 
    size: Int
    type: String
  }

  type Source {
    name: String 
    isPay: Boolean
    url: String
  }

  type Movie {
    id: String!
    name: String
    image: String 
    year: Int
    sources: [Source]
  }

  type Query {
    file: File
    movies: [Movie]
    fileData: String
  }
`

export const defaults = {
  file: null,
  fileData: null,
  movies: []
};
