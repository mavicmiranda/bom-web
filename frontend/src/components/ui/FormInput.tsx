interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormInput({ label, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <label className="text-xs text-white/60">{label}</label>

      <input
        className="
          px-4 py-2
          rounded-lg
          bg-white/5
          border border-white/10
          text-white
          placeholder:text-white/40
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500/40
          transition
        "
        {...props}
      />
    </div>
  );
}