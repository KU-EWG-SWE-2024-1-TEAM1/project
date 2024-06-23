export const loginApi = async (email, password) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Failed to login');
    }

    const data = await response.json();
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', data.access_token);
    }
    return data;
};