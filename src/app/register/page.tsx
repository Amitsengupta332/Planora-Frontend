import { RegisterForm } from "@/components/modules/auth/register/RegisterForm";

function RegisterPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="min-h-[80vh] flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
