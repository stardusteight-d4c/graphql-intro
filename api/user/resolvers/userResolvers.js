const { GraphQLScalarType } = require('graphql')

const userResolvers = {
  RolesType: {
    ESTUDANTE: 'ESTUDANTE',
    DOCENTE: 'DOCENTE',
    COORDENACAO: 'COORDENACAO',
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'String de data e hora no formato ISO-8601',
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value),
  }),

  Query: {
    users: (root, args, { dataSources }) => dataSources.usersAPI.getUsers(args),
    user: (root, { id }, { dataSources }) =>
      dataSources.usersAPI.getUserById(id),
  },

  Mutation: {
    criaUser: async (root, { user }, { dataSources }) =>
      dataSources.usersAPI.criaUser(user),

    atualizaUser: async (root, novosDados, { dataSources }) =>
      dataSources.usersAPI.atualizaUser(novosDados),

    deletaUser: async (root, { id }, { dataSources }) =>
      dataSources.usersAPI.deletaUser(id),
  },

  User: {
    matriculas: (parent, _, { dataSources }) =>
      dataSources.matriculasAPI.getMatriculasPorEstudante.load(parent.id),
  },
}

module.exports = userResolvers
