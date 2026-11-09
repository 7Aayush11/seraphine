import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplitText from '../components/ui/SplitText';
import MagneticButton from '../components/ui/MagneticButton';

const topics = ['General enquiry', 'Order support', 'Press', 'Wholesale'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: topics[0], message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Please enter your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Please enter a valid email';
    if (form.message.trim().length < 10) er.message = 'Tell us a little more (10+ characters)';
    setErrors(er);
    if (!Object.keys(er).length) setSent(true);
  };

  return (
    <div className="inner contact-page">
      <header className="page-head">
        <p className="eyebrow">Contact</p>
        <SplitText as="h1" italicWords={['touch']}>Get in touch.</SplitText>
        <p className="lead">Questions about a fragrance, an order or a collaboration? We read every message.</p>
      </header>
      <div className="contact-grid">
        <div className="contact-side">
          <div><h4>Atelier</h4><p>12 Rue Imaginaire<br />Concept City</p></div>
          <div><h4>Email</h4><p>hello@seraphine.example</p></div>
          <div><h4>Hours</h4><p>Mon – Sat · 10:00 – 18:00</p></div>
          <small>All details on this page are fictional.</small>
        </div>
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="ok" className="contact-ok" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h3>Thank you, {form.name.split(' ')[0]}.</h3>
              <p>Your message has been received (demo form — nothing is actually sent).</p>
              <MagneticButton onClick={() => { setSent(false); setForm({ name: '', email: '', topic: topics[0], message: '' }); }} variant="ghost">Send another</MagneticButton>
            </motion.div>
          ) : (
            <motion.form key="form" className="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <label className={errors.name ? 'err' : ''}><span>Name</span><input value={form.name} onChange={set('name')} placeholder="Your name" /><em>{errors.name}</em></label>
              <label className={errors.email ? 'err' : ''}><span>Email</span><input type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" /><em>{errors.email}</em></label>
              <label><span>Topic</span><select value={form.topic} onChange={set('topic')}>{topics.map((t) => <option key={t}>{t}</option>)}</select></label>
              <label className={errors.message ? 'err' : ''}><span>Message</span><textarea rows="5" value={form.message} onChange={set('message')} placeholder="How can we help?" /><em>{errors.message}</em></label>
              <MagneticButton type="submit">Send message</MagneticButton>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
