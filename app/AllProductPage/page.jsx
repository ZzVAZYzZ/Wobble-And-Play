"use client";
import { getAllData } from "../../services/firebase";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { saveArrayData } from "../GlobalRedux/features/counter/dataSlice";
import React from "react";
import { checkData } from "../GlobalRedux/features/counter/dataCheckSlice";
import "./index.css";
import Link from "next/link";

export default function AllProductPage() {
  const count = useSelector((state) => state.counter.value);
  const checkDataFlag = useSelector((state) => state.check.value);
  const dispatch = useDispatch();
  const [filterColorArray, setFilterColorArray] = useState([]);
  const [filterSexArray, setFilterSexArray] = useState([]);
  const [filterAgeArray, setFilterAgeArray] = useState([]);
  const [filterTypeArray, setFilterTypeArray] = useState([]);
  const [filterTopicArray, setFilterTopicArray] = useState([]);
  const [filterMaterialArray, setFilterMaterialArray] = useState([]);
  const [filterBestsellers, setFilterBestsellers] = useState(false);
  const [filterNewProducts, setFilterNewProducts] = useState(false);
  const [filterSales, setFilterSales] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [filterForm, setFilterForm] = useState({
    bestSellersForm: filterBestsellers,
    newProductsForm: filterNewProducts,
    salesForm: filterSales,
    sexArrayForm: filterSexArray,
    ageArrayForm: filterAgeArray,
    typeArrayForm: filterTypeArray,
    topicArrayForm: filterTopicArray,
    materialArrayForm: filterMaterialArray,
    colorArrayForm: filterColorArray,
  });
  const [itemsBox1, setItemsBox1] = useState([0, 3]);
  const [itemsBox2, setItemsBox2] = useState([3, 6]);
  const [itemsBox3, setItemsBox3] = useState([6, 9]);
  const [countLength, setCountLength] = useState(0);
  const [myCount, setMyCount] = useState(1);
  const [extraButton, setExtraButton] = useState(false);
  const [activeButton, setActiveButton] = useState(1);

  const itemsForBox1 = filterData.slice(itemsBox1[0], itemsBox1[1]);
  const itemsForBox2 = filterData.slice(itemsBox2[0], itemsBox2[1]);
  const itemsForBox3 = filterData.slice(itemsBox3[0], itemsBox3[1]);

  useEffect(() => {
    setFilterData(count);
  }, [count]);

  useEffect(() => {
    setFilterForm({
      bestSellersForm: filterBestsellers,
      newProductsForm: filterNewProducts,
      salesForm: filterSales,
      sexArrayForm: filterSexArray,
      ageArrayForm: filterAgeArray,
      typeArrayForm: filterTypeArray,
      topicArrayForm: filterTopicArray,
      materialArrayForm: filterMaterialArray,
      colorArrayForm: filterColorArray,
    });
  }, [
    filterBestsellers,
    filterNewProducts,
    filterSexArray,
    filterAgeArray,
    filterTypeArray,
    filterTopicArray,
    filterMaterialArray,
    filterColorArray,
    filterSales,
  ]);

  useEffect(() => {
    let filteredData = [...count]; // Sử dụng bản sao của dữ liệu gốc để thực hiện các thay đổi
    //bestsellers FILTER
    if (filterBestsellers) {
      filteredData = bestsellerSort(filteredData);
    }
    //sales FILTER
    if (filterSales) {
      filteredData = filteredData.filter((item) => item.sale !== 0);
      if (filterBestsellers) {
        filteredData = bestsellerSort(filteredData);
      }
    }
    //new_product FILTER
    if (filterNewProducts) {
      filteredData = filteredData.filter((item) => item.new_product === true);
      if (filterBestsellers) {
        filteredData = bestsellerSort(filteredData);
      }
    }
    //sex FILTER
    filteredData = sexFilter(filteredData, filterSexArray);
    //age_scope FILTER
    filteredData = ageFilter(filteredData, filterAgeArray);
    //type FILTER
    filteredData = typeFilter(filteredData, filterTypeArray);
    //topic FILTER
    filteredData = topicFilter(filteredData, filterTopicArray);
    //materials FILTER
    filteredData = materialFilter(filteredData, filterMaterialArray);
    //color FILTER
    filteredData = filterDataByColors(filteredData, filterColorArray);

    setFilterData(filteredData);
    setItemsBox1([0, 3]);
    setItemsBox2([3, 6]);
    setItemsBox3([6, 9]);
    setMyCount(1);
    setActiveButton(1);
  }, [filterForm]);

  useEffect(() => {
    // console.clear();
    setCountLength(separate(filterData.length));
    // console.log(filterData.length);
  }, [filterData]);

  useEffect(() => {
    if (countLength <= 9) {
      setActiveButton(1);
    }

    if (countLength <= 1 || countLength % 9 !== 0) {
      setExtraButton(true);
    } else {
      setExtraButton(false);
    }
  }, [countLength]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getAllData();
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

  const bestsellerSort = (array) => {
    const sortedData = [...array].sort(
      (a, b) => b.bestsellers_count - a.bestsellers_count
    );
    return sortedData;
  };

  const filterDataByColors = (data, colors) => {
    if (colors.length === 0) {
      return data; // Trả lại dữ liệu ban đầu nếu không có màu nào được chọn
    } else {
      return data.filter((item) =>
        colors.some((color) => item.color.includes(color))
      );
    }
  };

  const sexFilter = (data, sexes) => {
    if (sexes.includes("Bé trai") && sexes.includes("Bé gái")) {
      return data; // Không làm gì nếu cả hai giới tính đều được chọn
    } else if (sexes.includes("Bé trai")) {
      return data.filter((item) => item.sex.includes("Bé trai"));
    } else if (sexes.includes("Bé gái")) {
      return data.filter((item) => item.sex.includes("Bé gái"));
    } else {
      return data; // Trả lại dữ liệu ban đầu nếu không có giới tính nào được chọn
    }
  };

  // Tạo một hàm để lọc dữ liệu dựa trên độ tuổi được chọn
  const ageFilter = (data, ages) => {
    if (
      ages.includes("0-3 tháng tuổi") &&
      ages.includes("3-6 tháng tuổi") &&
      ages.includes("6-12 tháng tuổi")
    ) {
      return data; // Không làm gì nếu cả ba độ tuổi đều được chọn
    } else if (
      ages.includes("0-3 tháng tuổi") &&
      ages.includes("3-6 tháng tuổi")
    ) {
      const filteredData1 = data.filter((item) =>
        item.age_scope.includes("0-3 tháng tuổi")
      );
      const filteredData2 = data.filter((item) =>
        item.age_scope.includes("3-6 tháng tuổi")
      );
      return filteredData1.concat(filteredData2);
    } else if (
      ages.includes("0-3 tháng tuổi") &&
      ages.includes("6-12 tháng tuổi")
    ) {
      const filteredData1 = data.filter((item) =>
        item.age_scope.includes("0-3 tháng tuổi")
      );
      const filteredData2 = data.filter((item) =>
        item.age_scope.includes("6-12 tháng tuổi")
      );
      return filteredData1.concat(filteredData2);
    } else if (
      ages.includes("3-6 tháng tuổi") &&
      ages.includes("6-12 tháng tuổi")
    ) {
      const filteredData1 = data.filter((item) =>
        item.age_scope.includes("3-6 tháng tuổi")
      );
      const filteredData2 = data.filter((item) =>
        item.age_scope.includes("6-12 tháng tuổi")
      );
      return filteredData1.concat(filteredData2);
    } else if (ages.includes("0-3 tháng tuổi")) {
      return data.filter((item) => item.age_scope.includes("0-3 tháng tuổi"));
    } else if (ages.includes("3-6 tháng tuổi")) {
      return data.filter((item) => item.age_scope.includes("3-6 tháng tuổi"));
    } else if (ages.includes("6-12 tháng tuổi")) {
      return data.filter((item) => item.age_scope.includes("6-12 tháng tuổi"));
    } else {
      return data; // Trả lại dữ liệu ban đầu nếu không có độ tuổi nào được chọn
    }
  };

  const typeFilter = (data, types) => {
    if (
      types.includes("Set quà thôi nôi") &&
      types.includes("Mọc răng") &&
      types.includes("Tập cầm nắm") &&
      types.includes("Treo nôi")
    ) {
      return data; // Không làm gì nếu cả bốn loại sản phẩm đều được chọn
    } else if (
      types.includes("Set quà thôi nôi") &&
      types.includes("Mọc răng") &&
      types.includes("Tập cầm nắm")
    ) {
      const filteredData1 = data.filter(
        (item) => item.type === "Set quà thôi nôi"
      );
      const filteredData2 = data.filter((item) => item.type === "Mọc răng");
      const filteredData3 = data.filter((item) => item.type === "Tập cầm nắm");
      return filteredData1.concat(filteredData2.concat(filteredData3));
    } else if (
      types.includes("Set quà thôi nôi") &&
      types.includes("Mọc răng") &&
      types.includes("Treo nôi")
    ) {
      const filteredData1 = data.filter(
        (item) => item.type === "Set quà thôi nôi"
      );
      const filteredData2 = data.filter((item) => item.type === "Mọc răng");
      const filteredData3 = data.filter((item) => item.type === "Treo nôi");
      return filteredData1.concat(filteredData2.concat(filteredData3));
    } else if (
      types.includes("Set quà thôi nôi") &&
      types.includes("Tập cầm nắm") &&
      types.includes("Treo nôi")
    ) {
      const filteredData1 = data.filter(
        (item) => item.type === "Set quà thôi nôi"
      );
      const filteredData2 = data.filter((item) => item.type === "Tập cầm nắm");
      const filteredData3 = data.filter((item) => item.type === "Treo nôi");
      return filteredData1.concat(filteredData2.concat(filteredData3));
    } else if (
      types.includes("Mọc răng") &&
      types.includes("Tập cầm nắm") &&
      types.includes("Treo nôi")
    ) {
      const filteredData1 = data.filter((item) => item.type === "Mọc răng");
      const filteredData2 = data.filter((item) => item.type === "Tập cầm nắm");
      const filteredData3 = data.filter((item) => item.type === "Treo nôi");
      return filteredData1.concat(filteredData2.concat(filteredData3));
    } else if (
      types.includes("Set quà thôi nôi") &&
      types.includes("Mọc răng")
    ) {
      const filteredData1 = data.filter(
        (item) => item.type === "Set quà thôi nôi"
      );
      const filteredData2 = data.filter((item) => item.type === "Mọc răng");
      return filteredData1.concat(filteredData2);
    } else if (
      types.includes("Set quà thôi nôi") &&
      types.includes("Tập cầm nắm")
    ) {
      const filteredData1 = data.filter(
        (item) => item.type === "Set quà thôi nôi"
      );
      const filteredData2 = data.filter((item) => item.type === "Tập cầm nắm");
      return filteredData1.concat(filteredData2);
    } else if (
      types.includes("Set quà thôi nôi") &&
      types.includes("Treo nôi")
    ) {
      const filteredData1 = data.filter(
        (item) => item.type === "Set quà thôi nôi"
      );
      const filteredData2 = data.filter((item) => item.type === "Treo nôi");
      return filteredData1.concat(filteredData2);
    } else if (types.includes("Mọc răng") && types.includes("Tập cầm nắm")) {
      const filteredData1 = data.filter((item) => item.type === "Mọc răng");
      const filteredData2 = data.filter((item) => item.type === "Tập cầm nắm");
      return filteredData1.concat(filteredData2);
    } else if (types.includes("Mọc răng") && types.includes("Treo nôi")) {
      const filteredData1 = data.filter((item) => item.type === "Mọc răng");
      const filteredData2 = data.filter((item) => item.type === "Treo nôi");
      return filteredData1.concat(filteredData2);
    } else if (types.includes("Tập cầm nắm") && types.includes("Treo nôi")) {
      const filteredData1 = data.filter((item) => item.type === "Tập cầm nắm");
      const filteredData2 = data.filter((item) => item.type === "Treo nôi");
      return filteredData1.concat(filteredData2);
    } else if (types.includes("Set quà thôi nôi")) {
      return data.filter((item) => item.type === "Set quà thôi nôi");
    } else if (types.includes("Mọc răng")) {
      return data.filter((item) => item.type === "Mọc răng");
    } else if (types.includes("Tập cầm nắm")) {
      return data.filter((item) => item.type === "Tập cầm nắm");
    } else if (types.includes("Treo nôi")) {
      return data.filter((item) => item.type === "Treo nôi");
    } else {
      return data; // Trả lại dữ liệu ban đầu nếu không có loại sản phẩm nào được chọn
    }
  };

  const topicFilter = (data, topics) => {
    if (
      topics.includes("Sinh vật biển") &&
      topics.includes("Động vật") &&
      topics.includes("Thiên nhiên")
    ) {
      return data; // Không làm gì nếu cả ba chủ đề đều được chọn
    } else if (
      topics.includes("Sinh vật biển") &&
      topics.includes("Động vật")
    ) {
      const filteredData1 = data.filter(
        (item) => item.topic === "Sinh vật biển"
      );
      const filteredData2 = data.filter((item) => item.topic === "Động vật");
      return filteredData1.concat(filteredData2);
    } else if (topics.includes("Động vật") && topics.includes("Thiên nhiên")) {
      const filteredData1 = data.filter((item) => item.topic === "Động vật");
      const filteredData2 = data.filter((item) => item.topic === "Thiên nhiên");
      return filteredData1.concat(filteredData2);
    } else if (
      topics.includes("Sinh vật biển") &&
      topics.includes("Thiên nhiên")
    ) {
      const filteredData1 = data.filter(
        (item) => item.topic === "Sinh vật biển"
      );
      const filteredData2 = data.filter((item) => item.topic === "Thiên nhiên");
      return filteredData1.concat(filteredData2);
    } else if (topics.includes("Sinh vật biển")) {
      return data.filter((item) => item.topic === "Sinh vật biển");
    } else if (topics.includes("Động vật")) {
      return data.filter((item) => item.topic === "Động vật");
    } else if (topics.includes("Thiên nhiên")) {
      return data.filter((item) => item.topic === "Thiên nhiên");
    } else {
      return data; // Trả lại dữ liệu ban đầu nếu không có chủ đề nào được chọn
    }
  };

  const materialFilter = (data, materials) => {
    if (
      materials.includes("Len") &&
      materials.includes("Vải") &&
      materials.includes("Gổ")
    ) {
      return data; // Không làm gì nếu cả ba chất liệu đều được chọn
    } else if (materials.includes("Len") && materials.includes("Vải")) {
      const filteredData1 = data.filter((item) =>
        item.material.includes("Len")
      );
      const filteredData2 = data.filter((item) =>
        item.material.includes("Vải")
      );
      return filteredData1.concat(filteredData2);
    } else if (materials.includes("Len") && materials.includes("Gổ")) {
      const filteredData1 = data.filter((item) =>
        item.material.includes("Len")
      );
      const filteredData2 = data.filter((item) => item.material.includes("Gỗ"));
      return filteredData1.concat(filteredData2);
    } else if (materials.includes("Gổ") && materials.includes("Vải")) {
      const filteredData1 = data.filter((item) => item.material.includes("Gổ"));
      const filteredData2 = data.filter((item) =>
        item.material.includes("Vải")
      );
      return filteredData1.concat(filteredData2);
    } else if (materials.includes("Len")) {
      return data.filter((item) => item.material.includes("Len"));
    } else if (materials.includes("Vải")) {
      return data.filter((item) => item.material.includes("Vải"));
    } else if (materials.includes("Gổ")) {
      return data.filter((item) => item.material.includes("Gổ"));
    } else {
      return data; // Trả lại dữ liệu ban đầu nếu không có chất liệu nào được chọn
    }
  };

  const separate = (length) => {
    let separateCount = 0;
    while (length > 9) {
      separateCount++;
      length -= 9;
    }
    return separateCount;
  };

  const increaseCount = () => {
    if (myCount < countLength + 1) {
      setMyCount(myCount + 1);
      setItemsBox1([itemsBox1[0] + 9, itemsBox1[1] + 9]);
      setItemsBox2([itemsBox2[0] + 9, itemsBox2[1] + 9]);
      setItemsBox3([itemsBox3[0] + 9, itemsBox3[1] + 9]);
      setActiveButton((number) => number + 1);
    }
  };

  const decreaseCount = () => {
    if (myCount > 1) {
      setMyCount(myCount - 1);
      setItemsBox1([itemsBox1[0] - 9, itemsBox1[1] - 9]);
      setItemsBox2([itemsBox2[0] - 9, itemsBox2[1] - 9]);
      setItemsBox3([itemsBox3[0] - 9, itemsBox3[1] - 9]);
      setActiveButton((number) => number - 1);
    }
  };

  const handleOtherCheck = (e) => {
    const checkbox = document.getElementById(e.target.id);
    if (checkbox.checked === true && e.target.id === "bestseller") {
      setFilterBestsellers(true);
    } else if (checkbox.checked === false && e.target.id === "bestseller") {
      setFilterBestsellers(false);
    }
    if (checkbox.checked === true && e.target.id === "newproduct") {
      setFilterNewProducts(true);
    } else if (checkbox.checked === false && e.target.id === "newproduct") {
      setFilterNewProducts(false);
    }
    if (checkbox.checked === true && e.target.id === "sales") {
      setFilterSales(true);
    } else if (checkbox.checked === false && e.target.id === "sales") {
      setFilterSales(false);
    }
  };

  const handleFilterColorClick = (e) => {
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
  };

  const handleFilterSex = (e) => {
    const chechbox = document.getElementById(e.target.id);
    const newArray = [...filterSexArray];
    if (chechbox.checked === true && e.target.id === "girl") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "girl") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if (chechbox.checked === true && e.target.id === "boy") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "boy") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    setFilterSexArray(newArray);
  };

  const handleFilterAge = (e) => {
    const chechbox = document.getElementById(e.target.id);
    const newArray = [...filterAgeArray];
    if (chechbox.checked === true && e.target.id === "age1") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "age1") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if (chechbox.checked === true && e.target.id === "age2") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "age2") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if (chechbox.checked === true && e.target.id === "age3") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "age3") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    setFilterAgeArray(newArray);
  };

  const handleFilterType = (e) => {
    const chechbox = document.getElementById(e.target.id);
    const newArray = [...filterTypeArray];
    if (chechbox.checked === true && e.target.id === "treonoi") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "treonoi") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if (chechbox.checked === true && e.target.id === "tapcamnam") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "tapcamnam") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if (chechbox.checked === true && e.target.id === "mocrang") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "mocrang") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if (chechbox.checked === true && e.target.id === "setquathoinoi") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "setquathoinoi") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    setFilterTypeArray(newArray);
  };

  const handleFilterTopic = (e) => {
    const chechbox = document.getElementById(e.target.id);
    const newArray = [...filterTopicArray];
    if (chechbox.checked === true && e.target.id === "sinhvatbien") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "sinhvatbien") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if (chechbox.checked === true && e.target.id === "dongvat") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "dongvat") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if (chechbox.checked === true && e.target.id === "thiennhien") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "thiennhien") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    setFilterTopicArray(newArray);
  };

  const handleFilterMaterial = (e) => {
    const chechbox = document.getElementById(e.target.id);
    const newArray = [...filterMaterialArray];
    if (chechbox.checked === true && e.target.id === "len") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "len") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if (chechbox.checked === true && e.target.id === "vai") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "vai") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    if (chechbox.checked === true && e.target.id === "go") {
      newArray.push(e.target.value);
    } else if (chechbox.checked === false && e.target.id === "go") {
      const index = newArray.indexOf(e.target.value);
      if (index !== -1) {
        newArray.splice(index, 1); // Xóa id khỏi bản sao mảng nếu nó đã tồn tại
      }
    }
    setFilterMaterialArray(newArray);
  };

  const handleButtonClick = (i) => {
    setActiveButton(i);
    const start = (i - 1) * 9;
    setItemsBox1([start, start + 3]);
    setItemsBox2([start + 3, start + 6]);
    setItemsBox3([start + 6, start + 9]);
    setMyCount(i);
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= countLength; i++) {
      buttons.push(
        <button
          key={i}
          id={`button-${i}`}
          className={activeButton === i ? "active" : ""}
          onClick={() => handleButtonClick(i)}
        >
          {i}
        </button>
      );
    }
    if (extraButton) {
      const nextButtonValue = countLength + 1;
      buttons.push(
        <button
          key={`extra-${countLength}`}
          id={`button-${nextButtonValue}`}
          className={activeButton === nextButtonValue ? "active" : ""}
          onClick={() => handleButtonClick(nextButtonValue)}
        >
          {nextButtonValue}
        </button>
      );
    }
    return buttons;
  };

  const handleRemoveAllFilter = () => {
    const colors = [
      "white",
      "black",
      "red",
      "blue",
      "purple",
      "pink",
      "green",
      "yellow",
      "orange",
    ];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setFilterData([...count]);
    setFilterBestsellers(false);
    setFilterNewProducts(false);
    setFilterSales(false);
    setFilterSexArray([]);
    setFilterAgeArray([]);
    setFilterTypeArray([]);
    setFilterTopicArray([]);
    setFilterMaterialArray([]);
    setFilterColorArray([]);
    setActiveButton(1);
    setMyCount(1);
    colors.forEach((color) => {
      document.getElementById(color).classList.remove("filter-color-boxshadow");
    });
  };

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
              <button onClick={handleRemoveAllFilter}>Loại bỏ</button>
            </div>
            <div className="filter-1">
              <div className="filter-1-checkbox">
                <input
                  type="checkbox"
                  id="bestseller"
                  onClick={handleOtherCheck}
                ></input>
                <p>Bestsellers</p>
              </div>
              <div className="filter-1-checkbox">
                <input
                  type="checkbox"
                  id="newproduct"
                  onClick={handleOtherCheck}
                ></input>
                <p>Sản phẩm mới</p>
              </div>
              <div className="filter-1-checkbox">
                <input
                  type="checkbox"
                  id="sales"
                  onClick={handleOtherCheck}
                ></input>
                <p>Khuyến mãi</p>
              </div>
            </div>
            <div className="filter-2">
              <h1>Giới tính</h1>
              <div className="filter-2-checkbox">
                <input
                  type="checkbox"
                  id="girl"
                  onClick={handleFilterSex}
                  value="Bé gái"
                ></input>
                <p>Bé Gái</p>
              </div>
              <div className="filter-2-checkbox">
                <input
                  type="checkbox"
                  id="boy"
                  onClick={handleFilterSex}
                  value="Bé trai"
                ></input>
                <p>Bé Trai</p>
              </div>
            </div>
            <div className="filter-3">
              <h1>Độ tuổi</h1>
              <div className="filter-3-checkbox">
                <input
                  type="checkbox"
                  id="age1"
                  onClick={handleFilterAge}
                  value="0-3 tháng tuổi"
                ></input>
                <p>0-3 tháng tuổi</p>
              </div>
              <div className="filter-3-checkbox">
                <input
                  type="checkbox"
                  id="age2"
                  onClick={handleFilterAge}
                  value="3-6 tháng tuổi"
                ></input>
                <p>3-6 tháng tuổi</p>
              </div>
              <div className="filter-3-checkbox">
                <input
                  type="checkbox"
                  id="age3"
                  onClick={handleFilterAge}
                  value="6-12 tháng tuổi"
                ></input>
                <p>6-12 tháng tuổi</p>
              </div>
            </div>
            <div className="filter-4">
              <h1>Đồ chơi cho bé</h1>
              <div className="filter-4-checkbox">
                <input
                  type="checkbox"
                  id="treonoi"
                  onClick={handleFilterType}
                  value="Treo nôi"
                ></input>
                <p>Treo nôi</p>
              </div>
              <div className="filter-4-checkbox">
                <input
                  type="checkbox"
                  id="tapcamnam"
                  onClick={handleFilterType}
                  value="Tập cầm nắm"
                ></input>
                <p>Tập cằm nắm</p>
              </div>
              <div className="filter-4-checkbox">
                <input
                  type="checkbox"
                  id="mocrang"
                  onClick={handleFilterType}
                  value="Mọc răng"
                ></input>
                <p>Mọc răng</p>
              </div>
              <div className="filter-4-checkbox">
                <input
                  type="checkbox"
                  id="setquathoinoi"
                  onClick={handleFilterType}
                  value="Set quà thôi nôi"
                ></input>
                <p>Set quà thôi nôi</p>
              </div>
            </div>
            <div className="filter-5">
              <h1>Sinh vật</h1>
              <div className="filter-5-checkbox">
                <input
                  type="checkbox"
                  id="sinhvatbien"
                  onClick={handleFilterTopic}
                  value="Sinh vật biển"
                ></input>
                <p>Sinh vật biển</p>
              </div>
              <div className="filter-5-checkbox">
                <input
                  type="checkbox"
                  id="dongvat"
                  onClick={handleFilterTopic}
                  value="Động vật"
                ></input>
                <p>Động vật</p>
              </div>
              <div className="filter-5-checkbox">
                <input
                  type="checkbox"
                  id="thiennhien"
                  onClick={handleFilterTopic}
                  value="Thiên nhiên"
                ></input>
                <p>Thiên nhiên</p>
              </div>
            </div>
            <div className="filter-6">
              <h1>Vật liệu</h1>
              <div className="filter-6-checkbox">
                <input
                  type="checkbox"
                  id="len"
                  onClick={handleFilterMaterial}
                  value="Len"
                ></input>
                <p>Len</p>
              </div>
              <div className="filter-6-checkbox">
                <input
                  type="checkbox"
                  id="vai"
                  onClick={handleFilterMaterial}
                  value="Vải"
                ></input>
                <p>Vải</p>
              </div>
              <div className="filter-6-checkbox">
                <input
                  type="checkbox"
                  id="go"
                  onClick={handleFilterMaterial}
                  value="Gổ"
                ></input>
                <p>Gổ</p>
              </div>
            </div>
            <div className="filter-7">
              <h1>Màu sắc</h1>
              <div className="filter-7-box">
                <div className="filter-7-box-row">
                  <div
                    className="filter-7-box-row-white"
                    id="white"
                    onClick={handleFilterColorClick}
                  ></div>
                  <div
                    className="filter-7-box-row-black"
                    id="black"
                    onClick={handleFilterColorClick}
                  ></div>
                  <div
                    className="filter-7-box-row-red"
                    id="red"
                    onClick={handleFilterColorClick}
                  ></div>
                </div>
                <div className="filter-7-box-row">
                  <div
                    className="filter-7-box-row-blue"
                    id="blue"
                    onClick={handleFilterColorClick}
                  ></div>
                  <div
                    className="filter-7-box-row-purple"
                    id="purple"
                    onClick={handleFilterColorClick}
                  ></div>
                  <div
                    className="filter-7-box-row-pink"
                    id="pink"
                    onClick={handleFilterColorClick}
                  ></div>
                </div>
                <div className="filter-7-box-row">
                  <div
                    className="filter-7-box-row-green"
                    id="green"
                    onClick={handleFilterColorClick}
                  ></div>
                  <div
                    className="filter-7-box-row-yellow"
                    id="yellow"
                    onClick={handleFilterColorClick}
                  ></div>
                  <div
                    className="filter-7-box-row-orange"
                    id="orange"
                    onClick={handleFilterColorClick}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-2-box">
            <div className="wrapper-2-box-1">
              {itemsForBox1.map((item, index) => (
                <div className="wrapper-2-box-card" key={index}>
                  <div className="wrapper-2-box-card-image">
                    <Link href="/ProductDetailPage">
                      <div className="wrapper-2-box-card-image-wrapper">
                        {/* bestseller */}
                        {(() => {
                          if (
                            item.bestsellers_count > 5 &&
                            !item.new_product &&
                            item.sale === 0
                          ) {
                            return (
                              <div
                                className="bestseller-tag"
                                style={{ top: "5%" }}
                              >
                                Bestseller
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            item.new_product &&
                            item.sale === 0
                          ) {
                            return (
                              <div
                                className="bestseller-tag"
                                style={{ top: "5%" }}
                              >
                                Bestseller
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div
                                className="bestseller-tag"
                                style={{ top: "5%" }}
                              >
                                Bestseller
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            !item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div
                                className="bestseller-tag"
                                style={{ top: "5%" }}
                              >
                                Bestseller
                              </div>
                            );
                          } else {
                            return null; // Trường hợp mặc định không thỏa mãn điều kiện
                          }
                        })()}
                        {/* new product */}
                        {(() => {
                          if (
                            item.bestsellers_count <= 5 &&
                            item.new_product &&
                            item.sale === 0
                          ) {
                            return (
                              <div
                                className="newproduct-tag"
                                style={{ top: "5%" }}
                              >
                                New
                              </div>
                            );
                          } else if (
                            item.bestsellers_count <= 5 &&
                            item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div
                                className="newproduct-tag"
                                style={{ top: "5%" }}
                              >
                                New
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            item.new_product
                          ) {
                            return (
                              <div
                                className="newproduct-tag"
                                style={{ top: "15%" }}
                              >
                                New
                              </div>
                            );
                          } else {
                            return null; // Trường hợp mặc định không thỏa mãn điều kiện
                          }
                        })()}
                        {/* sale */}
                        {(() => {
                          if (
                            item.bestsellers_count <= 5 &&
                            !item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div className="sale-tag" style={{ top: "5%" }}>
                                Sale
                              </div>
                            );
                          } else if (
                            item.bestsellers_count <= 5 &&
                            item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div className="sale-tag" style={{ top: "15%" }}>
                                Sale
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            !item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div className="sale-tag" style={{ top: "15%" }}>
                                Sale
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div className="sale-tag" style={{ top: "25%" }}>
                                Sale
                              </div>
                            );
                          } else {
                            return null; // Trường hợp mặc định không thỏa mãn điều kiện
                          }
                        })()}

                        <img
                          src={item.imgUrl}
                          alt={item.product_name}
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="wrapper-2-box-card-title">
                    <h2>{item.product_name}</h2>
                  </div>
                  <div className="wrapper-2-box-card-buybox">
                    {item.sale !== 0 ? (
                      <p>
                        {item.sale.toLocaleString()}
                        <span>{item.price.toLocaleString()}</span>
                      </p>
                    ) : (
                      <p>{item.price.toLocaleString()}</p>
                    )}
                    <Link href="/ProductDetailPage">Thêm vào giỏ hàng</Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="wrapper-2-box-2">
              {itemsForBox2.map((item, index) => (
                <div className="wrapper-2-box-card" key={index}>
                  <div className="wrapper-2-box-card-image">
                    <Link href="/ProductDetailPage">
                      <div className="wrapper-2-box-card-image-wrapper">
                        {/* bestseller */}
                        {(() => {
                          if (
                            item.bestsellers_count > 5 &&
                            !item.new_product &&
                            item.sale === 0
                          ) {
                            return (
                              <div
                                className="bestseller-tag"
                                style={{ top: "5%" }}
                              >
                                Bestseller
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            item.new_product &&
                            item.sale === 0
                          ) {
                            return (
                              <div
                                className="bestseller-tag"
                                style={{ top: "5%" }}
                              >
                                Bestseller
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div
                                className="bestseller-tag"
                                style={{ top: "5%" }}
                              >
                                Bestseller
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            !item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div
                                className="bestseller-tag"
                                style={{ top: "5%" }}
                              >
                                Bestseller
                              </div>
                            );
                          } else {
                            return null; // Trường hợp mặc định không thỏa mãn điều kiện
                          }
                        })()}
                        {/* new product */}
                        {(() => {
                          if (
                            item.bestsellers_count <= 5 &&
                            item.new_product &&
                            item.sale === 0
                          ) {
                            return (
                              <div
                                className="newproduct-tag"
                                style={{ top: "5%" }}
                              >
                                New
                              </div>
                            );
                          } else if (
                            item.bestsellers_count <= 5 &&
                            item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div
                                className="newproduct-tag"
                                style={{ top: "5%" }}
                              >
                                New
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            item.new_product
                          ) {
                            return (
                              <div
                                className="newproduct-tag"
                                style={{ top: "15%" }}
                              >
                                New
                              </div>
                            );
                          } else {
                            return null; // Trường hợp mặc định không thỏa mãn điều kiện
                          }
                        })()}

                        {/* sale */}
                        {(() => {
                          if (
                            item.bestsellers_count <= 5 &&
                            !item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div className="sale-tag" style={{ top: "5%" }}>
                                Sale
                              </div>
                            );
                          } else if (
                            item.bestsellers_count <= 5 &&
                            item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div className="sale-tag" style={{ top: "15%" }}>
                                Sale
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            !item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div className="sale-tag" style={{ top: "15%" }}>
                                Sale
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div className="sale-tag" style={{ top: "25%" }}>
                                Sale
                              </div>
                            );
                          } else {
                            return null; // Trường hợp mặc định không thỏa mãn điều kiện
                          }
                        })()}
                        <img
                          src={item.imgUrl}
                          alt={item.product_name}
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="wrapper-2-box-card-title">
                    <h2>{item.product_name}</h2>
                  </div>
                  <div className="wrapper-2-box-card-buybox">
                    {item.sale !== 0 ? (
                      <p>
                        {item.sale.toLocaleString()}
                        <span>{item.price.toLocaleString()}</span>
                      </p>
                    ) : (
                      <p>{item.price.toLocaleString()}</p>
                    )}
                    <Link href="/ProductDetailPage">Thêm vào giỏ hàng</Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="wrapper-2-box-3">
              {itemsForBox3.map((item, index) => (
                <div className="wrapper-2-box-card" key={index}>
                  <div className="wrapper-2-box-card-image">
                    <Link href="/ProductDetailPage">
                      <div className="wrapper-2-box-card-image-wrapper">
                        {(() => {
                          if (
                            item.bestsellers_count > 5 &&
                            !item.new_product &&
                            item.sale === 0
                          ) {
                            return (
                              <div
                                className="bestseller-tag"
                                style={{ top: "5%" }}
                              >
                                Bestseller
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            item.new_product &&
                            item.sale === 0
                          ) {
                            return (
                              <div
                                className="bestseller-tag"
                                style={{ top: "5%" }}
                              >
                                Bestseller
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div
                                className="bestseller-tag"
                                style={{ top: "5%" }}
                              >
                                Bestseller
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            !item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div
                                className="bestseller-tag"
                                style={{ top: "5%" }}
                              >
                                Bestseller
                              </div>
                            );
                          } else {
                            return null; // Trường hợp mặc định không thỏa mãn điều kiện
                          }
                        })()}
                        {/* new product */}
                        {(() => {
                          if (
                            item.bestsellers_count <= 5 &&
                            item.new_product &&
                            item.sale === 0
                          ) {
                            return (
                              <div
                                className="newproduct-tag"
                                style={{ top: "5%" }}
                              >
                                New
                              </div>
                            );
                          } else if (
                            item.bestsellers_count <= 5 &&
                            item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div
                                className="newproduct-tag"
                                style={{ top: "5%" }}
                              >
                                New
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            item.new_product
                          ) {
                            return (
                              <div
                                className="newproduct-tag"
                                style={{ top: "15%" }}
                              >
                                New
                              </div>
                            );
                          } else {
                            return null; // Trường hợp mặc định không thỏa mãn điều kiện
                          }
                        })()}
                        {/* sale */}
                        {(() => {
                          if (
                            item.bestsellers_count <= 5 &&
                            !item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div className="sale-tag" style={{ top: "5%" }}>
                                Sale
                              </div>
                            );
                          } else if (
                            item.bestsellers_count <= 5 &&
                            item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div className="sale-tag" style={{ top: "15%" }}>
                                Sale
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            !item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div className="sale-tag" style={{ top: "15%" }}>
                                Sale
                              </div>
                            );
                          } else if (
                            item.bestsellers_count > 5 &&
                            item.new_product &&
                            item.sale !== 0
                          ) {
                            return (
                              <div className="sale-tag" style={{ top: "25%" }}>
                                Sale
                              </div>
                            );
                          } else {
                            return null; // Trường hợp mặc định không thỏa mãn điều kiện
                          }
                        })()}

                        <img
                          src={item.imgUrl}
                          alt={item.product_name}
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="wrapper-2-box-card-title">
                    <h2>{item.product_name}</h2>
                  </div>
                  <div className="wrapper-2-box-card-buybox">
                    {item.sale !== 0 ? (
                      <p>
                        {item.sale.toLocaleString()}
                        <span>{item.price.toLocaleString()}</span>
                      </p>
                    ) : (
                      <p>{item.price.toLocaleString()}</p>
                    )}

                    <Link href="/ProductDetailPage">Thêm vào giỏ hàng</Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="wrapper-2-box-4">
              {activeButton !== 1 ? (
                <button onClick={decreaseCount}>
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
                        d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
                        fill="#0F0F0F"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              ) : (
                <button style={{ cursor: "default" }}></button>
              )}
              <div className="allproduct-pagechange">{renderButtons()}</div>
              {activeButton !== countLength + 1 ? (
                <button onClick={increaseCount}>
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
                        d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                        fill="#0F0F0F"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              ) : (
                <button style={{ cursor: "default" }}></button>
              )}
            </div>
          </div>
        </div>

        <div className="shopplace">
          <div className="instagramplace-box">
            <div className="instagramplace-box-1">
              <h1>Wobble&Play</h1>
            </div>
            <div className="instagramplace-box-2">
              <p>
                Truy cập Shopee và Tiktokshop ngay hôm nay để nhận những món quà hấp dẫn dành cho bé. 
              </p>
            </div>
            <div className="instagramplace-box-shopee">
              <Link href="https://shopee.vn/">
                <button>Shopee</button>
              </Link>
            </div>
            <div className="instagramplace-box-3">
              <Link href="https://shopee.vn/">
                <div className="instagramplace-box-3-1"></div>
              </Link>
              <Link href="https://shopee.vn/">
                <div className="instagramplace-box-3-2"></div>
              </Link>
              <Link href="https://shopee.vn/">
                <div className="instagramplace-box-3-3"></div>
              </Link>
              <Link href="https://shopee.vn/">
                <div className="instagramplace-box-3-4"></div>
              </Link>
            </div>
          </div>
          <div className="instagramplace-box">
            <div className="instagramplace-box-tiktok">
              <Link href="https://www.tiktok.com/">
                <button>Tiktokshop</button>
              </Link>
            </div>
            <div className="instagramplace-box-3">
              <Link href="https://www.tiktok.com/">
                <div className="instagramplace-box-3-1"></div>
              </Link>
              <Link href="https://www.tiktok.com/">
                <div className="instagramplace-box-3-2"></div>
              </Link>
              <Link href="https://www.tiktok.com/">
                <div className="instagramplace-box-3-3"></div>
              </Link>
              <Link href="https://www.tiktok.com/">
                <div className="instagramplace-box-3-4"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
