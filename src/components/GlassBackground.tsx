import { useGlass } from "@/contexts/GlassContext";

export const GlassBackground = () => {
  const { glassEnabled } = useGlass();

  if (!glassEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="liquid-blob liquid-blob-1" />
      <div className="liquid-blob liquid-blob-2" />
      <div className="liquid-blob liquid-blob-3" />
    </div>
  );
};
