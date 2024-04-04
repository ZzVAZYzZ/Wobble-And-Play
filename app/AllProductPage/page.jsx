"use client";
import { getAllData } from "../../services/firebase";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { saveArrayData } from "../GlobalRedux/features/counter/dataSlice";
import React from "react";
import { checkData } from "../GlobalRedux/features/counter/dataCheckSlice";
import "./index.css";

export default function AllProductPage() {
  const count = useSelector((state) => state.counter.value);
  const checkDataFlag = useSelector((state) => state.check.value);
  const dispatch = useDispatch();
  const [filterColorArray,setFilterColorArray] = useState([]);
  const [filterSexArray,setFilterSexArray] = useState([]);
  const [filterAgeArray,setFilterAgeArray] = useState([]);
  const [filterTypeArray,setFilterTypeArray] = useState([]);
  const [filterTopicArray,setFilterTopicArray] = useState([]);
  const [filterMaterialArray,setFilterMaterialArray] = useState([]);
  const [filterBestsellers,setFilterBestsellers] = useState(false);
  const [filterNewProducts,setFilterNewProducts] = useState(false);
  const [filterSales,setFilterSales] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getAllData();
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

  // useEffect(()=>{
  //   console.log(filterMaterialArray);
  // },[filterMaterialArray])

  function handleFilterColorClick(e) {
    let colorElement = document.getElementById(e.target.id);
    const newArray = [...filterColorArray]; // Tạo một bản sao của mảng state
    if (!colorElement.classList.contains("filter-color-boxshadow")) {
      colorElement.classList.add("filter-color-boxshadow");
      newArray.push(e.target.id); // Thêm id mới vào bản sao mảng
    } else {
      colorElement.classList.remove("filter-color-boxshadow");
      const index = newArray.indexOf(e.target.id);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    setFilterColorArray(newArray); // Cập nhật mảng state với bản sao mới
  }

  function handleOtherCheck(e){
    const chechbox = document.getElementById(e.target.id);
    if(chechbox.checked===true && e.target.id==="bestseller"){
      setFilterBestsellers(true);
    }else if(chechbox.checked===false && e.target.id==="bestseller"){
      setFilterBestsellers(false);
    }
    if(chechbox.checked===true && e.target.id==="newproduct"){
      setFilterNewProducts(true);
    }else if(chechbox.checked===false && e.target.id==="newproduct"){
      setFilterNewProducts(false);
    }
    if(chechbox.checked===true && e.target.id==="sales"){
      setFilterSales(true);
    }else if(chechbox.checked===false && e.target.id==="sales"){
      setFilterSales(false);
    }
  }

  function handleFilterSex(e){
    const chechbox = document.getElementById(e.target.id);
    const newArray = [...filterSexArray];
    if(chechbox.checked===true && e.target.id==="girl"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="girl"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if(chechbox.checked===true && e.target.id==="boy"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="boy"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    setFilterSexArray(newArray);
  }

  function handleFilterAge(e){
    const chechbox = document.getElementById(e.target.id);
    const newArray = [...filterAgeArray];
    if(chechbox.checked===true && e.target.id==="age1"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="age1"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if(chechbox.checked===true && e.target.id==="age2"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="age2"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if(chechbox.checked===true && e.target.id==="age3"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="age3"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    setFilterAgeArray(newArray);
  }

  function handleFilterType(e) {
    const chechbox = document.getElementById(e.target.id);
    const newArray = [...filterTypeArray];
    if(chechbox.checked===true && e.target.id==="treonoi"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="treonoi"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if(chechbox.checked===true && e.target.id==="tapcamnam"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="tapcamnam"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if(chechbox.checked===true && e.target.id==="mocrang"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="mocrang"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if(chechbox.checked===true && e.target.id==="setquathoinoi"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="setquathoinoi"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    setFilterTypeArray(newArray);
  }

  function handleFilterTopic(e) {
    const chechbox = document.getElementById(e.target.id);
    const newArray = [...filterTopicArray];
    if(chechbox.checked===true && e.target.id==="sinhvatbien"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="sinhvatbien"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if(chechbox.checked===true && e.target.id==="dongvat"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="dongvat"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if(chechbox.checked===true && e.target.id==="thiennhien"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="thiennhien"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    setFilterTopicArray(newArray);
  }

  function handleFilterMaterial(e) {
    const chechbox = document.getElementById(e.target.id);
    const newArray = [...filterMaterialArray];
    if(chechbox.checked===true && e.target.id==="len"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="len"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if(chechbox.checked===true && e.target.id==="vai"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="vai"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if(chechbox.checked===true && e.target.id==="go"){
      
      newArray.push(e.target.value);
    }else if(chechbox.checked===false && e.target.id==="go"){
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    setFilterMaterialArray(newArray);
  }

  return (
    <>
      <div style={{ width: "100%", height: "150px" }}></div>
      {/* Title */}
      <div className="allproductpage-wrapper">
        <div className="wrapper-1">
          <h1>VUI CHƠI CÙNG BÉ</h1>
        </div>
        <div className="wrapper-2">
          <div className="wrapper-2-filter">
            <div className="removeallfilter">
              <button>Loại bỏ</button>
            </div>
            <div className="filter-1">
              <div className="filter-1-checkbox">
                <input type="checkbox" id="bestseller" onClick={handleOtherCheck}></input>
                <p>Bestsellers</p>
              </div>
              <div className="filter-1-checkbox">
                <input type="checkbox" id="newproduct" onClick={handleOtherCheck}></input>
                <p>Sản phẩm mới</p>
              </div>
              <div className="filter-1-checkbox">
                <input type="checkbox" id="sales" onClick={handleOtherCheck}></input>
                <p>Khuyến mãi</p>
              </div>
            </div>
            <div className="filter-2">
              <h1>Giới tính</h1>
              <div className="filter-2-checkbox">
                <input type="checkbox" id="girl" onClick={handleFilterSex} value="Bé gái"></input>
                <p>Bé Gái</p>
              </div>
              <div className="filter-2-checkbox">
                <input type="checkbox" id="boy" onClick={handleFilterSex} value="Bé trai"></input>
                <p>Bé Trai</p>
              </div>
            </div>
            <div className="filter-3">
              <h1>Độ tuổi</h1>
              <div className="filter-3-checkbox">
                <input type="checkbox" id="age1" onClick={handleFilterAge} value="0-3 tháng tuổi"></input>
                <p>0-3 tháng tuổi</p>
              </div>
              <div className="filter-3-checkbox">
                <input type="checkbox" id="age2" onClick={handleFilterAge} value="3-6 tháng tuổi"></input>
                <p>3-6 tháng tuổi</p>
              </div>
              <div className="filter-3-checkbox">
                <input type="checkbox" id="age3" onClick={handleFilterAge} value="6-12 tháng tuổi"></input>
                <p>6-12 tháng tuổi</p>
              </div>
            </div>
            <div className="filter-4">
              <h1>Đồ chơi cho bé</h1>
              <div className="filter-4-checkbox">
                <input type="checkbox" id="treonoi" onClick={handleFilterType} value="Treo nôi"></input>
                <p>Treo nôi</p>
              </div>
              <div className="filter-4-checkbox">
                <input type="checkbox" id="tapcamnam" onClick={handleFilterType} value="Tập cầm nắm"></input>
                <p>Tập cằm nắm</p>
              </div>
              <div className="filter-4-checkbox">
                <input type="checkbox" id="mocrang" onClick={handleFilterType} value="Mọc răng"></input>
                <p>Mọc răng</p>
              </div>
              <div className="filter-4-checkbox">
                <input type="checkbox" id="setquathoinoi" onClick={handleFilterType} value="Set quà thôi nôi"></input>
                <p>Set quà thôi nôi</p>
              </div>
            </div>
            <div className="filter-5">
              <h1>Sinh vật</h1>
              <div className="filter-5-checkbox">
                <input type="checkbox" id="sinhvatbien" onClick={handleFilterTopic} value="Sinh vật biển"></input>
                <p>Sinh vật biển</p>
              </div>
              <div className="filter-5-checkbox">
                <input type="checkbox" id="dongvat" onClick={handleFilterTopic} value="Động vật"></input>
                <p>Động vật</p>
              </div>
              <div className="filter-5-checkbox">
                <input type="checkbox" id="thiennhien" onClick={handleFilterTopic} value="Thiên nhiên"></input>
                <p>Thiên nhiên</p>
              </div>
            </div>
            <div className="filter-6">
              <h1>Vật liệu</h1>
              <div className="filter-6-checkbox">
                <input type="checkbox" id="len" onClick={handleFilterMaterial} value="Len"></input>
                <p>Len</p>
              </div>
              <div className="filter-6-checkbox">
                <input type="checkbox" id="vai" onClick={handleFilterMaterial} value="Vải"></input>
                <p>Vải</p>
              </div>
              <div className="filter-6-checkbox">
                <input type="checkbox" id="go" onClick={handleFilterMaterial} value="Gổ"></input>
                <p>Gổ</p>
              </div>
            </div>
            <div className="filter-7">
              <h1>Màu sắc</h1>
              <div className="filter-7-box">
                <div className="filter-7-box-row">
                  <div className="filter-7-box-row-white" id="white" onClick={handleFilterColorClick}></div>
                  <div className="filter-7-box-row-black" id="black" onClick={handleFilterColorClick}></div>
                  <div className="filter-7-box-row-red" id="red" onClick={handleFilterColorClick}></div>
                </div>
                <div className="filter-7-box-row">
                  <div className="filter-7-box-row-blue" id="blue" onClick={handleFilterColorClick}></div>
                  <div className="filter-7-box-row-purple" id="purple" onClick={handleFilterColorClick}></div>
                  <div className="filter-7-box-row-pink" id="pink" onClick={handleFilterColorClick}></div>
                </div>
                <div className="filter-7-box-row">
                  <div className="filter-7-box-row-green" id="green" onClick={handleFilterColorClick}></div>
                  <div className="filter-7-box-row-yellow" id="yellow" onClick={handleFilterColorClick}></div>
                  <div className="filter-7-box-row-orange" id="orange" onClick={handleFilterColorClick}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-2-box"></div>
        </div>
      </div>
    </>
  );
}
