import ContactForm from '../components/Contact/ContactForm';

const contactInfo = [
  { label: 'Email', value: 'hello@bipinpandey.com', href: 'mailto:hello@bipinpandey.com' },
  { label: 'GitHub', value: 'github.com/bipinpandey', href: 'https://github.com/bipinpandey' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/bipinpandey',
    href: 'https://linkedin.com/in/bipinpandey',
  },
];

const Contact = () => (
  <div className="mx-auto max-w-6xl px-6 py-20">
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      {/* Left: intro + info */}
      <div className="flex flex-col gap-8">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-[#0078D4]">
            Contact
          </span>
          <h1 className="mt-2 text-4xl font-semibold text-[#1F1F1F]">Let's work together</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Have a project in mind, a question, or just want to say hi? Drop a message and
            I'll get back to you as soon as I can.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {contactInfo.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="group flex flex-col rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-[#0078D4]/40 hover:shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {item.label}
              </span>
              <span className="mt-1 font-medium text-[#1F1F1F] transition-colors group-hover:text-[#0078D4]">
                {item.value}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Right: form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <ContactForm />
      </div>
    </div>
  </div>
);

export default Contact;
