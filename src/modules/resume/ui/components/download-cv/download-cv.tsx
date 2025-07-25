/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios, { AxiosError } from "axios";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export const DownloadCv = () => {
    const submit = useRef(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/resume/download-file", { token });

            const url = URL.createObjectURL(new Blob([response.data]));

            const a = document.createElement("a");
            a.href = url;
            a.download = "satyaprakash-resume.pdf";

            // Hide the element
            a.style.display = "none";

            // Trigger the download
            document.body.appendChild(a);
            a.click();

            // Clean up the element
            document.body.removeChild(a);

            // Release the object URL
            URL.revokeObjectURL(url);
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data.error) {
                setError(error.response.data.error)
                toast.error("Something went wrong!")
            }
        } finally {
            setLoading(false);
        }
    }, [setLoading, toast, token]);

    useEffect(() => {
        if (!submit.current) {
            submit.current = true;
            onSubmit();
        }
    }, [onSubmit]);

    return (
        <div className="w-full flex flex-col items-center justify-center py-10">
            {loading && (
                <>
                    <BeatLoader />
                    <p className="mt-3 font-medium text-center">
                        Your download will start shortly. Please wait.
                    </p>
                </>
            )}
            {!loading && !error && (
                <p className="font-medium text-center">
                    Download started. Thank you! If download fails, click{" "}
                    <button
                        type="button"
                        className="underline underline-offset-2 hover:opacity-80"
                        onClick={() => location.reload()}
                    >
                        here
                    </button>{" "}
                    or manually refresh page.
                </p>
            )}
            {!loading && error && (
                <div className="bg-destructive/15 dark:bg-destructive/30 p-3 rounded-md flex items-center space-x-2 text-xs md:text-sm text-destructive dark:text-red-400">
                    <div className="size-5">
                        <ExclamationTriangleIcon className="size-5" />
                    </div>
                    <p>{error}</p>
                </div>
            )}
        </div>
    )
}
