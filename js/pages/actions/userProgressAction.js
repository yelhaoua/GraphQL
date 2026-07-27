export default async function GetProgressAction(id) {
  const query = `
query{
  user {
    moduleTransaction: transactions(
      where: {type: {_eq: "xp"}, event: {object: {type: {_eq: "module"}}}}
      order_by: {createdAt: asc}
    ) {
      amount
      createdAt
      object{name}
    }
  }
}`;

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
        body: JSON.stringify({ query }),
      },
    );
    const res = await req.json();

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
