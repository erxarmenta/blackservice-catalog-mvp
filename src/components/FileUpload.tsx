"use client";
import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload } from "@imagekit/next";
import { useRef, useState } from "react";

export default function FileUpload() {
    const [process, setProcess] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const abortController = new AbortController();

    const authenticator = async () => {
        try {

        } catch (error) {

        }
    }

}
