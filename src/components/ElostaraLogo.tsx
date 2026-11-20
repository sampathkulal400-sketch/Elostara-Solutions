import Image from "next/image";

interface ElostaraLogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function ElostaraLogo({
  variant = "dark",
  className = "h-11 w-auto",
}: ElostaraLogoProps) {
  return (
    <Image
      src="/elostara-logo.png"
      alt="Elostara Solutions"
      width={876}
      height={190}
      priority={variant === "dark"}
      className={`${variant === "light" ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
