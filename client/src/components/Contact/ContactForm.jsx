import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { sendMessage } from '../../services/messageService';

const schema = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string().trim().email('Invalid email').required('Email is required'),
  subject: Yup.string().trim().required('Subject is required'),
  message: Yup.string().trim().required('Message is required'),
});

const fields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'subject', label: 'Subject', type: 'text' },
];

const ContactForm = () => {
  const formik = useFormik({
    initialValues: { name: '', email: '', subject: '', message: '' },
    validationSchema: schema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await sendMessage(values);
        toast.success('Message sent successfully!');
        resetForm();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to send message');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mx-auto flex max-w-md flex-col gap-4">
      {fields.map((field) => (
        <div key={field.name} className="text-left">
          <label htmlFor={field.name} className="mb-1 block text-sm text-slate-600">
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={formik.values[field.name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 transition-colors focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4] focus:outline-none"
          />
          {formik.touched[field.name] && formik.errors[field.name] && (
            <p className="mt-1 text-xs text-red-600">{formik.errors[field.name]}</p>
          )}
        </div>
      ))}
      <div className="text-left">
        <label htmlFor="message" className="mb-1 block text-sm text-slate-600">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 transition-colors focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4] focus:outline-none"
        />
        {formik.touched.message && formik.errors.message && (
          <p className="mt-1 text-xs text-red-600">{formik.errors.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="rounded bg-[#0078D4] px-4 py-2 font-medium text-white shadow-sm transition-all hover:bg-[#106EBE] hover:shadow-md disabled:opacity-50"
      >
        {formik.isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
