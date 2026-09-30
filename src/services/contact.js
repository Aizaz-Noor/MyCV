const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(formData) {
  const values = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    subject: String(formData.get('subject') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
    botcheck: Boolean(formData.get('botcheck')),
  };
  const errors = {};
  if (!values.name) errors.name = 'Enter your name.';
  if (!values.email) errors.email = 'Enter your email.';
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Enter a valid email address.';
  if (!values.subject) errors.subject = 'Enter a subject.';
  if (!values.message) errors.message = 'Enter a message.';
  return { values, errors };
}

export async function sendContact(values, accessKey, fetcher = fetch, timeoutMs = 12000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...values, access_key: accessKey }),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.success !== true) {
      throw new Error('The message could not be delivered. Please try again or email me directly.');
    }
    return result;
  } finally {
    clearTimeout(timeout);
  }
}
