import './Input.scss';

function Input({
  label,
  type,
  customClass,
  name,
  handleChange,
  defaultValue,
  disabled,
  ...props
}) {
  return (
    <section className='input'>
      <label className='input__label'>{label}</label>
      <input
        type={type}
        className={`input__field ${customClass ? customClass : ''}`}
        name={name}
        {...props}
        onChange={handleChange}
        defaultValue={defaultValue ? defaultValue : ''}
        disabled={disabled}
      />
    </section>
  );
}

export default Input;
