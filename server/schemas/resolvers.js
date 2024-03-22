const { Employee } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
    //     me: async (parent, args, context) => {
    //         if (context.user) {
    //             const userData = await Employee.findOne({ _id: context.user._id })
    //             .select('-__v -password')
    //             return userData;
    //         }
    //         throw new AuthenticationError('Not logged in');
    //     }
    },
    Mutation: {
        addEmployee: async (parent, {firstName, lastName, userName, password, adminStatus}) => {
            const employee = await Employee.create(args);
            const token = signToken(employee);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const employee = await Employee.findOne( { email });
            if (!employee) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const correctPw = await Employee.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const token = signToken(employee);
            return { token, employee };
        },
    }
  };
  
  module.exports = resolvers;