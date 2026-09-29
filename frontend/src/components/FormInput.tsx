interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  containerClassName?: string;
}

const FormInput = ({ id, label, containerClassName, ...props }: FormInputProps) => {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="mb-2 text-sm font-medium block text-gray-700">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full px-4 py-2 text-sm font-medium outline-none border border-gray-300 rounded-lg transition-colors duration-200 focus:border-gray-700"
      />
    </div>
  );
};

export default FormInput;
