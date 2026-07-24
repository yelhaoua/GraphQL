export default async function GetUserTransaction() {
  const id = localStorage.getItem("user_Id")
  
  if (!id) { 
   return {
     success: false,
     error : "log in pleas"
   };
  }

  const query = `
query GetTransaction($id: Int!) {
  transaction(
    where: {userId: {_eq: $id}, event: {object: {name: {_eq: "Module"}}}, type: {_eq: "xp"}, progress: {isDone: {_eq: true}}}
    order_by: {createdAt: desc}
  ) {
    amount
    object {
      name
      type
    }
    progress {
      isDone
    }
  }
  levele: transaction(
    where: {event: {object: {name: {_eq: "Module"}}}, type: {_eq: "level"}}
    order_by: {amount: desc}
    limit: 1
  ) {
    amount
  }
}
`;

  const variables = { id };
  const jwt = localStorage.getItem("jwt_token");
  try {
    const req = await fetch(
      "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          "Contente-Type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ query, variables }),
      },
    );

    const res = await req.json();
    console.log(res);

    if (!req.ok) {
      return {
        success: false,
        error: res.error[0].extensions.code,
      };
    }
    return {
      success: true,
      data: res,
    };
  } catch (error) {
    return {
      success: false,
      message: "server errore",
    };
  }
}
