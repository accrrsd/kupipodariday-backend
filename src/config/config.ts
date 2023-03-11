export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  jwtSecret: 'jwt_secret',

  db: {
    type: 'postgres',

    database: 'kupipodariday',
    username: 'student',
    password: 'student',

    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,

    autoLoadModels: true,
  },
});
