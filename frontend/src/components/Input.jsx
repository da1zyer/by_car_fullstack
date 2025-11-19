const Input = ({ type, placeholder, className }) => {
  return (
    <input
        type={type}
        placeholder={placeholder}
        className={`input ${className}`}
    />
  );
};

export default Input;