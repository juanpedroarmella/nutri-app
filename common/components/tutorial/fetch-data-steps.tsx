import { TutorialStep } from "./tutorial-step";
import { CodeBlock } from "./code-block";

const create = `create table notes (
  id bigserial primary key,
  title text
);

insert into notes(title)
values
  ('Today I created a Supabase project.'),
  ('I added some data and queried it from Next.js.'),
  ('It was awesome!');
`.trim();

const server = `import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const { data: notes } = await supabase.from('notes').select()

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

const client = `'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

export default function FetchDataSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Create some tables and insert some data">
        <p>
          Ve a la{" "}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            Editor de tablas
          </a>{" "}
          para tu proyecto de Supabase para crear una tabla y insertar algunos
          datos de ejemplo. Si no tienes creatividad, puedes copiar y pegar lo
          siguiente en el{" "}
          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            SQL Editor
          </a>{" "}
          y haz clic en Ejecutar!
        </p>
        <CodeBlock code={create} />
      </TutorialStep>

      <TutorialStep title="Consultar datos de Supabase desde Next.js">
        <p>
          Para crear un cliente de Supabase y consultar datos desde un componente
          de servidor asíncrono, crea un nuevo archivo page.tsx en{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            /app/notes/page.tsx
          </span>{" "}
          y añade lo siguiente.
        </p>
        <CodeBlock code={server} />
        <p>O bien, puedes usar un componente de cliente.</p>
        <CodeBlock code={client} />
      </TutorialStep>

      <TutorialStep title="¡Construye en un fin de semana y escala a millones!">
        <p>¡Estás listo para lanzar tu producto al mundo! 🚀</p>
      </TutorialStep>
    </ol>
  );
}
