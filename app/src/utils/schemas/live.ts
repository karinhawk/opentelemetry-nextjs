import * as z from 'zod'

export const livePayload = z
  .object({
    channel_name: z.string().default('1'),
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
                  .default([]),
                moods: z
                  .array(z.union([z.string(), z.object({})]))
                  .min(0)
                  .default([]),
                genres: z
                  .array(
                    z.object({
                      id: z.string().optional(),
                      value: z.string().optional(),
                    }),
                  )
                  .default([]),
                location_long: z.string().nullable(),
                intensity: z.string().nullable().default('50'),
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
      location: location_long !== null ? location_long : 'an unknown location',
      intensity,
      picture: background_medium_large,
    }
  })

export type Show = z.infer<typeof livePayload>
