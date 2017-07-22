console.log('So HUIOSOs');

class HuesoDisconnectedError extends Error {}

async function sleep(seconds) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function mockConfirmDialog() {
  document.addEventListener('DOMContentLoaded', function() {
     const head = document.getElementsByTagName('head').item(0);
    const js = document.createTextNode('window.confirm = function() { return true; };');
    const script = document.createElement('script');
    script.appendChild(js);
    head.appendChild(script);
  });
}

function waitForElementInsertion() {
  return new Promise((resolve) => {
    document.addEventListener('DOMNodeInserted', function (event) {
      document.removeEventListener('DOMNodeInserted', this);
      resolve(event.target);
    });
  });
}

async function waitForNewBlock() {
  while (true) {
    await waitForElementInsertion();
    if (!!document.querySelector('.window_chat_statuss')) {
      const sendButton = document.getElementById('sendMessageBtn');
      if (sendButton.classList.contains('disabled')) {
        throw new HuesoDisconnectedError();
      }
      return;
    }
  }
}

async function onlySend(timelag, ...messages) {
  const message = messages[Math.floor(Math.random() * messages.length)];
  const sendButton = document.getElementById('sendMessageBtn');
  if (sendButton.classList.contains('disabled')) {
    throw new BlockDisconnectedError();
  } else {
    const inputDiv = document.querySelector('.emojionearea-editor');
    await sleep(timelag);
    inputDiv.innerHTML = message;
    sendButton.click();
  }
}

async function waitForResponse() {
  const element = await waitForElementInsertion();
  if (element.classList.contains('window_chat_dialog_block_nekto')) {
    return element.querySelector('.window_chat_dialog_text').textContent;
  }
}

function normalizeResponse(response) {
  return response
  .toLowerCase()
  .trim()
  .replace(/\.+/g, '');
}

async function send(timelag, ...messages) {
  await onlySend(timelag, ...messages);
  const response = normalizeResponse(await waitForResponse());
  console.log(response);
  return response;
}

function check(string, ...includes) {
  return Array.prototype.slice.call(includes).some((s) => string.includes(s));
}

function disconnect() {
  const sendButton = document.getElementById('sendMessageBtn');
  if (sendButton.classList.contains('disabled')) {
    return;
  } else {
    document.getElementById('closeDialogBtn').click();
  }
}

function startNew() {
  document.getElementById('new_talk_but').click();
}

async function main() {
  while (true) {
    try {
      await waitForNewBlock();
      console.log('Start mining new hueso');

      let response;
      response = await send(2, '1:0 сможешь решить?', '1/0 сколько будет?', '1 на 0 сможешь разделить?');

      huesosAnswer = (r) => check(r, 'ноль', 'нуль', 'один', 'бесконечность', '0', '1');
      schoolboyAnswer = (r) => check(r, 'не делит', 'нельзя');

      if (!huesosAnswer(response) && !schoolboyAnswer(response)) {
        response = await send(2.5, 'так можешь?')
      }
      if (schoolboyAnswer(response)) {
        response = await send(1, 'мамка запретила?', 'а че так вдруг нельзя? мамка запретила?');
      }
      if (huesosAnswer(response)) {
        await onlySend(2, response + '?');
        response = await send(1, 'ты че, совсем тупой?');
      }

      await onlySend(4, 'в скайпе не зассышь базарить?', 'в скайпе базарить не зассышь?');
      if (Math.random() < 0.5) {
        await onlySend(1.5, 'добавляйся');
      }
      await onlySend(3, 'lera.lera872');
      await sleep(20);

      disconnect();
      startNew();
    } catch (e) {
      if (e instanceof HuesoDisconnectedError) {
        console.log('Hueso disconnected');
        startNew();
      }
    }
  }
}


mockConfirmDialog();
main();
