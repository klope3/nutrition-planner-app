import { z } from "zod";

export type User = z.infer<typeof userSchema>;
export type DayChart = z.infer<typeof dayChartSchema>;
export type Day = z.infer<typeof daySchema>;
export type DaySection = z.infer<typeof daySectionSchema>;
export type Portion = z.infer<typeof portionSchema>;

const portionSchema = z.object({
  id: z.number(),
  fdcId: z.number(),
  daySectionId: z.number(),
});

const daySectionSchema = z.object({
  id: z.number(),
  indexInDay: z.number(),
  portions: z.array(portionSchema),
  dayId: z.number(),
});

const daySchema = z.object({
  id: z.number(),
  indexInChart: z.number(),
  sections: z.array(daySectionSchema),
  dayChartId: z.number(),
});

export const dayChartSchema = z.object({
  id: z.number(),
  days: z.array(daySchema),
  userId: z.number(),
});

const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  passwordHash: z.string(),
  dayChart: dayChartSchema.optional(),
});
