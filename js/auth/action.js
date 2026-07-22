export default async function LogInAction(data) {
  const credentials = btoa(`${data.username}:${data.password}`);

  try {
    const req = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    if (!req.ok) {
      return {
        success: false,
        message: "invalide creaniales",
      };
    }
    const res = await req.json();
    return {
      success: true,
      jwt: res,
    };
  } catch (error) {
    return {
      success: false,
      message: "server errore",
    };
  }
}
