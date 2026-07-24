export default async function GetUserInfoAction() {
  const query = `
{
  user: user {
    id
    login
    firstName
    lastName
    email
    avatarUrl
    campus
    auditRatio
  }
  allAudites: user {
    totalUp
    totalDown
    audits_aggregate(where: {closureType: {_in: [succeeded, failed]}}) {
      nodes {
        closureType
        group {
          object {
            type
            name
          }
        }
      }
    }
  }
}
  `;
  const jwt = localStorage.getItem("jwt_token");

  try {
    const req = await fetch(
      "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ query }),
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
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "server errore",
    };
  }
}
