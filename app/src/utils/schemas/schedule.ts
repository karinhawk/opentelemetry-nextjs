import * as z from "zod";

export const scheduleResult = z
  .object({
    date: z.string().default("today"),
    day_of_week: z.string().default("Monday"),
    broadcasts: z.array(
      z.object({
        broadcast_title: z.string().default("title"),
        start_timestamp: z.string().optional(),
        end_timestamp: z.string().optional(),
        links: z
          .array(
            z.object({
              href: z.string().optional(),
              rel: z.string().optional(),
              type: z.string().optional(),
            })
          )
          .optional(),
      })
    ),
  })
  .transform((args) => {
    const { date, day_of_week, broadcasts } = args;

    const { broadcast_title, start_timestamp, end_timestamp, links } =
      broadcasts;

    return {
      date,
      dayOfWeek: day_of_week,
      broadcastName: broadcast_title,
      startTime: start_timestamp,
      endTime: end_timestamp,
      links,
    };
  });

export type ScheduleResult = z.infer<typeof scheduleResult>;
