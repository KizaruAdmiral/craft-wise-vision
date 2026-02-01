export function AbstractBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top right curves */}
      <svg
        className="absolute -top-20 -right-20 w-[600px] h-[600px] opacity-[0.04]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 350C50 200 150 100 300 50"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M80 380C80 220 180 120 340 70"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M20 320C20 180 120 80 260 30"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="300" cy="50" r="3" fill="hsl(var(--primary))" />
        <circle cx="340" cy="70" r="2" fill="hsl(var(--accent))" />
      </svg>

      {/* Bottom left curves */}
      <svg
        className="absolute -bottom-32 -left-32 w-[700px] h-[700px] opacity-[0.03]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M350 50C350 200 250 300 100 350"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M380 80C380 240 280 340 120 390"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M320 20C320 170 220 270 70 320"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="100" cy="350" r="4" fill="hsl(var(--primary))" />
        <circle cx="70" cy="320" r="2" fill="hsl(var(--accent))" />
      </svg>

      {/* Middle flowing lines */}
      <svg
        className="absolute top-1/3 left-1/4 w-[800px] h-[400px] opacity-[0.02]"
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 200C100 150 200 250 300 200C400 150 500 250 600 200C700 150 800 250 800 200"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M0 220C100 170 200 270 300 220C400 170 500 270 600 220C700 170 800 270 800 220"
          stroke="hsl(var(--accent))"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </svg>

      {/* Right side vertical curve */}
      <svg
        className="absolute top-1/4 -right-10 w-[300px] h-[600px] opacity-[0.03]"
        viewBox="0 0 200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M150 0C100 100 100 200 150 300C200 400 100 500 150 600"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M180 0C130 100 130 200 180 300C230 400 130 500 180 600"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* Scattered dots */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="150" cy="200" r="2" fill="hsl(var(--primary))" />
        <circle cx="850" cy="300" r="2.5" fill="hsl(var(--accent))" />
        <circle cx="200" cy="700" r="1.5" fill="hsl(var(--primary))" />
        <circle cx="750" cy="800" r="2" fill="hsl(var(--primary))" />
        <circle cx="500" cy="150" r="1.5" fill="hsl(var(--accent))" />
        <circle cx="600" cy="500" r="2" fill="hsl(var(--primary))" />
        <circle cx="100" cy="450" r="1" fill="hsl(var(--accent))" />
        <circle cx="900" cy="600" r="1.5" fill="hsl(var(--primary))" />
      </svg>
    </div>
  );
}
