const UserProfile = () => {
  const userData = JSON.parse(sessionStorage.getItem("loginInfo"));
  return (
    <div className="app__user__profile">
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontFamily: "KoHo",

          imageRendering: "pixalated",
        }}
      >
        Your Profile
      </h1>
      <img
        src={userData.profilePhotoURL}
        alt=""
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          objectFit: "cover",
          objectCover: "50% 50%",
          borderRadius: "50%",
          border: "2px outset grey",
          marginLeft: "20px",
        }}
      />
      <h2
        style={{
          textAlign: "left",
          position: "absolute",
          left: "27%",
          top: "210px",
          fontFamily: "poppins",
        }}
      >
        {userData.name}
      </h2>
      <h4
        style={{
          position: "absolute",
          textAlign: "left",
          left: "27%",
          top: "260px",
          fontFamily: "poppins",
        }}
      >
        {userData.emailId}
      </h4>
    </div>
  );
};

export default UserProfile;
