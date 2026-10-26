"use client";

import { useEffect } from "react";

export default function AntiCopy() {

  useEffect(() => {

    const editable = (el: HTMLElement | null) => {
      if (!el) return false;

      const tag = (el.tagName || "").toLowerCase();

      return (
        tag === "input" ||
        tag === "textarea" ||
        el.isContentEditable
      );
    };

    const onContext = (e: Event) => {
      if (!editable(e.target as HTMLElement | null))
        e.preventDefault();
    };

    const onCopy = (e: ClipboardEvent) => {
      if (!editable(e.target as HTMLElement | null))
        e.preventDefault();
    };

    const onCut = (e: ClipboardEvent) => {
      if (!editable(e.target as HTMLElement | null))
        e.preventDefault();
    };

    const onSelect = (e: Event) => {
      if (!editable(e.target as HTMLElement | null))
        e.preventDefault();
    };

    const onDrag = (e: DragEvent) => {
      e.preventDefault();
    };

    const onKey = (e: KeyboardEvent) => {

      if (editable(e.target as HTMLElement | null))
        return;

      const k = e.key.toLowerCase();

      if (
        e.key === "F12" ||
        (e.ctrlKey && ["a","c","u","s","p"].includes(k)) ||
        (e.ctrlKey && e.shiftKey && ["i","j","c"].includes(k))
      ){
        e.preventDefault();
      }

    };

    document.addEventListener("contextmenu",onContext);
    document.addEventListener("copy",onCopy);
    document.addEventListener("cut",onCut);
    document.addEventListener("selectstart",onSelect);
    document.addEventListener("dragstart",onDrag);
    document.addEventListener("keydown",onKey);

    return ()=>{

      document.removeEventListener("contextmenu",onContext);
      document.removeEventListener("copy",onCopy);
      document.removeEventListener("cut",onCut);
      document.removeEventListener("selectstart",onSelect);
      document.removeEventListener("dragstart",onDrag);
      document.removeEventListener("keydown",onKey);

    };

  },[]);

  return null;

}
