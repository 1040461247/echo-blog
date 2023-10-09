const { env } = require('node:process')

interface Env {
  API_HOST: string
  API_PORT: string
  API_BASEURL: string
}

export const { API_HOST, API_PORT, API_BASEURL }: Env = env
