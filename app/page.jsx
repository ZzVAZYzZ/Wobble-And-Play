"use client";
import React, { useState, useEffect } from "react";
import { postSubscribeEmail, getAllData } from "../services/firebase";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { checkData } from "./GlobalRedux/features/counter/dataCheckSlice";
import { saveArrayData } from "./GlobalRedux/features/counter/dataSlice";
import NextArrow from "./component/NextArrow";
import PrevArrow from "./component/PrevArrow";

export default function Homepage() {
  const count = useSelector((state) => state.counter.value);
  const checkDataFlag = useSelector((state) => state.check.value);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const bestsellers_product = count.slice(0, 8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getAllData();
        newData.sort((a, b) => b.bestsellers_count - a.bestsellers_count);
        console.log(newData);
        dispatch(checkData());
        dispatch(saveArrayData(newData));
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy dữ liệu:", error);
      }
    };
    if (!checkDataFlag) {
      fetchData();
    }
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function handleClosePopup() {
    document.getElementById("subscribePopupmodel").style.display = "none";
  }

  function handleSubscribeClick(e) {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của địa chỉ email
    if (validateEmail(email)) {
      document.getElementById("subscribePopupmodel").style.display = "block";
      postSubscribeEmail(email);
      setError("");
    } else if (email === "") {
      setError("Vui lòng điền địa chỉ email.");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      setError("Vui lòng nhập địa chỉ email hợp lệ.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }

  // Hàm kiểm tra tính hợp lệ của địa chỉ email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div>
      <div
        className="subscribe-popupmodel"
        id="subscribePopupmodel"
        onClick={handleClosePopup}
      >
        <div className="subscribe-popupmodel-thankyou-wrapper">
          <div>
            <h1>THANK YOU</h1>
            <p>
              Chào mừng bạn đến với Wobble&Play. Chúng tôi vô cùng vui mừng khi
              có bạn ở đây để cùng chúng tôi mang đến một thế giới đầy màu sắc
              và diệu kỳ dành cho bé. Hãy sẵn sàng cho hành trình đầy thú vị
              cùng chúng tôi !
            </p>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: "150px" }}></div>

      <div
        style={{ width: "100%", height: "500px", backgroundColor: "#F4D0AB" }}
      ></div>
      {/* message from wobble and play */}
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
              Thông điệp (ví dụ: for participating in Kraft-in association's
              House of Carpentry courses held at the Kraft-in office and showing
              exemplary performance in the courses taken.)
            </p>
          </div>
        </div>
      </div>
      {/* Vui choi cung be */}
      <div className="playwithbaby">
        <div className="playwithbaby-wrapper">
          <h1>VUI CHƠI CÙNG BÉ</h1>
          <div className="playwithbaby-wrapper-contain">
            <div className="playwithbaby-wrapper-contain-1">
              <div className="playwithbaby-wrapper-contain-1-image"></div>
              <h2>VỆ SĨ GIẤC MƠ</h2>
              <Link href="/AllProductPage">
                <div className="playwithbaby-wrapper-contain-1-shopnow">
                  SHOP NOW A
                </div>
              </Link>
            </div>
            <div className="playwithbaby-wrapper-contain-2">
              <div className="playwithbaby-wrapper-contain-2-image"></div>
              <h2>NGÓN TAY TÍ HON</h2>
              <Link href="/AllProductPage">
                <div className="playwithbaby-wrapper-contain-2-shopnow">
                  SHOP NOW B
                </div>
              </Link>
            </div>
            <div className="playwithbaby-wrapper-contain-3">
              <div className="playwithbaby-wrapper-contain-3-image"></div>
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
      {/* Email subscribe */}
      <div className="subscribe">
        <div className="subscribe-wrapper">
          <h1>SUBSCRIBE</h1>
          <p className="subscribe-wrapper-content">
            Hãy tham gia cộng đồng Wobble & Play ngay hôm nay để cùng bé yêu
            khám phá thế giới đầy ắp điều kỳ diệu!
          </p>
          <form action="">
            <div>
              <input
                type="email"
                id="subscribeValue"
                placeholder="Email..."
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <button aria-label="subscribe" onClick={handleSubscribeClick}>
                Đăng kí
              </button>
            </div>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        </div>
      </div>
      {/* BST */}
      <div className="BST">
        <div className="BST-wrapper">
          <h1>Khám phá BST mới</h1>
          <Link href="AllProductPage">SHOP NOW 3</Link>
        </div>
      </div>
      <div className="freeship">
        <div className="freeship-wrapper">
          <p>
            Miễn phí vận chuyển cho tất cả đơn hàng trên 99k.{" "}
            <Link href="/AllProductPage">Shop now</Link>
          </p>
        </div>
      </div>
      {/* Carousel best seller */}
      <div className="bestsellers">
        <div className="bestsellers-wrapper">
          <h1>Bestsellers</h1>
          {bestsellers_product.length > 0 && ( // Kiểm tra nếu bestsellers_product đã có dữ liệu
            <Slider {...settings} className="bestsellers-carousel">
              {bestsellers_product.map((product, index) => (
                <div
                  key={index}
                  className={`bestsellers-carousel-${index + 1}`}
                >
                  <Link href="/AllProductPage" draggable="false">
                    <div className={`bestsellers-carousel-${index + 1}-image`}>
                      {/* Hiển thị hình ảnh sản phẩm với lazy loading */}
                      <img
                        src={product.imgUrl}
                        alt={product.product_name}
                        width="100%"
                        height="100%"
                        loading="lazy" // Thêm lazy loading vào đây
                      />
                    </div>
                  </Link>
                  <h2>
                    {product.type}: {product.product_name}
                  </h2>
                  <div className={`bestsellers-carousel-${index + 1}-box`}>
                    <p>
                      {product.price.toLocaleString()}
                      {product.sale !== 0 && (
                        <span>{product.sale.toLocaleString()}</span>
                      )}
                    </p>
                    <p
                      className={`bestsellers-carousel-${
                        index + 1
                      }-box-addtocart`}
                    >
                      Thêm vào giỏ hàng
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
      {/* Set qua thoi noi */}
      <div className="setquathoinoi">
        <div className="setquathoinoi-wrapper">
          <div className="setquathoinoi-wrapper-box">
            <div className="setquathoinoi-wrapper-box-1"></div>
            <div className="setquathoinoi-wrapper-box-2">
              <h1>
                SET QUÀ <br></br>
                <span>THÔI NÔI CHO BÉ</span>
              </h1>
              <p>
                Tìm kiếm món quà hoàn hảo cho bé yêu trong ngày thôi nôi? Hãy
                khám phá set quà thôi nôi độc đáo từ Wobble & Play!
              </p>
              <Link href="AllProductPage" draggable="false">SHOP NOW 4</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Banner khuyen mai */}
      <Link href="https://shopee.vn/shop/155343961?utm_campaign=-&utm_content=----&utm_medium=affiliates&utm_source=an_17348930108&utm_term=avd168nfrmdh" draggable="false">
        <div className="salebanner">Banner khuyến mãi</div>
      </Link>
      {/* instagram place */}
      <div>

      </div>
    </div>
  );
}
