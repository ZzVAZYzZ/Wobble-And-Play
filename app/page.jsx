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

  const FAQsArray = [
    `Bên mình áp dụng miễn phí vận chuyển cho mọi đơn hàng trên 50k.`,
    `Tùy vào tình hình vận chuyển của đơn vị vận chuyển, nhưng trung bình các 1-2 ngày cho các đơn hàng trong nội thành hcm, 3 ngày cho các tỉnh miền nam và 5-6 ngày dành cho khu vực miền trung và miền bắc`,
    `Với những đơn hàng sản phẩm bị hư hại do quá trình vận chuyển, bên mình sẽ hỗ trợ hoàn lại hàng hoặc đổi 1 sản phẩm tương tự.`,
    `Bên mình áp dụng miễn phí vận chuyển cho mọi đơn hàng trên 50k.`,
    `Các sản phẩm của Wobble&Play đều sử dụng nguồn nguyên liệu có xuất sứ rõ ràng. Ngoài ra, W&P cũng rất cẩn trọng trong các khâu chế tác để đảm bảo an toàn cho bé, bằng việc loại bỏ các thành phần có khả năng gây hại cho bé như các loại keo kết nối, in laze nhiệt.`,
    `Làm thế nào vệ sinh đồ chơi cho bé khi chơi xong ?<br></br>
    Vệ sinh Đồ chơi Wobble&Play:<br></br>
    Thực hiện đơn giản và dễ dàng: <br></br>
    &nbsp;1.Ba mẹ pha loãng một ít nước rửa bình sữa hoặc nước giặt quần
    áo cho bé vào nước.<br></br>
    &nbsp;2.Sau đó ngâm đồ chơi trong vòng 5 phút.<br></br>
    &nbsp;3.Lấy ra và xả lại với nước vài lần cho đến khi hết xà phòng.
    <br></br>
    &nbsp;4.Cuối cùng, phơi khô ở nơi thoáng mát.<br></br>
    <br></br>
    Ba mẹ lưu ý:<br></br>&nbsp;• Không giặt đồ chơi bằng máy giặt vì có
    thể làm hỏng hình dáng sản phẩm.<br></br>&nbsp;• Không sử dụng chất
    tẩy rửa mạnh vì có thể gây hại cho bé.<br></br>&nbsp;• Phơi khô đồ
    chơi hoàn toàn trước khi cho bé chơi để tránh nấm mốc.
    <br></br>
    <br></br>
    Bảo quản, ba mẹ hãy: <br></br>&nbsp;• Bảo quản ở nơi khô ráo, thoáng
    mát.<br></br>&nbsp;• Tránh ánh nắng trực tiếp`,
  ];
  let canClick = true;

  function handleFAQsClick(e, parentId) {
    if (canClick) {
      var paragraph = document.getElementById(e);
      var parentDiv = document.getElementById(parentId);
      var svgIcon = document.querySelector(`#${parentId} svg`);
      if (parentId == "FAQs23") {
        if (paragraph.innerHTML != "") {
          changeHeightVariables("781px", "67px");
          FAQsArray[5] = paragraph.innerHTML;
          paragraph.innerHTML = "";
          parentDiv.style.animation = "scrollToTop 00.5s ease-in-out forwards";
          svgIcon.style.animation =
            "rotateDownAnimation 0.5s ease-in-out forwards";
          setTimeout(() => {
            parentDiv.style.removeProperty("animation");
          }, 500);
        } else if (paragraph.innerHTML == "") {
          changeHeightVariables("67px", "781px");
          parentDiv.style.animation = "scrollToBottom 0.5s ease-in-out forwards";
          svgIcon.style.animation = "rotateUpAnimation 0.5s ease-in-out forwards";
          setTimeout(() => {
            parentDiv.style.removeProperty("animation");
            paragraph.innerHTML = FAQsArray[5];
          }, 500);
        }
      } else if (parentId == "FAQs22") {
        if (paragraph.innerHTML != "") {
          changeHeightVariables("114px", "67px");
          FAQsArray[4] = paragraph.innerHTML;
          svgIcon.style.animation =
            "rotateDownAnimation 0.5s ease-in-out forwards";
          paragraph.innerHTML = "";
          parentDiv.style.animation = "scrollToTop 0.5s ease-in-out forwards";
          setTimeout(() => {
            parentDiv.style.removeProperty("animation");
          }, 500);
        } else if (paragraph.innerHTML == "") {
          changeHeightVariables("67px", "114px");
          parentDiv.style.animation = "scrollToBottom 0.5s ease-in-out forwards";
          svgIcon.style.animation = "rotateUpAnimation 0.5s ease-in-out forwards";
          setTimeout(() => {
            parentDiv.style.removeProperty("animation");
            paragraph.innerHTML = FAQsArray[4];
          }, 500);
        }
      } else if (parentId == "FAQs21") {
        if (paragraph.innerHTML != "") {
          changeHeightVariables("91px", "67px");
          FAQsArray[3] = paragraph.innerHTML;
          paragraph.innerHTML = "";
          parentDiv.style.animation = "scrollToTop 0.2s ease-in-out forwards";
          svgIcon.style.animation =
            "rotateDownAnimation 0.2s ease-in-out forwards";
          setTimeout(() => {
            parentDiv.style.removeProperty("animation");
          }, 200);
        } else if (paragraph.innerHTML == "") {
          changeHeightVariables("67px", "91px");
          parentDiv.style.animation =
            "scrollToBottom 0.2s ease-in-out forwards";
          svgIcon.style.animation = "rotateUpAnimation 0.2s ease-in-out forwards";
          setTimeout(() => {
            parentDiv.style.removeProperty("animation");
            paragraph.innerHTML = FAQsArray[3];
          }, 200);
        }
      } else if (parentId == "FAQs13") {
        if (paragraph.innerHTML != "") {
          changeHeightVariables("91px", "67px");
          FAQsArray[2] = paragraph.innerHTML;
          paragraph.innerHTML = "";
          parentDiv.style.animation = "scrollToTop 0.5s ease-in-out forwards";
          svgIcon.style.animation =
            "rotateDownAnimation 0.5s ease-in-out forwards";
          setTimeout(() => {
            parentDiv.style.removeProperty("animation");
          }, 500);
        } else if (paragraph.innerHTML == "") {
          changeHeightVariables("67px", "91px");
          parentDiv.style.animation =
            "scrollToBottom 0.5s ease-in-out forwards";
          svgIcon.style.animation = "rotateUpAnimation 0.5s ease-in-out forwards";
          setTimeout(() => {
            parentDiv.style.removeProperty("animation");
            paragraph.innerHTML = FAQsArray[2];
          }, 500);
        }
      } else if (parentId == "FAQs12") {
        if (paragraph.innerHTML != "") {
          changeHeightVariables("114px", "67px");
          FAQsArray[1] = paragraph.innerHTML;
          paragraph.innerHTML = "";
          parentDiv.style.animation = "scrollToTop 0.5s ease-in-out forwards";
          svgIcon.style.animation =
            "rotateDownAnimation 0.5s ease-in-out forwards";
          setTimeout(() => {
            parentDiv.style.removeProperty("animation");
          }, 500);
        } else if (paragraph.innerHTML == "") {
          changeHeightVariables("67px", "114px");
          parentDiv.style.animation =
            "scrollToBottom 0.5s ease-in-out forwards";
          svgIcon.style.animation = "rotateUpAnimation 0.5s ease-in-out forwards";
          setTimeout(() => {
            parentDiv.style.removeProperty("animation");
            paragraph.innerHTML = FAQsArray[1];
          }, 500);
        }
      } else if (parentId == "FAQs11") {
        if (paragraph.innerHTML != "") {
          changeHeightVariables("91px", "67px");
          FAQsArray[0] = paragraph.innerHTML;
          paragraph.innerHTML = "";
          parentDiv.style.animation = "scrollToTop 0.5s ease-in-out forwards";
          svgIcon.style.animation =
            "rotateDownAnimation 0.5s ease-in-out forwards";
          setTimeout(() => {
            parentDiv.style.removeProperty("animation");
          }, 500);
        } else if (paragraph.innerHTML == "") {
          changeHeightVariables("67px", "91px");
          parentDiv.style.animation =
            "scrollToBottom 0.5s ease-in-out forwards";
          svgIcon.style.animation = "rotateUpAnimation 0.5s ease-in-out forwards";
          setTimeout(() => {
            parentDiv.style.removeProperty("animation");
            paragraph.innerHTML = FAQsArray[0];
          }, 500);
        }
      }

      canClick = false;
      if (
        parentDiv == "FAQs21" ||
        parentDiv == "FAQs13" ||
        parentDiv == "FAQs12" ||
        parentDiv == "FAQs11"
      ) {
        setTimeout(() => {
          canClick = true;
        }, 200);
      } else {
        setTimeout(() => {
          canClick = true;
        }, 500);
      }
    }
  }

  function changeHeightVariables(heightFrom, heightTo) {
    document.documentElement.style.setProperty("--height-from", heightFrom);
    document.documentElement.style.setProperty("--height-to", heightTo);
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
              <Link href="AllProductPage" draggable="false">
                SHOP NOW 4
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Banner khuyen mai */}
      <Link
        href="https://shopee.vn/shop/155343961?utm_campaign=-&utm_content=----&utm_medium=affiliates&utm_source=an_17348930108&utm_term=avd168nfrmdh"
        draggable="false"
      >
        <div className="salebanner">Banner khuyến mãi</div>
      </Link>
      {/* instagram place */}
      <div className="instagramplace">
        <div className="instagramplace-box">
          <div className="instagramplace-box-1">
            <div className="instagramplace-box-1-likebox">
              <div className="instagramplace-box-1-likebox-container">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </svg>
                <span>1.7K</span>
              </div>
            </div>
            <h1>Wobble&Play</h1>
          </div>
          <div className="instagramplace-box-2">
            <p>
              Theo dõi chúng tôi trên instagram để cập nhật những sản phẩm mới
              nhất
            </p>
          </div>
          <div className="instagramplace-box-3">
            <Link href="https://www.instagram.com/">
              <div className="instagramplace-box-3-1"></div>
            </Link>
            <Link href="https://www.instagram.com/">
              <div className="instagramplace-box-3-2"></div>
            </Link>
            <Link href="https://www.instagram.com/">
              <div className="instagramplace-box-3-3"></div>
            </Link>
            <Link href="https://www.instagram.com/">
              <div className="instagramplace-box-3-4"></div>
            </Link>
          </div>
        </div>
      </div>
      {/* FAQs */}
      <div className="FAQs">
        <div className="FAQs-wrapper">
          <h1>FAQs</h1>
          <div className="FAQs-wrapper-1">
            <h2>VẬN CHUYỂN VÀ BẢO HÀNH</h2>
            <div className="FAQs-wrapper-1-question">
              <div className="FAQs-wrapper-1-question-1" id="FAQs11">
                <div className="FAQs-wrapper-1-question-1-title">
                  <h3>Phí vận chuyển là bao nhiêu?</h3>
                  <button onClick={() => handleFAQsClick("q11", "FAQs11")}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                          fill="#0F0F0F"
                        ></path>{" "}
                      </g>
                    </svg>
                  </button>
                </div>
                <p id="q11"></p>
              </div>
              <div className="FAQs-wrapper-1-question-2" id="FAQs12">
                <div className="FAQs-wrapper-1-question-2-title">
                  <h3>Thời gian giao hàng bao lâu?</h3>
                  <button onClick={() => handleFAQsClick("q12", "FAQs12")}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                          fill="#0F0F0F"
                        ></path>{" "}
                      </g>
                    </svg>
                  </button>
                </div>
                <p id="q12"></p>
              </div>
              <div className="FAQs-wrapper-1-question-3" id="FAQs13">
                <div className="FAQs-wrapper-1-question-3-title">
                  <h3>Sản phẩm giao đến bị hư hại thì phải làm sao?</h3>
                  <button onClick={() => handleFAQsClick("q13", "FAQs13")}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                          fill="#0F0F0F"
                        ></path>{" "}
                      </g>
                    </svg>
                  </button>
                </div>
                <p id="q13"></p>
              </div>
            </div>
          </div>
          <div className="FAQs-wrapper-2">
            <h2>SẢN PHẨM</h2>
            <div className="FAQs-wrapper-2-question">
              <div className="FAQs-wrapper-2-question-1" id="FAQs21">
                <div className="FAQs-wrapper-2-question-1-title">
                  <h3>Có phải 100% handmade ?</h3>
                  <button onClick={() => handleFAQsClick("q21", "FAQs21")}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                          fill="#0F0F0F"
                        ></path>{" "}
                      </g>
                    </svg>
                  </button>
                </div>
                <p id="q21"></p>
              </div>
              <div className="FAQs-wrapper-2-question-2" id="FAQs22">
                <div className="FAQs-wrapper-2-question-2-title">
                  <h3>Sản phẩm có an toàn cho bé dưới 12 tháng tuổi ? </h3>
                  <button onClick={() => handleFAQsClick("q22", "FAQs22")}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                          fill="#0F0F0F"
                        ></path>{" "}
                      </g>
                    </svg>
                  </button>
                </div>
                <p id="q22"></p>
              </div>
              <div className="FAQs-wrapper-2-question-3" id="FAQs23">
                <div className="FAQs-wrapper-2-question-3-title">
                  <h3>Làm thế nào để vệ sinh đồ chơi khi bé chơi xong? </h3>
                  <button onClick={() => handleFAQsClick("q23", "FAQs23")}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                          fill="#0F0F0F"
                        ></path>{" "}
                      </g>
                    </svg>
                  </button>
                </div>
                <p id="q23"></p>
              </div>
            </div>
          </div>
          <div className="FAQs-wrapper-link">
            <Link href="/ShippingAndWarrantyPage">
              <p>
                Xem thêm về chính sách vận chuyển và bảo hành của Wobble &Play.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
