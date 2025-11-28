export default function Switch({
  value,
  onChange,
  disabled,
}: {
  value: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!Boolean(value))}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
        value ? "bg-primary" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
