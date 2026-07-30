"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityProvider() {
  useEffect(() => {
    Clarity.init("xungdx7vmr");
  }, []);

  return null;
}
