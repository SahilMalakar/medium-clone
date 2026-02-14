import NavbarComponet from "../components/NavbarComponent";

function Navbar() {
  const user = {
    username: "Sahil",
    email: "sahil@gmail.com",
  };

  return (
    <>
      <NavbarComponet user={user} />
    </>
  );
}

export default Navbar;
