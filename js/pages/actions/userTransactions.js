export default async function GetUserTransaction(id) {
  if (!id) {
    return {
      success: false,
      error: "log in pleas",
    };
  }

  const reqID = Number(id);

  const query = `
{
  transaction(
    where: {userId: {_eq: ${reqID}}, event: {object: {name: {_eq: "Module"}}}, type: {_eq: "xp"}, progress: {isDone: {_eq: true}}}
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

  const variables = { id: Number(id) };
  const jwt = localStorage.getItem("jwt_token");
  try {
    const req = await fetch(
      "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ query }),
      },
    );

    const res = await req.json();
    if (!req.ok) {
      return {
        success: false,
        error: res.error?.[0]?.extensions?.code || "Request failed",
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
