export default {
    data: () => ({
        error: undefined,
        isDone: false,
        isLoading: false,
        btnText: 'next',
        placeholder: 'Email or Username',
        title: 'Sign in',
        value: undefined,
        featureText: 'Cant access your account?',
        showFeature: false,
        currentPosition: 0,
        showField: true,
        forgotAccount: {
            firstName: undefined,
            lastName: undefined,
            emailUsed: undefined
        }
    })
}