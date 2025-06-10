interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
