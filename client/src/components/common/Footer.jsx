const socials = [
  { label: 'GitHub', href: 'https://github.com/Subaskathayat' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/subaskathayat' },
  { label: 'X', href: 'https://x.com/SubasKathayat' },
];

const Footer = () => (
  <footer className="border-t border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-500">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4">
      <div className="flex gap-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-900"
          >
            {s.label}
          </a>
        ))}
      </div>
      <p>© {new Date().getFullYear()} Subas Kathayat — Software Engineer from Nepal</p>
    </div>
  </footer>
);

export default Footer;
