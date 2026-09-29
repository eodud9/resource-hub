interface FormInputProps {
  id: string;
  label: string;
  type: "email" | "text" | "password";
  value: string;
  placeholder: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ id, label, type, value, placeholder, className, onChange }: FormInputProps) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium block text-gray-700">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        required
        className="mt-2 w-full px-4 py-2 outline-none border border-gray-300 rounded-lg transition-colors duration-200 focus:border-gray-700"
      />
    </div>
  );
};

export default FormInput;
