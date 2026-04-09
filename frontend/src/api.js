export async function getTodayPlan(){
    const res = await fetch("http://localhost:3000/api/problems/today");
    const data = await res.json();
    return data;
}

export async function markSolved(id){
    const res = await fetch(`http://localhost:3000/api/problems/${id}/solve`,{method : "PATCH"});

    const parsed = await res.json();
    if(parsed.success === true){
    window.location.reload();
    }   
}

