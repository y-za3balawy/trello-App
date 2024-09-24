"use client";

import { useEffect, useState } from "react";
import { CardModel } from './../modals/card-model/index';
import ProModal from "../modals/card-model/pro-modal";


export const ModalProvider = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CardModel />
      <ProModal/>
    </>
  );
};