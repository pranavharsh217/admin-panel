// components/ui/Toaster.jsx
import { Toaster as Sonner } from "sonner";

const Toaster = () => {
  return (
    <Sonner
      position="top-right"   // show toasts at top-right
      richColors             // enable colorful variants
      toastOptions={{
        success: { style: { background: "#6b46c1", color: "#fff" } },
        error: { style: { background: "#e53e3e", color: "#fff" } },
        info: { style: { background: "#3182ce", color: "#fff" } },
        warning: { style: { background: "#dd6b20", color: "#fff" } },
      }}
    />
  );
};

export { Toaster };
