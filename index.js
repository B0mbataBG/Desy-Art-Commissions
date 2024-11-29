function copyDiscordProfile() {
    // Copy the Discord name to the clipboard
    navigator.clipboard.writeText("muciduci5");

    // Change the hover text to "Copied"
    document.getElementById("copyHintText").textContent = "Copied";

    // Optionally, you can change it back to "Copy To Clipboard" after a short delay
    setTimeout(function() {
        document.getElementById("copyHintText").textContent = "Copy To Clipboard";
    }, 2000); // 2000 ms = 2 seconds
}