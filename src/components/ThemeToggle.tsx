interface ThemeToggleProps {
  isNightMode: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isNightMode, onToggle }: ThemeToggleProps) {
  return (
    <button
      aria-label={isNightMode ? 'Switch to day mode' : 'Switch to night mode'}
      aria-pressed={isNightMode}
      className="inline-flex items-center gap-2 min-h-[38px] px-3 border rounded-none font-extrabold text-sm transition-colors duration-200
        border-white/18 bg-white/8 text-white/78
        hover:border-current hover:text-white
        [.theme-day_&]:border-[rgba(21,21,27,0.14)] [.theme-day_&]:bg-[rgba(255,255,255,0.62)] [.theme-day_&]:text-[rgba(21,21,27,0.72)] [.theme-day_&]:hover:text-[#15151b]
      "
      onClick={onToggle}
      type="button"
    >
      <span
        aria-hidden="true"
        className="block w-[18px] h-[18px] border-2 rounded-none bg-current
          shadow-[inset_-6px_0_0_rgba(7,8,13,0.72)]
          [.theme-day_&]:shadow-[inset_0_0_0_5px_#fff8e8]
        "
      />
      {isNightMode ? 'Night' : 'Light'}
    </button>
  );
}
