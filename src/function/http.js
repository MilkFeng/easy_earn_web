const request = (promise, onFinish, onErr) =>
    promise.then(res => onFinish(res?.data))
        .catch(err => {
            if (err?.response?.data?.msg !== undefined) onErr(err?.response?.data?.msg);
            else if (err?.response?.data !== undefined && err?.response?.data !== "") onErr(err?.response?.data);
            else if (err?.message !== undefined) onErr(err?.message);
            else onErr(err);

            console.error(err);
        });

const get = (url, axios, onFinish, onErr) => request(axios.get(url), onFinish, onErr);
const get_with_params = (url, data, axios, onFinish, onErr) => request(axios.get(url, { params: data }), onFinish, onErr);
const post = (url, data, axios, onFinish, onErr) => request(axios.post(url, data), onFinish, onErr);
const del = (url, data, axios, onFinish, onErr) => request(axios.delete(url, data), onFinish, onErr);

export const get_addresses = (axios, onFinish, onErr) =>
    get('/user/get-wallets', axios, onFinish, onErr);


export const get_nonce = (axios, address, onFinish, onErr) =>
    post('/wallet/nonce', {
        address,
    }, axios, onFinish, onErr);


export const transfer = (axios, nonce, from, to, amount, pk, sig, onFinish, onErr) =>
    post('/wallet/transfer', {
        nonce, from, to, amount, pk, sig,
    }, axios, onFinish, onErr);

export const create_wallet = (axios, pk, onFinish, onErr) =>
    post('/wallet/create', {
        pk,
    }, axios, onFinish, onErr);

export const bond_wallet = (axios, address, onFinish, onErr) =>
    post('/user/add-wallet', {
        address,
    }, axios, onFinish, onErr);

export const get_balances = (axios, addresses, onFinish, onErr) =>
    post('/wallet/balance', {
        addresses,
    }, axios, onFinish, onErr);

export const delete_wallet = (axios, address, onFinish, onErr) =>
    del('/user/delete-wallet', {
        data: { address }
    }, axios, onFinish, onErr);

async function request_wallets(axios) {
    const addresses = (await axios.get('/user/get-wallets')).data.addresses;
    const balances = (await axios.post('/wallet/balance', { addresses })).data.balance;
    let wallets = [];
    for (let i = 0; i < balances.length; ++i) {
        wallets.push({ id: i, address: addresses[i], balance: balances[i] });
    }
    return { data: { wallets: wallets } };
}

export const get_wallets = (axios, onFinish, onErr) =>
    request(request_wallets(axios), onFinish, onErr);


export const get_all_tasks_of = (axios, address, onFinish, onErr) =>
    get_with_params('/task/get-all-tasks', {
        address
    }, axios, onFinish, onErr);

export const get_task = (axios, address, nonce, onFinish, onErr) =>
    get_with_params('/task/get-task', {
        address, nonce
    }, axios, onFinish, onErr);