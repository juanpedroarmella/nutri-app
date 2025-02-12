export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 items-center w-full justify-center mt-5 px-2">{children}</div>
  );
}
