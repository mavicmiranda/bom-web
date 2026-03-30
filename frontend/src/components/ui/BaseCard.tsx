// components/ui/BaseCard.tsx
export default function BaseCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      backdrop-blur-xl
      bg-white/10
      border border-white/10
      shadow-xl
      p-12
      rounded-2xl
      w-full
      max-w-md
    ">
      {children}
    </div>
  );
}