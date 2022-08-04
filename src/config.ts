export default {
  cors: {
    methods: 'POST,GET,PUT,OPTIONS,DELETE',
    allowedHeaders:
      'Timezone-Offset,Origin,X-Requested-With,Content-Type,Accept,Authorization',
  },
  auth: {
    jwtTokenExpireInSec: '1d', // 1 day
    passwordResetExpireInMs: 60 * 60 * 1000, // 1 hour
    activationExpireInMs: 24 * 60 * 60 * 1000, // 1 day
    saltRounds: 10,
  },
};
