const FREE_QUOTA = {
  maxEventsPerMonth: 100,
  maxEventCategories: 3,
} as const

const PRO_QUOTA = {
  maxEventsPerMonth: 1000,
  maxEventCategories: 10,
} as const

const DISCORD_BOT_CONNECTION_URL =
  "https://discord.com/oauth2/authorize?client_id=1316927566472544367"

export { DISCORD_BOT_CONNECTION_URL, FREE_QUOTA, PRO_QUOTA }
