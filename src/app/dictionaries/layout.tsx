import { NavButton } from "../_components/navbutton";
import { routes } from "./routes";
import { routes as rootRoutes } from "../routes";

export default function DictionariesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <nav className="navbar flex w-auto shrink flex-col  bg-blue-gray-50 [&>a]:mb-2 [&>a]:w-full">
        {Object.values(routes).map((el) => (
          <NavButton key={el.href} href={`/${rootRoutes.dictionaries.href}/${el.href}`} name={el.title} />
        ))}
      </nav>
      <div> Content {children}</div>
    </div>
  );
}
