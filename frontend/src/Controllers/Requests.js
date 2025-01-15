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
export function createTransaction (budgetId, transaction) {
    console.log("adding transaction");
    return fetch(`http://localhost:8080/budgets/transactions/add/${budgetId}`,
    {
        headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
    },
        method: "POST",
        body: JSON.stringify(transaction)
    })
    .then(response => response.json());
}
export function getBudget(id){
    return fetch(`http://localhost:8080/getBudget/${id}`)
    .then(response => response.json())
    .then(data => console.log(data));
}
