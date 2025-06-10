import { Suspense } from "react";
import ProxyClient from "./client";

export default function ProxyPage(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProxyClient/>
    </Suspense>
)
}