export default function Logo({ className = "w-48", darkText = true }) {
    // Warna teks menyesuaikan apakah logo ditaruh di background terang atau gelap
    const textColor = darkText ? "#17352A" : "#FFFFFF";

    return (
        <svg viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Ikon Geometris Daun / Keranjang Pasar */}
            <rect x="0" y="10" width="60" height="60" rx="16" fill="#17352A" />
            <path d="M18 40C18 28.9543 26.9543 20 38 20V40H18Z" fill="#E3963A" />
            <path d="M42 60C42 48.9543 33.0457 40 22 40V60H42Z" fill="#F2C46D" />

            {/* Tipografi "ORO ORO" */}
            <text
                x="76" y="44"
                fill={textColor}
                fontFamily="Fraunces, serif"
                fontWeight="800"
                fontSize="32"
                letterSpacing="0.02em"
            >
                ORO ORO
            </text>

            {/* Tipografi "DOWO" */}
            <text
                x="78" y="66"
                fill="#E3963A"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
                fontSize="17"
                letterSpacing="0.35em"
            >
                DOWO
            </text>
        </svg>
    );
}