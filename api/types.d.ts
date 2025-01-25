export interface UserData {
    username: string;
    password: string;
    token: string;
    displayName: string;
    phoneNumber: string
}

export interface ProductData {
    user: UserData;
    category: {
        title: string;
    };
    title: string;
    description: string;
    price: number;
    image: string | undefined;
}