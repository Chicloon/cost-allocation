import { type Config } from "tailwindcss";

import withMT from "@material-tailwind/react/utils/withMT";
import theme, { fontFamily } from "tailwindcss/defaultTheme";

export default withMT({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "forest", "emerald", "corporate", "synthwave"],
  },
} satisfies Config) as Config;
