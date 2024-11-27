import { TutorialStep } from "./tutorial-step";

export default function ConnectSupabaseSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Create Supabase project">
        <p>
          Ve a{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
          >
            database.new
          </a>{" "}
          y crea un nuevo proyecto de Supabase.
        </p>
      </TutorialStep>

      <TutorialStep title="Declare environment variables">
        <p>
          Renombra el archivo{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            .env.example
          </span>{" "}
          en tu aplicación Next.js a{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            .env.local
          </span>{" "}
          y rellena con los valores de{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
          >
            tu proyecto de Supabase
          </a>
          .
        </p>
      </TutorialStep>

      <TutorialStep title="Restart your Next.js development server">
        <p>
          Es posible que necesites cerrar tu servidor de desarrollo de Next.js y
          volver a ejecutar{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            npm run dev
          </span>{" "}
          de nuevo para cargar las nuevas variables de entorno.
        </p>
      </TutorialStep>

      <TutorialStep title="Refresh the page">
        <p>
          Es posible que necesites actualizar la página para que Next.js cargue las
          nuevas variables de entorno.
        </p>
      </TutorialStep>
    </ol>
  );
}
