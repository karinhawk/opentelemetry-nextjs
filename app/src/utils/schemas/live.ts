import * as z from 'zod'

export const livePayload = z
  .object({
    channel_name: z.string().optional(),
    now: z
      .object({
        start_timestamp: z.string().optional(),
        end_timestamp: z.string().optional(),
        embeds: z
          .object({
            details: z
              .object({
                name: z.string().default('Unable to get broadcast name'),
                description: z.string().default('A description'),
                external_links: z
                  .array(z.union([z.string(), z.undefined(), z.null()]))
                  .optional(),
                moods: z
                  .array(z.union([z.string(), z.object({})]))
                  .min(0)
                  .optional(),
                genres: z
                  .array(
                    z.object({
                      id: z.string().optional(),
                      value: z.string().optional(),
                    }),
                  )
                  .optional(),
                location_long: z.string().optional(),
                intensity: z.unknown().optional(),
                media: z
                  .object({
                    background_medium_large: z.string().optional(),
                  })
                  .optional(),
              })
              .optional(),
          })
          .optional(),
      })
      .optional(),
  })
  .transform(args => {
    const { channel_name, now } = args

    const { start_timestamp, end_timestamp, embeds } = now

    const { details } = embeds

    const {
      name,
      description,
      external_links,
      moods,
      genres,
      location_long,
      intensity,
      media,
    } = details

    const { background_medium_large } = media

    return {
      channelName: channel_name,
      broadcastName: name,
      description,
      startTime: start_timestamp,
      endTime: end_timestamp,
      links: external_links,
      moods,
      genres,
      location: location_long,
      intensity,
      picture: background_medium_large,
    }
  })
