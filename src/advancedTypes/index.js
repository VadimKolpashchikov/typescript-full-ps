{
    const arr = [1, '2', 3];
    function logId(id) {
        if (typeof id === 'string') {
            console.log(id.toLowerCase());
        }
        else if (typeof id === 'number') {
            console.log(id.toFixed(2));
        }
        else {
            console.log(id);
        }
    }
    function logError(err) {
        if (Array.isArray(err)) {
            console.log(err);
        }
        else {
            console.log(err);
        }
    }
    function logObject(obj) {
        if ('a' in obj) {
            console.log(obj.a);
        }
        else {
            console.log(obj.b);
        }
    }
    function logMultiplyId(a, b) {
        if (a === b) {
            console.log(a.toFixed(2), b.toFixed(1));
        }
    }
}
{
    async function fetchWithAuth(url, method = 'GET') {
        await fetch(url, {
            method,
        });
        return 1;
    }
    fetchWithAuth('sssd/sdds/dssd', 'POST');
}
export {};
