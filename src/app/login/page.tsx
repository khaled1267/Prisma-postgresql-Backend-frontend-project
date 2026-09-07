"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageContainer from "@/components/ui/PageContainer";
import LoginForm from "@/components/auth/LoginForm";
import LoadingComponent from "@/components/common/LoadingComponent";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");

  const handleSuccessRedirect = () => {
    const targetUrl = redirectParam ? decodeURIComponent(redirectParam) : "/";
    router.push(targetUrl);
  };

  return <LoginForm onSuccessRedirect={handleSuccessRedirect} />;
}

export default function LoginPage() {
  return (
    <PageContainer maxWidth="md" className="py-12 flex items-center justify-center">
      <Suspense fallback={<LoadingComponent message="Loading login portal..." />}>
        <LoginContent />
      </Suspense>
    </PageContainer>
  );
}
