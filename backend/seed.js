import {db} from "./db/db.js";

const reviewProbs = [135,134,55,33,153,81,162];
const newProbs = [1901, 154, 4, 74, 875, 2439, 322, 611, 1642, 45, 57, 435, 1326, 774, 2141, 2136, 1388, 1785, 3273, 1921,78, 51, 526, 416, 948, 42, 1040, 786, 1239, 60];

async function seed(){

  await db.run(`DELETE FROM problems`)

    const today = new Date().toISOString().split("T")[0];

    for(const p of reviewProbs){

        await db.run(
            `INSERT INTO problems (problemId,status, reviewDate)
            VALUES(?,'solved',?)`,
            p,today
        )
    }

    for (const p of newProbs) {

    await db.run(
      `INSERT INTO problems (problemId, status)
       VALUES (?, 'pending')`,
      p
    )

  }

  console.log('seed Completed');


}

seed();

