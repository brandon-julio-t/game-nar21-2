export default class Environment {
  public static get isProduction() {
    return process.env.NODE_ENV === "production";
  }

  public static get isDevelopment() {
    return process.env.NODE_ENV === "development";
  }
}
