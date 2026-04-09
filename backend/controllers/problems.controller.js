import { db } from "../db/db.js"
const intervals = [3,7,14,28];

export async function getTodayPlan(req, res) {

  const today = new Date().toISOString().split("T")[0]

  const reviews = await db.all(
    "SELECT * FROM problems WHERE reviewDate = ?",
    today
  )

  const newQuestions = await db.all(
    "SELECT * FROM problems WHERE status = 'pending' ORDER BY id LIMIT 2"
  )

  res.json({
    newQuestions,
    reviews
  })
}

export async function checkboxClicked(req,res){
  const id = req.params.id;
  
  const today = new Date().toISOString().split("T")[0];

  const reviewDate = new Date();
  reviewDate.setDate(reviewDate.getDate()+3);

  const review = reviewDate.toISOString().split("T")[0];

  await db.run(
    `UPDATE problems
    SET status = 'solved',
        dateSolved = ?,
        reviewDate = ?
    WHERE id = ?`,
    today,review,id
  )

 res.json({success : true});

}