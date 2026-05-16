import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

interface RemoteConfigBody {
  url?: string
}

function parseRemoteConfigURL(url: string) {
  try {
    const parsedURL = new URL(url)

    if (!['http:', 'https:'].includes(parsedURL.protocol)) {
      return null
    }

    return parsedURL
  } catch {
    return null
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RemoteConfigBody>(event)
  const url = body.url?.trim() || ''
  const parsedURL = parseRemoteConfigURL(url)

  if (!parsedURL) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid remote config URL',
    })
  }

  const runtimeConfig = useRuntimeConfig(event)
  const configFilePath =
    runtimeConfig.configFilePath || runtimeConfig.public.configFilePath

  if (!configFilePath) {
    throw createError({
      statusCode: 400,
      statusMessage: 'CONFIG_FILE_PATH is not configured',
    })
  }

  const response = await fetch(parsedURL)

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: `Failed to fetch remote config: ${response.statusText}`,
    })
  }

  const payload = await response.text()

  await mkdir(dirname(configFilePath), { recursive: true })
  await writeFile(configFilePath, payload)

  return {
    path: configFilePath,
  }
})
