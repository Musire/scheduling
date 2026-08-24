import { ZodType } from 'zod'

export async function assertInputAsync<T>(
  schema: ZodType<T>,
  data: unknown
): Promise<T> {
  const parsed = await schema.safeParseAsync(data)

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  return parsed.data
}

export function assertInput<T>(
  schema: ZodType<T>,
  data: unknown
) {
  const parsed = schema.safeParse(data)
  
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  return parsed.data
}

