"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { careStore } from "../stores";
import type { AppStore } from "../stores";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = careStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
