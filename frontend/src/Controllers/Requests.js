export function login (userDTO) {
    let budgets = null;
    return fetch('http://localhost:8080/login',
    {
        headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
    },
        method: "POST",
        body: JSON.stringify(userDTO)
    })
    .then(response => response.json());//.then((data) => {
    //     const budgetData = data; 
    //     if (budgetData) {
    //         budgets= budgetData;//budgets = budgetData;
    //     } else {
    //         console.error("Unable to access budgets");
    //         return null;
    //     }
    //});
}
export function addTransaction (transaction) {
    console.log("adding transaction");
}
