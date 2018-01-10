export default class Config {
  static config() {
    let db = process.env.NODE_ENV === 'test' ? process.env.MONGO_TEST : process.env.MONGO_URL;

    return {
      db
    };
  }
};