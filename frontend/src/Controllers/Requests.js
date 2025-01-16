export async function newUser(userDTO) {
    await fetch('http://localhost:8080/createAccount',
        {
            headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
            method: "POST",
            body: JSON.stringify(userDTO)
        }).then((response)=> {
            if(response.status == "202"){
                return response.json();
            }
            else
                return 0;
        })
}
export async function login (userDTO) {
    let budgets = null;
    return fetch('http://localhost:8080/login',
    {
        headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
    },
        method: "POST",
        body: JSON.stringify(userDTO)
    }).then((response) => {
        if(response.status != "200"){
            return 0;
        }
        else{
            return response.json();
        }
    })
    //     const budgetData = data; 
    //     if (budgetData) {
    //         budgets= budgetData;//budgets = budgetData;
    //     } else {
    //         console.error("Unable to access budgets");
    //         return null;
    //     }
    //});
}
export async function newBudget(userId, newBudg) {
    return fetch(`http://localhost:8080/budgets/create/${userId}`,
    {
        headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
    },
        method: "POST",
        body: JSON.stringify(newBudg)
    })
    .then((response) => {
        console.log("newBudget in controller returns "+response.status);
        if(response.status == "201"){
            return 1;
        }
        else if(response.status == "400"){
            return 0;
        }
    })

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
