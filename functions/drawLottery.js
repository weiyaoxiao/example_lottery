addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
async function handleRequest(req) {
    const method = req.method;
    console.log("req.method:", method, req);
    try {
        const drawList = [
            { text: '谢谢参与', value: 0 },
            { text: '0.5元', value: 0.5 },
            { text: '2元', value: 2 },
            { text: '3元', value: 3 },
            { text: '4元', value: 4 },
            { text: '10元', value: 10 },
            { text: '100元', value: 100 },
            { text: '0.28元', value: 0.28 },
        ];
        let randomIndex = Math.floor(Math.random() * drawList.length);
        const rspData = {
            code: 1,
            msg: '',
            data: {
                drawIndex: randomIndex,
            }
        };
        return new Response(JSON.stringify(rspData), {
            headers: {
                "content-type": "application/json",
            },
        })
    } catch (e) {
        console.log("Got Exception: " + e.stack);
        return new Response("Got Exception: " + e.message, {
            headers: {
                "content-type": "application/json",
            },
        });
    }
}
