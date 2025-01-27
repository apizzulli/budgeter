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
        console.log("response.status = "+response.status);
        if(response.status != "200"){
            return 0;
        }
        else{
            return response.json();
        }
    }).catch((error)=>{
        return 2;
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
export async function editBudget(editedBudg, budgId) {
    return fetch(`http://localhost:8080/budgets/edit/${budgId}`,
    {
        headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
    },
        method: "POST",
        body: JSON.stringify(editedBudg)
    }).then((response)=> {
        return response.json();
    }).catch((error)=>{
        return "Server error - budget not saved";
    })
}
export async function createTransaction (budgetId, transaction) {
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
    .then((response) => {return response.json()});
}
export function getBudget(id){
    return fetch(`http://localhost:8080/getBudget/${id}`)
    .then(response => response.json())
    .then(data => console.log(data));
}
