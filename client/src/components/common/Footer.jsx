const socials = [
  { label: 'GitHub', href: 'https://github.com/bipinpandey' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/bipinpandey' },
  { label: 'X', href: 'https://x.com/bipinpandey' },
];

const Footer = () => (
  <footer className="border-t border-slate-200 bg-[#F3F3F3] py-8 text-center text-sm text-slate-500">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4">
      <div className="flex gap-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0078D4]"
          >
            {s.label}
          </a>
        ))}
      </div>
      <p>© 2024 Bipin Pandey. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
