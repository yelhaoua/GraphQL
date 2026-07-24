export default async function ProgressAction(id) {
  const query = `
  query Getuser($id :Int!){
  progress (where:{ userId : {_eq : $id } object : {type  :{_eq : "project"}} }) {
    id
    isDone
    grade
    object {name type}
   path
    group {
      id
      captain {
        login
        avatarUrl

      }
      members{
        userLogin
        user {
          avatarUrl
        }
      }
    } 
  }
}
  `;

  const variables = { id: id };
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
