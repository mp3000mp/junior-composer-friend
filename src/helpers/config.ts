const config = {
  version: import.meta.env.VITE_VERSION,
}

export function useConfig() {
  return config
}
