export type ProfileType = {
    name: string;
    contact: string;
    gender: string;
    address: {
        addressline: string;
        city: string;
        state: string;
        pincode: string;
        country: string;
    }
}
