import React from "react";

const VARIANT_CLASSES = {
  primary:
    "bg-[#171717] text-white border border-[#171717] hover:bg-[#2d2d2d] hover:border-[#2d2d2d] active:scale-[0.985]",
  secondary:
    "bg-white text-[#202020] border border-[#DFDFDC] hover:border-[#202020] hover:bg-[#F5F5F3] active:scale-[0.985]",
  subtle:
    "bg-[#F5F5F3] text-[#202020] border border-[#EAEAEA] hover:bg-[#E8E8E8] hover:border-[#D6D6D2] active:scale-[0.985]",
  ghost:
    "bg-transparent text-[#202020] border border-transparent hover:text-[#555555] underline-offset-4 hover:underline px-1",
};

const SIZE_CLASSES = {
  sm: "text-[13px] px-4 py-2 gap-1.5",
  md: "text-[14px] px-6 py-3 gap-2",
  lg: "text-[14.5px] px-7 py-3.5 gap-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  icon: Icon,
  iconPosition = "right",
  ariaLabel,
  ...rest
}) {
  const baseClasses = [
    "group inline-flex items-center justify-center rounded-full font-medium tracking-[-0.01em] transition-all duration-300 cursor-pointer select-none",
    variant !== "ghost" ? SIZE_CLASSES[size] : "text-[14px] py-2 gap-2",
    VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary,
    disabled ? "opacity-55 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon
          className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
      {Icon && iconPosition === "right" && (
        <Icon
          className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={baseClasses}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={baseClasses}
      {...rest}
    >
      {content}
    </button>
  );
}
