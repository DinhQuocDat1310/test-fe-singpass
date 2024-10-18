import React, { useState, useEffect } from "react";

const UserStatus = () => {
  const [userInfo, setUserInfo] = useState(null);

  // Gọi API trong useEffect
  useEffect(() => {
    fetch("http://localhost:3214/medsg/myinfo-user", {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          setUserInfo(data);
        } else {
          throw new Error("Not logged in");
        }
      })
      .catch((error) => {
        console.error(error);
        setUserInfo(null);
      });
  }, []);

  // Hàm xử lý đăng nhập
  const handleLogin = () => {
    window.location.href = "http://localhost:3214/medsg/login"; // Chuyển hướng đến trang đăng nhập
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    window.location.href = "http://localhost:3214/medsg/logout"; // Chuyển hướng đến trang đăng xuất
  };

  return (
    <div>
      {userInfo ? ( // Nếu có thông tin người dùng
        <div>
          <p>
            Thanks for logging in {userInfo.name.value}. Your UINFIN is{" "}
            {userInfo.uinfin.value}. Your PHONENO is{" "}
            {`${userInfo.mobileno.prefix.value}${userInfo.mobileno.areacode.value}${userInfo.mobileno.nbr.value}`}
            .
          </p>
          <button onClick={handleLogout} className="btn">
            Log out
          </button>
        </div>
      ) : (
        // Nếu không có thông tin người dùng
        <div>
          <p>You are not logged in.</p>
          <button onClick={handleLogin} className="btn">
            Log in with <img src="singpass.svg" alt="Singpass" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserStatus;
