import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/common/components/form-message";
import { SubmitButton } from "@/common/components/submit-button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Restablecer contraseña</h1>
      <p className="text-sm text-foreground/60">
        Por favor, introduce tu nueva contraseña a continuación.
      </p>
      <Label htmlFor="password">Nueva contraseña</Label>
      <Input
        type="password"
        name="password"
        placeholder="Nueva contraseña"
        required
      />
      <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <SubmitButton formAction={resetPasswordAction}>
        Restablecer contraseña
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
