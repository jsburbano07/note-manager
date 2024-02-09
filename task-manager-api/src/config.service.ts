const environment = () => ({
    JWT: {
      SECRET_KEY: process.env.JWT_SECRET_KEY,
    },
    MONGO: {
      USER: process.env.DB_USER,
      PASSWORD: process.env.DB_PASS,
      DATABASE: process.env.DB_NAME,
    },
  });
  
  export default environment;