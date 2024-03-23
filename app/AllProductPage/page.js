"use client"
import { getAllData } from "../../services/firebase";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { saveArrayData } from "../GlobalRedux/features/counter/dataSlice";
import React from "react";
import { checkData } from "../GlobalRedux/features/counter/dataCheckSlice";

export default function AllProductPage() {
  const count = useSelector((state) => state.counter.value);
  const checkDataFlag = useSelector((state) => state.check.value);
  const dispatch = useDispatch();



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
    if(!checkDataFlag){
      fetchData(); 
    }
  }, []);
  return (
    <>
      
      AllProductPage
    </>
  );
}
