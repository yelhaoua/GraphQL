export default function () {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("user_Id");

  window.location.href = "#/login";
}
