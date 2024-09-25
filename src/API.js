//login
export const loginPost = async (url, data) => {
    // console.log('data -->', data)
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    const Resultdata = await res.json();
    // console.log('loginPost ---- >>', Resultdata)

    return Resultdata;
}

// register
export const register = async (url, data) => {
    // console.log('data', data)
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    const Resultdata = await res.json();
    console.log('register ---- >>', Resultdata)

    return Resultdata;
}

// verifyotp
export const verifyotp = async (url, data) => {
    // console.log('data', data)
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    const Resultdata = await res.json();
    console.log('verifyotp ---- >>', Resultdata)

    return Resultdata;
}
// getcategory
export const getcategory = async (url) => {
    const res = await fetch(url, {
        method: 'get',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify()
    });
    const Resultdata = await res.json();
    // console.log('getcategory ---- >>', Resultdata)

    return Resultdata;
}

export const addpost = async (url, data) => {
    // console.log('data -->', data)
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    const Resultdata = await res.json();
    // console.log('addpost ---- >>', Resultdata)

    return Resultdata;
}
