import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant: "primary" | "secondary";
  onClick?: () => void;
};

const Button = ({ children, variant, onClick }: ButtonProps) => {
  const variantClasses = {
    primary:
      "inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all hover:opacity-90",
    secondary: "",
  };

  return (
    <button
      onClick={onClick}
      className={variantClasses[variant]}
      data-variant={variant}
    >
      {children}
    </button>
  );
};

export default Button;