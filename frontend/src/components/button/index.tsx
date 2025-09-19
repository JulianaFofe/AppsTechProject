interface ButtonProps {
  title: string;
  className?: string;
}

const Button = ({ title, className }: ButtonProps) => {
  return <button className={className}>{title}</button>;
};

export default Button;
