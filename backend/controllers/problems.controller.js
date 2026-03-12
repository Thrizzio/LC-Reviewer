import { db } from "../db/db.js"

export async function getTodayPlan(req, res) {

  const today = new Date().toISOString().split("T")[0]

  const reviews = await db.all(
    "SELECT * FROM problems WHERE reviewDate = ?",
    today
  )

  const newQuestions = await db.all(
    "SELECT * FROM problems WHERE status = 'pending' LIMIT 2"
  )

  res.json({
    newQuestions,
    reviews
  })
}