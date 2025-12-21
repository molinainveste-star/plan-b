"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestDB() {
    const [status, setStatus] = useState<string>("Testing connection...");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function checkConnection() {
            try {
                const { data, error } = await supabase.from("profiles").select("count");

                if (error) {
                    throw error;
                }

                setStatus("✅ Connection Successful! Tables found.");
            } catch (err: any) {
                setStatus("❌ Connection Failed");
                setError(err.message || "Unknown error");
            }
        }

        checkConnection();
    }, []);

    return (
        <div style={{ padding: "2rem", color: "white", minHeight: "100vh", background: "#000" }}>
            <h1>Supabase Connection Test</h1>
            <p style={{ fontSize: "1.5rem", margin: "1rem 0" }}>{status}</p>
            {error && (
                <div style={{ padding: "1rem", background: "#330000", border: "1px solid red", borderRadius: "0.5rem" }}>
                    <strong>Error Details:</strong>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
