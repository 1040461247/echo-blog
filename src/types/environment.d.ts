declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_HOST: string
      NEXT_PUBLIC_API_PORT: string
      NEXT_PUBLIC_API_BASEURL: string
    }
  }
}

export {}
