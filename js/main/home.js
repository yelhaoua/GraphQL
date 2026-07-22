export default function HomePage() {
  console.log("home page ");

    const jwt = localStorage.getItem("jwt_token");
    console.log(jwt);
    
  if (!jwt) {
    window.location.href = "#/login";
    return;
  }


}
