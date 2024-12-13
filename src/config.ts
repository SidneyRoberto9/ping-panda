const FREE_QUOTA = {
  maxEventsPerMonth: 100,
  maxEventCategories: 3,
} as const

const PRO_QUOTA = {
  maxEventsPerMonth: 1000,
  maxEventCategories: 10,
} as const

export { FREE_QUOTA, PRO_QUOTA }
