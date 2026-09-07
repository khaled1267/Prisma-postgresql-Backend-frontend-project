"use client";

import { useRouter } from "next/navigation";
import PageContainer from "@/components/ui/PageContainer";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();

  const handleSuccessRedirect = () => {
    router.push("/login");
  };

  return (
    <PageContainer maxWidth="md" className="py-12 flex items-center justify-center">
      <RegisterForm onSuccessRedirect={handleSuccessRedirect} />
    </PageContainer>
  );
}
