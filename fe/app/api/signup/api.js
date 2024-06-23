export const signupApi = async (userData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to sign up: ${errorText}`);
    }

    return response.json();
};