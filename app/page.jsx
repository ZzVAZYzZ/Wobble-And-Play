"use client"
import React, { useState } from "react";
import { postSubscribeEmail } from "../services/firebase";
import Link from "next/link";

export default function Homepage() {
  const [email, setEmail] = useState(""); // Sử dụng useState để lưu trữ giá trị email nhập vào
  const [error, setError] = useState("");

  function handleSubscribeClick(e) {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của địa chỉ email
    if (validateEmail(email)) {
      document.getElementById('subscribePopupmodel').style.display="block";
      postSubscribeEmail(email);
      setError("");
      setTimeout(()=>{
        document.getElementById('subscribePopupmodel').style.display="none";
      },2000)
      console.log('Đã đăng ký thành công!');
    } else if(email===""){
      setError("Vui lòng điền địa chỉ email.");
      setTimeout(()=>{
        setError("");
      },2000)
    } else{
      setError("Vui lòng nhập địa chỉ email hợp lệ.");
      setTimeout(()=>{
        setError("");
      },2000)
    }
  }

  // Hàm kiểm tra tính hợp lệ của địa chỉ email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div>
      <div className="subscribe-popupmodel" id="subscribePopupmodel">
        <div className="subscribe-popupmodel-thankyou-wrapper">
          <div>
            <h1>THANK YOU</h1>
            <p>
              Chào mừng bạn đến với Wobble&Play. Chúng tôi vô cùng vui mừng khi có bạn ở đây để cùng chúng tôi mang đến một thế giới đầy màu sắc và diệu kỳ dành cho bé. Hãy sẵn sàng cho hành trình đầy thú vị cùng chúng tôi !
            </p>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: "150px" }}></div>
        
      <div
        style={{ width: "100%", height: "500px", backgroundColor: "#F4D0AB" }}
      ></div>
      <div className="message">
        <div className="message-wrapper">
          <h1>Wobble & Play</h1>
          <p> Đồng hành cùng bé yêu trong hành trình khám phá thế giới!</p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="message-wrapper-content">
            <p>
              Thông điệp (ví dụ: for participating in Kraft-in association's House
              of Carpentry courses held at the Kraft-in office and showing
              exemplary performance in the courses taken.)
            </p>
          </div>
        </div>
      </div>
      <div className="playwithbaby">
        <div className="playwithbaby-wrapper">
            <h1>VUI CHƠI CÙNG BÉ</h1>
            <div className="playwithbaby-wrapper-contain">
              <div className="playwithbaby-wrapper-contain-1">
                <div className="playwithbaby-wrapper-contain-1-image">

                </div>
                <h2>VỆ SĨ GIẤC MƠ</h2>
                <Link href="/AllProductPage">
                  <div className="playwithbaby-wrapper-contain-1-shopnow">
                    SHOP NOW A
                  </div>
                </Link>
                
              </div>
              <div className="playwithbaby-wrapper-contain-2">
                <div className="playwithbaby-wrapper-contain-2-image">

                </div>
                <h2>NGÓN TAY TÍ HON</h2>
                <Link href="/AllProductPage">
                  <div className="playwithbaby-wrapper-contain-2-shopnow">
                    SHOP NOW B
                  </div>
                </Link>
                
              </div>
              <div className="playwithbaby-wrapper-contain-3">
                <div className="playwithbaby-wrapper-contain-3-image">

                </div>
                <h2>GẬM NHẮM VUI VẺ</h2>
                <Link href="/AllProductPage">
                  <div className="playwithbaby-wrapper-contain-3-shopnow">
                    SHOP NOW C
                  </div>
                </Link>
              </div>
            </div>
        </div>
      </div>
      <div className="subscribe">
        <div className="subscribe-wrapper">
          <h1>SUBSCRIBE</h1>
          <p className="subscribe-wrapper-content">Hãy tham gia cộng đồng Wobble & Play ngay hôm nay để cùng bé yêu khám phá thế giới đầy ắp điều kỳ diệu!</p>
          <form action="">
            <div>
              <input type="email" id="subscribeValue" placeholder="Email..." required onChange={(e) => setEmail(e.target.value)}></input>
              <button aria-label="subscribe" onClick={handleSubscribeClick}>Đăng kí</button>
            </div>
          </form>
          {error && <p style={{color: 'red'}}>{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}
        </div>
      </div>
    </div>
  );
}
