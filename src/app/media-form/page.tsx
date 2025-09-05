"use client";
import React from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

export default function App() {
  return (
    <div>
        <h1>Uploadcare React Uploader Example</h1>
      {/* change the pubkey value to your public key from project settings */}
      <FileUploaderRegular
        // pubkey="2b7f257e8ea0817ba746"
        pubkey="b7d8962491600a2f7bf3"
        classNameUploader="uc-light"
      />
    </div>
  );
}
