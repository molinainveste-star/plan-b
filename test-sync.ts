import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

(async () => {
    try {
        console.log("🔄 Importing actions...");
        const { updateYouTubeMetrics } = await import("./src/lib/actions");

        // Mock params
        const slug = "TheNoite";
        const handle = "@TheNoite";

        console.log(`🧪 Testing updateYouTubeMetrics for ${handle}...`);

        await updateYouTubeMetrics(slug, handle);
        console.log("✅ Sync function returned.");
    } catch (err: any) {
        console.error("❌ Test Script Error:", err.message);
        console.error(err);
    }
})();
