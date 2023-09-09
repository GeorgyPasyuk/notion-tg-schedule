export function splitMessage(message, maxLength) {
  const messages = [];
  let currentMessage = '';

  for (const line of message.split('\n')) {
    if (currentMessage.length + line.length + 1 <= maxLength) {
      currentMessage += (currentMessage.length > 0 ? '\n' : '') + line;
    } else {
      messages.push(currentMessage);
      currentMessage = line;
    }
  }

  if (currentMessage.length > 0) {
    messages.push(currentMessage);
  }

  return messages;
}
