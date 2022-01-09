module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ebedda65168b1c6c71b5b4d6c2b5c135'),
  },
});
