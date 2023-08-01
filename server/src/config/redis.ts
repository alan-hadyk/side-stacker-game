let url = process.env.NODE_ENV

switch (process.env.NODE_ENV) {
  case "development":
    url = "redis://:password@localhost:6379"
    break

  case "test":
    url = "redis://:test_password@localhost:6380"
    break

  default:
    break
}

/**
 * Configuration settings for Redis.
 */
export const redisConfig = {
  url,
}
