export default async function GetUserInfoAction() {
  const query = `
              query{
                user : user {
                  id
                  login
                  firstName
                  lastName
                  email
                  avatarUrl
                  campus
                  auditRatio
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

    if (!req.ok) {
      return {
        success: false,
        error: res.error[0].extensions.code,
      };
    }

    return {
      success: true,
      data: res.data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: "server errore",
    };
  }
}
