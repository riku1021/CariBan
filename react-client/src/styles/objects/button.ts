import { cva } from "@/styled-system/css";

export const button = cva({
  base: {
    display: "inline-block",
    textDecoration: "none",
    fontWeight: "medium",
    borderWidth: "0",
    cursor: "pointer",
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      primary: {
        paddingBlock: "0.5rem",
        paddingInline: "1.25rem",
        backgroundColor: "brand.primary.main",
        color: "white",
        borderRadius: "50px",
        boxShadow: "0 2px 4px {colors.shadow.primary}",
        _hover: {
          backgroundColor: "brand.primary.dark",
          boxShadow: "0 4px 8px {colors.shadow.primary}",
        },
      },
      secondary: {
        paddingBlock: "0.5rem",
        paddingInline: "1.25rem",
        backgroundColor: "background.sub",
        color: "brand.primary.main",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "brand.primary.main",
        borderRadius: "50px",
        boxShadow: "0 2px 4px {colors.shadow.primary}",
        _hover: {
          backgroundColor: "background.main",
          boxShadow: "0 4px 8px {colors.shadow.primary}",
        },
      },
      normal: {
        paddingBlock: "0.5rem",
        paddingInline: "1.25rem",
        backgroundColor: "brand.primary.main",
        color: "white",
        borderRadius: "50px",
        boxShadow: "0 2px 4px {colors.shadow.primary}",
        _hover: {
          backgroundColor: "brand.primary.dark",
          boxShadow: "0 4px 8px {colors.shadow.primary}",
        },
      },
      text: {
        paddingBlock: "0.5rem",
        paddingInline: "1rem",
        backgroundColor: "transparent",
        color: "brand.primary.main",
        borderRadius: "50px",
        _hover: {
          color: "brand.primary.dark",
          textDecoration: "underline",
        },
      },
    },
    size: {
      small: {
        paddingBlock: "0.5rem",
        paddingInline: "1.5rem",
        fontSize: "0.875rem",
      },
      medium: {
        paddingBlock: "0.5rem",
        paddingInline: "1.25rem",
        fontSize: "1rem",
      },
      large: {
        paddingBlock: "1rem",
        paddingInline: "2.5rem",
        fontSize: "1.125rem",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});
