import React from "react";
import RegisterForm from "../organisms/Forms/RegisterForm";
import PublicLayout from "../templates/PublicLayout";

export default function RegisterPage({ history: { push } }) {
  return (
    <PublicLayout>
      <RegisterForm history={push} />
    </PublicLayout>
  );
}
