const Input = ({ type, placeholder, className, value="", onChange = () => {} }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`input ${className}`}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;