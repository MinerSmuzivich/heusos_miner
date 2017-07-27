import {check, onlySend, sleep} from "../controls";

export async function devideByZero(messenger) {
    let response;
    response = await messenger.send('1:0 сможешь решить?', '1/0 сколько будет?', '1 на 0 сможешь разделить?');

    const huisosAnswer = (r) => check(r, 'ноль', 'нуль', 'один', 'бесконечн', '0', '1');
    const schoolboyAnswer = (r) => check(r, 'не делит', 'нельзя');
    const yesAnswer = (r) => ['да', 'могу', 'конечн', 'конеш'].includes(r);
    const drocherAnswer = (r) => check(r, 'хуй', 'дроч', 'стоит', 'конч', 'член', 'шлюх', 'пошал', 'сладен', 'секс');
    const otherAnswers = (r) => ['не', 'нет'].includes(r) || check(r, 'гуман', 'лет', 'сколько тебе');

    if (check(response, 'лет', 'сколько тебе')) {
        await messenger.send('мне 27');
        response = await messenger.send('так можешь?', 'так ты можешь разделить?');
    }

    if (yesAnswer(response)) {
        response = await messenger.send('так давай, моги');
        if (response === 'да') {
            response = await messenger.send('ты мозги не еби. дели давай');
        }
    }

    if (!(huisosAnswer(response) || schoolboyAnswer(response) || yesAnswer(response) || otherAnswers(response) || drocherAnswer(response))) {
        response = await messenger.send('так можешь?', 'так ты можешь разделить?');
        if (yesAnswer(response)) {
            response = await messenger.send('так давай, моги');
            if (response === 'да') {
                response = await messenger.send('ты мозги не еби. дели давай');
            }
        }
    }

    if (drocherAnswer(response)) {
        response = await messenger.send('хуй покажешь в скайпе?');
        if (check(response, 'да', 'покажу')) {
            await onlySend('добавляйся');
            await onlySend('lera.lera872');
            await sleep(5);
        } else {
            await onlySend('ну и пошел нахуй');
        }
        return;
    } else if (check(response, 'гуман')) {
        return;
    } else if (response === 'нет') {
        response = await messenger.send('пидара ответ');
        if (response.includes('пидар')) {
            response = await messenger.send('ну точно хуисос');
        }
    } else if (response === 'не') {
        response = await messenger.send('ничего не можешь, ничего не умеешь');
    } else if (schoolboyAnswer(response)) {
        response = await messenger.send('мамка запретила?', 'а че так вдруг нельзя? мамка запретила?');
    } else if (huisosAnswer(response)) {
        if (response.length > 20) {
            await onlySend('"' + response + '""');
            await onlySend('че за хуйню ты тут пишешь?');
            response = await messenger.send('ты че, совсем тупой?', 'тупорылый штоле?');
        } else {
            await onlySend(response + '?');
            response = await messenger.send('ты че, совсем тупой?', 'тупорылый штоле?', 'а не хуесос ли ты?');
        }
    }

    await onlySend('в скайпе не зассышь базарить?', 'в скайпе базарить не зассышь?');
    if (Math.random() < 0.5) {
        await onlySend('добавляйся');
    }
    await onlySend('lera.lera872');
}