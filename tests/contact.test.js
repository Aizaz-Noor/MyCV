import test from 'node:test';
import assert from 'node:assert/strict';
import { sendContact, validateContact } from '../src/services/contact.js';

function form(fields) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

test('contact validation rejects whitespace and malformed email', () => {
  const { errors } = validateContact(form({ name: '  ', email: 'not-an-email', subject: '\n', message: ' ' }));
  assert.deepEqual(Object.keys(errors), ['name', 'email', 'subject', 'message']);
});

test('contact validation trims a valid submission and carries the bot check', () => {
  const { values, errors } = validateContact(form({
    name: ' Aizaz ', email: ' person@example.com ', subject: ' Hello ', message: ' Message ', botcheck: '',
  }));
  assert.deepEqual(errors, {});
  assert.deepEqual(values, {
    name: 'Aizaz', email: 'person@example.com', subject: 'Hello', message: 'Message', botcheck: false,
  });
});

test('contact submission accepts only an explicit provider success', async () => {
  let sent;
  const fetcher = async (_url, options) => {
    sent = JSON.parse(options.body);
    return { ok: true, json: async () => ({ success: true }) };
  };
  await sendContact({ name: 'A', email: 'a@example.com', subject: 'Hi', message: 'Hello' }, 'public-key', fetcher);
  assert.equal(sent.access_key, 'public-key');
  await assert.rejects(() => sendContact({}, 'key', async () => ({ ok: true, json: async () => ({ success: false }) })), /could not be delivered/);
});

test('contact submission aborts a stalled request', async () => {
  const fetcher = (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
  });
  await assert.rejects(() => sendContact({}, 'key', fetcher, 5), { name: 'AbortError' });
});
