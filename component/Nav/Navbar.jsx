"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const count = useSelector((state) => state.counter.value);
  const [subNavId, setSubNavId] = useState();
  const [isSearchClick, setIsSearchClick] = useState(false);
  const [isMouseEnterSearchArea, setIsMouseEnterSearchArea] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const handleSearch = (searchContent) => {
    if (searchContent !== "") {
      // Chuẩn hóa nội dung tìm kiếm và tiêu đề của các đối tượng
      const formattedSearchContent = removeDiacritics(
        searchContent.toLowerCase()
      );

      const filteredData = searchData.filter((item) => {
        // Chuẩn hóa tiêu đề của mỗi đối tượng và so sánh với nội dung tìm kiếm đã được chuẩn hóa
        const formattedTitle = removeDiacritics(
          item.product_name.toLowerCase()
        );

        // Tách chuỗi tiêu đề thành các từ
        const wordsInTitle = formattedTitle.split(/\s+/);

        // Tách chuỗi tìm kiếm thành các từ
        const wordsInSearch = formattedSearchContent.split(/\s+/);

        // Kiểm tra xem có từ nào trong chuỗi tìm kiếm xuất hiện trong tiêu đề không
        const isAnyWordFound = wordsInSearch.some((searchWord) =>
          wordsInTitle.some((titleWord) => titleWord.includes(searchWord))
        );

        // Nếu không có từ nào trong chuỗi tìm kiếm xuất hiện trong tiêu đề, loại bỏ mục đó
        return isAnyWordFound;
      });

      return filteredData;
    } else {
      return [];
    }
  };

  // Hàm loại bỏ dấu từ chuỗi
  const removeDiacritics = (str) => {
    // Loại bỏ dấu từ chuỗi
    let normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Thay thế các kí tự tiếng Việt đặc biệt
    normalizedStr = normalizedStr
      .replace(/[đĐ]/g, "d")
      .replace(/[ơƠ]/g, "o")
      .replace(/\s/g, "")
      .replace(/[:]/g, "");

    return normalizedStr;
  };

  useEffect(() => {
    setSearchData(count);
    // console.clear();
    // Sử dụng hàm handleSearch để lấy kết quả tìm kiếm và sắp xếp
    const filteredResults = handleSearch(searchContent);
    // Sử dụng setTimeout để thực hiện một hàm khác sau 1 giây
    const timer = setTimeout(() => {
      if (filteredResults.length == 1) {
        document.getElementById("dropDownAnimate").style.height = "137px";
      } else if (filteredResults.length == 2) {
        document.getElementById("dropDownAnimate").style.height = "237px";
      } else if (filteredResults.length == 3) {
        document.getElementById("dropDownAnimate").style.height = "337px";
      } else if (filteredResults.length > 3) {
        document.getElementById("dropDownAnimate").style.height = "381px";
      } else if (filteredResults.length == 0) {
        document.getElementById("dropDownAnimate").style.height = "35px";
      }
      setSearchResults(filteredResults);
    }, 200);

    // Xóa timer khi component unmount để tránh memory leaks
    return () => clearTimeout(timer);
  }, [searchContent]);

  const subNavAppear = (id) => {
    document.getElementById("subNav").style.display = "block";
    if (
      id.target.id == "navMenu1" ||
      id.target.id == "navMenu2" ||
      id.target.id == "navMenu3"
    ) {
      setSubNavId(id.target.id);
    }
  };

  const subNavDisappear = () => {
    document.getElementById("subNav").style.display = "none";
  };

  const handleSearchClick = () => {
    const inputLineElement = document.getElementById("inputLine");

    if (isSearchClick === false) {
      document.getElementById("searchInputArea").style.display = "flex";
      document.getElementById("searchResultsBox").style.display = "flex";
      setSearchContent("");
      document.getElementById("searchInput").value = "";
      document.getElementById("dropDownAnimate").style.display = "block";
      setIsSearchClick(true);
    } else {
      document.getElementById("searchResultsBox").style.display = "none";
      document.getElementById("searchInputArea").style.display = "none";
      document.getElementById("dropDownAnimate").style.display = "none";
      setSearchContent("");
      // Check if the element exists before accessing its style
      if (inputLineElement) {
        inputLineElement.style.display = "none";
      }

      setIsSearchClick(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchContent(e.target.value);
  };

  const handleInputFocus = (e) => {
    const inputLine = document.getElementById("inputLine");
    if (inputLine) {
      inputLine.style.display = "block";
    }
    document.getElementById("searchResultsBox").style.display = "block";
    if (searchResults.length == 1) {
      document.getElementById("dropDownAnimate").style.height = "137px";
    } else if (searchResults.length == 2) {
      document.getElementById("dropDownAnimate").style.height = "237px";
    } else if (searchResults.length == 3) {
      document.getElementById("dropDownAnimate").style.height = "337px";
    } else if (searchResults.length > 3) {
      document.getElementById("dropDownAnimate").style.height = "381px";
    } else if (searchResults.length == 0) {
      document.getElementById("dropDownAnimate").style.height = "35px";
    }
  };

  const handleInputBlur = (e) => {
    if (isMouseEnterSearchArea === false) {
      document.getElementById("searchResultsBox").style.display = "none";
      document.getElementById("dropDownAnimate").style.height = "35px";
      const inputLine = document.getElementById("inputLine");
      if (inputLine) {
        inputLine.style.display = "block";
      }
    }
  };

  return (
    <>
      <nav>
        <div className="nav-1">
          <div className="nav-1-title">
            <Link href="/#">Wobble & Play</Link>
          </div>
          {/*  */}
          <div className="nav-1-box">
            <div className="nav-1-box-1">
              <div className="nav-1-box-1-wrapper" onClick={handleSearchClick}>
                <button className="nav-1-box-1-wrapper-search" aria-label="SearchButton">
                  <svg
                    width="70%"
                    height="70%"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#fafafa"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="square"
                      strokeLinejoin="square"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="square"
                        strokeLinejoin="square"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </div>
              <div
                className="nav-1-box-1-searchbox"
                onMouseEnter={() => {
                  setIsMouseEnterSearchArea(true);
                }}
                onMouseLeave={() => {
                  setIsMouseEnterSearchArea(false);
                }}
                id="dropDownAnimate"
              >
                <div
                  className="nav-1-box-1-searchbox-input-wrapper"
                  id="searchInputArea"
                >
                  <input
                    className="nav-1-box-1-searchbox-input"
                    placeholder="Tìm kiếm ..."
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    id="searchInput"
                    autoComplete="off"
                  ></input>
                </div>
                {searchResults.length !== 0 && searchContent !== "" && (
                  <div id="inputLine"></div>
                )}
                <div
                  className="nav-1-box-search-input-wrapper-container"
                  id="searchResultsBox"
                >
                  {searchResults.length !== 0 &&
                    searchResults.slice(0, 3).map((item, index) => (
                      <Link
                        href="/ProductDetailPage"
                        key={index}
                        onClick={handleSearchClick}
                      >
                        <div
                          className={`nav-1-box-search-input-wrapper-container-${
                            index + 1
                          }`}
                        >
                          <div
                            className={`nav-1-box-search-input-wrapper-container-${
                              index + 1
                            }-image`}
                          >
                            <img src = {item.imgUrl} width="70px" height="70px" loading="lazy" alt={item.product_name}></img>
                          </div>
                          <div
                            className={`nav-1-box-search-input-wrapper-container-${
                              index + 1
                            }-box`}
                          >
                            <div
                              className={`nav-1-box-search-input-wrapper-container-${
                                index + 1
                              }-box-title`}
                              style={{
                                fontSize:
                                  item.product_name.split(" ").length > 10
                                    ? "16px"
                                    : "18px",
                              }}
                            >
                              {item.product_name}
                            </div>
                            <div
                              className={`nav-1-box-search-input-wrapper-container-${
                                index + 1
                              }-box-price-wrapper`}
                            >
                              <div
                                className={`nav-1-box-search-input-wrapper-container-${
                                  index + 1
                                }-box-price-wrapper-text`}
                              >
                                {item.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  {searchResults.length > 3 && (
                    <div className="nav-1-box-search-input-wrapper-container-xemthem">
                      <Link href="/AllProductPage" onClick={handleSearchClick}>
                        Xem Thêm
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Link href="/MyCartPage">
              <button className="nav-1-box-2">
                <div className="nav-1-box-2-cartcount-wrapper">
                  <div className="nav-1-box-2-cartcount">0</div>
                </div>

                <svg
                  fill="#FD6713"
                  height="100%"
                  width="100%"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512.004 512.004"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#CCCCCC"
                    strokeWidth="15.36012"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <circle cx="153.6" cy="448.004" r="12.8"></circle>{" "}
                      </g>{" "}
                    </g>{" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <circle cx="409.6" cy="448.004" r="12.8"></circle>{" "}
                      </g>{" "}
                    </g>{" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M499.2,435.204h-26.889c-5.931-29.21-31.744-51.2-62.711-51.2c-30.959,0-56.781,21.99-62.711,51.2H216.277 c-5.726-28.015-29.824-49.229-59.179-50.85l-42.035-283.827c-0.401-2.722-1.673-5.222-3.61-7.177l-89.6-89.6 C16.853-1.25,8.755-1.25,3.754,3.75c-5,5-5,13.099,0,18.099l86.613,86.596l41.421,279.62 c-24.559,8.951-42.189,32.29-42.189,59.938c0,35.345,28.655,64,64,64c30.959,0,56.781-21.99,62.711-51.2h130.577 c5.931,29.21,31.753,51.2,62.711,51.2s56.781-21.99,62.711-51.2H499.2c7.074,0,12.8-5.726,12.8-12.8 C512,440.93,506.274,435.204,499.2,435.204z M153.6,486.404c-21.171,0-38.4-17.229-38.4-38.4c0-21.171,17.229-38.4,38.4-38.4 c21.171,0,38.4,17.229,38.4,38.4C192,469.175,174.771,486.404,153.6,486.404z M409.6,486.404c-21.171,0-38.4-17.229-38.4-38.4 c0-21.171,17.229-38.4,38.4-38.4s38.4,17.229,38.4,38.4C448,469.175,430.771,486.404,409.6,486.404z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M506.837,138.185c-4.838-6.409-12.407-10.18-20.437-10.18H171.52c-7.424,0-14.473,3.217-19.337,8.823 s-7.057,13.047-5.999,20.395l25.6,179.2c1.792,12.612,12.595,21.982,25.335,21.982H435.2c11.426,0,21.478-7.578,24.619-18.569 l51.2-179.2C513.22,152.913,511.675,144.602,506.837,138.185z M435.2,332.804H197.12l-25.6-179.2H486.4L435.2,332.804z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </button>
            </Link>
          </div>
          {/*  */}
        </div>
        <div className="nav-2">
          <ul>
            <li>
              <Link
                href="/AllProductPage"
                onMouseEnter={subNavAppear}
                onMouseLeave={subNavDisappear}
              >
                <div className="nav-menu" id="navMenu1">
                  VUI CHƠI CÙNG BÉ
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/AllProductPage"
                onMouseEnter={subNavAppear}
                onMouseLeave={subNavDisappear}
              >
                <div className="nav-menu" id="navMenu2">
                  0-12 tháng tuổi
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/ShippingAndWarrantyPage"
                onMouseEnter={subNavAppear}
                onMouseLeave={subNavDisappear}
              >
                <div className="nav-menu" id="navMenu3">
                  Vận chuyển
                </div>
              </Link>
            </li>
            <li>
              <Link href="/MyCartPage">
                <div className="nav-menu" id="navMenu4">
                  Theo dõi đơn hàng
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="nav-3-wrapper"
          id="subNav"
          onMouseEnter={subNavAppear}
          onMouseLeave={subNavDisappear}
        >
          <div className="nav-3">
            {/* rerender */}
            {subNavId === "navMenu1" && (
              <>
                <div className="nav-3-nav1-1">
                  <ul>
                    <li>
                      <Link href="/AllProductPage">Bằng len</Link>
                    </li>
                    <li>
                      <Link href="/AllProductPage">Bằng vải</Link>
                    </li>
                    <li>
                      <Link href="/AllProductPage">Sinh vật biển</Link>
                    </li>
                    <li>
                      <Link href="/AllProductPage">Động vật</Link>
                    </li>
                    <li>
                      <Link href="/AllProductPage">Thiên nhiên</Link>
                    </li>
                    <li>
                      <Link href="/AllProductPage">Set quà thôi nôi</Link>
                    </li>
                  </ul>
                </div>
                <div className="nav-3-nav1-2">
                  <div className="nav-3-nav1-2-1">
                    <Link href="/AllProductPage">
                      <div className="nav-3-nav1-2-1-image"></div>
                      <div className="nav-3-nav1-2-1-babygirl">BÉ GÁI</div>
                    </Link>
                  </div>
                  <div className="nav-3-nav1-2-2">
                    <Link href="/AllProductPage">
                      <div className="nav-3-nav1-2-2-image"></div>
                      <div className="nav-3-nav1-2-2-babyboy">BÉ TRAI</div>
                    </Link>
                  </div>
                </div>
              </>
            )}
            {/* rerender */}
            {subNavId === "navMenu2" && (
              <>
                <div className="nav-3-nav2-wrapper">
                  <div className="nav-3-nav2-1-wrapper-1">
                    <Link href="/AllProductPage">
                      <div className="nav-3-nav2-1-wrapper-image">
                        <div className="nav-3-nav2-1-wrapper-image-text">
                          Vệ sĩ giấc mơ
                        </div>
                      </div>
                      <div className="nav-3-nav2-2-wrapper-1-shopnow">
                        S H O P N O W
                      </div>
                    </Link>
                  </div>
                  <div className="nav-3-nav2-2-wrapper-2">
                    <Link href="/AllProductPage">
                      <div className="nav-3-nav2-2-wrapper-image">
                        <div className="nav-3-nav2-2-wrapper-image-text">
                          Ngón tay tí hon
                        </div>
                      </div>
                      <div className="nav-3-nav2-2-wrapper-2-shopnow">
                        S H O P N O W
                      </div>
                    </Link>
                  </div>
                  <div className="nav-3-nav2-3-wrapper-3">
                    <Link href="/AllProductPage">
                      <div className="nav-3-nav2-3-wrapper-image">
                        <div className="nav-3-nav2-3-wrapper-image-text">
                          Gậm nhấm vui vẻ
                        </div>
                      </div>
                      <div className="nav-3-nav2-2-wrapper-3-shopnow">
                        S H O P N O W
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            )}
            {subNavId === "navMenu3" && (
              <>
                <div className="nav-3-nav3-wrapper">
                  <Link href="/ShippingAndWrrantyPage">
                    <div className="nav-3-nav3-wrapper-image">
                      <svg
                        width="100px"
                        height="100px"
                        fill="#CB5002"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M 0 6 L 0 8 L 19 8 L 19 23 L 12.84375 23 C 12.398438 21.28125 10.851563 20 9 20 C 7.148438 20 5.601563 21.28125 5.15625 23 L 4 23 L 4 18 L 2 18 L 2 25 L 5.15625 25 C 5.601563 26.71875 7.148438 28 9 28 C 10.851563 28 12.398438 26.71875 12.84375 25 L 21.15625 25 C 21.601563 26.71875 23.148438 28 25 28 C 26.851563 28 28.398438 26.71875 28.84375 25 L 32 25 L 32 16.84375 L 31.9375 16.6875 L 29.9375 10.6875 L 29.71875 10 L 21 10 L 21 6 Z M 1 10 L 1 12 L 10 12 L 10 10 Z M 21 12 L 28.28125 12 L 30 17.125 L 30 23 L 28.84375 23 C 28.398438 21.28125 26.851563 20 25 20 C 23.148438 20 21.601563 21.28125 21.15625 23 L 21 23 Z M 2 14 L 2 16 L 8 16 L 8 14 Z M 9 22 C 10.117188 22 11 22.882813 11 24 C 11 25.117188 10.117188 26 9 26 C 7.882813 26 7 25.117188 7 24 C 7 22.882813 7.882813 22 9 22 Z M 25 22 C 26.117188 22 27 22.882813 27 24 C 27 25.117188 26.117188 26 25 26 C 23.882813 26 23 25.117188 23 24 C 23 22.882813 23.882813 22 25 22 Z"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="nav-3-nav3-wrapper-text">
                      <p>
                        <span className="nav-3-nav3-wrapper-text-freeshiping">
                          FREE SHIPPING
                        </span>
                        &nbsp; cho tất cả đơn hàng trên 99k
                      </p>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
