export default class Config {
  static config() {
    let db;

    if (process.env.NODE_ENV === 'test') {
      db = process.env.MONGO_TEST;
    } else {
      db = process.env.MONGO_URL;
    }

    return {
      db
    };
  }
};